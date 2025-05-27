import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  DefaultScope,
  Scopes,
} from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "../../common/models/base.model"
import { User } from "../../user/models/user.model"
import { Subscription } from "./subscription.model"
import { Op } from "../../common/models/sequelize-imports"

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
}))
@Scopes(() => ({
  withDeleted: {
    where: {},
  },
  onlyDeleted: {
    where: {
      deletedAt: { [Op.ne]: null },
    },
  },
  successful: {
    where: {
      status: "succeeded",
      deletedAt: null,
    },
  },
  failed: {
    where: {
      status: "failed",
      deletedAt: null,
    },
  },
}))
@Table({
  tableName: "payments",
  timestamps: true,
  paranoid: true,
})
export class Payment extends BaseModel<Payment> {
  @ApiProperty({ description: "Payment UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "User ID who made this payment", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Subscription ID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => Subscription)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  subscriptionId: string

  @ApiProperty({ description: "Payment amount in cents", example: 1999 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number

  @ApiProperty({ description: "Currency code", example: "USD" })
  @Column({
    type: DataType.STRING(3),
    allowNull: false,
    defaultValue: "USD",
  })
  currency: string

  @ApiProperty({
    description: "Payment status",
    example: "succeeded",
    enum: ["pending", "processing", "succeeded", "failed", "refunded"],
  })
  @Column({
    type: DataType.ENUM("pending", "processing", "succeeded", "failed", "refunded"),
    allowNull: false,
    defaultValue: "pending",
  })
  status: "pending" | "processing" | "succeeded" | "failed" | "refunded"

  @ApiProperty({ description: "Payment method", example: "card", enum: ["card", "paypal", "bank_transfer", "other"] })
  @Column({
    type: DataType.ENUM("card", "paypal", "bank_transfer", "other"),
    allowNull: false,
    defaultValue: "card",
  })
  paymentMethod: "card" | "paypal" | "bank_transfer" | "other"

  @ApiProperty({ description: "Payment description", example: "Subscription payment for Pro plan" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @ApiProperty({ description: "External payment ID", required: false, example: "pi_1234567890" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  externalPaymentId: string

  @ApiProperty({ description: "Payment provider", required: false, example: "stripe" })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  paymentProvider: string

  @ApiProperty({ description: "Receipt URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  receiptUrl: string

  @ApiProperty({ description: "Invoice ID", required: false })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  invoiceId: string

  @ApiProperty({ description: "Refund ID", required: false })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  refundId: string

  @ApiProperty({ description: "Refund reason", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  refundReason: string

  @ApiProperty({ description: "Refund amount in cents", required: false })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  refundAmount: number

  @ApiProperty({ description: "Metadata for the payment", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Payment) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Subscription)
  subscription: Subscription
}
