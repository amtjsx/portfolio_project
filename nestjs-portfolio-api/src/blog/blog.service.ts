import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { slugify } from "../common/utils/string-utils";
import { Portfolio } from "../portfolio/models/portfolio.model";
import { User } from "../user/models/user.model";
import { BlogQueryDto } from "./dto/blog-query.dto";
import { CreateBlogCategoryDto } from "./dto/create-blog-category.dto";
import { CreateBlogCommentDto } from "./dto/create-blog-comment.dto";
import { CreateBlogTagDto } from "./dto/create-blog-tag.dto";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogCategoryDto } from "./dto/update-blog-category.dto";
import { UpdateBlogCommentDto } from "./dto/update-blog-comment.dto";
import { UpdateBlogTagDto } from "./dto/update-blog-tag.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { BlogCategory } from "./models/blog-category.model";
import { BlogComment } from "./models/blog-comment.model";
import { BlogTagMap } from "./models/blog-tag-map.model";
import { BlogTag } from "./models/blog-tag.model";
import { Blog } from "./models/blog.model";

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private blogModel: typeof Blog,
    @InjectModel(BlogCategory)
    private blogCategoryModel: typeof BlogCategory,
    @InjectModel(BlogTag)
    private blogTagModel: typeof BlogTag,
    @InjectModel(BlogComment)
    private blogCommentModel: typeof BlogComment,
    @InjectModel(BlogTagMap)
    private blogTagMapModel: typeof BlogTagMap,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Portfolio)
    private portfolioModel: typeof Portfolio,
    private sequelize: Sequelize
  ) {}

  // Blog CRUD operations
  async createBlog(
    userId: string,
    createBlogDto: CreateBlogDto
  ): Promise<Blog> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const portfolio = await this.portfolioModel.findByPk(
      createBlogDto.portfolioId
    );
    if (!portfolio) {
      throw new NotFoundException("Portfolio not found");
    }

    if (portfolio.userId !== userId) {
      throw new BadRequestException(
        "You can only create blogs for your own portfolio"
      );
    }

    if (createBlogDto.categoryId) {
      const category = await this.blogCategoryModel.findByPk(
        createBlogDto.categoryId
      );
      if (!category) {
        throw new NotFoundException("Category not found");
      }
    }

    const slug = createBlogDto.slug || slugify(createBlogDto.title);
    const existingBlog = await this.blogModel.findOne({ where: { slug } });
    if (existingBlog) {
      throw new ConflictException("Blog with this slug already exists");
    }

    const transaction = await this.sequelize.transaction();

    try {
      const blog = await this.blogModel.create(
        {
          ...createBlogDto,
          slug,
          authorId: userId,
        },
        { transaction }
      );

      // Handle tags
      if (createBlogDto.tags && createBlogDto.tags.length > 0) {
        const tagIds = [];

        for (const tagName of createBlogDto.tags) {
          // Find or create tag
          let tag = await this.blogTagModel.findOne({
            where: { name: tagName },
            transaction,
          });

          if (!tag) {
            tag = await this.blogTagModel.create(
              {
                name: tagName,
                slug: slugify(tagName),
              },
              { transaction }
            );
          }

          tagIds.push(tag.id);
        }

        // Create tag mappings
        for (const tagId of tagIds) {
          await this.blogTagMapModel.create(
            {
              blogId: blog.id,
              tagId,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();

      return this.getBlogById(blog.id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAllBlogs(
    query: BlogQueryDto
  ): Promise<{ blogs: Blog[]; total: number; page: number; limit: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
      status,
      featured,
      authorId,
      portfolioId,
      categoryId,
      tags,
      withDeleted,
      onlyDeleted,
    } = query;

    const offset = (page - 1) * limit;

    const whereClause: any = {};

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    if (featured !== undefined) {
      whereClause.featured = featured;
    }

    if (authorId) {
      whereClause.authorId = authorId;
    }

    if (portfolioId) {
      whereClause.portfolioId = portfolioId;
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    let scope = "defaultScope";
    if (withDeleted) {
      scope = "withDeleted";
    } else if (onlyDeleted) {
      scope = "onlyDeleted";
    }

    const { rows, count } = await this.blogModel.scope(scope).findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      distinct: true,
    });

    // Filter by tags if provided
    let blogs = rows;
    if (tags && tags.length > 0) {
      const blogIds = await this.getBlogIdsByTags(tags);
      blogs = blogs.filter((blog) => blogIds.includes(blog.id));
    }

    return {
      blogs,
      total: count,
      page,
      limit,
    };
  }

  async getBlogById(id: string): Promise<Blog> {
    const blog = await this.blogModel
      .scope(["defaultScope", "withComments"])
      .findByPk(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    return blog;
  }

  async getBlogBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogModel
      .scope(["defaultScope", "withComments"])
      .findOne({
        where: { slug },
      });
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    // Increment view count
    await this.incrementBlogViewCount(blog.id);

    return blog;
  }

  async updateBlog(
    userId: string,
    id: string,
    updateBlogDto: UpdateBlogDto
  ): Promise<Blog> {
    const blog = await this.blogModel.findByPk(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    if (blog.authorId !== userId) {
      throw new BadRequestException("You can only update your own blogs");
    }

    if (updateBlogDto.categoryId) {
      const category = await this.blogCategoryModel.findByPk(
        updateBlogDto.categoryId
      );
      if (!category) {
        throw new NotFoundException("Category not found");
      }
    }

    if (updateBlogDto.slug) {
      const existingBlog = await this.blogModel.findOne({
        where: {
          slug: updateBlogDto.slug,
          id: { [Op.ne]: id },
        },
      });
      if (existingBlog) {
        throw new ConflictException("Blog with this slug already exists");
      }
    }

    const transaction = await this.sequelize.transaction();

    try {
      await blog.update(updateBlogDto, { transaction });

      // Handle tags if provided
      if (updateBlogDto.tags) {
        // Remove existing tag mappings
        await this.blogTagMapModel.destroy({
          where: { blogId: id },
          transaction,
        });

        const tagIds = [];

        for (const tagName of updateBlogDto.tags) {
          // Find or create tag
          let tag = await this.blogTagModel.findOne({
            where: { name: tagName },
            transaction,
          });

          if (!tag) {
            tag = await this.blogTagModel.create(
              {
                name: tagName,
                slug: slugify(tagName),
              },
              { transaction }
            );
          }

          tagIds.push(tag.id);
        }

        // Create new tag mappings
        for (const tagId of tagIds) {
          await this.blogTagMapModel.create(
            {
              blogId: id,
              tagId,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();

      return this.getBlogById(id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteBlog(userId: string, id: string): Promise<void> {
    const blog = await this.blogModel.findByPk(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    if (blog.authorId !== userId) {
      throw new BadRequestException("You can only delete your own blogs");
    }

    await blog.destroy();
  }

  async restoreBlog(userId: string, id: string): Promise<Blog> {
    const blog = await this.blogModel.scope("withDeleted").findByPk(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    if (blog.authorId !== userId) {
      throw new BadRequestException("You can only restore your own blogs");
    }

    if (!blog.deletedAt) {
      throw new BadRequestException("Blog is not deleted");
    }

    await blog.restore();

    return this.getBlogById(id);
  }

  async permanentlyDeleteBlog(userId: string, id: string): Promise<void> {
    const blog = await this.blogModel.scope("withDeleted").findByPk(id);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    if (blog.authorId !== userId) {
      throw new BadRequestException(
        "You can only permanently delete your own blogs"
      );
    }

    const transaction = await this.sequelize.transaction();

    try {
      // Delete tag mappings
      await this.blogTagMapModel.destroy({
        where: { blogId: id },
        force: true,
        transaction,
      });

      // Delete comments
      await this.blogCommentModel.destroy({
        where: { blogId: id },
        force: true,
        transaction,
      });

      // Delete blog
      await blog.destroy({ force: true, transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Blog Category CRUD operations
  async createBlogCategory(
    createBlogCategoryDto: CreateBlogCategoryDto
  ): Promise<BlogCategory> {
    const slug =
      createBlogCategoryDto.slug || slugify(createBlogCategoryDto.name);
    const existingCategory = await this.blogCategoryModel.findOne({
      where: { slug },
    });
    if (existingCategory) {
      throw new ConflictException("Category with this slug already exists");
    }

    const category = await this.blogCategoryModel.create({
      ...createBlogCategoryDto,
      slug,
    });

    return category;
  }

  async getAllBlogCategories(): Promise<BlogCategory[]> {
    return this.blogCategoryModel.findAll();
  }

  async getBlogCategoryById(id: string): Promise<BlogCategory> {
    const category = await this.blogCategoryModel
      .scope("withBlogs")
      .findByPk(id);
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return category;
  }

  async getBlogCategoryBySlug(slug: string): Promise<BlogCategory> {
    const category = await this.blogCategoryModel.scope("withBlogs").findOne({
      where: { slug },
    });
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return category;
  }

  async updateBlogCategory(
    id: string,
    updateBlogCategoryDto: UpdateBlogCategoryDto
  ): Promise<BlogCategory> {
    const category = await this.blogCategoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (updateBlogCategoryDto.slug) {
      const existingCategory = await this.blogCategoryModel.findOne({
        where: {
          slug: updateBlogCategoryDto.slug,
          id: { [Op.ne]: id },
        },
      });
      if (existingCategory) {
        throw new ConflictException("Category with this slug already exists");
      }
    }

    await category.update(updateBlogCategoryDto);

    return this.getBlogCategoryById(id);
  }

  async deleteBlogCategory(id: string): Promise<void> {
    const category = await this.blogCategoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    // Check if category is in use
    const blogsUsingCategory = await this.blogModel.count({
      where: { categoryId: id },
    });

    if (blogsUsingCategory > 0) {
      throw new BadRequestException(
        "Cannot delete category that is in use by blogs"
      );
    }

    await category.destroy();
  }

  // Blog Tag CRUD operations
  async createBlogTag(createBlogTagDto: CreateBlogTagDto): Promise<BlogTag> {
    const slug = createBlogTagDto.slug || slugify(createBlogTagDto.name);
    const existingTag = await this.blogTagModel.findOne({ where: { slug } });
    if (existingTag) {
      throw new ConflictException("Tag with this slug already exists");
    }

    const tag = await this.blogTagModel.create({
      ...createBlogTagDto,
      slug,
    });

    return tag;
  }

  async getAllBlogTags(): Promise<BlogTag[]> {
    return this.blogTagModel.findAll();
  }

  async getBlogTagById(id: string): Promise<BlogTag> {
    const tag = await this.blogTagModel.scope("withBlogs").findByPk(id);
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }
    return tag;
  }

  async getBlogTagBySlug(slug: string): Promise<BlogTag> {
    const tag = await this.blogTagModel.scope("withBlogs").findOne({
      where: { slug },
    });
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }
    return tag;
  }

  async updateBlogTag(
    id: string,
    updateBlogTagDto: UpdateBlogTagDto
  ): Promise<BlogTag> {
    const tag = await this.blogTagModel.findByPk(id);
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    if (updateBlogTagDto.slug) {
      const existingTag = await this.blogTagModel.findOne({
        where: {
          slug: updateBlogTagDto.slug,
          id: { [Op.ne]: id },
        },
      });
      if (existingTag) {
        throw new ConflictException("Tag with this slug already exists");
      }
    }

    await tag.update(updateBlogTagDto);

    return this.getBlogTagById(id);
  }

  async deleteBlogTag(id: string): Promise<void> {
    const tag = await this.blogTagModel.findByPk(id);
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    const transaction = await this.sequelize.transaction();

    try {
      // Delete tag mappings
      await this.blogTagMapModel.destroy({
        where: { tagId: id },
        transaction,
      });

      // Delete tag
      await tag.destroy({ transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Blog Comment CRUD operations
  async createBlogComment(
    userId: string,
    createBlogCommentDto: CreateBlogCommentDto
  ): Promise<BlogComment> {
    const blog = await this.blogModel.findByPk(createBlogCommentDto.blogId);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    if (createBlogCommentDto.parentId) {
      const parentComment = await this.blogCommentModel.findByPk(
        createBlogCommentDto.parentId
      );
      if (!parentComment) {
        throw new NotFoundException("Parent comment not found");
      }

      if (parentComment.blogId !== createBlogCommentDto.blogId) {
        throw new BadRequestException(
          "Parent comment does not belong to the specified blog"
        );
      }
    }

    const transaction = await this.sequelize.transaction();

    try {
      // Create comment
      const comment = await this.blogCommentModel.create(
        {
          ...createBlogCommentDto,
          authorId: userId,
          // Auto-approve comments by the blog author
          approved: blog.authorId === userId,
        },
        { transaction }
      );

      // Update comment count on blog
      await blog.increment("commentCount", { transaction });

      await transaction.commit();

      return this.getBlogCommentById(comment.id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAllBlogComments(blogId: string): Promise<BlogComment[]> {
    const blog = await this.blogModel.findByPk(blogId);
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    return this.blogCommentModel.findAll({
      where: {
        blogId,
        parentId: null, // Only top-level comments
      },
      include: [
        {
          model: this.blogCommentModel,
          as: "replies",
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
    });
  }

  async getBlogCommentById(id: string): Promise<BlogComment> {
    const comment = await this.blogCommentModel.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "lastName", "email", "profileImage"],
        },
      ],
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }
    return comment;
  }

  async updateBlogComment(
    userId: string,
    id: string,
    updateBlogCommentDto: UpdateBlogCommentDto
  ): Promise<BlogComment> {
    const comment = await this.blogCommentModel.findByPk(id, {
      include: [
        {
          model: Blog,
          as: "blog",
        },
      ],
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    // Only allow the comment author to update content
    if (updateBlogCommentDto.content && comment.authorId !== userId) {
      throw new BadRequestException("You can only update your own comments");
    }

    // Only allow the blog author to approve comments
    if (
      updateBlogCommentDto.approved !== undefined &&
      comment.blog.authorId !== userId
    ) {
      throw new BadRequestException(
        "Only the blog author can approve comments"
      );
    }

    await comment.update(updateBlogCommentDto);

    return this.getBlogCommentById(id);
  }

  async deleteBlogComment(userId: string, id: string): Promise<void> {
    const comment = await this.blogCommentModel.findByPk(id, {
      include: [
        {
          model: Blog,
          as: "blog",
        },
      ],
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    // Only allow the comment author or blog author to delete comments
    if (comment.authorId !== userId && comment.blog.authorId !== userId) {
      throw new BadRequestException(
        "You can only delete your own comments or comments on your blog"
      );
    }

    const transaction = await this.sequelize.transaction();

    try {
      // Delete comment
      await comment.destroy({ transaction });

      // Update comment count on blog
      await comment.blog.decrement("commentCount", { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Helper methods
  private async getBlogIdsByTags(tags: string[]): Promise<string[]> {
    const tagModels = await this.blogTagModel.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.in]: tags } },
          { slug: { [Op.in]: tags.map((tag) => slugify(tag)) } },
        ],
      },
    });

    const tagIds = tagModels.map((tag) => tag.id);

    if (tagIds.length === 0) {
      return [];
    }

    const tagMaps = await this.blogTagMapModel.findAll({
      where: {
        tagId: { [Op.in]: tagIds },
      },
    });

    return [...new Set(tagMaps.map((map) => map.blogId))];
  }

  private async incrementBlogViewCount(id: string): Promise<void> {
    await this.blogModel.increment("viewCount", {
      where: { id },
    });
  }

  async incrementBlogLikeCount(id: string): Promise<void> {
    await this.blogModel.increment("likeCount", {
      where: { id },
    });
  }

  async decrementBlogLikeCount(id: string): Promise<void> {
    await this.blogModel.decrement("likeCount", {
      where: { id },
    });
  }

  async incrementBlogShareCount(id: string): Promise<void> {
    await this.blogModel.increment("shareCount", {
      where: { id },
    });
  }

  async incrementCommentLikeCount(id: string): Promise<void> {
    await this.blogCommentModel.increment("likeCount", {
      where: { id },
    });
  }

  async decrementCommentLikeCount(id: string): Promise<void> {
    await this.blogCommentModel.decrement("likeCount", {
      where: { id },
    });
  }
}
