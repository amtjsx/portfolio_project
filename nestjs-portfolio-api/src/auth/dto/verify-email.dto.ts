import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length, Matches } from "class-validator"

export class VerifyEmailDto {
  @ApiProperty({
    description: "User email address",
    example: "john@example.com",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "6-digit verification code",
    example: "123456",
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/, {
    message: "Verification code must be exactly 6 digits",
  })
  code: string
}
