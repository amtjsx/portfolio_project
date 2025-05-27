import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUUID, IsOptional } from "class-validator"

export class ApplyCouponDto {
  @ApiProperty({ description: "Coupon code", example: "WELCOME20" })
  @IsString()
  code: string

  @ApiProperty({ description: "Plan ID to apply coupon to", example: "123e4567-e89b-12d3-a456-426614174000" })
  @IsUUID()
  @IsOptional()
  planId?: string
}
