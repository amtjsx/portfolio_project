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
  tableName: "projects",
  timestamps: true,
  paranoid: true,
})
export class Project extends BaseModel<Project> {
  @ApiProperty({ description: "Project UUID", example: "123e4567-e89b-12d3-a456-426614174000" })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string

  @ApiProperty({ description: "User ID who owns this project", example: "123e4567-e89b-12d3-a456-426614174000" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "Portfolio ID this project belongs to", required: false })
  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  portfolioId: string

  @ApiProperty({ description: "Project title", example: "E-commerce Platform" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string

  @ApiProperty({
    description: "Short project description",
    example: "Full-stack e-commerce solution with React and Node.js",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string

  @ApiProperty({ description: "Detailed project description", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  longDescription: string

  @ApiProperty({ description: "Technologies used in the project", example: ["React", "Node.js", "PostgreSQL"] })
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  technologies: string[]

  @ApiProperty({ description: "Project category", example: "web" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  category: string

  @ApiProperty({ description: "GitHub repository URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  githubUrl: string

  @ApiProperty({ description: "Live demo URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  liveUrl: string

  @ApiProperty({ description: "Project image URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  imageUrl: string

  @ApiProperty({ description: "Whether the project is featured", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  featured: boolean

  @ApiProperty({ description: "Project start date", example: "2023-01-01" })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  startDate: string

  @ApiProperty({ description: "Project end date", required: false })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  endDate: string

  @ApiProperty({ description: "Project status", example: "completed" })
  @Column({
    type: DataType.ENUM("completed", "in-progress", "planned"),
    allowNull: false,
    defaultValue: "planned",
  })
  status: "completed" | "in-progress" | "planned"

  @ApiProperty({ description: "Project creation timestamp", example: "2023-01-01T00:00:00.000Z" })
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

  @ApiProperty({ description: "Project deletion timestamp", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Project) {
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
