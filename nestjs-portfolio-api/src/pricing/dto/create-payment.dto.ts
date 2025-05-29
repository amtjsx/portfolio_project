import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsOptional, IsIn, IsObject, IsUUID, Min, Length } from "class-validator"

export class CreatePaymentDto {

  @ApiProperty({ description: "Subscription ID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @IsUUID()
  @IsOptional()
  subscriptionId?: string

  @ApiProperty({ description: "Payment amount in cents", example: 1999 })
  @IsNumber()
  @Min(0)
  amount: number

  @ApiProperty({ description: "Currency code", example: "USD" })
  @IsString()
  @Length(3, 3)
  currency: string

  @ApiProperty({
    description: "Payment status",
    example: "succeeded",
    enum: ["pending", "processing", "succeeded", "failed", "refunded"],
  })
  @IsString()
  @IsIn(["pending", "processing", "succeeded", "failed", "refunded"])
  @IsOptional()
  status?: "pending" | "processing" | "succeeded" | "failed" | "refunded"

  @ApiProperty({ description: "Payment method", example: "card", enum: ["card", "paypal", "bank_transfer", "other"] })
  @IsString()
  @IsIn(["card", "paypal", "bank_transfer", "other"])
  @IsOptional()
  paymentMethod?: "card" | "paypal" | "bank_transfer" | "other"

  @ApiProperty({ description: "Payment description", example: "Subscription payment for Pro plan" })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: "External payment ID", required: false, example: "pi_1234567890" })
  @IsString()
  @IsOptional()
  externalPaymentId?: string

  @ApiProperty({ description: "Payment provider", required: false, example: "stripe" })
  @IsString()
  @IsOptional()
  paymentProvider?: string

  @ApiProperty({ description: "Receipt URL", required: false })
  @IsString()
  @IsOptional()
  receiptUrl?: string

  @ApiProperty({ description: "Invoice ID", required: false })
  @IsString()
  @IsOptional()
  invoiceId?: string

  @ApiProperty({ description: "Metadata for the payment", required: false })
  @IsObject()
  @IsOptional()
  metadata?: any
}
