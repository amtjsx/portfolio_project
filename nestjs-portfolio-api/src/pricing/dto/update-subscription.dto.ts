import { PartialType } from "@nestjs/mapped-types"
import { CreateSubscriptionDto } from "./create-subscription.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsISO8601 } from "class-validator"

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @ApiProperty({ description: "Cancellation date", required: false })
  @IsISO8601()
  @IsOptional()
  canceledAt?: string

  @ApiProperty({ description: "Cancellation reason", required: false })
  @IsString()
  @IsOptional()
  cancellationReason?: string
}
