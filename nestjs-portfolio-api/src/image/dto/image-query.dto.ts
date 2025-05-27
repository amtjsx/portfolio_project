import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsString, IsUUID, IsBoolean, IsDate } from "class-validator"
import { Type } from "class-transformer"
import { ImageCategory } from "../models/image.model"

export class ImageQueryDto {
  @ApiProperty({
    description: "User ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  @IsUUID(4)
  @IsOptional()
  userId?: string

  @ApiProperty({
    description: "Image category",
    example: "avatar",
    enum: ImageCategory,
    required: false,
  })
  @IsEnum(ImageCategory)
  @IsOptional()
  category?: ImageCategory

  @ApiProperty({
    description: "Search term for title, alt text, caption, or description",
    example: "profile",
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string

  @ApiProperty({
    description: "Filter by tags (comma-separated)",
    example: "profile,headshot",
    required: false,
  })
  @IsString()
  @IsOptional()
  tags?: string

  @ApiProperty({
    description: "Whether image is public",
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean

  @ApiProperty({
    description: "Created after date",
    example: "2024-01-01T00:00:00.000Z",
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAfter?: Date

  @ApiProperty({
    description: "Created before date",
    example: "2024-01-01T00:00:00.000Z",
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdBefore?: Date

  @ApiProperty({
    description: "Include soft-deleted images",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  includeDeleted?: boolean

  @ApiProperty({
    description: "Page number",
    example: 1,
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  page?: number = 1

  @ApiProperty({
    description: "Items per page",
    example: 10,
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10
}
