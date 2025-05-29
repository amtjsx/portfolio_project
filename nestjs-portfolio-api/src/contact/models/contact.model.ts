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
  tableName: "contacts",
  timestamps: true,
  paranoid: true,
})
export class Contact extends BaseModel<Contact> {
  @ApiProperty({ description: "Contact UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "User ID this contact is for", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  userId: string

  @ApiProperty({ description: "Portfolio ID this contact is for", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  portfolioId: string

  @ApiProperty({ description: "Full name of the person contacting", example: "John Doe" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @ApiProperty({ description: "Email address", example: "john.doe@example.com" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string

  @ApiProperty({ description: "Subject of the message", example: "Project Inquiry" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subject: string

  @ApiProperty({ description: "Message content", example: "I would like to discuss a potential project..." })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  message: string

  @ApiProperty({ description: "Phone number", required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string

  @ApiProperty({ description: "Company name", required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  company: string

  @ApiProperty({ description: "Contact status", example: "new" })
  @Column({
    type: DataType.ENUM("new", "read", "replied", "archived"),
    allowNull: false,
    defaultValue: "new",
  })
  status: "new" | "read" | "replied" | "archived"

  @ApiProperty({ description: "Contact creation timestamp", example: "2023-01-01T00:00:00.000Z" })
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
  static async generateUuid(instance: Contact) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User
}
