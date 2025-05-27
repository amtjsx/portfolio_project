import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsNumber, Min, Max } from "class-validator"
import { ImageFormat, ImageSize } from "../models/image-variant.model"

export class GenerateVariantDto {
  @ApiProperty({
    description: "Image size",
    example: "medium",
    enum: ImageSize,
  })
  @IsEnum(ImageSize)
  size: ImageSize

  @ApiProperty({
    description: "Image format",
    example: "webp",
    enum: ImageFormat,
  })
  @IsEnum(ImageFormat)
  format: ImageFormat

  @ApiProperty({
    description: "Quality level (1-100)",
    example: 80,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  quality?: number
}
