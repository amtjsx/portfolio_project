import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  DefaultScope,
  Scopes,
} from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Skill } from "./skill.model";
import { BaseModel } from "../../common/models/base.model";
import { Portfolio } from "src/portfolio/models/portfolio.model";

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
}))
@Scopes(() => ({
  withSkills: {
    include: [
      {
        model: Skill,
        as: "skills",
      },
    ],
  },
}))
@Table({
  tableName: "skill_categories",
  timestamps: true,
  paranoid: true,
})
export class SkillCategory extends BaseModel<SkillCategory> {
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
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  displayOrder: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isVisible: boolean;

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @HasMany(() => Skill)
  skills: Skill[];
}
