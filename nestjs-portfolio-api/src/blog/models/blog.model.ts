import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
} from "sequelize-typescript";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "../../common/utils/string-utils";
import { Portfolio } from "../../portfolio/models/portfolio.model";
import { User } from "../../user/models/user.model";
import { BlogCategory } from "./blog-category.model";
import { BlogComment } from "./blog-comment.model";
import { BlogTag } from "./blog-tag.model";

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
  include: [
    {
      model: User,
      as: "author",
      attributes: ["id", "firstName", "lastName", "email", "profileImage"],
    },
    {
      model: BlogCategory,
      as: "category",
    },
    {
      model: BlogTag,
      as: "tags",
      through: { attributes: [] },
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
      {
        model: BlogCategory,
        as: "category",
      },
      {
        model: BlogTag,
        as: "tags",
        through: { attributes: [] },
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
      {
        model: BlogCategory,
        as: "category",
      },
      {
        model: BlogTag,
        as: "tags",
        through: { attributes: [] },
      },
    ],
  },
  withComments: {
    include: [
      {
        model: BlogComment,
        as: "comments",
        include: [
          {
            model: User,
            as: "author",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "email",
              "profileImage",
            ],
          },
        ],
      },
    ],
  },
  published: {
    where: {
      status: "published",
      publishedAt: {
        [Op.ne]: null,
      },
      deletedAt: null,
    },
  },
  draft: {
    where: {
      status: "draft",
      deletedAt: null,
    },
  },
  featured: {
    where: {
      featured: true,
      status: "published",
      deletedAt: null,
    },
  },
}))
@Table({
  tableName: "blogs",
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: "blogs_slug_idx",
      unique: true,
      fields: ["slug"],
    },
    {
      name: "blogs_portfolio_id_idx",
      fields: ["portfolio_id"],
    },
    {
      name: "blogs_author_id_idx",
      fields: ["author_id"],
    },
    {
      name: "blogs_category_id_idx",
      fields: ["category_id"],
    },
    {
      name: "blogs_status_idx",
      fields: ["status"],
    },
    {
      name: "blogs_featured_idx",
      fields: ["featured"],
    },
    {
      name: "blogs_published_at_idx",
      fields: ["published_at"],
    },
    {
      name: "blogs_deleted_at_idx",
      fields: ["deleted_at"],
    },
  ],
})
export class Blog extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  excerpt: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  featuredImage: string;

  @Column({
    type: DataType.ENUM("draft", "published", "archived"),
    defaultValue: "draft",
  })
  status: "draft" | "published" | "archived";

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  featured: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  publishedAt: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  viewCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likeCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  commentCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  shareCount: number;

  @Column({
    type: DataType.JSONB,
    defaultValue: {},
  })
  seoMetadata: Record<string, any>;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  keywords: string[];

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  readingTimeMinutes: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: "author_id",
  })
  authorId: string;

  @BelongsTo(() => User, "authorId")
  author: User;

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    field: "portfolio_id",
  })
  portfolioId: string;

  @BelongsTo(() => Portfolio, "portfolioId")
  portfolio: Portfolio;

  @ForeignKey(() => BlogCategory)
  @Column({
    type: DataType.UUID,
    field: "category_id",
    allowNull: true,
  })
  categoryId: string;

  @BelongsTo(() => BlogCategory, "categoryId")
  category: BlogCategory;

  @HasMany(() => BlogComment, "blogId")
  comments: BlogComment[];

  @Column({
    type: DataType.DATE,
    field: "deleted_at",
    allowNull: true,
  })
  deletedAt: Date;

  @BeforeCreate
  @BeforeUpdate
  static async generateSlugIfNeeded(instance: Blog) {
    if (!instance.id) {
      instance.id = uuidv4();
    }

    if (instance.title && (!instance.slug || instance.changed("title"))) {
      const baseSlug = slugify(instance.title);
      let slug = baseSlug;
      let counter = 1;

      // Check if slug exists
      const existingBlog = await Blog.findOne({
        where: {
          slug,
          id: { [Op.ne]: instance.id },
        },
      });

      // If slug exists, append counter until unique
      while (existingBlog) {
        slug = `${baseSlug}-${counter}`;
        counter++;

        const checkBlog = await Blog.findOne({
          where: {
            slug,
            id: { [Op.ne]: instance.id },
          },
        });

        if (!checkBlog) break;
      }

      instance.slug = slug;
    }

    // Calculate reading time if content changed
    if (instance.content && instance.changed("content")) {
      // Average reading speed: 200 words per minute
      const wordCount = instance.content.split(/\s+/).length;
      instance.readingTimeMinutes = Math.ceil(wordCount / 200);
    }

    // Set publishedAt when status changes to published
    if (
      instance.changed("status") &&
      instance.status === "published" &&
      !instance.publishedAt
    ) {
      instance.publishedAt = new Date();
    }
  }
}
