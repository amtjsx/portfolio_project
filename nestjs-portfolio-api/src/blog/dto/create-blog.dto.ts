import { IsNotEmpty, IsString, IsOptional, IsEnum, IsBoolean, IsArray, IsUUID, IsObject } from "class-validator"

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsOptional()
  @IsString()
  excerpt?: string

  @IsOptional()
  @IsString()
  featuredImage?: string

  @IsOptional()
  @IsEnum(["draft", "published", "archived"])
  status?: "draft" | "published" | "archived"

  @IsOptional()
  @IsBoolean()
  featured?: boolean

  @IsOptional()
  @IsUUID()
  categoryId?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[]

  @IsOptional()
  @IsObject()
  seoMetadata?: Record<string, any>

  @IsNotEmpty()
  @IsUUID()
  portfolioId: string
}
