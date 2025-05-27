import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsUrl, MaxLength } from "class-validator"

export class UpdateProfileDto {
  @ApiProperty({
    description: "First name",
    example: "John",
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string

  @ApiProperty({
    description: "Last name",
    example: "Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string

  @ApiProperty({
    description: "User bio",
    example: "Full Stack Developer passionate about creating amazing web experiences",
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string

  @ApiProperty({
    description: "Phone number",
    example: "+1 (555) 123-4567",
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string

  @ApiProperty({
    description: "Location",
    example: "New York, USA",
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string

  @ApiProperty({
    description: "Website URL",
    example: "https://johndoe.com",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string

  @ApiProperty({
    description: "LinkedIn profile URL",
    example: "https://linkedin.com/in/johndoe",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string

  @ApiProperty({
    description: "GitHub profile URL",
    example: "https://github.com/johndoe",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  githubUrl?: string

  @ApiProperty({
    description: "Twitter profile URL",
    example: "https://twitter.com/johndoe",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  twitterUrl?: string

  @ApiProperty({
    description: "Avatar URL",
    example: "/api/upload/files/avatar-123456789.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string
}
