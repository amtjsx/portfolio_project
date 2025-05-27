import { IsOptional, IsString, IsEnum, IsBoolean, IsUUID, IsArray, IsInt, Min, Max } from "class-validator"
import { Type } from "class-transformer"

export class BlogQueryDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsEnum(["draft", "published", "archived"])
  status?: "draft" | "published" | "archived"

  @IsOptional()
  @IsBoolean()
  featured?: boolean

  @IsOptional()
  @IsUUID()
  authorId?: string

  @IsOptional()
  @IsUUID()
  portfolioId?: string

  @IsOptional()
  @IsUUID()
  categoryId?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 10

  @IsOptional()
  @IsString()
  sortBy?: string = "createdAt"

  @IsOptional()
  @IsEnum(["asc", "desc"])
  sortOrder?: "asc" | "desc" = "desc"

  @IsOptional()
  @IsBoolean()
  withDeleted?: boolean = false

  @IsOptional()
  @IsBoolean()
  onlyDeleted?: boolean = false
}
