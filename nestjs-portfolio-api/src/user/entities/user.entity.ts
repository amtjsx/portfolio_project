import { ApiProperty } from "@nestjs/swagger"

export class UserEntity {
  @ApiProperty({ description: "User ID", example: 1 })
  id: number

  @ApiProperty({ description: "Username", example: "johndoe" })
  username: string

  @ApiProperty({ description: "Email address", example: "john@example.com" })
  email: string

  @ApiProperty({ description: "First name", example: "John" })
  firstName: string

  @ApiProperty({ description: "Last name", example: "Doe" })
  lastName: string

  @ApiProperty({ description: "Full name", example: "John Doe" })
  fullName: string

  @ApiProperty({ description: "Profile avatar URL", required: false })
  avatarUrl?: string

  @ApiProperty({ description: "User bio", required: false })
  bio?: string

  @ApiProperty({ description: "Phone number", required: false })
  phone?: string

  @ApiProperty({ description: "Location", example: "New York, USA" })
  location: string

  @ApiProperty({ description: "Website URL", required: false })
  website?: string

  @ApiProperty({ description: "LinkedIn profile URL", required: false })
  linkedinUrl?: string

  @ApiProperty({ description: "GitHub profile URL", required: false })
  githubUrl?: string

  @ApiProperty({ description: "Twitter profile URL", required: false })
  twitterUrl?: string

  @ApiProperty({ description: "User role", example: "admin", enum: ["admin", "user", "guest"] })
  role: "admin" | "user" | "guest"

  @ApiProperty({ description: "Account status", example: "active", enum: ["active", "inactive", "suspended"] })
  status: "active" | "inactive" | "suspended"

  @ApiProperty({ description: "Email verification status", example: true })
  isEmailVerified: boolean

  @ApiProperty({ description: "Profile completion percentage", example: 85 })
  profileCompleteness: number

  @ApiProperty({ description: "Last login timestamp", required: false })
  lastLoginAt?: string

  @ApiProperty({ description: "Account creation timestamp", example: "2023-01-01T00:00:00.000Z" })
  createdAt: string

  @ApiProperty({ description: "Last update timestamp", example: "2024-01-01T00:00:00.000Z" })
  updatedAt: string
}
