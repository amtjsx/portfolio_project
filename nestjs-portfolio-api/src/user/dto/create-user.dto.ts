import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmail, IsOptional, IsIn, IsUrl } from "class-validator"

export class CreateUserDto {
  @ApiProperty({
    description: "Username",
    example: "johndoe",
  })
  @IsString()
  username: string

  @ApiProperty({
    description: "Email address",
    example: "john@example.com",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Password",
    example: "securePassword123",
  })
  @IsString()
  password: string

  @ApiProperty({
    description: "First name",
    example: "John",
  })
  @IsString()
  firstName: string

  @ApiProperty({
    description: "Last name",
    example: "Doe",
  })
  @IsString()
  lastName: string

  @ApiProperty({
    description: "Profile avatar URL (use /api/upload/image endpoint to upload)",
    required: false,
    example: "/api/upload/files/image-1234567890-123456789.jpg",
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string

  @ApiProperty({
    description: "User bio",
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string

  @ApiProperty({
    description: "Phone number",
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty({
    description: "Location",
    example: "New York, USA",
  })
  @IsString()
  location: string

  @ApiProperty({
    description: "Website URL",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string

  @ApiProperty({
    description: "LinkedIn profile URL",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string

  @ApiProperty({
    description: "GitHub profile URL",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  githubUrl?: string

  @ApiProperty({
    description: "Twitter profile URL",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  twitterUrl?: string

  @ApiProperty({
    description: "User role",
    example: "user",
    enum: ["admin", "user", "guest"],
    default: "user",
  })
  @IsOptional()
  @IsIn(["admin", "user", "guest"])
  role?: "admin" | "user" | "guest"
}
