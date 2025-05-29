import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Scopes,
  Table,
} from "sequelize-typescript";
import { BaseModel } from "../../common/models/base.model";
import { Experience } from "../../experience/models/experience.model";
import { Portfolio } from "../../portfolio/models/portfolio.model";
import { Project } from "../../projects/models/project.model";
import { User } from "../../user/models/user.model";
import { SkillCategory } from "./skill-category.model";

export enum ProficiencyLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
}))
@Scopes(() => ({
  withCategory: {
    include: [
      {
        model: SkillCategory,
        as: "category",
      },
    ],
  },
  withPortfolio: {
    include: [
      {
        model: Portfolio,
        as: "portfolio",
      },
    ],
  },
  withProjects: {
    include: [
      {
        model: Project,
        as: "projects",
      },
    ],
  },
  withExperiences: {
    include: [
      {
        model: Experience,
        as: "experiences",
      },
    ],
  },
}))
@Table({
  tableName: "skills",
  timestamps: true,
  paranoid: true,
})
export class Skill extends BaseModel<Skill> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(ProficiencyLevel)),
    allowNull: false,
    defaultValue: ProficiencyLevel.INTERMEDIATE,
  })
  proficiencyLevel: ProficiencyLevel;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  yearsOfExperience: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastUsedDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  icon: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  color: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isFeatured: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  displayOrder: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  endorsementCount: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  metadata: any;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  portfolioId: string;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @ForeignKey(() => SkillCategory)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  categoryId: string;

  @BelongsTo(() => SkillCategory)
  category: SkillCategory;

  // Many-to-many relationships can be added here
  // For example, skills to projects, skills to experiences, etc.

  @BeforeCreate
  @BeforeUpdate
  static async ensureDefaults(instance: Skill) {
    // Set lastUsedDate to now if not provided
    if (!instance.lastUsedDate) {
      instance.lastUsedDate = new Date();
    }
  }

  // Virtual getter for proficiency percentage
  get proficiencyPercentage(): number {
    const levels = {
      [ProficiencyLevel.BEGINNER]: 25,
      [ProficiencyLevel.INTERMEDIATE]: 50,
      [ProficiencyLevel.ADVANCED]: 75,
      [ProficiencyLevel.EXPERT]: 100,
    };
    return levels[this.proficiencyLevel] || 0;
  }
}
