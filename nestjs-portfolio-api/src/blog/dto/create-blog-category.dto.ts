import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateBlogCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  icon?: string
}
