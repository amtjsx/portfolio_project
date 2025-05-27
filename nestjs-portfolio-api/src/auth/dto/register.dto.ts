import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator"

export class RegisterDto {
  @ApiProperty({
    description: "User email address",
    example: "john@example.com",
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: "Username (3-20 characters, alphanumeric and underscores only)",
    example: "johndoe",
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  })
  username: string

  @ApiProperty({
    description: "Password (minimum 8 characters, must contain uppercase, lowercase, number)",
    example: "Password123!",
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  password: string

  @ApiProperty({
    description: "First name",
    example: "John",
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName: string

  @ApiProperty({
    description: "Last name",
    example: "Doe",
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string

  @ApiProperty({
    description: "Location",
    example: "New York, USA",
  })
  @IsString()
  @MaxLength(100)
  location: string
}
