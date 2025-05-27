import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsIn,
  IsArray,
  IsISO8601,
  IsUUID,
  Min,
  Length,
} from "class-validator"

export class CreateCouponDto {
  @ApiProperty({ description: "Coupon code", example: "WELCOME20" })
  @IsString()
  @Length(3, 50)
  code: string

  @ApiProperty({ description: "Coupon description", example: "20% off for new users" })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: "Discount type", example: "percentage", enum: ["percentage", "fixed_amount"] })
  @IsString()
  @IsIn(["percentage", "fixed_amount"])
  discountType: "percentage" | "fixed_amount"

  @ApiProperty({ description: "Discount value", example: 20 })
  @IsNumber()
  @Min(0)
  discountValue: number

  @ApiProperty({ description: "Currency code (for fixed amount discounts)", example: "USD" })
  @IsString()
  @Length(3, 3)
  @IsOptional()
  currency?: string

  @ApiProperty({ description: "Maximum discount amount in cents (for percentage discounts)", example: 5000 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxDiscountAmount?: number

  @ApiProperty({ description: "Minimum purchase amount in cents", example: 1000 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPurchaseAmount?: number

  @ApiProperty({ description: "Is this coupon active", example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ApiProperty({ description: "Expiration date", required: false })
  @IsISO8601()
  @IsOptional()
  expiresAt?: string

  @ApiProperty({ description: "Maximum number of redemptions", required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  maxRedemptions?: number

  @ApiProperty({ description: "Applicable plan IDs", required: false })
  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  applicablePlanIds?: string[]

  @ApiProperty({ description: "First-time users only", example: false })
  @IsBoolean()
  @IsOptional()
  firstTimeOnly?: boolean

  @ApiProperty({ description: "Metadata for the coupon", required: false })
  @IsOptional()
  metadata?: any
}
