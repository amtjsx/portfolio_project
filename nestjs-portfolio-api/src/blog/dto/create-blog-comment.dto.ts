import { IsNotEmpty, IsString, IsOptional, IsUUID } from "class-validator"

export class CreateBlogCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsUUID()
  blogId: string

  @IsOptional()
  @IsUUID()
  parentId?: string
}
