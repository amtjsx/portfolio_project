import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import * as crypto from "crypto";
import { Op } from "sequelize";
import { EmailService } from "../../email/email.service";
import { User } from "../../user/models/user.model";
import { VerificationCode } from "../models/verification-code.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectModel(VerificationCode)
    private verificationCodeModel: typeof VerificationCode,
    @InjectModel(User)
    private userModel: typeof User,
    private emailService: EmailService
  ) {}

  async generateVerificationCode(
    userId: string,
    email: string,
    type:
      | "email_verification"
      | "password_reset"
      | "login_verification" = "email_verification",
    ipAddress?: string,
    userAgent?: string
  ): Promise<string> {
    // Check rate limiting - max 3 codes per hour per email
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCodes = await this.verificationCodeModel.count({
      where: {
        email,
        type,
        createdAt: {
          [Op.gte]: oneHourAgo,
        },
      },
    });

    if (recentCodes >= 3) {
      throw new BadRequestException(
        "Too many verification codes requested. Please wait before requesting another."
      );
    }

    // Invalidate any existing unused codes for this user and type
    await this.verificationCodeModel.update(
      { isUsed: true },
      {
        where: {
          userId,
          email,
          type,
          isUsed: false,
        },
      }
    );

    // Generate 6-digit code
    const code = this.generateSixDigitCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save verification code
    await this.verificationCodeModel.create({
      code,
      type,
      userId,
      email,
      expiresAt,
      ipAddress,
      userAgent,
    });

    return code;
  }

  async verifyCode(
    email: string,
    code: string,
    type:
      | "email_verification"
      | "password_reset"
      | "login_verification" = "email_verification"
  ): Promise<{ success: boolean; userId?: string; message: string }> {
    const verificationRecord = await this.verificationCodeModel.findOne({
      where: {
        email,
        code,
        type,
        isUsed: false,
      },
      include: [User],
    });

    if (!verificationRecord) {
      return {
        success: false,
        message: "Invalid verification code",
      };
    }

    // Check if code can be attempted
    if (!verificationRecord.canAttempt()) {
      if (verificationRecord.isExpired()) {
        return {
          success: false,
          message: "Verification code has expired",
        };
      }
      if (verificationRecord.attempts >= 5) {
        return {
          success: false,
          message: "Too many failed attempts. Please request a new code",
        };
      }
    }

    // Increment attempts
    verificationRecord.incrementAttempts();
    await verificationRecord.save();

    // Mark code as used
    verificationRecord.isUsed = true;
    await verificationRecord.save();

    // If email verification, mark user as verified
    if (type === "email_verification") {
      await this.userModel.update(
        { isEmailVerified: true },
        {
          where: { id: verificationRecord.userId },
        }
      );
    }

    return {
      success: true,
      userId: verificationRecord.userId,
      message: "Email verified successfully",
    };
  }

  async sendVerificationEmail(
    email: string,
    code: string,
    type:
      | "email_verification"
      | "password_reset"
      | "login_verification" = "email_verification"
  ): Promise<void> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const templates = {
      email_verification: {
        subject: "Verify Your Email Address",
        template: "email-verification",
      },
      password_reset: {
        subject: "Password Reset Code",
        template: "password-reset",
      },
      login_verification: {
        subject: "Login Verification Code",
        template: "login-verification",
      },
    };

    const { subject, template } = templates[type];

    await this.emailService.sendEmail({
      to: email,
      subject,
      template,
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        code,
        expiresIn: "15 minutes",
        type: type.replace("_", " "),
      },
    });
  }

  async resendVerificationCode(
    email: string,
    type:
      | "email_verification"
      | "password_reset"
      | "login_verification" = "email_verification",
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ message: string; expiresAt: Date }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if email exists
      return {
        message:
          "If an account with that email exists, a verification code has been sent",
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      };
    }

    if (type === "email_verification" && user.isEmailVerified) {
      throw new BadRequestException("Email is already verified");
    }

    const code = await this.generateVerificationCode(
      user.id,
      email,
      type,
      ipAddress,
      userAgent
    );
    await this.sendVerificationEmail(email, code, type);

    return {
      message: "Verification code sent successfully",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    };
  }

  async cleanupExpiredCodes(): Promise<number> {
    const result = await this.verificationCodeModel.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date(),
        },
      },
    });

    return result;
  }

  async getUserVerificationStatus(userId: string): Promise<{
    isEmailVerified: boolean;
    hasPendingVerification: boolean;
    lastCodeSentAt?: Date;
  }> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const pendingCode = await this.verificationCodeModel.findOne({
      where: {
        userId,
        type: "email_verification",
        isUsed: false,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return {
      isEmailVerified: user.isEmailVerified,
      hasPendingVerification: !!pendingCode,
      lastCodeSentAt: pendingCode?.createdAt,
    };
  }

  private generateSixDigitCode(): string {
    // Generate cryptographically secure 6-digit code
    const buffer = crypto.randomBytes(4);
    const number = buffer.readUInt32BE(0);
    const code = ((number % 900000) + 100000).toString();
    return code;
  }

  async getVerificationStats(userId: string): Promise<{
    totalCodesSent: number;
    successfulVerifications: number;
    failedAttempts: number;
    lastVerificationAt?: Date;
  }> {
    const totalCodes = await this.verificationCodeModel.count({
      where: { userId },
    });

    const successfulVerifications = await this.verificationCodeModel.count({
      where: {
        userId,
        isUsed: true,
        attempts: 1,
      },
    });

    const failedAttempts = await this.verificationCodeModel.sum("attempts", {
      where: {
        userId,
        isUsed: false,
      },
    });

    const lastVerification = await this.verificationCodeModel.findOne({
      where: {
        userId,
        isUsed: true,
      },
      order: [["updatedAt", "DESC"]],
    });

    return {
      totalCodesSent: totalCodes,
      successfulVerifications,
      failedAttempts: failedAttempts || 0,
      lastVerificationAt: lastVerification?.updatedAt,
    };
  }
}
