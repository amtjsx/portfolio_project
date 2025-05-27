import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class ResendVerificationDto {
  @ApiProperty({
    description: "User email address",
    example: "john@example.com",
  })
  @IsEmail()
  email: string
}
