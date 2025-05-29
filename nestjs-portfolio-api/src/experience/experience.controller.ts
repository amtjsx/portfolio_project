import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  BadRequestException,
  Body,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ExperienceService } from "./experience.service";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";
import { ExperienceQueryDto } from "./dto/experience-query.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Public } from "../auth/decorators/public.decorator";
import { User } from "src/user/models/user.model";

@ApiTags("experience")
@Controller("experience")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @ApiOperation({ summary: "Create a new experience" })
  @ApiResponse({ status: 201, description: "Experience created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  create(
    @Body() createExperienceDto: CreateExperienceDto,
    @CurrentUser() user: User
  ) {
    return this.experienceService.create(createExperienceDto, user);
  }

  @Get()
  @ApiOperation({ summary: "Get all experiences with optional filtering" })
  @ApiResponse({
    status: 200,
    description: "Experiences retrieved successfully",
  })
  findAll(@Query() query: ExperienceQueryDto, @Request() req: any) {
    return this.experienceService.findAll(query, req.user);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an experience by ID" })
  @ApiParam({ name: "id", description: "Experience ID" })
  @ApiResponse({
    status: 200,
    description: "Experience retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Experience not found" })
  findOne(@Param("id") id: string) {
    return this.experienceService.findOne(id);
  }

  @Get("user/:userId")
  @Public()
  @ApiOperation({ summary: "Get experiences by user ID" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "Experiences retrieved successfully",
  })
  findByUserId(@Param("userId") userId: string) {
    return this.experienceService.findByUserId(userId);
  }

  @Get("portfolio/:portfolioId")
  @Public()
  @ApiOperation({ summary: "Get experiences by portfolio ID" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID" })
  @ApiResponse({
    status: 200,
    description: "Experiences retrieved successfully",
  })
  findByPortfolioId(@Param("portfolioId") portfolioId: string) {
    return this.experienceService.findByPortfolioId(portfolioId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an experience" })
  @ApiParam({ name: "id", description: "Experience ID" })
  @ApiResponse({ status: 200, description: "Experience updated successfully" })
  @ApiResponse({ status: 404, description: "Experience not found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async update(
    @Param("id") id: string,
    updateExperienceDto: UpdateExperienceDto,
    @CurrentUser() user: any
  ) {
    // Ensure the user can only update their own experiences
    const experience = await this.experienceService.findOne(id);
    if (experience.userId !== user.id && !user.isAdmin) {
      throw new BadRequestException("You can only update your own experiences");
    }
    return this.experienceService.update(id, updateExperienceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an experience" })
  @ApiParam({ name: "id", description: "Experience ID" })
  @ApiResponse({ status: 200, description: "Experience deleted successfully" })
  @ApiResponse({ status: 404, description: "Experience not found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async remove(@Param("id") id: string, @CurrentUser() user: any) {
    // Ensure the user can only delete their own experiences
    const experience = await this.experienceService.findOne(id);
    if (experience.userId !== user.id && !user.isAdmin) {
      throw new BadRequestException("You can only delete your own experiences");
    }
    return this.experienceService.remove(id);
  }

  @Post("reorder")
  @ApiOperation({ summary: "Reorder experiences" })
  @ApiResponse({
    status: 200,
    description: "Experiences reordered successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  reorder(data: { experienceIds: string[] }, @CurrentUser() user: any) {
    return this.experienceService.reorder(user.id, data.experienceIds);
  }
}
