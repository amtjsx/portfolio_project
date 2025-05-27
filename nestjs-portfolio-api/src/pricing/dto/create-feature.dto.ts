import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsBoolean, IsOptional, IsIn, IsNumber, IsObject, Length, Min } from "class-validator"

export class CreateFeatureDto {
  @ApiProperty({ description: "Feature name", example: "Custom Domain" })
  @IsString()
  @Length(2, 100)
  name: string

  @ApiProperty({ description: "Feature description", example: "Connect your own domain to your portfolio" })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: "Feature key for programmatic access", example: "custom_domain" })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  key?: string

  @ApiProperty({
    description: "Feature category",
    example: "branding",
    enum: ["core", "branding", "analytics", "support", "storage", "advanced"],
  })
  @IsString()
  @IsIn(["core", "branding", "analytics", "support", "storage", "advanced"])
  category: "core" | "branding" | "analytics" | "support" | "storage" | "advanced"

  @ApiProperty({ description: "Feature type", example: "boolean", enum: ["boolean", "numeric", "text"] })
  @IsString()
  @IsIn(["boolean", "numeric", "text"])
  type: "boolean" | "numeric" | "text"

  @ApiProperty({ description: "Icon name or URL", example: "globe" })
  @IsString()
  @IsOptional()
  icon?: string

  @ApiProperty({ description: "Sort order for display", example: 1 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sortOrder?: number

  @ApiProperty({ description: "Is this feature active", example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ApiProperty({ description: "Is this a premium feature", example: false })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean

  @ApiProperty({ description: "Feature metadata", required: false })
  @IsObject()
  @IsOptional()
  metadata?: any
}
