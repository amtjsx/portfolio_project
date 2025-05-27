import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsUUID, IsEnum, IsBoolean, IsString } from "class-validator"
import { Type } from "class-transformer"
import { EmploymentType } from "../models/experience.model"

export class ExperienceQueryDto {
  @ApiPropertyOptional({ description: "Filter by user ID" })
  @IsUUID(4)
  @IsOptional()
  userId?: string

  @ApiPropertyOptional({ description: "Filter by portfolio ID" })
  @IsUUID(4)
  @IsOptional()
  portfolioId?: string

  @ApiPropertyOptional({ description: "Filter by employment type", enum: EmploymentType })
  @IsEnum(EmploymentType)
  @IsOptional()
  employmentType?: EmploymentType

  @ApiPropertyOptional({ description: "Filter by current job status" })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isCurrent?: boolean

  @ApiPropertyOptional({ description: "Filter by highlighted status" })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isHighlighted?: boolean

  @ApiPropertyOptional({ description: "Search in company name or position" })
  @IsString()
  @IsOptional()
  search?: string

  @ApiPropertyOptional({ description: "Filter by technology" })
  @IsString()
  @IsOptional()
  technology?: string
}
