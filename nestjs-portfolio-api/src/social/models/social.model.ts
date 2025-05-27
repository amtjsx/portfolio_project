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
import { User } from "../../user/models/user.model"
import { Portfolio } from "../../portfolio/models/portfolio.model"
import { BaseModel } from "../../common/models/base.model"
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
}))
@Table({
  tableName: "social_links",
  timestamps: true,
  paranoid: true,
})
export class Social extends BaseModel<Social> {
  @ApiProperty({ description: "Social link UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "User ID who owns this social link", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Portfolio ID this social link belongs to", required: false })
  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  portfolioId: string

  @ApiProperty({
    description: "Social media platform",
    example: "linkedin",
    enum: [
      "linkedin",
      "github",
      "twitter",
      "instagram",
      "facebook",
      "youtube",
      "dribbble",
      "behance",
      "medium",
      "dev",
      "stackoverflow",
      "codepen",
      "discord",
      "telegram",
      "whatsapp",
      "tiktok",
      "snapchat",
      "pinterest",
      "reddit",
      "twitch",
      "spotify",
      "website",
      "blog",
      "other",
    ],
  })
  @Column({
    type: DataType.ENUM(
      "linkedin",
      "github",
      "twitter",
      "instagram",
      "facebook",
      "youtube",
      "dribbble",
      "behance",
      "medium",
      "dev",
      "stackoverflow",
      "codepen",
      "discord",
      "telegram",
      "whatsapp",
      "tiktok",
      "snapchat",
      "pinterest",
      "reddit",
      "twitch",
      "spotify",
      "website",
      "blog",
      "other",
    ),
    allowNull: false,
  })
  platform:
    | "linkedin"
    | "github"
    | "twitter"
    | "instagram"
    | "facebook"
    | "youtube"
    | "dribbble"
    | "behance"
    | "medium"
    | "dev"
    | "stackoverflow"
    | "codepen"
    | "discord"
    | "telegram"
    | "whatsapp"
    | "tiktok"
    | "snapchat"
    | "pinterest"
    | "reddit"
    | "twitch"
    | "spotify"
    | "website"
    | "blog"
    | "other"

  @ApiProperty({ description: "Social media profile URL", example: "https://linkedin.com/in/johndoe" })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  })
  url: string

  @ApiProperty({ description: "Display label for the social link", example: "Professional LinkedIn" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  label: string

  @ApiProperty({ description: "Username or handle on the platform", example: "johndoe" })
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  username: string

  @ApiProperty({ description: "Custom icon URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  iconUrl: string

  @ApiProperty({ description: "Display order for sorting", example: 1 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  displayOrder: number

  @ApiProperty({ description: "Whether the link is active/visible", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean

  @ApiProperty({ description: "Whether to show in main navigation", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  showInNav: boolean

  @ApiProperty({ description: "Whether to open link in new tab", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  openInNewTab: boolean

  @ApiProperty({ description: "Link description or bio", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @ApiProperty({ description: "Follower count (if applicable)", required: false })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  })
  followerCount: number

  @ApiProperty({ description: "Last activity date on the platform", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastActiveAt: Date

  @ApiProperty({ description: "Link verification status", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isVerified: boolean

  @ApiProperty({ description: "Click tracking count", example: 0 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  })
  clickCount: number

  @ApiProperty({ description: "Additional metadata", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: {
    profilePicture?: string
    bio?: string
    location?: string
    website?: string
    joinDate?: string
    isBusinessAccount?: boolean
    customFields?: Record<string, any>
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

  @ApiProperty({ description: "Deletion timestamp", example: "2024-01-01T00:00:00.000Z" })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Social) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio
}
