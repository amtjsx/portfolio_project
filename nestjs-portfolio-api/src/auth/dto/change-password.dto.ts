import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength, Matches } from "class-validator"

export class ChangePasswordDto {
  @ApiProperty({
    description: "Current password",
    example: "currentPassword123",
  })
  @IsString()
  currentPassword: string

  @ApiProperty({
    description: "New password (minimum 8 characters, must contain uppercase, lowercase, number, special character)",
    example: "NewPassword123!",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  newPassword: string

  @ApiProperty({
    description: "Confirm new password",
    example: "NewPassword123!",
  })
  @IsString()
  confirmPassword: string
}
