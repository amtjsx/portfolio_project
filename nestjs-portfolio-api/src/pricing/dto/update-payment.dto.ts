import { PartialType } from "@nestjs/mapped-types"
import { CreatePaymentDto } from "./create-payment.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional, Min } from "class-validator"

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ description: "Refund ID", required: false })
  @IsString()
  @IsOptional()
  refundId?: string

  @ApiProperty({ description: "Refund reason", required: false })
  @IsString()
  @IsOptional()
  refundReason?: string

  @ApiProperty({ description: "Refund amount in cents", required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  refundAmount?: number
}
