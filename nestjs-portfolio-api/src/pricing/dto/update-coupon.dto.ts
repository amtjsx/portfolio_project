import { PartialType } from "@nestjs/mapped-types"
import { CreateCouponDto } from "./create-coupon.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, Min } from "class-validator"

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @ApiProperty({ description: "Current redemption count", example: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  redemptionCount?: number
}
