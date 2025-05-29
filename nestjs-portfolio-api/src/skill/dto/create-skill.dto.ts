import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min
} from "class-validator";
import { ProficiencyLevel } from "../models/skill.model";

export class CreateSkillDto {
  @ApiProperty({ description: "Name of the skill" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: "Description of the skill" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Proficiency level",
    enum: ProficiencyLevel,
    default: ProficiencyLevel.INTERMEDIATE,
  })
  @IsEnum(ProficiencyLevel)
  @IsOptional()
  proficiencyLevel?: ProficiencyLevel;

  @ApiPropertyOptional({
    description: "Years of experience with this skill",
    minimum: 0,
    maximum: 50,
  })
  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  yearsOfExperience?: number;

  @ApiPropertyOptional({ description: "Date when the skill was last used" })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  lastUsedDate?: Date;

  @ApiPropertyOptional({ description: "Icon for the skill" })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ description: "Color for the skill" })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({
    description: "Whether this skill should be featured",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    description: "Display order for the skill",
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional({
    description: "ID of the category this skill belongs to",
  })
  @IsUUID(4)
  @IsOptional()
  categoryId?: string;
}
