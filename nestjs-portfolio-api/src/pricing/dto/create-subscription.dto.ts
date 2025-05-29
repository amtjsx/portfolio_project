import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsIn,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateSubscriptionDto {
  @ApiProperty({
    description: "Pricing Plan ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  planId: string;

  @ApiProperty({
    description: "Subscription status",
    example: "active",
    enum: ["active", "canceled", "expired", "past_due", "trialing", "unpaid"],
  })
  @IsString()
  @IsIn(["active", "canceled", "expired", "past_due", "trialing", "unpaid"])
  @IsOptional()
  status?:
    | "active"
    | "canceled"
    | "expired"
    | "past_due"
    | "trialing"
    | "unpaid";

  @ApiProperty({
    description: "Subscription start date",
    example: "2023-01-01T00:00:00.000Z",
  })
  @IsISO8601()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ description: "Subscription end date", required: false })
  @IsISO8601()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ description: "Trial end date", required: false })
  @IsISO8601()
  @IsOptional()
  trialEndDate?: string;

  @ApiProperty({
    description: "Current period start",
    example: "2023-01-01T00:00:00.000Z",
  })
  @IsISO8601()
  @IsOptional()
  currentPeriodStart?: string;

  @ApiProperty({ description: "Current period end", required: false })
  @IsISO8601()
  @IsOptional()
  currentPeriodEnd?: string;

  @ApiProperty({
    description: "External subscription ID",
    required: false,
    example: "sub_1234567890",
  })
  @IsString()
  @IsOptional()
  externalSubscriptionId?: string;

  @ApiProperty({
    description: "Payment provider",
    required: false,
    example: "stripe",
  })
  @IsString()
  @IsOptional()
  paymentProvider?: string;

  @ApiProperty({ description: "Auto renew", example: true })
  @IsBoolean()
  @IsOptional()
  autoRenew?: boolean;

  @ApiProperty({
    description: "Metadata for the subscription",
    required: false,
  })
  @IsObject()
  @IsOptional()
  metadata?: any;
}
