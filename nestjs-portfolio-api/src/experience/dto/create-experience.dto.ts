import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDate,
  IsArray,
  IsUrl,
  IsInt,
  Min,
  ValidateIf,
} from "class-validator"
import { Type } from "class-transformer"
import { EmploymentType } from "../models/experience.model"

export class CreateExperienceDto {
  @ApiProperty({ description: "The user ID who owns the experience" })
  @IsUUID(4)
  @IsNotEmpty()
  userId: string

  @ApiPropertyOptional({ description: "The portfolio ID this experience is associated with" })
  @IsUUID(4)
  @IsOptional()
  portfolioId?: string

  @ApiProperty({ description: "The company name" })
  @IsString()
  @IsNotEmpty()
  companyName: string

  @ApiProperty({ description: "The position or job title" })
  @IsString()
  @IsNotEmpty()
  position: string

  @ApiProperty({ description: "The employment type", enum: EmploymentType })
  @IsEnum(EmploymentType)
  @IsNotEmpty()
  employmentType: EmploymentType

  @ApiPropertyOptional({ description: "The company location" })
  @IsString()
  @IsOptional()
  location?: string

  @ApiPropertyOptional({ description: "Whether the job is remote" })
  @IsBoolean()
  @IsOptional()
  isRemote?: boolean

  @ApiProperty({ description: "The start date of the experience" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @ApiPropertyOptional({ description: "The end date of the experience" })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ValidateIf((o) => !o.isCurrent)
  endDate?: Date

  @ApiPropertyOptional({ description: "Whether this is the current job" })
  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean

  @ApiPropertyOptional({ description: "The job description" })
  @IsString()
  @IsOptional()
  description?: string

  @ApiPropertyOptional({ description: "The responsibilities in the job" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  responsibilities?: string[]

  @ApiPropertyOptional({ description: "The achievements in the job" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  achievements?: string[]

  @ApiPropertyOptional({ description: "The technologies used in the job" })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[]

  @ApiPropertyOptional({ description: "The company URL" })
  @IsUrl()
  @IsOptional()
  companyUrl?: string

  @ApiPropertyOptional({ description: "The company logo URL" })
  @IsUrl()
  @IsOptional()
  companyLogoUrl?: string

  @ApiPropertyOptional({ description: "The order of display" })
  @IsInt()
  @Min(0)
  @IsOptional()
  displayOrder?: number

  @ApiPropertyOptional({ description: "Whether to highlight this experience" })
  @IsBoolean()
  @IsOptional()
  isHighlighted?: boolean
}
