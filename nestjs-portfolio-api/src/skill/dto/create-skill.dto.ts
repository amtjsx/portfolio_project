import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsOptional, IsUUID, IsEnum, IsNumber, IsBoolean, IsDate, Min, Max, IsObject } from "class-validator"
import { Type } from "class-transformer"
import { ProficiencyLevel } from "../models/skill.model"

export class CreateSkillDto {
  @ApiProperty({ description: "Name of the skill" })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: "Description of the skill" })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    description: "Proficiency level",
    enum: ProficiencyLevel,
    default: ProficiencyLevel.INTERMEDIATE,
  })
  @IsEnum(ProficiencyLevel)
  @IsOptional()
  proficiencyLevel?: ProficiencyLevel

  @ApiPropertyOptional({
    description: "Years of experience with this skill",
    minimum: 0,
    maximum: 50,
  })
  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  yearsOfExperience?: number

  @ApiPropertyOptional({ description: "Date when the skill was last used" })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  lastUsedDate?: Date

  @ApiPropertyOptional({ description: "Icon for the skill" })
  @IsString()
  @IsOptional()
  icon?: string

  @ApiPropertyOptional({ description: "Color for the skill" })
  @IsString()
  @IsOptional()
  color?: string

  @ApiPropertyOptional({
    description: "Whether this skill should be featured",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean

  @ApiPropertyOptional({
    description: "Display order for the skill",
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  displayOrder?: number

  @ApiPropertyOptional({ description: "Additional metadata for the skill" })
  @IsObject()
  @IsOptional()
  metadata?: any

  @ApiProperty({ description: "ID of the user who owns this skill" })
  @IsUUID(4)
  userId: string

  @ApiPropertyOptional({ description: "ID of the portfolio this skill belongs to" })
  @IsUUID(4)
  @IsOptional()
  portfolioId?: string

  @ApiPropertyOptional({ description: "ID of the category this skill belongs to" })
  @IsUUID(4)
  @IsOptional()
  categoryId?: string
}
