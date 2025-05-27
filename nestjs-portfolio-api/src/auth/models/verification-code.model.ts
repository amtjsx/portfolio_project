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
  tableName: "verification_codes",
  timestamps: true,
  paranoid: true,
})
export class VerificationCode extends BaseModel<VerificationCode> {
  @ApiProperty({ description: "Verification code UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "6-digit verification code", example: "123456" })
  @Column({
    type: DataType.STRING(6),
    allowNull: false,
  })
  code: string

  @ApiProperty({
    description: "Code type",
    example: "email_verification",
    enum: ["email_verification", "password_reset", "login_verification"],
  })
  @Column({
    type: DataType.ENUM("email_verification", "password_reset", "login_verification"),
    allowNull: false,
  })
  type: "email_verification" | "password_reset" | "login_verification"

  @ApiProperty({ description: "User ID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Email address", example: "john@example.com" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string

  @ApiProperty({ description: "Code expiration timestamp" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt: Date

  @ApiProperty({ description: "Whether code has been used", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isUsed: boolean

  @ApiProperty({ description: "Number of verification attempts", example: 0 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  attempts: number

  @ApiProperty({ description: "IP address of the request", required: false })
  @Column({
    type: DataType.STRING(45),
    allowNull: true,
  })
  ipAddress: string

  @ApiProperty({ description: "User agent of the request", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  userAgent: string

  @ApiProperty({ description: "Code creation timestamp" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date

  @ApiProperty({ description: "Code last update timestamp" })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date

  @ApiProperty({ description: "Code deletion timestamp", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: VerificationCode) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User

  // Instance methods
  isExpired(): boolean {
    return new Date() > this.expiresAt
  }

  canAttempt(): boolean {
    return this.attempts < 5 && !this.isUsed && !this.isExpired()
  }

  incrementAttempts(): void {
    this.attempts += 1
  }
}
