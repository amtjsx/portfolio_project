import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsIn,
  IsObject,
  IsArray,
  IsISO8601,
  Min,
  Max,
  Length,
  ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"

export class PlanLimitsDto {
  @ApiProperty({ description: "Number of portfolios allowed", example: 1 })
  @IsNumber()
  @Min(0)
  portfolios: number

  @ApiProperty({ description: "Number of projects allowed", example: 10 })
  @IsNumber()
  @Min(0)
  projects: number

  @ApiProperty({ description: "Storage limit in MB", example: 100 })
  @IsNumber()
  @Min(0)
  storage: number

  @ApiProperty({ description: "Allow custom domain", example: false })
  @IsBoolean()
  customDomain: boolean

  @ApiProperty({ description: "Include analytics", example: false })
  @IsBoolean()
  analytics: boolean

  @ApiProperty({ description: "Remove watermark", example: false })
  @IsBoolean()
  removeWatermark: boolean

  @ApiProperty({ description: "Priority support", example: false })
  @IsBoolean()
  prioritySupport: boolean
}

export class CreatePricingPlanDto {
  @ApiProperty({ description: "Pricing plan name", example: "Basic" })
  @IsString()
  @Length(2, 100)
  name: string

  @ApiProperty({ description: "Pricing plan description", example: "Perfect for beginners" })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: "Price amount in cents", example: 1999 })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ description: "Currency code", example: "USD" })
  @IsString()
  @Length(3, 3)
  currency: string

  @ApiProperty({ description: "Billing interval", example: "month", enum: ["month", "year", "one-time"] })
  @IsString()
  @IsIn(["month", "year", "one-time"])
  billingInterval: "month" | "year" | "one-time"

  @ApiProperty({ description: "Trial period in days", example: 14 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  trialPeriodDays?: number

  @ApiProperty({ description: "Features included in this plan", example: ["Custom domain", "Priority support"] })
  @IsArray()
  @IsString({ each: true })
  features: string[]

  @ApiProperty({
    description: "Plan limits and quotas",
    type: PlanLimitsDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => PlanLimitsDto)
  limits: PlanLimitsDto

  @ApiProperty({ description: "Plan tier", example: "basic", enum: ["free", "basic", "pro", "enterprise", "custom"] })
  @IsString()
  @IsIn(["free", "basic", "pro", "enterprise", "custom"])
  tier: "free" | "basic" | "pro" | "enterprise" | "custom"

  @ApiProperty({ description: "Sort order for display", example: 1 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  sortOrder?: number

  @ApiProperty({ description: "Is this plan active", example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ApiProperty({ description: "Is this plan featured", example: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean

  @ApiProperty({ description: "Is this a custom plan", example: false })
  @IsBoolean()
  @IsOptional()
  isCustom?: boolean

  @ApiProperty({ description: "Discount percentage", example: 0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercentage?: number

  @ApiProperty({ description: "Original price before discount in cents", example: 2999 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  originalPrice?: number

  @ApiProperty({ description: "Discount valid until date", required: false })
  @IsISO8601()
  @IsOptional()
  discountValidUntil?: string

  @ApiProperty({ description: "External payment provider plan ID", required: false, example: "price_1234567890" })
  @IsString()
  @IsOptional()
  externalPlanId?: string

  @ApiProperty({ description: "Payment provider", required: false, example: "stripe" })
  @IsString()
  @IsOptional()
  paymentProvider?: string

  @ApiProperty({ description: "Metadata for the plan", required: false })
  @IsObject()
  @IsOptional()
  metadata?: any
}
