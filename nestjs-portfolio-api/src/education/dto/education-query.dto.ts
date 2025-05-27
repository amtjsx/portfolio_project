import { IsOptional, IsUUID, IsString, IsEnum, IsBoolean, IsDate, IsIn } from "class-validator"
import { Type } from "class-transformer"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { EducationType } from "../models/education.model"

export class EducationQueryDto {
  @ApiPropertyOptional({ description: "User ID to filter by" })
  @IsOptional()
  @IsUUID()
  userId?: string

  @ApiPropertyOptional({ description: "Portfolio ID to filter by" })
  @IsOptional()
  @IsUUID()
  portfolioId?: string

  @ApiPropertyOptional({ description: "Institution name to search for" })
  @IsOptional()
  @IsString()
  institutionName?: string

  @ApiPropertyOptional({ description: "Degree to search for" })
  @IsOptional()
  @IsString()
  degree?: string

  @ApiPropertyOptional({ description: "Field of study to search for" })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string

  @ApiPropertyOptional({
    description: "Type of education to filter by",
    enum: EducationType,
    enumName: "EducationType",
  })
  @IsOptional()
  @IsEnum(EducationType)
  educationType?: EducationType

  @ApiPropertyOptional({ description: "Filter by current education status" })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean

  @ApiPropertyOptional({ description: "Filter by highlighted status" })
  @IsOptional()
  @IsBoolean()
  isHighlighted?: boolean

  @ApiPropertyOptional({ description: "Filter by verification status" })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean

  @ApiPropertyOptional({ description: "Start date from (inclusive)" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDateFrom?: Date

  @ApiPropertyOptional({ description: "Start date to (inclusive)" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDateTo?: Date

  @ApiPropertyOptional({ description: "End date from (inclusive)" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDateFrom?: Date

  @ApiPropertyOptional({ description: "End date to (inclusive)" })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDateTo?: Date

  @ApiPropertyOptional({
    description: "Sort field",
    enum: [
      "institutionName",
      "degree",
      "fieldOfStudy",
      "startDate",
      "endDate",
      "displayOrder",
      "createdAt",
      "updatedAt",
    ],
  })
  @IsOptional()
  @IsString()
  @IsIn(["institutionName", "degree", "fieldOfStudy", "startDate", "endDate", "displayOrder", "createdAt", "updatedAt"])
  sortBy?: string = "startDate"

  @ApiPropertyOptional({ description: "Sort direction", enum: ["ASC", "DESC"] })
  @IsOptional()
  @IsString()
  @IsIn(["ASC", "DESC"])
  sortDirection?: "ASC" | "DESC" = "DESC"

  @ApiPropertyOptional({ description: "Page number (starts from 1)" })
  @IsOptional()
  @Type(() => Number)
  page?: number = 1

  @ApiPropertyOptional({ description: "Items per page" })
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10
}
