import { ApiProperty } from "@nestjs/swagger"

export class SocialEntity {
  @ApiProperty({ description: "Social link ID", example: 1 })
  id: number

  @ApiProperty({ description: "User ID who owns this social link", example: 1 })
  userId: string

  @ApiProperty({ description: "Portfolio ID this social link belongs to", required: false })
  portfolioId?: number

  @ApiProperty({ description: "Social media platform", example: "linkedin" })
  platform: string

  @ApiProperty({ description: "Social media profile URL", example: "https://linkedin.com/in/johndoe" })
  url: string

  @ApiProperty({ description: "Display label for the social link", example: "Professional LinkedIn" })
  label?: string

  @ApiProperty({ description: "Username or handle on the platform", example: "johndoe" })
  username?: string

  @ApiProperty({ description: "Custom icon URL", required: false })
  iconUrl?: string

  @ApiProperty({ description: "Display order for sorting", example: 1 })
  displayOrder: number

  @ApiProperty({ description: "Whether the link is active/visible", example: true })
  isActive: boolean

  @ApiProperty({ description: "Whether to show in main navigation", example: true })
  showInNav: boolean

  @ApiProperty({ description: "Whether to open link in new tab", example: true })
  openInNewTab: boolean

  @ApiProperty({ description: "Link description or bio", required: false })
  description?: string

  @ApiProperty({ description: "Follower count (if applicable)", required: false })
  followerCount?: number

  @ApiProperty({ description: "Last activity date on the platform", required: false })
  lastActiveAt?: string

  @ApiProperty({ description: "Link verification status", example: false })
  isVerified: boolean

  @ApiProperty({ description: "Click tracking count", example: 0 })
  clickCount: number

  @ApiProperty({ description: "Additional metadata", required: false })
  metadata?: Record<string, any>

  @ApiProperty({ description: "Creation timestamp", example: "2024-01-01T00:00:00.000Z" })
  createdAt: string

  @ApiProperty({ description: "Last update timestamp", example: "2024-01-01T00:00:00.000Z" })
  updatedAt: string
}
