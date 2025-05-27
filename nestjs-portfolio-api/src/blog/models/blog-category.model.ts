import { Op } from "sequelize";
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
import { User } from "src/user/models/user.model";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "../../common/utils/string-utils";
import { Blog } from "./blog.model";

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
}))
@Scopes(() => ({
  withDeleted: {},
  onlyDeleted: {
    where: {
      deletedAt: {
        [Op.ne]: null,
      },
    },
  },
  withBlogs: {
    include: [
      {
        model: Blog,
        as: "blogs",
      },
    ],
  },
}))
@Table({
  tableName: "blog_categories",
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: "blog_categories_slug_idx",
      unique: true,
      fields: ["slug"],
    },
    {
      name: "blog_categories_deleted_at_idx",
      fields: ["deleted_at"],
    },
  ],
})
export class BlogCategory extends Model {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  icon: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true })
  createdById: string;
  @BelongsTo(() => User)
  createdBy: User;

  @Column({
    type: DataType.DATE,
    field: "deleted_at",
    allowNull: true,
  })
  deletedAt: Date;

  @HasMany(() => Blog, "categoryId")
  blogs: Blog[];

  @BeforeCreate
  @BeforeUpdate
  static async generateSlugIfNeeded(instance: BlogCategory) {
    if (!instance.id) {
      instance.id = uuidv4();
    }

    if (instance.name && (!instance.slug || instance.changed("name"))) {
      const baseSlug = slugify(instance.name);
      let slug = baseSlug;
      let counter = 1;

      // Check if slug exists
      const existingCategory = await BlogCategory.findOne({
        where: {
          slug,
          id: { [Op.ne]: instance.id },
        },
      });

      // If slug exists, append counter until unique
      while (existingCategory) {
        slug = `${baseSlug}-${counter}`;
        counter++;

        const checkCategory = await BlogCategory.findOne({
          where: {
            slug,
            id: { [Op.ne]: instance.id },
          },
        });

        if (!checkCategory) break;
      }

      instance.slug = slug;
    }
  }
}
