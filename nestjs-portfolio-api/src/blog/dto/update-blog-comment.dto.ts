import { IsOptional, IsString, IsBoolean } from "class-validator"

export class UpdateBlogCommentDto {
  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsBoolean()
  approved?: boolean
}
