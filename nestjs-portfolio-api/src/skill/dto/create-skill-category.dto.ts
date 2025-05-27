import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsOptional, IsUUID, IsNumber, IsBoolean } from "class-validator"

export class CreateSkillCategoryDto {
  @ApiProperty({ description: "Name of the skill category" })
  @IsString()
  name: string

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

  @ApiPropertyOptional({
    description: "Display order for the skill category",
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  displayOrder?: number

  @ApiPropertyOptional({
    description: "Whether this category should be visible",
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean

  @ApiProperty({ description: "ID of the user who owns this skill category" })
  @IsUUID(4)
  userId: string
}
