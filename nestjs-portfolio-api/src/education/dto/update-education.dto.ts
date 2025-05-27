import { PartialType, OmitType } from "@nestjs/swagger"
import { CreateEducationDto } from "./create-education.dto"
import { IsOptional, IsUUID } from "class-validator"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class UpdateEducationDto extends PartialType(OmitType(CreateEducationDto, ["userId"] as const)) {
  @ApiPropertyOptional({ description: "Portfolio ID" })
  @IsOptional()
  @IsUUID()
  portfolioId?: string
}
