import { ApiProperty } from "@nestjs/swagger";
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Scopes,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "../../common/models/base.model";
import { Op } from "../../common/models/sequelize-imports";
import { User } from "../../user/models/user.model";

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
  tableName: "uploaded_files",
  timestamps: true,
  paranoid: true,
})
export class UploadedFile extends BaseModel<UploadedFile> {
  @ApiProperty({
    description: "File UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ApiProperty({
    description: "User ID who uploaded this file",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ApiProperty({ description: "Original file name", example: "resume.pdf" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalName: string;

  @ApiProperty({
    description: "Stored file name",
    example: "resume-1234567890-123456789.pdf",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filename: string;

  @ApiProperty({
    description: "File path",
    example: "./uploads/resumes/resume-1234567890-123456789.pdf",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  path: string;

  @ApiProperty({ description: "File MIME type", example: "application/pdf" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  mimetype: string;

  @ApiProperty({ description: "File size in bytes", example: 1024000 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  size: number;

  @ApiProperty({
    description: "File type",
    example: "resume",
    enum: ["resume", "image", "avatar", "projectImage"],
  })
  @Column({
    type: DataType.ENUM("resume", "image", "avatar", "projectImage"),
    allowNull: false,
  })
  type: "resume" | "image" | "avatar" | "projectImage";

  @ApiProperty({
    description: "File URL",
    example: "/api/upload/files/resume-1234567890-123456789.pdf",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  url: string;

  @ApiProperty({ description: "File description", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ description: "Whether file is active", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: "Upload timestamp",
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
  static async generateUuid(instance: UploadedFile) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User;
}
