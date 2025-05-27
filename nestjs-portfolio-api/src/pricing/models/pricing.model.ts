import {
  Table,
  Column,
  DataType,
  HasMany,
  BeforeCreate,
  DefaultScope,
  Scopes,
  BelongsToMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../../common/models/base.model";
import { Portfolio } from "../../portfolio/models/portfolio.model";
import { Op } from "../../common/models/sequelize-imports";
import { Feature } from "./feature.model";
import { PricingFeature } from "./pricing-feature.model";

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
    },
  },
  featured: {
    where: {
      isFeatured: true,
      isActive: true,
      deletedAt: null,
    },
  },
}))
@Table({
  tableName: "pricing_plans",
  timestamps: true,
  paranoid: true,
})
export class PricingPlan extends BaseModel<PricingPlan> {
  @ApiProperty({
    description: "Pricing Plan UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ApiProperty({ description: "Pricing plan name", example: "Basic" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: "Pricing plan description",
    example: "Perfect for beginners",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ description: "Price amount in cents", example: 1999 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @ApiProperty({ description: "Currency code", example: "USD" })
  @Column({
    type: DataType.STRING(3),
    allowNull: false,
    defaultValue: "USD",
  })
  currency: string;

  @ApiProperty({
    description: "Billing interval",
    example: "month",
    enum: ["month", "year", "one-time"],
  })
  @Column({
    type: DataType.ENUM("month", "year", "one-time"),
    allowNull: false,
    defaultValue: "month",
  })
  billingInterval: "month" | "year" | "one-time";

  @ApiProperty({ description: "Trial period in days", example: 14 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  trialPeriodDays: number;

  @ApiProperty({ description: "Features included in this plan" })
  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  features: string[];

  @ApiProperty({ description: "Plan limits and quotas" })
  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      portfolios: 1,
      projects: 10,
      storage: 100, // MB
      customDomain: false,
      analytics: false,
      removeWatermark: false,
      prioritySupport: false,
    },
  })
  limits: {
    portfolios: number;
    projects: number;
    storage: number;
    customDomain: boolean;
    analytics: boolean;
    removeWatermark: boolean;
    prioritySupport: boolean;
    [key: string]: any;
  };

  @ApiProperty({
    description: "Plan tier",
    example: "basic",
    enum: ["free", "basic", "pro", "enterprise", "custom"],
  })
  @Column({
    type: DataType.ENUM("free", "basic", "pro", "enterprise", "custom"),
    allowNull: false,
    defaultValue: "basic",
  })
  tier: "free" | "basic" | "pro" | "enterprise" | "custom";

  @ApiProperty({ description: "Sort order for display", example: 1 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  sortOrder: number;

  @ApiProperty({ description: "Is this plan active", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;

  @ApiProperty({ description: "Is this plan featured", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isFeatured: boolean;

  @ApiProperty({ description: "Is this a custom plan", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isCustom: boolean;

  @ApiProperty({ description: "Discount percentage", example: 0 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  discountPercentage: number;

  @ApiProperty({
    description: "Original price before discount in cents",
    example: 2999,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  originalPrice: number;

  @ApiProperty({ description: "Discount valid until date", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  discountValidUntil: Date;

  @ApiProperty({
    description: "External payment provider plan ID",
    required: false,
    example: "price_1234567890",
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  externalPlanId: string;

  @ApiProperty({
    description: "Payment provider",
    required: false,
    example: "stripe",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  paymentProvider: string;

  @ApiProperty({ description: "Metadata for the plan", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any;

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: PricingPlan) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }

  @BelongsToMany(() => Feature, () => PricingFeature)
  feature: Feature[];
}
