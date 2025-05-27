import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsNumber, IsDateString, IsIn } from "class-validator"
import { Transform } from "class-transformer"

export class AnalyticsQueryDto {
  @ApiProperty({
    description: "Start date for analytics query",
    example: "2024-01-01",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string

  @ApiProperty({
    description: "End date for analytics query",
    example: "2024-01-31",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string

  @ApiProperty({
    description: "Time period for analytics",
    example: "7d",
    enum: ["1d", "7d", "30d", "90d", "1y", "all"],
    required: false,
  })
  @IsOptional()
  @IsIn(["1d", "7d", "30d", "90d", "1y", "all"])
  period?: "1d" | "7d" | "30d" | "90d" | "1y" | "all"

  @ApiProperty({
    description: "Group results by time interval",
    example: "day",
    enum: ["hour", "day", "week", "month"],
    required: false,
  })
  @IsOptional()
  @IsIn(["hour", "day", "week", "month"])
  groupBy?: "hour" | "day" | "week" | "month"

  @ApiProperty({
    description: "Page path filter",
    example: "/projects",
    required: false,
  })
  @IsOptional()
  @IsString()
  pagePath?: string

  @ApiProperty({
    description: "Country filter",
    example: "United States",
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string

  @ApiProperty({
    description: "Device type filter",
    example: "desktop",
    enum: ["desktop", "mobile", "tablet"],
    required: false,
  })
  @IsOptional()
  @IsIn(["desktop", "mobile", "tablet"])
  deviceType?: "desktop" | "mobile" | "tablet"

  @ApiProperty({
    description: "Referrer domain filter",
    example: "google.com",
    required: false,
  })
  @IsOptional()
  @IsString()
  referrerDomain?: string

  @ApiProperty({
    description: "Limit number of results",
    example: 100,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  limit?: number

  @ApiProperty({
    description: "Offset for pagination",
    example: 0,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  offset?: number
}
