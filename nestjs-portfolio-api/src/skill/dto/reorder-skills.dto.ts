import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsUUID, ArrayMinSize } from "class-validator"

export class ReorderSkillsDto {
  @ApiProperty({
    description: "Ordered array of skill IDs",
    type: [String],
  })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(1)
  skillIds: string[]
}
