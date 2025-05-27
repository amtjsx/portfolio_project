import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class ForgotPasswordDto {
  @ApiProperty({
    description: "Email address for password reset",
    example: "john@example.com",
  })
  @IsEmail()
  email: string
}
