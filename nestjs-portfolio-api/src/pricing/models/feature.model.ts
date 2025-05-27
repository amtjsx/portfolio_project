import { Table, Column, DataType, BelongsToMany, BeforeCreate, DefaultScope, Scopes } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "../../common/models/base.model"
import { PricingPlan } from "./pricing.model"
import { PricingFeature } from "./pricing-feature.model"
import { Op } from "../../common/models/sequelize-imports"

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
  order: [
    ["sortOrder", "ASC"],
    ["name", "ASC"],
  ],
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
}))
@Table({
  tableName: "features",
  timestamps: true,
  paranoid: true,
})
export class Feature extends BaseModel<Feature> {
  @ApiProperty({ description: "Feature UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "Feature name", example: "Custom Domain" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string

  @ApiProperty({ description: "Feature description", example: "Connect your own domain to your portfolio" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @ApiProperty({ description: "Feature key for programmatic access", example: "custom_domain" })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  key: string

  @ApiProperty({
    description: "Feature category",
    example: "branding",
    enum: ["core", "branding", "analytics", "support", "storage", "advanced"],
  })
  @Column({
    type: DataType.ENUM("core", "branding", "analytics", "support", "storage", "advanced"),
    allowNull: false,
    defaultValue: "core",
  })
  category: "core" | "branding" | "analytics" | "support" | "storage" | "advanced"

  @ApiProperty({ description: "Feature type", example: "boolean", enum: ["boolean", "numeric", "text"] })
  @Column({
    type: DataType.ENUM("boolean", "numeric", "text"),
    allowNull: false,
    defaultValue: "boolean",
  })
  type: "boolean" | "numeric" | "text"

  @ApiProperty({ description: "Icon name or URL", example: "globe" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  icon: string

  @ApiProperty({ description: "Sort order for display", example: 1 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  sortOrder: number

  @ApiProperty({ description: "Is this feature active", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean

  @ApiProperty({ description: "Is this a premium feature", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isPremium: boolean

  @ApiProperty({ description: "Feature metadata", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Feature) {
    if (!instance.id) {
      instance.id = uuidv4()
    }

    // Generate key from name if not provided
    if (!instance.key && instance.name) {
      instance.key = instance.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "")
    }
  }

  // Associations
  @BelongsToMany(
    () => PricingPlan,
    () => PricingFeature,
  )
  pricingPlans: PricingPlan[]
}
