import { ApiProperty } from "@nestjs/swagger"

export class PortfolioEntity {
  @ApiProperty({ description: "Portfolio ID", example: 1 })
  id: number

  @ApiProperty({ description: "User ID who owns this portfolio", example: 1 })
  userId: string

  @ApiProperty({ description: "Portfolio title", example: "John Doe - Full Stack Developer" })
  title: string

  @ApiProperty({ description: "Portfolio subtitle", example: "Passionate about creating amazing web experiences" })
  subtitle: string

  @ApiProperty({ description: "Professional summary" })
  summary: string

  @ApiProperty({
    description: "Portfolio theme",
    example: "modern",
    enum: ["modern", "classic", "minimal", "creative"],
  })
  theme: "modern" | "classic" | "minimal" | "creative"

  @ApiProperty({ description: "Primary color for the portfolio", example: "#3B82F6" })
  primaryColor: string

  @ApiProperty({ description: "Secondary color for the portfolio", example: "#1E40AF" })
  secondaryColor: string

  @ApiProperty({ description: "Portfolio visibility", example: "public", enum: ["public", "private", "unlisted"] })
  visibility: "public" | "private" | "unlisted"

  @ApiProperty({ description: "Custom domain for the portfolio", required: false })
  customDomain?: string

  @ApiProperty({ description: "SEO meta title", required: false })
  metaTitle?: string

  @ApiProperty({ description: "SEO meta description", required: false })
  metaDescription?: string

  @ApiProperty({ description: "SEO keywords", required: false })
  metaKeywords?: string[]

  @ApiProperty({ description: "Portfolio sections configuration" })
  sections: {
    about: boolean
    skills: boolean
    experience: boolean
    education: boolean
    projects: boolean
    contact: boolean
    testimonials: boolean
    blog: boolean
  }

  @ApiProperty({ description: "Social media links" })
  socialLinks: {
    linkedin?: string
    github?: string
    twitter?: string
    instagram?: string
    youtube?: string
    dribbble?: string
    behance?: string
  }

  @ApiProperty({ description: "Portfolio analytics data" })
  analytics: {
    totalViews: number
    uniqueVisitors: number
    lastViewedAt?: string
    popularPages: string[]
  }

  @ApiProperty({ description: "Portfolio settings" })
  settings: {
    showContactForm: boolean
    allowDownloadResume: boolean
    enableAnalytics: boolean
    enableComments: boolean
    maintenanceMode: boolean
  }

  @ApiProperty({ description: "Resume/CV file URL", required: false })
  resumeUrl?: string

  @ApiProperty({ description: "Portfolio publication status", example: true })
  isPublished: boolean

  @ApiProperty({ description: "Portfolio featured status", example: false })
  isFeatured: boolean

  @ApiProperty({ description: "Portfolio creation timestamp", example: "2023-01-01T00:00:00.000Z" })
  createdAt: string

  @ApiProperty({ description: "Last update timestamp", example: "2024-01-01T00:00:00.000Z" })
  updatedAt: string

  @ApiProperty({ description: "Portfolio publication timestamp", required: false })
  publishedAt?: string
}
