import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { User } from "../../user/models/user.model"
import { Portfolio } from "../../portfolio/models/portfolio.model"

export enum EmploymentType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  FREELANCE = "freelance",
  INTERNSHIP = "internship",
  APPRENTICESHIP = "apprenticeship",
  VOLUNTEER = "volunteer",
}

@Table({
  tableName: "experiences",
})
export class Experience extends Model<Experience> {
  @ApiProperty({ description: "The UUID identifier of the experience" })
  @IsUUID(4)
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string

  @ApiProperty({ description: "The user ID who owns the experience" })
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @ApiProperty({ description: "The portfolio ID this experience is associated with", required: false })
  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  portfolioId: string

  @ApiProperty({ description: "The company name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  companyName: string

  @ApiProperty({ description: "The position or job title" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string

  @ApiProperty({ description: "The employment type", enum: EmploymentType })
  @Column({
    type: DataType.ENUM(...Object.values(EmploymentType)),
    allowNull: false,
    defaultValue: EmploymentType.FULL_TIME,
  })
  employmentType: EmploymentType

  @ApiProperty({ description: "The company location" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string

  @ApiProperty({ description: "Whether the job is remote" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isRemote: boolean

  @ApiProperty({ description: "The start date of the experience" })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  startDate: Date

  @ApiProperty({ description: "The end date of the experience", required: false })
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  endDate: Date

  @ApiProperty({ description: "Whether this is the current job" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isCurrent: boolean

  @ApiProperty({ description: "The job description" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @ApiProperty({ description: "The responsibilities in the job" })
  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: [],
  })
  responsibilities: string[]

  @ApiProperty({ description: "The achievements in the job" })
  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: [],
  })
  achievements: string[]

  @ApiProperty({ description: "The technologies used in the job" })
  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: [],
  })
  technologies: string[]

  @ApiProperty({ description: "The company URL", required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  companyUrl: string

  @ApiProperty({ description: "The company logo URL", required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  companyLogoUrl: string

  @ApiProperty({ description: "The order of display" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  displayOrder: number

  @ApiProperty({ description: "Whether to highlight this experience" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isHighlighted: boolean

  @ApiProperty({ description: "Creation timestamp" })
  @CreatedAt
  createdAt: Date

  @ApiProperty({ description: "Update timestamp" })
  @UpdatedAt
  updatedAt: Date

  @ApiProperty({ description: "Deletion timestamp", required: false })
  @DeletedAt
  deletedAt: Date

  // Associations
  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio
}
