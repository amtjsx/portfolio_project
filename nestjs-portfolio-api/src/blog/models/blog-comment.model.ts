import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BeforeCreate,
  Scopes,
  DefaultScope,
} from "sequelize-typescript"
import { User } from "../../user/models/user.model"
import { Blog } from "./blog.model"
import { v4 as uuidv4 } from "uuid"
import { Op } from "sequelize"

@DefaultScope(() => ({
  where: {
    deletedAt: null,
    approved: true,
  },
  include: [
    {
      model: User,
      as: "author",
      attributes: ["id", "firstName", "lastName", "email", "profileImage"],
    },
  ],
}))
@Scopes(() => ({
  withDeleted: {
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "firstName", "lastName", "email", "profileImage"],
      },
    ],
  },
  onlyDeleted: {
    where: {
      deletedAt: {
        [Op.ne]: null,
      },
    },
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "firstName", "lastName", "email", "profileImage"],
      },
    ],
  },
  withReplies: {
    include: [
      {
        model: BlogComment,
        as: "replies",
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "firstName", "lastName", "email", "profileImage"],
          },
        ],
      },
    ],
  },
  pending: {
    where: {
      approved: false,
      deletedAt: null,
    },
  },
  approved: {
    where: {
      approved: true,
      deletedAt: null,
    },
  },
}))
@Table({
  tableName: "blog_comments",
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: "blog_comments_blog_id_idx",
      fields: ["blog_id"],
    },
    {
      name: "blog_comments_author_id_idx",
      fields: ["author_id"],
    },
    {
      name: "blog_comments_parent_id_idx",
      fields: ["parent_id"],
    },
    {
      name: "blog_comments_approved_idx",
      fields: ["approved"],
    },
    {
      name: "blog_comments_deleted_at_idx",
      fields: ["deleted_at"],
    },
  ],
})
export class BlogComment extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  })
  id: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  approved: boolean

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likeCount: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: "author_id",
  })
  authorId: string

  @BelongsTo(() => User, "authorId")
  author: User

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.UUID,
    field: "blog_id",
  })
  blogId: string

  @BelongsTo(() => Blog, "blogId")
  blog: Blog

  @ForeignKey(() => BlogComment)
  @Column({
    type: DataType.UUID,
    field: "parent_id",
    allowNull: true,
  })
  parentId: string

  @BelongsTo(() => BlogComment, "parentId")
  parent: BlogComment

  @HasMany(() => BlogComment, "parentId")
  replies: BlogComment[]

  @Column({
    type: DataType.DATE,
    field: "deleted_at",
    allowNull: true,
  })
  deletedAt: Date

  @BeforeCreate
  static async generateId(instance: BlogComment) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
  }
}
