import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";
import { User } from "../user/models/user.model";
import { UserService } from "../user/user.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { EmailVerificationService } from "./services/email-verification.service";

@Injectable()
export class AuthService {
  private resetTokens = new Map<string, { userId: string; expires: Date }>();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailVerificationService: EmailVerificationService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log("email", email, new Date());
    console.log("password", password, new Date());
    const user = await this.userService.findByEmail(email);
    console.log("user", user);
    if (user && (await user.validatePassword(password))) {
      const { password: _, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async checkUsername(username: string): Promise<boolean> {
    try {
      console.log("username", username);
      const user = await this.userService.findByUsername(username);
      console.log("user", user);
      if (!user) return true;
      return false; // Username exists
    } catch (error) {
      console.log(error);
      if (error instanceof ConflictException) {
        return false; // Username exists
      }
      return true; // Username is available
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (user.status !== "active") {
      throw new UnauthorizedException("Account is not active");
    }

    // Update last login
    await this.userService.updateLastLogin(user.id);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
      expires_in: 7 * 24 * 60 * 60, // 7 days in seconds
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        profileCompleteness: user.profileCompleteness,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    try {
      const user = await this.userService.findByEmail(registerDto.email);
      if (user) {
        throw new ConflictException("User with this email already exists");
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      // User not found, continue with registration
    }

    try {
      const user = await this.userService.findByUsername(registerDto.username);
      if (user) {
        throw new ConflictException("User with this username already exists");
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      // User not found, continue with registration
    }

    // Create new user (email will be unverified by default)
    const user = await this.userService.create({
      ...registerDto,
      role: "user",
    });

    // Generate and send verification code
    const code = await this.emailVerificationService.generateVerificationCode(
      user.id,
      user.email,
      "email_verification"
    );

    await this.emailVerificationService.sendVerificationEmail(
      user.email,
      code,
      "email_verification"
    );

    // Generate tokens (user can use app but some features require verification)
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
      expires_in: 7 * 24 * 60 * 60,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        profileCompleteness: user.profileCompleteness,
        isEmailVerified: user.isEmailVerified,
      },
      message:
        "Registration successful. Please check your email for verification code.",
      requiresEmailVerification: true,
    };
  }

  async refreshToken(refreshToken: string) {
    // In a real application, you would validate the refresh token
    // against a database or cache. For now, we'll generate a new token
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(decoded.sub);

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      };

      const newAccessToken = this.jwtService.sign(payload);
      const newRefreshToken = this.generateRefreshToken();

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        token_type: "Bearer",
        expires_in: 7 * 24 * 60 * 60,
      };
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isCurrentPasswordValid = await user.validatePassword(
      changePasswordDto.currentPassword
    );
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new BadRequestException(
        "New password and confirmation do not match"
      );
    }

    await this.userService.update(userId, {
      password: changePasswordDto.newPassword,
    });

    return {
      message: "Password changed successfully",
    };
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userService.findByEmail(email);

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Store reset token (in production, use Redis or database)
      this.resetTokens.set(resetToken, {
        userId: user.id,
        expires,
      });

      // In a real application, you would send an email here
      // For now, we'll return the token (remove this in production)
      return {
        message: "Password reset email sent",
        resetToken, // Remove this in production
        expiresAt: expires,
      };
    } catch (error) {
      // Don't reveal if email exists or not
      return {
        message:
          "If an account with that email exists, a password reset email has been sent",
      };
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const tokenData = this.resetTokens.get(resetPasswordDto.token);

    if (!tokenData || tokenData.expires < new Date()) {
      throw new BadRequestException("Invalid or expired reset token");
    }

    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException("Password and confirmation do not match");
    }

    await this.userService.update(tokenData.userId, {
      password: resetPasswordDto.password,
    });

    // Remove used token
    this.resetTokens.delete(resetPasswordDto.token);

    return {
      message: "Password reset successfully",
    };
  }

  async getProfile(userId: string) {
    const user = await this.userService.findById(userId);
    return user;
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await this.userService.update(userId, updateData);
    return user;
  }

  async logout(userId: string) {
    // In a real application, you might want to blacklist the token
    // or store logout information
    return {
      message: "Logged out successfully",
    };
  }

  private generateRefreshToken(): string {
    return crypto.randomBytes(64).toString("hex");
  }

  async validateJwtPayload(payload: any): Promise<User> {
    const user = await this.userService.findById(payload.sub);
    if (!user || user.status !== "active") {
      throw new UnauthorizedException("User not found or inactive");
    }
    return user;
  }

  async verifyEmail(email: string, code: string) {
    const result = await this.emailVerificationService.verifyCode(
      email,
      code,
      "email_verification"
    );

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    const user = await this.userService.findById(result.userId);

    return {
      message: result.message,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  async resendVerificationCode(
    email: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    return this.emailVerificationService.resendVerificationCode(
      email,
      "email_verification",
      ipAddress,
      userAgent
    );
  }

  async getVerificationStatus(userId: string) {
    return this.emailVerificationService.getUserVerificationStatus(userId);
  }
}
