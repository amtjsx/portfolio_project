import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsUUID, ValidateNested, IsOptional, IsBoolean, IsString, IsNumber } from "class-validator"
import { Type } from "class-transformer"

export class FeatureAssignmentDto {
  @ApiProperty({ description: "Feature ID" })
  @IsUUID()
  featureId: string

  @ApiProperty({ description: "Is this feature enabled for this plan", example: true })
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean

  @ApiProperty({ description: "Feature value (for numeric or text features)", example: "100" })
  @IsString()
  @IsOptional()
  value?: string

  @ApiProperty({ description: "Feature limit (for numeric features)", example: 100 })
  @IsNumber()
  @IsOptional()
  limit?: number

  @ApiProperty({ description: "Additional metadata", required: false })
  @IsOptional()
  metadata?: any
}

export class AssignFeaturesDto {
  @ApiProperty({ description: "Array of feature assignments", type: [FeatureAssignmentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureAssignmentDto)
  features: FeatureAssignmentDto[]
}
