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
import { PricingPlan } from "./pricing.model"
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
  active: {
    where: {
      status: "active",
      deletedAt: null,
    },
  },
  canceled: {
    where: {
      status: "canceled",
      deletedAt: null,
    },
  },
  expired: {
    where: {
      status: "expired",
      deletedAt: null,
    },
  },
}))
@Table({
  tableName: "subscriptions",
  timestamps: true,
  paranoid: true,
})
export class Subscription extends BaseModel<Subscription> {
  @ApiProperty({ description: "Subscription UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "User ID who owns this subscription", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Pricing Plan ID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => PricingPlan)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  planId: string

  @ApiProperty({
    description: "Subscription status",
    example: "active",
    enum: ["active", "canceled", "expired", "past_due", "trialing", "unpaid"],
  })
  @Column({
    type: DataType.ENUM("active", "canceled", "expired", "past_due", "trialing", "unpaid"),
    allowNull: false,
    defaultValue: "active",
  })
  status: "active" | "canceled" | "expired" | "past_due" | "trialing" | "unpaid"

  @ApiProperty({ description: "Subscription start date", example: "2023-01-01T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  startDate: Date

  @ApiProperty({ description: "Subscription end date", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date

  @ApiProperty({ description: "Trial end date", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  trialEndDate: Date

  @ApiProperty({ description: "Cancellation date", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  canceledAt: Date

  @ApiProperty({ description: "Current period start", example: "2023-01-01T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  currentPeriodStart: Date

  @ApiProperty({ description: "Current period end", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  currentPeriodEnd: Date

  @ApiProperty({ description: "External subscription ID", required: false, example: "sub_1234567890" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  externalSubscriptionId: string

  @ApiProperty({ description: "Payment provider", required: false, example: "stripe" })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  paymentProvider: string

  @ApiProperty({ description: "Auto renew", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  autoRenew: boolean

  @ApiProperty({ description: "Cancellation reason", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  cancellationReason: string

  @ApiProperty({ description: "Metadata for the subscription", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Subscription) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => PricingPlan)
  plan: PricingPlan
}
