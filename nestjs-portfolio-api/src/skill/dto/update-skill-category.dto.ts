import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator"

export class UpdateSkillCategoryDto {
  @ApiPropertyOptional({ description: "Name of the skill category" })
  @IsString()
  @IsOptional()
  name?: string

  @ApiPropertyOptional({ description: "Description of the skill category" })
  @IsString()
  @IsOptional()
  description?: string

  @ApiPropertyOptional({ description: "Icon for the skill category" })
  @IsString()
  @IsOptional()
  icon?: string

  @ApiPropertyOptional({ description: "Color for the skill category" })
  @IsString()
  @IsOptional()
  color?: string

  @ApiPropertyOptional({ description: "Display order for the skill category" })
  @IsNumber()
  @IsOptional()
  displayOrder?: number

  @ApiPropertyOptional({ description: "Whether this category should be visible" })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean
}
