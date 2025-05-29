import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { ImageCategory } from "../models/image.model";

export class CreateImageDto {
  @ApiProperty({
    description: "Image category",
    example: "avatar",
    enum: ImageCategory,
    default: ImageCategory.GENERAL,
  })
  @IsEnum(ImageCategory)
  @IsOptional()
  category?: ImageCategory;

  @ApiProperty({
    description: "Image title",
    example: "My Profile Photo",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: "Image alt text",
    example: "A professional headshot of John Doe",
    required: false,
  })
  @IsString()
  @IsOptional()
  altText?: string;

  @ApiProperty({
    description: "Image caption",
    example: "John Doe, Software Engineer",
    required: false,
  })
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiProperty({
    description: "Image description",
    example: "Professional headshot taken in 2023",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Image focal point X (0-1)",
    example: 0.5,
    required: false,
  })
  // @Min(0)
  // @Max(1)
  @IsOptional()
  focalPointX?: number;

  @ApiProperty({
    description: "Image focal point Y (0-1)",
    example: 0.5,
    required: false,
  })
  // @Min(0)
  // @Max(1)
  @IsOptional()
  focalPointY?: number;

  @ApiProperty({
    description: "Image tags",
    example: ["profile", "headshot"],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  // @ApiProperty({
  //   description: "Whether image is public",
  //   example: true,
  //   default: true,
  // })
  // @IsBoolean()
  // @IsOptional()
  // isPublic?: boolean;

  @ApiProperty({
    description: "Generate variants automatically",
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  generateVariants?: boolean;
}
