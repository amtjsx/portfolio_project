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
  tableName: "technical_skills",
  timestamps: true,
  paranoid: true,
})
export class Technical extends BaseModel<Technical> {
  @ApiProperty({ description: "Technical skill UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "User ID who owns this skill", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Technology name", example: "React" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string

  @ApiProperty({ description: "Skill level (0-100)", example: 85, minimum: 0, maximum: 100 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  })
  level: number

  @ApiProperty({
    description: "Technology category",
    example: "frontend",
    enum: ["frontend", "backend", "database", "devops", "mobile", "other"],
  })
  @Column({
    type: DataType.ENUM("frontend", "backend", "database", "devops", "mobile", "other"),
    allowNull: false,
  })
  category: "frontend" | "backend" | "database" | "devops" | "mobile" | "other"

  @ApiProperty({ description: "Years of experience", example: 3 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  yearsOfExperience: number

  @ApiProperty({ description: "Technology description", example: "JavaScript library for building user interfaces" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @ApiProperty({ description: "Technology icon URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  iconUrl: string

  @ApiProperty({ description: "Official website URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  websiteUrl: string

  @ApiProperty({ description: "Whether currently using this technology", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isCurrentlyUsing: boolean

  @ApiProperty({ description: "Last used date", example: "2024-01-15" })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  lastUsed: string

  @ApiProperty({ description: "Certification details", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  certifications: string[]

  @ApiProperty({ description: "Related projects count", example: 5 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  })
  projectsCount: number

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Technical) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User
}
