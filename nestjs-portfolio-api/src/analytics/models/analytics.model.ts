import { ApiProperty } from "@nestjs/swagger"
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Scopes,
  Table,
} from "sequelize-typescript"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "../../common/models/base.model"
import { Op } from "../../common/models/sequelize-imports"
import { Portfolio } from "../../portfolio/models/portfolio.model"
import { User } from "../../user/models/user.model"

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
  tableName: "analytics",
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      fields: ["portfolio_id", "created_at"],
    },
    {
      fields: ["visitor_id", "created_at"],
    },
    {
      fields: ["page_path", "created_at"],
    },
    {
      fields: ["referrer_domain", "created_at"],
    },
  ],
})
export class Analytics extends BaseModel<Analytics> {
  @ApiProperty({ description: "Analytics record UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "Portfolio ID being tracked", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  portfolioId: string

  @ApiProperty({ description: "Average time spent on page in seconds", example: 45 })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  })
  avgTime: number

  @ApiProperty({ description: "User ID who owns the portfolio", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Unique visitor identifier", example: "visitor_123456789" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  visitorId: string

  @ApiProperty({ description: "Session identifier", example: "session_987654321" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sessionId: string

  @ApiProperty({ description: "Page path visited", example: "/projects" })
  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  pagePath: string

  @ApiProperty({ description: "Page title", example: "My Projects - John Doe Portfolio" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pageTitle: string

  @ApiProperty({ description: "Referrer URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  referrer: string

  @ApiProperty({ description: "Referrer domain", example: "google.com" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referrerDomain: string

  @ApiProperty({ description: "User agent string" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  userAgent: string

  @ApiProperty({ description: "Visitor's IP address", example: "192.168.1.1" })
  @Column({
    type: DataType.INET,
    allowNull: true,
  })
  ipAddress: string

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

  @ApiProperty({ description: "Device type", example: "desktop", enum: ["desktop", "mobile", "tablet"] })
  @Column({
    type: DataType.ENUM("desktop", "mobile", "tablet"),
    allowNull: true,
  })
  deviceType: "desktop" | "mobile" | "tablet"

  @ApiProperty({ description: "Operating system", example: "Windows 10" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  operatingSystem: string

  @ApiProperty({ description: "Browser name", example: "Chrome" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  browser: string

  @ApiProperty({ description: "Browser version", example: "91.0.4472.124" })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  browserVersion: string

  @ApiProperty({ description: "Screen resolution", example: "1920x1080" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  screenResolution: string

  @ApiProperty({ description: "Language preference", example: "en-US" })
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  language: string

  @ApiProperty({ description: "Time zone", example: "America/New_York" })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  timezone: string

  @ApiProperty({ description: "Time spent on page in seconds", example: 45 })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  })
  timeOnPage: number

  @ApiProperty({ description: "Scroll depth percentage", example: 75 })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  })
  scrollDepth: number

  @ApiProperty({ description: "Whether visitor is a bot", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isBot: boolean

  @ApiProperty({ description: "Whether this is a unique visitor", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isUniqueVisitor: boolean

  @ApiProperty({ description: "Whether this is a returning visitor", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isReturningVisitor: boolean

  @ApiProperty({ description: "UTM source parameter", example: "google" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  utmSource: string

  @ApiProperty({ description: "UTM medium parameter", example: "cpc" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  utmMedium: string

  @ApiProperty({ description: "UTM campaign parameter", example: "portfolio_campaign" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  utmCampaign: string

  @ApiProperty({ description: "UTM term parameter", example: "web developer" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  utmTerm: string

  @ApiProperty({ description: "UTM content parameter", example: "header_link" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  utmContent: string

  @ApiProperty({ description: "Additional custom data", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  customData: {
    exitPage?: boolean
    bounceRate?: number
    conversionGoal?: string
    experimentVariant?: string
    customDimensions?: Record<string, any>
  }

  @ApiProperty({ description: "Visit timestamp", example: "2024-01-01T00:00:00.000Z" })
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

  @ApiProperty({ description: "Deletion timestamp", example: "2024-01-01T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Analytics) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => Portfolio)
  portfolio: Portfolio

  @BelongsTo(() => User)
  user: User
}
