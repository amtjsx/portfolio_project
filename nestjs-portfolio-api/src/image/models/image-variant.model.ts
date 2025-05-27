import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  DefaultScope,
  Scopes,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../../common/models/base.model";
import { Op } from "../../common/models/sequelize-imports";
import { Image } from "./image.model";

export enum ImageFormat {
  JPEG = "jpeg",
  PNG = "png",
  WEBP = "webp",
  AVIF = "avif",
  GIF = "gif",
}

export enum ImageSize {
  THUMBNAIL = "thumbnail", // 150x150
  SMALL = "small", // 300x300
  MEDIUM = "medium", // 600x600
  LARGE = "large", // 1200x1200
  ORIGINAL = "original", // Original size
}

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
  tableName: "image_variants",
  timestamps: true,
  paranoid: true,
})
export class ImageVariant extends BaseModel<ImageVariant> {
  @ApiProperty({
    description: "Image variant UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ApiProperty({
    description: "Parent image ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ForeignKey(() => Image)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  imageId: string;

  @ApiProperty({
    description: "Image size",
    example: "medium",
    enum: Object.values(ImageSize),
  })
  @Column({
    type: DataType.ENUM(...Object.values(ImageSize)),
    allowNull: false,
  })
  size: ImageSize;

  @ApiProperty({
    description: "Image format",
    example: "webp",
    enum: Object.values(ImageFormat),
  })
  @Column({
    type: DataType.ENUM(...Object.values(ImageFormat)),
    allowNull: false,
  })
  format: ImageFormat;

  @ApiProperty({
    description: "Stored file name",
    example: "image-1234567890-123456789-medium.webp",
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  filename: string;

  @ApiProperty({
    description: "File path",
    example: "./uploads/images/image-1234567890-123456789-medium.webp",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  path: string;

  @ApiProperty({ description: "File MIME type", example: "image/webp" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  mimetype: string;

  @ApiProperty({ description: "Image width in pixels", example: 600 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  width: number;

  @ApiProperty({ description: "Image height in pixels", example: 400 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  height: number;

  @ApiProperty({
    description: "Public URL",
    example: "/api/images/123e4567-e89b-12d3-a456-426614174000/medium/webp",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  url: string;

  @ApiProperty({ description: "Quality level (1-100)", example: 80 })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 100,
    },
  })
  quality: number;

  @ApiProperty({
    description: "Creation timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @ApiProperty({
    description: "Last update timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @ApiProperty({
    description: "Deletion timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: ImageVariant) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }

  // Associations
  @BelongsTo(() => Image)
  image: Image;
}
