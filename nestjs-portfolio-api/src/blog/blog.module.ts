import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BlogCategory } from "./models/blog-category.model";
import { BlogTagMap } from "./models/blog-tag-map.model";
import { BlogTag } from "./models/blog-tag.model";
import { Blog } from "./models/blog.model";
import { User } from "src/user/models/user.model";
import { Portfolio } from "src/portfolio/models/portfolio.model";
import { BlogService } from "./blog.service";
import { BlogComment } from "./models/blog-comment.model";
import { BlogController } from "./blog.controller";

@Module({
  imports: [
    SequelizeModule.forFeature([
      BlogCategory,
      BlogTag,
      Blog,
      BlogTagMap,
      User,
      Portfolio,
      BlogComment,
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
