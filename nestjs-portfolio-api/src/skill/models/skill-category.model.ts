import { Table, Column, DataType, ForeignKey, BelongsTo, HasMany, DefaultScope, Scopes } from "sequelize-typescript"
import { User } from "../../user/models/user.model"
import { Skill } from "./skill.model"
import { BaseModel } from "../../common/models/base.model"

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
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  icon: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  color: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  displayOrder: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isVisible: boolean

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string

  @BelongsTo(() => User)
  user: User

  @HasMany(() => Skill)
  skills: Skill[]
}
