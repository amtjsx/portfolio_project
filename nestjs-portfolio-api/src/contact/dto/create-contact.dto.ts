import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmail, IsOptional } from "class-validator"

export class CreateContactDto {
  @ApiProperty({
    description: "Full name of the person contacting",
    example: "John Doe",
  })
  @IsString()
  name: string

  @ApiProperty({
    description: "Email address",
    example: "john.doe@example.com",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Subject of the message",
    example: "Project Inquiry",
  })
  @IsString()
  subject: string

  @ApiProperty({
    description: "Message content",
    example: "I would like to discuss a potential project...",
  })
  @IsString()
  message: string

  @ApiProperty({
    description: "Phone number",
    example: "+1 (555) 123-4567",
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty({
    description: "Company name",
    example: "Tech Corp Inc.",
    required: false,
  })
  @IsOptional()
  @IsString()
  company?: string
}
