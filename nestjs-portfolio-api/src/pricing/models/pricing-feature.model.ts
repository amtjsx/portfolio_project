import { Table, Column, DataType, ForeignKey, BelongsTo, BeforeCreate, DefaultScope } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "../../common/models/base.model"
import { PricingPlan } from "./pricing.model"
import { Feature } from "./feature.model"

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
}))
@Table({
  tableName: "pricing_features",
  timestamps: true,
  paranoid: true,
})
export class PricingFeature extends BaseModel<PricingFeature> {
  @ApiProperty({ description: "Pricing Feature UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "Pricing Plan ID" })
  @ForeignKey(() => PricingPlan)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  pricingPlanId: string

  @ApiProperty({ description: "Feature ID" })
  @ForeignKey(() => Feature)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  featureId: string

  @ApiProperty({ description: "Feature value (for numeric or text features)", example: "100" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  value: string

  @ApiProperty({ description: "Is this feature enabled for this plan", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isEnabled: boolean

  @ApiProperty({ description: "Feature limit (for numeric features)", example: 100 })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  limit: number

  @ApiProperty({ description: "Additional metadata for this feature-plan combination", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: PricingFeature) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => PricingPlan)
  pricingPlan: PricingPlan

  @BelongsTo(() => Feature)
  feature: Feature
}
