import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { SkillService } from "./skill.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { SkillQueryDto } from "./dto/skill-query.dto";
import { CreateSkillCategoryDto } from "./dto/create-skill-category.dto";
import { UpdateSkillCategoryDto } from "./dto/update-skill-category.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ProficiencyLevel } from "./models/skill.model";

@ApiTags("skills")
@Controller("skills")
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  // Skill Category Endpoints
  @Post("categories")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new skill category" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The skill category has been successfully created.",
  })
  createCategory(createSkillCategoryDto: CreateSkillCategoryDto) {
    return this.skillService.createCategory(createSkillCategoryDto);
  }

  @Get("categories/user/:userId")
  @ApiOperation({ summary: "Get all skill categories for a user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all skill categories for the specified user.",
  })
  findAllCategories(@Param("userId") userId: string) {
    return this.skillService.findAllCategories(userId);
  }

  @Get("categories/:id")
  @ApiOperation({ summary: "Get a skill category by ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns the skill category with the specified ID.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Skill category not found.",
  })
  findCategoryById(@Param("id") id: string) {
    return this.skillService.findCategoryById(id);
  }

  @Patch("categories/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a skill category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The skill category has been successfully updated.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Skill category not found.",
  })
  updateCategory(
    @Param("id") id: string,
    updateSkillCategoryDto: UpdateSkillCategoryDto
  ) {
    return this.skillService.updateCategory(id, updateSkillCategoryDto);
  }

  @Delete("categories/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a skill category" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The skill category has been successfully deleted.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Skill category not found.",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Cannot delete category with skills.",
  })
  removeCategory(@Param("id") id: string) {
    return this.skillService.removeCategory(id);
  }

  @Post("categories/reorder")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Reorder skill categories" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The skill categories have been successfully reordered.",
  })
  reorderCategories(reorderDto: { userId: string; categoryIds: string[] }) {
    return this.skillService.reorderCategories(
      reorderDto.userId,
      reorderDto.categoryIds
    );
  }

  // Skill Endpoints
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new skill" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The skill has been successfully created.",
  })
  create(createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all skills with filtering and pagination" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all skills based on the query parameters.",
  })
  findAll(query: SkillQueryDto) {
    return this.skillService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a skill by ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns the skill with the specified ID.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Skill not found.",
  })
  findOne(@Param("id") id: string) {
    return this.skillService.findOne(id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all skills for a user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all skills for the specified user.",
  })
  findByUser(@Param("userId") userId: string) {
    return this.skillService.findByUser(userId);
  }

  @Get("portfolio/:portfolioId")
  @ApiOperation({ summary: "Get all skills for a portfolio" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all skills for the specified portfolio.",
  })
  findByPortfolio(@Param("portfolioId") portfolioId: string) {
    return this.skillService.findByPortfolio(portfolioId);
  }

  @Get("category/:categoryId")
  @ApiOperation({ summary: "Get all skills for a category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all skills for the specified category.",
  })
  findByCategory(@Param("categoryId") categoryId: string) {
    return this.skillService.findByCategory(categoryId);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a skill" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The skill has been successfully updated.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Skill not found.",
  })
  update(@Param("id") id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a skill" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The skill has been successfully deleted.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Skill not found.",
  })
  remove(@Param("id") id: string) {
    return this.skillService.remove(id);
  }

  @Post(":id/endorse")
  @ApiOperation({ summary: "Add an endorsement to a skill" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The skill has been successfully endorsed.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Skill not found.",
  })
  addEndorsement(@Param("id") id: string) {
    return this.skillService.addEndorsement(id);
  }

  @Get("proficiency/:userId/:level")
  @ApiOperation({ summary: "Get skills by proficiency level" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns skills with the specified proficiency level.",
  })
  getSkillsByProficiencyLevel(
    @Param("userId") userId: string,
    @Param("level") level: ProficiencyLevel
  ) {
    return this.skillService.getSkillsByProficiencyLevel(userId, level);
  }

  @Get("with-categories/:userId")
  @ApiOperation({ summary: "Get skills organized by categories" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns skills organized by categories.",
  })
  getSkillsWithCategories(@Param("userId") userId: string) {
    return this.skillService.getSkillsWithCategories(userId);
  }

  @Post("reorder")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Reorder skills within a category" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The skills have been successfully reordered.",
  })
  reorderSkills(reorderDto: {
    userId: string;
    categoryId: string;
    skillIds: string[];
  }) {
    return this.skillService.reorderSkills(
      reorderDto.userId,
      reorderDto.categoryId,
      reorderDto.skillIds
    );
  }
}
