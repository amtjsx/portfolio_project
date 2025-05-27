import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { CreateBlogCommentDto } from "./dto/create-blog-comment.dto";
import { UpdateBlogCommentDto } from "./dto/update-blog-comment.dto";
import { CreateBlogCategoryDto } from "./dto/create-blog-category.dto";
import { UpdateBlogCategoryDto } from "./dto/update-blog-category.dto";
import { CreateBlogTagDto } from "./dto/create-blog-tag.dto";
import { UpdateBlogTagDto } from "./dto/update-blog-tag.dto";
import { BlogQueryDto } from "./dto/blog-query.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { Public } from "../auth/decorators/public.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { MediumRateLimit } from "../common/rate-limiting/throttler.decorators";

@ApiTags("Blog")
@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Blog endpoints
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new blog post" })
  @ApiResponse({
    status: 201,
    description: "The blog post has been successfully created.",
  })
  @ApiBody({ type: CreateBlogDto })
  @MediumRateLimit
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.blogService.createBlog(req.user.id, createBlogDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: "Get all blog posts" })
  @ApiResponse({ status: 200, description: "Return all blog posts." })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({
    name: "status",
    required: false,
    enum: ["draft", "published", "archived"],
  })
  @ApiQuery({ name: "featured", required: false, type: Boolean })
  @ApiQuery({ name: "authorId", required: false, type: String })
  @ApiQuery({ name: "portfolioId", required: false, type: String })
  @ApiQuery({ name: "categoryId", required: false, type: String })
  @ApiQuery({ name: "tags", required: false, type: [String] })
  @ApiQuery({ name: "sortBy", required: false, type: String })
  @ApiQuery({ name: "sortOrder", required: false, enum: ["asc", "desc"] })
  @MediumRateLimit
  async getAllBlogs(@Query() query: BlogQueryDto) {
    return this.blogService.getAllBlogs(query);
  }

  @Get(":id")
  @Public()
  @ApiOperation({ summary: "Get a blog post by ID" })
  @ApiResponse({ status: 200, description: "Return the blog post." })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async getBlogById(@Param("id") id: string) {
    return this.blogService.getBlogById(id);
  }

  @Get("slug/:slug")
  @Public()
  @ApiOperation({ summary: "Get a blog post by slug" })
  @ApiResponse({ status: 200, description: "Return the blog post." })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "slug", type: String })
  @MediumRateLimit
  async getBlogBySlug(@Param("slug") slug: string) {
    return this.blogService.getBlogBySlug(slug);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update a blog post" })
  @ApiResponse({
    status: 200,
    description: "The blog post has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateBlogDto })
  @MediumRateLimit
  async updateBlog(
    @Param("id") id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Request() req
  ) {
    return this.blogService.updateBlog(req.user.id, id, updateBlogDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete a blog post" })
  @ApiResponse({
    status: 204,
    description: "The blog post has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  @MediumRateLimit
  async deleteBlog(@Param("id") id: string, @Request() req) {
    return this.blogService.deleteBlog(req.user.id, id);
  }

  @Post(":id/restore")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Restore a deleted blog post" })
  @ApiResponse({
    status: 200,
    description: "The blog post has been successfully restored.",
  })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async restoreBlog(@Param("id") id: string, @Request() req) {
    return this.blogService.restoreBlog(req.user.id, id);
  }

  @Delete(":id/permanent")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Permanently delete a blog post" })
  @ApiResponse({
    status: 204,
    description: "The blog post has been permanently deleted.",
  })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  @MediumRateLimit
  async permanentlyDeleteBlog(@Param("id") id: string, @Request() req) {
    return this.blogService.permanentlyDeleteBlog(req.user.id, id);
  }

  @Post(":id/like")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Like a blog post" })
  @ApiResponse({ status: 200, description: "The blog post has been liked." })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async likeBlog(@Param("id") id: string) {
    await this.blogService.getBlogById(id); // Verify blog exists
    return this.blogService.incrementBlogLikeCount(id);
  }

  @Post(":id/unlike")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Unlike a blog post" })
  @ApiResponse({ status: 200, description: "The blog post has been unliked." })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async unlikeBlog(@Param("id") id: string) {
    await this.blogService.getBlogById(id); // Verify blog exists
    return this.blogService.decrementBlogLikeCount(id);
  }

  @Post(":id/share")
  @Public()
  @ApiOperation({ summary: "Record a blog post share" })
  @ApiResponse({
    status: 200,
    description: "The blog post share has been recorded.",
  })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async shareBlog(@Param("id") id: string) {
    await this.blogService.getBlogById(id); // Verify blog exists
    return this.blogService.incrementBlogShareCount(id);
  }

  // Blog Category endpoints
  @Post("categories")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiOperation({ summary: "Create a new blog category" })
  @ApiResponse({
    status: 201,
    description: "The blog category has been successfully created.",
  })
  @ApiBody({ type: CreateBlogCategoryDto })
  @MediumRateLimit
  async createBlogCategory(
    @Body() createBlogCategoryDto: CreateBlogCategoryDto
  ) {
    return this.blogService.createBlogCategory(createBlogCategoryDto);
  }

  @Get("categories")
  @Public()
  @ApiOperation({ summary: "Get all blog categories" })
  @ApiResponse({ status: 200, description: "Return all blog categories." })
  @MediumRateLimit
  async getAllBlogCategories() {
    return this.blogService.getAllBlogCategories();
  }

  @Get("categories/:id")
  @Public()
  @ApiOperation({ summary: "Get a blog category by ID" })
  @ApiResponse({ status: 200, description: "Return the blog category." })
  @ApiResponse({ status: 404, description: "Blog category not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async getBlogCategoryById(@Param("id") id: string) {
    return this.blogService.getBlogCategoryById(id);
  }

  @Get("categories/slug/:slug")
  @Public()
  @ApiOperation({ summary: "Get a blog category by slug" })
  @ApiResponse({ status: 200, description: "Return the blog category." })
  @ApiResponse({ status: 404, description: "Blog category not found." })
  @ApiParam({ name: "slug", type: String })
  @MediumRateLimit
  async getBlogCategoryBySlug(@Param("slug") slug: string) {
    return this.blogService.getBlogCategoryBySlug(slug);
  }

  @Patch("categories/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiOperation({ summary: "Update a blog category" })
  @ApiResponse({
    status: 200,
    description: "The blog category has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Blog category not found." })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateBlogCategoryDto })
  @MediumRateLimit
  async updateBlogCategory(
    @Param("id") id: string,
    @Body() updateBlogCategoryDto: UpdateBlogCategoryDto
  ) {
    return this.blogService.updateBlogCategory(id, updateBlogCategoryDto);
  }

  @Delete("categories/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiOperation({ summary: "Delete a blog category" })
  @ApiResponse({
    status: 204,
    description: "The blog category has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Blog category not found." })
  @ApiParam({ name: "id", type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  @MediumRateLimit
  async deleteBlogCategory(@Param("id") id: string) {
    return this.blogService.deleteBlogCategory(id);
  }

  // Blog Tag endpoints
  @Post("tags")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new blog tag" })
  @ApiResponse({
    status: 201,
    description: "The blog tag has been successfully created.",
  })
  @ApiBody({ type: CreateBlogTagDto })
  @MediumRateLimit
  async createBlogTag(@Body() createBlogTagDto: CreateBlogTagDto) {
    return this.blogService.createBlogTag(createBlogTagDto);
  }

  @Get("tags")
  @Public()
  @ApiOperation({ summary: "Get all blog tags" })
  @ApiResponse({ status: 200, description: "Return all blog tags." })
  @MediumRateLimit
  async getAllBlogTags() {
    return this.blogService.getAllBlogTags();
  }

  @Get("tags/:id")
  @Public()
  @ApiOperation({ summary: "Get a blog tag by ID" })
  @ApiResponse({ status: 200, description: "Return the blog tag." })
  @ApiResponse({ status: 404, description: "Blog tag not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async getBlogTagById(@Param("id") id: string) {
    return this.blogService.getBlogTagById(id);
  }

  @Get("tags/slug/:slug")
  @Public()
  @ApiOperation({ summary: "Get a blog tag by slug" })
  @ApiResponse({ status: 200, description: "Return the blog tag." })
  @ApiResponse({ status: 404, description: "Blog tag not found." })
  @ApiParam({ name: "slug", type: String })
  @MediumRateLimit
  async getBlogTagBySlug(@Param("slug") slug: string) {
    return this.blogService.getBlogTagBySlug(slug);
  }

  @Patch("tags/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update a blog tag" })
  @ApiResponse({
    status: 200,
    description: "The blog tag has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Blog tag not found." })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateBlogTagDto })
  @MediumRateLimit
  async updateBlogTag(
    @Param("id") id: string,
    @Body() updateBlogTagDto: UpdateBlogTagDto
  ) {
    return this.blogService.updateBlogTag(id, updateBlogTagDto);
  }

  @Delete("tags/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete a blog tag" })
  @ApiResponse({
    status: 204,
    description: "The blog tag has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Blog tag not found." })
  @ApiParam({ name: "id", type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  @MediumRateLimit
  async deleteBlogTag(@Param("id") id: string) {
    return this.blogService.deleteBlogTag(id);
  }

  // Blog Comment endpoints
  @Post("comments")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new blog comment" })
  @ApiResponse({
    status: 201,
    description: "The blog comment has been successfully created.",
  })
  @ApiBody({ type: CreateBlogCommentDto })
  @MediumRateLimit
  async createBlogComment(
    @Body() createBlogCommentDto: CreateBlogCommentDto,
    @Request() req
  ) {
    return this.blogService.createBlogComment(
      req.user.id,
      createBlogCommentDto
    );
  }

  @Get("comments/:blogId")
  @Public()
  @ApiOperation({ summary: "Get all comments for a blog post" })
  @ApiResponse({ status: 200, description: "Return all blog comments." })
  @ApiResponse({ status: 404, description: "Blog post not found." })
  @ApiParam({ name: "blogId", type: String })
  @MediumRateLimit
  async getAllBlogComments(@Param("blogId") blogId: string) {
    return this.blogService.getAllBlogComments(blogId);
  }

  @Get("comments/single/:id")
  @Public()
  @ApiOperation({ summary: "Get a blog comment by ID" })
  @ApiResponse({ status: 200, description: "Return the blog comment." })
  @ApiResponse({ status: 404, description: "Blog comment not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async getBlogCommentById(@Param("id") id: string) {
    return this.blogService.getBlogCommentById(id);
  }

  @Patch("comments/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update a blog comment" })
  @ApiResponse({
    status: 200,
    description: "The blog comment has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Blog comment not found." })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateBlogCommentDto })
  @MediumRateLimit
  async updateBlogComment(
    @Param("id") id: string,
    @Body() updateBlogCommentDto: UpdateBlogCommentDto,
    @Request() req
  ) {
    return this.blogService.updateBlogComment(
      req.user.id,
      id,
      updateBlogCommentDto
    );
  }

  @Delete("comments/:id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete a blog comment" })
  @ApiResponse({
    status: 204,
    description: "The blog comment has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Blog comment not found." })
  @ApiParam({ name: "id", type: String })
  @HttpCode(HttpStatus.NO_CONTENT)
  @MediumRateLimit
  async deleteBlogComment(@Param("id") id: string, @Request() req) {
    return this.blogService.deleteBlogComment(req.user.id, id);
  }

  @Post("comments/:id/like")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Like a blog comment" })
  @ApiResponse({ status: 200, description: "The blog comment has been liked." })
  @ApiResponse({ status: 404, description: "Blog comment not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async likeComment(@Param("id") id: string) {
    await this.blogService.getBlogCommentById(id); // Verify comment exists
    return this.blogService.incrementCommentLikeCount(id);
  }

  @Post("comments/:id/unlike")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Unlike a blog comment" })
  @ApiResponse({
    status: 200,
    description: "The blog comment has been unliked.",
  })
  @ApiResponse({ status: 404, description: "Blog comment not found." })
  @ApiParam({ name: "id", type: String })
  @MediumRateLimit
  async unlikeComment(@Param("id") id: string) {
    await this.blogService.getBlogCommentById(id); // Verify comment exists
    return this.blogService.decrementCommentLikeCount(id);
  }
}
