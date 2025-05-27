import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript"
import { Blog } from "./blog.model"
import { BlogTag } from "./blog-tag.model"
import { v4 as uuidv4 } from "uuid"

@Table({
  tableName: "blog_tag_map",
  timestamps: true,
  indexes: [
    {
      name: "blog_tag_map_blog_id_tag_id_idx",
      unique: true,
      fields: ["blog_id", "tag_id"],
    },
  ],
})
export class BlogTagMap extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  })
  id: string

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.UUID,
    field: "blog_id",
    allowNull: false,
  })
  blogId: string

  @ForeignKey(() => BlogTag)
  @Column({
    type: DataType.UUID,
    field: "tag_id",
    allowNull: false,
  })
  tagId: string
}
