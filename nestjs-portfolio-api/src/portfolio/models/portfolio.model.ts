import { ApiProperty } from "@nestjs/swagger";
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Scopes,
  Table,
} from "sequelize-typescript";
import { Education } from "src/education/models/education.model";
import { Experience } from "src/experience/models/experience.model";
import { Image } from "src/image/models/image.model";
import { Skill } from "src/skill/models/skill.model";
import { v4 as uuidv4 } from "uuid";
import { Analytics } from "../../analytics/models/analytics.model";
import { Visitor } from "../../analytics/models/visitor.model";
import { BaseModel } from "../../common/models/base.model";
import { Op } from "../../common/models/sequelize-imports";
import { Project } from "../../projects/models/project.model";
import { Social } from "../../social/models/social.model";
import { User } from "../../user/models/user.model";
import { SkillCategory } from "src/skill/models/skill-category.model";

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
  tableName: "portfolios",
  timestamps: true,
  paranoid: true,
})
export class Portfolio extends BaseModel<Portfolio> {
  @ApiProperty({
    description: "Portfolio UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ApiProperty({
    description: "User ID who owns this portfolio",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ApiProperty({
    description: "Portfolio title",
    example: "John Doe - Full Stack Developer",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    description: "Portfolio subtitle",
    example: "Passionate about creating amazing web experiences",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  subtitle: string;

  @ApiProperty({ description: "Professional summary" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  summary: string;

  @ApiProperty({
    description: "Portfolio email",
    example: "john@example.com",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({
    description: "Portfolio phone number",
    example: "123-456-7890",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  phoneNumber: string;

  @ApiProperty({
    description: "Portfolio location",
    example: "New York, USA",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  location: string;

  @ApiProperty({
    description: "Portfolio theme",
    example: "modern",
    enum: ["modern", "classic", "minimal", "creative"],
  })
  @Column({
    type: DataType.ENUM("modern", "classic", "minimal", "creative"),
    allowNull: false,
    defaultValue: "modern",
  })
  theme: "modern" | "classic" | "minimal" | "creative";

  @ApiProperty({
    description: "Primary color for the portfolio",
    example: "#3B82F6",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "#3B82F6",
    validate: {
      is: /^#[0-9A-F]{6}$/i,
    },
  })
  primaryColor: string;

  @ApiProperty({
    description: "Secondary color for the portfolio",
    example: "#1E40AF",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "#1E40AF",
    validate: {
      is: /^#[0-9A-F]{6}$/i,
    },
  })
  secondaryColor: string;

  @ApiProperty({
    description: "Portfolio visibility",
    example: "public",
    enum: ["public", "private", "unlisted"],
  })
  @Column({
    type: DataType.ENUM("public", "private", "unlisted"),
    allowNull: true,
    defaultValue: "public",
  })
  visibility: "public" | "private" | "unlisted";

  @ApiProperty({
    description: "Custom domain for the portfolio",
    required: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  customDomain: string;

  @ApiProperty({ description: "SEO meta title", required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  metaTitle: string;

  @ApiProperty({ description: "SEO meta description", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  metaDescription: string;

  @ApiProperty({ description: "SEO keywords", required: false })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metaKeywords: string[];

  @ApiProperty({ description: "Portfolio sections configuration" })
  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      about: true,
      skills: true,
      experience: true,
      education: true,
      projects: true,
      contact: true,
      testimonials: false,
      blog: false,
    },
  })
  sections: {
    about: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    contact: boolean;
    testimonials: boolean;
    blog: boolean;
  };

  @ApiProperty({ description: "Portfolio settings" })
  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: {
      showContactForm: true,
      allowDownloadResume: true,
      enableAnalytics: true,
      enableComments: false,
      maintenanceMode: false,
    },
  })
  settings: {
    showContactForm: boolean;
    allowDownloadResume: boolean;
    enableAnalytics: boolean;
    enableComments: boolean;
    maintenanceMode: boolean;
  };

  @ApiProperty({ description: "Resume/CV file URL", required: false })
  @Column({ type: DataType.UUID, allowNull: true })
  resumeId: string;

  @ApiProperty({ description: "Portfolio cover image URL", required: false })
  @ForeignKey(() => Image)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  coverImageId: string;
  @BelongsTo(() => Image)
  cover: Image;

  @ApiProperty({ description: "Profile avatar URL", required: false })
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  @ForeignKey(() => Image)
  profileImageId: string;
  @BelongsTo(() => Image)
  profile: Image;

  @ApiProperty({ description: "Portfolio publication status", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isPublished: boolean;

  @ApiProperty({ description: "Portfolio featured status", example: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isFeatured: boolean;

  @ApiProperty({
    description: "Portfolio publication timestamp",
    required: false,
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  publishedAt: Date;

  @ApiProperty({
    description: "Portfolio creation timestamp",
    example: "2023-01-01T00:00:00.000Z",
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

  @ApiProperty({ description: "Portfolio deletion timestamp", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: Portfolio) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }

  // Associations
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Project)
  projects: Project[];

  @HasMany(() => Social)
  socialLinks: Social[];

  @HasMany(() => Analytics)
  analyticsRecords: Analytics[];

  @HasMany(() => Visitor)
  visitors: Visitor[];

  @HasMany(() => Education)
  educations: Education[];

  @HasMany(() => Experience)
  experiences: Experience[];

  @HasMany(() => Skill)
  skills: Skill[];

  @HasMany(() => SkillCategory)
  skillCategories: SkillCategory[];
}
