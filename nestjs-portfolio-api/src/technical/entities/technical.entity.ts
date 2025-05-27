import { ApiProperty } from "@nestjs/swagger"

export class TechnicalEntity {
  @ApiProperty({ description: "Technical skill ID", example: 1 })
  id: number

  @ApiProperty({ description: "Technology name", example: "React" })
  name: string

  @ApiProperty({ description: "Skill level (0-100)", example: 85, minimum: 0, maximum: 100 })
  level: number

  @ApiProperty({
    description: "Technology category",
    example: "frontend",
    enum: ["frontend", "backend", "database", "devops", "mobile", "other"],
  })
  category: "frontend" | "backend" | "database" | "devops" | "mobile" | "other"

  @ApiProperty({ description: "Years of experience", example: 3 })
  yearsOfExperience: number

  @ApiProperty({ description: "Technology description", example: "JavaScript library for building user interfaces" })
  description: string

  @ApiProperty({ description: "Technology icon URL", required: false })
  iconUrl?: string

  @ApiProperty({ description: "Official website URL", required: false })
  websiteUrl?: string

  @ApiProperty({ description: "Whether currently using this technology", example: true })
  isCurrentlyUsing: boolean

  @ApiProperty({ description: "Last used date", example: "2024-01-15" })
  lastUsed: string

  @ApiProperty({ description: "Certification details", required: false })
  certifications?: string[]

  @ApiProperty({ description: "Related projects count", example: 5 })
  projectsCount: number

  @ApiProperty({ description: "Creation timestamp", example: "2024-01-01T00:00:00.000Z" })
  createdAt: string

  @ApiProperty({ description: "Last update timestamp", example: "2024-01-01T00:00:00.000Z" })
  updatedAt: string
}
