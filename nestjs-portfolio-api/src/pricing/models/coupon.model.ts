import { ApiProperty } from "@nestjs/swagger";
import {
  BeforeCreate,
  Column,
  DataType,
  DefaultScope,
  Scopes,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../../common/models/base.model";
import { Op } from "../../common/models/sequelize-imports";

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
      isActive: true,
      deletedAt: null,
      [Op.or]: [
        { expiresAt: null },
        { expiresAt: { [Op.gt]: new Date() } },
        { maxRedemptions: null },
        { redemptionCount: { [Op.lt]: Sequelize.col("maxRedemptions") } },
      ],
    },
  },
  expired: {
    where: {
      [Op.or]: [
        { expiresAt: { [Op.lt]: new Date() } },
        {
          [Op.and]: [
            { maxRedemptions: { [Op.ne]: null } },
            { redemptionCount: { [Op.gte]: Sequelize.col("maxRedemptions") } },
          ],
        },
      ],
      deletedAt: null,
    },
  },
}))
@Table({
  tableName: "coupons",
  timestamps: true,
  paranoid: true,
})
export class Coupon extends BaseModel<Coupon> {
  @ApiProperty({
    description: "Coupon UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ApiProperty({ description: "Coupon code", example: "WELCOME20" })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  code: string;

  @ApiProperty({
    description: "Coupon description",
    example: "20% off for new users",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    description: "Discount type",
    example: "percentage",
    enum: ["percentage", "fixed_amount"],
  })
  @Column({
    type: DataType.ENUM("percentage", "fixed_amount"),
    allowNull: false,
    defaultValue: "percentage",
  })
  discountType: "percentage" | "fixed_amount";

  @ApiProperty({ description: "Discount value", example: 20 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discountValue: number;

  @ApiProperty({
    description: "Currency code (for fixed amount discounts)",
    example: "USD",
  })
  @Column({
    type: DataType.STRING(3),
    allowNull: true,
  })
  currency: string;

  @ApiProperty({
    description: "Maximum discount amount in cents (for percentage discounts)",
    example: 5000,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  maxDiscountAmount: number;

  @ApiProperty({
    description: "Minimum purchase amount in cents",
    example: 1000,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  minPurchaseAmount: number;

  @ApiProperty({ description: "Is this coupon active", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;

  @ApiProperty({ description: "Expiration date", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expiresAt: Date;

  @ApiProperty({
    description: "Maximum number of redemptions",
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  maxRedemptions: number;

  @ApiProperty({ description: "Current redemption count", example: 0 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  redemptionCount: number;

  @ApiProperty({ description: "Applicable plan IDs", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  applicablePlanIds: string[];

  @ApiProperty({ description: "First-time users only", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  firstTimeOnly: boolean;

  @ApiProperty({ description: "Metadata for the coupon", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any;

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Coupon) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }
}
