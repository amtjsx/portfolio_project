import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateBlogTagDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsOptional()
  @IsString()
  description?: string
}
