import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional, IsUrl, Min, Max } from "class-validator"

export class TrackPageViewDto {
  @ApiProperty({
    description: "Portfolio ID being tracked",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  portfolioId: string

  @ApiProperty({
    description: "Unique visitor identifier",
    example: "visitor_123456789",
  })
  @IsString()
  visitorId: string

  @ApiProperty({
    description: "Session identifier",
    example: "session_987654321",
  })
  @IsString()
  sessionId: string

  @ApiProperty({
    description: "Page path visited",
    example: "/projects",
  })
  @IsString()
  pagePath: string

  @ApiProperty({
    description: "Page title",
    example: "My Projects - John Doe Portfolio",
    required: false,
  })
  @IsOptional()
  @IsString()
  pageTitle?: string

  @ApiProperty({
    description: "Referrer URL",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  referrer?: string

  @ApiProperty({
    description: "User agent string",
    required: false,
  })
  @IsOptional()
  @IsString()
  userAgent?: string

  @ApiProperty({
    description: "Screen resolution",
    example: "1920x1080",
    required: false,
  })
  @IsOptional()
  @IsString()
  screenResolution?: string

  @ApiProperty({
    description: "Language preference",
    example: "en-US",
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string

  @ApiProperty({
    description: "Time zone",
    example: "America/New_York",
    required: false,
  })
  @IsOptional()
  @IsString()
  timezone?: string

  @ApiProperty({
    description: "Time spent on page in seconds",
    example: 45,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  timeOnPage?: number

  @ApiProperty({
    description: "Scroll depth percentage",
    example: 75,
    required: false,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  scrollDepth?: number

  @ApiProperty({
    description: "UTM source parameter",
    example: "google",
    required: false,
  })
  @IsOptional()
  @IsString()
  utmSource?: string

  @ApiProperty({
    description: "UTM medium parameter",
    example: "cpc",
    required: false,
  })
  @IsOptional()
  @IsString()
  utmMedium?: string

  @ApiProperty({
    description: "UTM campaign parameter",
    example: "portfolio_campaign",
    required: false,
  })
  @IsOptional()
  @IsString()
  utmCampaign?: string

  @ApiProperty({
    description: "UTM term parameter",
    example: "web developer",
    required: false,
  })
  @IsOptional()
  @IsString()
  utmTerm?: string

  @ApiProperty({
    description: "UTM content parameter",
    example: "header_link",
    required: false,
  })
  @IsOptional()
  @IsString()
  utmContent?: string

  @ApiProperty({
    description: "Additional custom data",
    required: false,
    example: {
      conversionGoal: "contact_form",
      experimentVariant: "A",
    },
  })
  @IsOptional()
  customData?: Record<string, any>
}
