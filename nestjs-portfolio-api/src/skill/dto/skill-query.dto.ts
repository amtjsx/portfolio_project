import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsUUID, IsEnum, IsString, IsBoolean, IsNumber, Min } from "class-validator"
import { Type } from "class-transformer"
import { ProficiencyLevel } from "../models/skill.model"

export class SkillQueryDto {
  @ApiPropertyOptional({ description: "Filter by user ID" })
  @IsUUID(4)
  @IsOptional()
  userId?: string

  @ApiPropertyOptional({ description: "Filter by portfolio ID" })
  @IsUUID(4)
  @IsOptional()
  portfolioId?: string

  @ApiPropertyOptional({ description: "Filter by category ID" })
  @IsUUID(4)
  @IsOptional()
  categoryId?: string

  @ApiPropertyOptional({
    description: "Filter by proficiency level",
    enum: ProficiencyLevel,
  })
  @IsEnum(ProficiencyLevel)
  @IsOptional()
  proficiencyLevel?: ProficiencyLevel

  @ApiPropertyOptional({ description: "Filter by minimum years of experience" })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  minYearsOfExperience?: number

  @ApiPropertyOptional({ description: "Filter by featured status" })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean

  @ApiPropertyOptional({ description: "Search by name or description" })
  @IsString()
  @IsOptional()
  search?: string

  @ApiPropertyOptional({ description: "Page number for pagination", default: 1 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1

  @ApiPropertyOptional({ description: "Items per page for pagination", default: 10 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10

  @ApiPropertyOptional({
    description: "Sort field",
    enum: ["name", "proficiencyLevel", "yearsOfExperience", "lastUsedDate", "displayOrder", "createdAt"],
    default: "displayOrder",
  })
  @IsString()
  @IsOptional()
  sortBy?: string = "displayOrder"

  @ApiPropertyOptional({
    description: "Sort direction",
    enum: ["ASC", "DESC"],
    default: "ASC",
  })
  @IsString()
  @IsOptional()
  sortDirection?: "ASC" | "DESC" = "ASC"

  @ApiPropertyOptional({ description: "Include category details", default: false })
  @IsBoolean()
  @IsOptional()
  includeCategory?: boolean = false
}
