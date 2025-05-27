import { ApiProperty } from "@nestjs/swagger"
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Scopes,
  Table,
} from "sequelize-typescript"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "../../common/models/base.model"
import { Op } from "../../common/models/sequelize-imports"
import { Portfolio } from "../../portfolio/models/portfolio.model"
import { User } from "../../user/models/user.model"
import { Analytics } from "./analytics.model"

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
}))
@Table({
  tableName: "visitors",
  timestamps: true,
  paranoid: true,
})
export class Visitor extends BaseModel<Visitor> {
  @ApiProperty({ description: "Visitor record UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "Unique visitor identifier", example: "visitor_123456789" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  visitorId: string

  @ApiProperty({ description: "Portfolio ID first visited", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  portfolioId: string

  @ApiProperty({ description: "User ID who owns the portfolio", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  userId: string

  @ApiProperty({ description: "First visit timestamp", example: "2024-01-01T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  firstVisit: Date

  @ApiProperty({ description: "Last visit timestamp", example: "2024-01-15T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  lastVisit: Date

  @ApiProperty({ description: "Total number of visits", example: 5 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  })
  visitCount: number

  @ApiProperty({ description: "Total page views", example: 25 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  })
  pageViews: number

  @ApiProperty({ description: "Total time spent in seconds", example: 1200 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  })
  totalTimeSpent: number

  @ApiProperty({ description: "First referrer URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  firstReferrer: string

  @ApiProperty({ description: "Last referrer URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  lastReferrer: string

  @ApiProperty({ description: "First landing page", example: "/" })
  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  firstLandingPage: string

  @ApiProperty({ description: "Last landing page", example: "/projects" })
  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  lastLandingPage: string

  @ApiProperty({ description: "Visitor's country", example: "United States" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  country: string

  @ApiProperty({ description: "Visitor's region/state", example: "California" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  region: string

  @ApiProperty({ description: "Visitor's city", example: "San Francisco" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  city: string

  @ApiProperty({ description: "Primary device type", example: "desktop" })
  @Column({
    type: DataType.ENUM("desktop", "mobile", "tablet"),
    allowNull: true,
  })
  primaryDevice: "desktop" | "mobile" | "tablet"

  @ApiProperty({ description: "Primary browser", example: "Chrome" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  primaryBrowser: string

  @ApiProperty({ description: "Primary operating system", example: "Windows 10" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  primaryOS: string

  @ApiProperty({ description: "Whether visitor is identified as bot", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isBot: boolean

  @ApiProperty({ description: "Visitor engagement score", example: 75 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100,
    },
  })
  engagementScore: number

  @ApiProperty({ description: "Additional visitor metadata", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: {
    tags?: string[]
    segments?: string[]
    preferences?: Record<string, any>
    customAttributes?: Record<string, any>
  }

  @ApiProperty({ description: "Creation timestamp", example: "2024-01-01T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date

  @ApiProperty({ description: "Last update timestamp", example: "2024-01-01T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date

  @ApiProperty({ description: "Deletion timestamp", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Visitor) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => Portfolio)
  portfolio: Portfolio

  @BelongsTo(() => User)
  user: User

  @HasMany(() => Analytics, { foreignKey: "visitorId", sourceKey: "visitorId" })
  analytics: Analytics[]
}
