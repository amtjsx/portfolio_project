import { IsNotEmpty, IsUUID, IsArray } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ReorderEducationDto {
  @ApiProperty({ description: "User ID" })
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @ApiProperty({
    description: "Array of education IDs in the desired display order",
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID("4", { each: true })
  educationIds: string[]
}
