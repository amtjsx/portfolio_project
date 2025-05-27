import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsIn, Min, Max } from "class-validator"

export class CreateTechnicalDto {
  @ApiProperty({
    description: "Technology name",
    example: "React",
  })
  @IsString()
  name: string

  @ApiProperty({
    description: "Skill level (0-100)",
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  level: number

  @ApiProperty({
    description: "Technology category",
    example: "frontend",
    enum: ["frontend", "backend", "database", "devops", "mobile", "other"],
  })
  @IsIn(["frontend", "backend", "database", "devops", "mobile", "other"])
  category: "frontend" | "backend" | "database" | "devops" | "mobile" | "other"

  @ApiProperty({
    description: "Years of experience",
    example: 3,
  })
  @IsNumber()
  @Min(0)
  yearsOfExperience: number

  @ApiProperty({
    description: "Technology description",
    example: "JavaScript library for building user interfaces",
  })
  @IsString()
  description: string

  @ApiProperty({
    description: "Technology icon URL",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string

  @ApiProperty({
    description: "Official website URL",
    required: false,
  })
  @IsOptional()
  @IsString()
  websiteUrl?: string

  @ApiProperty({
    description: "Whether currently using this technology",
    example: true,
  })
  @IsBoolean()
  isCurrentlyUsing: boolean

  @ApiProperty({
    description: "Last used date",
    example: "2024-01-15",
  })
  @IsString()
  lastUsed: string

  @ApiProperty({
    description: "Certification details",
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[]

  @ApiProperty({
    description: "Related projects count",
    example: 5,
  })
  @IsNumber()
  @Min(0)
  projectsCount: number
}
