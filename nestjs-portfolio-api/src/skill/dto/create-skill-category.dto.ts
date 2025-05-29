import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateSkillCategoryDto {
  @ApiProperty({ description: "Name of the skill category" })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: "Description of the skill category" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: "Whether this category should be visible",
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
