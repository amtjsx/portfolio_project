import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  DefaultScope,
  Scopes,
  HasMany,
} from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { v4 as uuidv4 } from "uuid"
import { User } from "../../user/models/user.model"
import { BaseModel } from "../../common/models/base.model"
import { Op } from "../../common/models/sequelize-imports"
import { ImageVariant } from "./image-variant.model"

export enum ImageCategory {
  AVATAR = "avatar",
  PORTFOLIO = "portfolio",
  PROJECT = "project",
  BLOG = "blog",
  GENERAL = "general",
}

export enum ImageStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  READY = "ready",
  FAILED = "failed",
}

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
  include: [
    {
      model: ImageVariant,
      as: "variants",
    },
  ],
}))
@Scopes(() => ({
  withDeleted: {
    where: {},
    include: [
      {
        model: ImageVariant,
        as: "variants",
      },
    ],
  },
  onlyDeleted: {
    where: {
      deletedAt: { [Op.ne]: null },
    },
  },
  withoutVariants: {
    where: {
      deletedAt: null,
    },
    include: [],
  },
}))
@Table({
  tableName: "images",
  timestamps: true,
  paranoid: true,
})
export class Image extends BaseModel<Image> {
  @ApiProperty({ description: "Image UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "User ID who uploaded this image", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Original file name", example: "my-profile-photo.jpg" })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  originalName: string

  @ApiProperty({ description: "Stored file name", example: "image-1234567890-123456789.jpg" })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  filename: string

  @ApiProperty({ description: "File path", example: "./uploads/images/image-1234567890-123456789.jpg" })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  path: string

  @ApiProperty({ description: "File MIME type", example: "image/jpeg" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  mimetype: string

  @ApiProperty({ description: "File size in bytes", example: 1024000 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  size: number

  @ApiProperty({
    description: "Image category",
    example: "avatar",
    enum: Object.values(ImageCategory),
  })
  @Column({
    type: DataType.ENUM(...Object.values(ImageCategory)),
    allowNull: false,
    defaultValue: ImageCategory.GENERAL,
  })
  category: ImageCategory

  @ApiProperty({
    description: "Image status",
    example: "ready",
    enum: Object.values(ImageStatus),
  })
  @Column({
    type: DataType.ENUM(...Object.values(ImageStatus)),
    allowNull: false,
    defaultValue: ImageStatus.PENDING,
  })
  status: ImageStatus

  @ApiProperty({ description: "Image width in pixels", example: 1920 })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  width: number

  @ApiProperty({ description: "Image height in pixels", example: 1080 })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  height: number

  @ApiProperty({ description: "Image title", example: "My Profile Photo" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  title: string

  @ApiProperty({ description: "Image alt text", example: "A professional headshot of John Doe" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  altText: string

  @ApiProperty({ description: "Image caption", example: "John Doe, Software Engineer" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  caption: string

  @ApiProperty({ description: "Image description", example: "Professional headshot taken in 2023" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @ApiProperty({ description: "Image focal point X (0-1)", example: 0.5 })
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 1,
    },
  })
  focalPointX: number

  @ApiProperty({ description: "Image focal point Y (0-1)", example: 0.5 })
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 1,
    },
  })
  focalPointY: number

  @ApiProperty({ description: "Image dominant color", example: "#336699" })
  @Column({
    type: DataType.STRING(7),
    allowNull: true,
  })
  dominantColor: string

  @ApiProperty({ description: "Image tags", example: ["profile", "headshot"] })
  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: [],
  })
  tags: string[]

  @ApiProperty({ description: "Image metadata", example: { camera: "iPhone 13", iso: 100 } })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: Record<string, any>

  @ApiProperty({ description: "Public URL", example: "/api/images/123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  url: string

  @ApiProperty({ description: "Whether image is public", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isPublic: boolean

  @ApiProperty({ description: "Upload timestamp", example: "2024-01-01T00:00:00.000Z" })
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
  static async generateUuid(instance: Image) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User

  @HasMany(() => ImageVariant)
  variants: ImageVariant[]
}
