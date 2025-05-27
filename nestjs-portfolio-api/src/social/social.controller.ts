import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";
import { SocialService } from "./social.service";

@ApiTags("social")
@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get()
  @ApiOperation({ summary: "Get all social links" })
  @ApiResponse({
    status: 200,
    description: "Social links retrieved successfully",
  })
  findAll() {
    return this.socialService.findAll();
  }

  @Get("active")
  @ApiOperation({ summary: "Get all active social links" })
  @ApiResponse({
    status: 200,
    description: "Active social links retrieved successfully",
  })
  findActive() {
    return this.socialService.findActive();
  }

  @Get("popular-platforms")
  @ApiOperation({ summary: "Get popular social media platforms statistics" })
  @ApiResponse({
    status: 200,
    description: "Platform statistics retrieved successfully",
  })
  getPopularPlatforms() {
    return this.socialService.getPopularPlatforms();
  }

  @Get("search")
  @ApiOperation({ summary: "Search social links" })
  @ApiQuery({ name: "q", description: "Search query", example: "linkedin" })
  @ApiResponse({
    status: 200,
    description: "Search results retrieved successfully",
  })
  searchSocialLinks(@Query() query: { q: string }) {
    if (!query.q || query.q.trim().length < 2) {
      throw new BadRequestException(
        "Search query must be at least 2 characters long"
      );
    }
    return this.socialService.searchSocialLinks(query.q.trim());
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get social links for a specific user" })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "User social links retrieved successfully",
  })
  findByUserId(@Param("userId", ParseIntPipe) userId: string) {
    return this.socialService.findByUserId(userId);
  }

  @Get("user/:userId/navigation")
  @ApiOperation({ summary: "Get navigation social links for a user" })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Navigation social links retrieved successfully",
  })
  findNavigation(@Param("userId", ParseIntPipe) userId: string) {
    return this.socialService.findNavigation(userId);
  }

  @Get("user/:userId/stats")
  @ApiOperation({ summary: "Get social media statistics for a user" })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "User social media statistics retrieved successfully",
  })
  getStatsByUser(@Param("userId", ParseIntPipe) userId: string) {
    return this.socialService.getStatsByUser(userId);
  }

  @Get("portfolio/:portfolioId")
  @ApiOperation({ summary: "Get social links for a specific portfolio" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Portfolio social links retrieved successfully",
  })
  findByPortfolioId(@Param("portfolioId", ParseIntPipe) portfolioId: number) {
    return this.socialService.findByPortfolioId(portfolioId);
  }

  @Get("platform/:platform")
  @ApiOperation({ summary: "Get social links by platform" })
  @ApiParam({
    name: "platform",
    description: "Social media platform",
    example: "linkedin",
  })
  @ApiResponse({
    status: 200,
    description: "Platform social links retrieved successfully",
  })
  findByPlatform(@Param("platform") platform: string) {
    return this.socialService.findByPlatform(platform);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a social link by ID" })
  @ApiParam({ name: "id", description: "Social link ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Social link retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Social link not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.socialService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new social link" })
  @ApiBody({ type: CreateSocialDto })
  @ApiResponse({ status: 201, description: "Social link created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  create(@Body() createSocialDto: CreateSocialDto) {
    return this.socialService.create(createSocialDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a social link" })
  @ApiParam({ name: "id", description: "Social link ID", example: 1 })
  @ApiBody({ type: UpdateSocialDto })
  @ApiResponse({ status: 200, description: "Social link updated successfully" })
  @ApiResponse({ status: 404, description: "Social link not found" })
  update(@Param("id") id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialService.update(id, updateSocialDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a social link" })
  @ApiParam({ name: "id", description: "Social link ID", example: 1 })
  @ApiResponse({ status: 200, description: "Social link deleted successfully" })
  @ApiResponse({ status: 404, description: "Social link not found" })
  remove(@Param("id") id: string) {
    return this.socialService.remove(id);
  }

  @Patch(":id/click")
  @ApiOperation({ summary: "Increment click count for a social link" })
  @ApiParam({ name: "id", description: "Social link ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Click count incremented successfully",
  })
  @ApiResponse({ status: 404, description: "Social link not found" })
  incrementClickCount(@Param("id") id: string) {
    return this.socialService.incrementClickCount(id);
  }

  @Patch(":id/toggle-active")
  @ApiOperation({ summary: "Toggle active status of a social link" })
  @ApiParam({ name: "id", description: "Social link ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Social link status toggled successfully",
  })
  @ApiResponse({ status: 404, description: "Social link not found" })
  toggleActive(@Param("id") id: string) {
    return this.socialService.toggleActive(id);
  }

  @Patch("user/:userId/display-order")
  @ApiOperation({ summary: "Update display order for user's social links" })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        orderUpdates: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number", example: 1 },
              displayOrder: { type: "number", example: 1 },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Display order updated successfully",
  })
  updateDisplayOrder(
    @Param("userId", ParseIntPipe) userId: string,
    @Body() body: { orderUpdates: { id: string; displayOrder: number }[] }
  ) {
    return this.socialService.updateDisplayOrder(userId, body.orderUpdates);
  }

  @Patch("user/:userId/bulk-active")
  @ApiOperation({
    summary: "Bulk update active status for user's social links",
  })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        isActive: { type: "boolean", example: true },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Bulk update completed successfully",
  })
  bulkUpdateActive(
    @Param("userId", ParseIntPipe) userId: string,
    @Body() body: { isActive: boolean }
  ) {
    return this.socialService.bulkUpdateActive(userId, body.isActive);
  }
}
