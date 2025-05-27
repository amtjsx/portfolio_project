import {
  BeforeCreate,
  BeforeUpdate,
  BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  Model,
  Scopes,
  Table,
} from "sequelize-typescript";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "../../common/utils/string-utils";
import { BlogTagMap } from "./blog-tag-map.model";
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
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({
  tableName: "blog_tags",
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: "blog_tags_slug_idx",
      unique: true,
      fields: ["slug"],
    },
    {
      name: "blog_tags_deleted_at_idx",
      fields: ["deleted_at"],
    },
  ],
})
export class BlogTag extends Model {
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
    type: DataType.DATE,
    field: "deleted_at",
    allowNull: true,
  })
  deletedAt: Date;

  @BelongsToMany(() => Blog, () => BlogTagMap)
  blogs: Blog[];

  @BeforeCreate
  @BeforeUpdate
  static async generateSlugIfNeeded(instance: BlogTag) {
    if (!instance.id) {
      instance.id = uuidv4();
    }

    if (instance.name && (!instance.slug || instance.changed("name"))) {
      const baseSlug = slugify(instance.name);
      let slug = baseSlug;
      let counter = 1;

      // Check if slug exists
      const existingTag = await BlogTag.findOne({
        where: {
          slug,
          id: { [Op.ne]: instance.id },
        },
      });

      // If slug exists, append counter until unique
      while (existingTag) {
        slug = `${baseSlug}-${counter}`;
        counter++;

        const checkTag = await BlogTag.findOne({
          where: {
            slug,
            id: { [Op.ne]: instance.id },
          },
        });

        if (!checkTag) break;
      }

      instance.slug = slug;
    }
  }
}
