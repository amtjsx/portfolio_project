import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CheckUsernameDto } from "./dto/check-username.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RegisterDto } from "./dto/register.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User login" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        refresh_token: { type: "string" },
        token_type: { type: "string", example: "Bearer" },
        expires_in: { type: "number", example: 604800 },
        user: {
          type: "object",
          properties: {
            id: { type: "number" },
            email: { type: "string" },
            username: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            role: { type: "string" },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log("body", body);
    const result = await this.authService.login(body);
    res.cookie("refresh_token", result.refresh_token, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      sameSite: "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });
    res.cookie("access_token", result.access_token, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      sameSite: "lax",
      maxAge: 1 * 1 * 60 * 60 * 1000, // 1 hour
    });
    console.log("result", result);
    return result;
  }

  @Post("check-username")
  @ApiOperation({ summary: "Check username availability" })
  @ApiBody({ type: CheckUsernameDto })
  @ApiResponse({
    status: 200,
    description: "Username availability checked successfully",
    schema: {
      type: "object",
      properties: {
        available: { type: "boolean" },
      },
    },
  })
  async checkUsername(@Body() checkUsernameDto: CheckUsernameDto) {
    const available = await this.authService.checkUsername(
      checkUsernameDto.username
    );
    console.log("available", available, new Date());
    return { available };
  }

  @Post("signup")
  @ApiOperation({ summary: "User registration" })
  @ApiResponse({
    status: 201,
    description: "Registration successful",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        refresh_token: { type: "string" },
        token_type: { type: "string", example: "Bearer" },
        expires_in: { type: "number", example: 604800 },
        user: { type: "object" },
        message: { type: "string", example: "Registration successful" },
      },
    },
  })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log("registerDto", registerDto);
    const result = await this.authService.register(registerDto);
    console.log("result", result);
    res.cookie("refresh_token", result.refresh_token, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      sameSite: "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });
    res.cookie("access_token", result.access_token, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      sameSite: "lax",
      maxAge: 1 * 1 * 60 * 60 * 1000, // 1 hour
    });
    return result;
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token" })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: "Token refreshed successfully",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        refresh_token: { type: "string" },
        token_type: { type: "string", example: "Bearer" },
        expires_in: { type: "number", example: 604800 },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Invalid refresh token" })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Request password reset" })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: "Password reset email sent",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Password reset email sent" },
      },
    },
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Reset password with token" })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: "Password reset successfully",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Password reset successfully" },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Invalid or expired reset token" })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Put("change-password")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Change password (authenticated)" })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: "Password changed successfully",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Password changed successfully" },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Current password is incorrect" })
  async changePassword(
    @Request() req: any,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.authService.changePassword(req.user.id, changePasswordDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({
    status: 200,
    description: "User profile retrieved successfully",
    schema: {
      type: "object",
      properties: {
        id: { type: "number" },
        email: { type: "string" },
        username: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        role: { type: "string" },
        avatarUrl: { type: "string" },
        bio: { type: "string" },
        location: { type: "string" },
        profileCompleteness: { type: "number" },
      },
    },
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user profile" })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 200,
    description: "Profile updated successfully",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async updateProfile(
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.authService.updateProfile(req.user.id, updateProfileDto);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({
    status: 200,
    description: "Logged out successfully",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Logged out successfully" },
      },
    },
  })
  async logout(@Request() req: any) {
    return this.authService.logout(req.user.id);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user info" })
  @ApiResponse({
    status: 200,
    description: "Current user info retrieved successfully",
  })
  async getCurrentUser(@Request() req: any) {
    return {
      user: req.user,
      isAuthenticated: true,
      permissions: this.getUserPermissions(req.user.role),
    };
  }

  @Post("verify-email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify email with 6-digit code" })
  @ApiBody({ type: VerifyEmailDto })
  @ApiResponse({
    status: 200,
    description: "Email verified successfully",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Email verified successfully" },
        user: {
          type: "object",
          properties: {
            id: { type: "number" },
            email: { type: "string" },
            username: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            isEmailVerified: { type: "boolean", example: true },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid or expired verification code",
  })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(
      verifyEmailDto.email,
      verifyEmailDto.code
    );
  }

  @Post("resend-verification")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Resend email verification code" })
  @ApiBody({ type: ResendVerificationDto })
  @ApiResponse({
    status: 200,
    description: "Verification code sent successfully",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Verification code sent successfully",
        },
        expiresAt: { type: "string", format: "date-time" },
      },
    },
  })
  @ApiResponse({ status: 429, description: "Too many requests" })
  async resendVerificationCode(
    @Body() resendDto: ResendVerificationDto,
    @Request() req: any
  ) {
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent");

    return this.authService.resendVerificationCode(
      resendDto.email,
      ipAddress,
      userAgent
    );
  }

  @Get("verification-status")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get email verification status" })
  @ApiResponse({
    status: 200,
    description: "Verification status retrieved successfully",
    schema: {
      type: "object",
      properties: {
        isEmailVerified: { type: "boolean" },
        hasPendingVerification: { type: "boolean" },
        lastCodeSentAt: { type: "string", format: "date-time", nullable: true },
      },
    },
  })
  async getVerificationStatus(@Request() req: any) {
    return this.authService.getVerificationStatus(req.user.id);
  }

  private getUserPermissions(role: string) {
    const permissions = {
      admin: [
        "read:all",
        "write:all",
        "delete:all",
        "manage:users",
        "manage:portfolios",
        "view:analytics",
      ],
      user: [
        "read:own",
        "write:own",
        "delete:own",
        "manage:own_portfolio",
        "view:own_analytics",
      ],
      guest: ["read:public"],
    };

    return permissions[role] || permissions.guest;
  }
}
