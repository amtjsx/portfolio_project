import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreateTechnicalDto } from "./dto/create-technical.dto"
import { UpdateTechnicalDto } from "./dto/update-technical.dto"
import { TechnicalService } from "./technical.service"

@ApiTags("technical")
@Controller("technical")
export class TechnicalController {
  constructor(private readonly technicalService: TechnicalService) {}

  @Get()
  @ApiOperation({ summary: "Get all technical skills" })
  @ApiResponse({ status: 200, description: "Technical skills retrieved successfully" })
  findAll() {
    return this.technicalService.findAll()
  }

  @Get("top")
  @ApiOperation({ summary: "Get top technical skills" })
  @ApiQuery({ name: "limit", required: false, description: "Number of top skills to return", example: 10 })
  @ApiResponse({ status: 200, description: "Top technical skills retrieved successfully" })
  getTopSkills(@Query("limit") limit?: string) {
    const skillLimit = limit ? Number.parseInt(limit, 10) : 10
    return this.technicalService.getTopSkills(skillLimit)
  }

  @Get("currently-used")
  @ApiOperation({ summary: "Get currently used technologies" })
  @ApiResponse({ status: 200, description: "Currently used technologies retrieved successfully" })
  getCurrentlyUsed() {
    return this.technicalService.getCurrentlyUsed()
  }

  @Get("by-level")
  @ApiOperation({ summary: "Get skills by minimum level" })
  @ApiQuery({ name: "minLevel", required: false, description: "Minimum skill level", example: 80 })
  @ApiResponse({ status: 200, description: "Skills filtered by level retrieved successfully" })
  getSkillsByLevel(@Query("minLevel") minLevel?: string) {
    const level = minLevel ? Number.parseInt(minLevel, 10) : 0
    return this.technicalService.getSkillsByLevel(level)
  }

  @Get("category/:category")
  @ApiOperation({ summary: "Get technical skills by category" })
  @ApiParam({ name: "category", description: "Technology category", example: "frontend" })
  @ApiResponse({ status: 200, description: "Technical skills by category retrieved successfully" })
  findByCategory(@Param("category") category: string) {
    return this.technicalService.findByCategory(category)
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get technical skills for a specific user" })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiResponse({ status: 200, description: "User technical skills retrieved successfully" })
  findByUserId(@Param("userId") userId: string) {
    return this.technicalService.findByUserId(userId)
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a technical skill by ID" })
  @ApiParam({ name: "id", description: "Technical skill ID", example: 1 })
  @ApiResponse({ status: 200, description: "Technical skill retrieved successfully" })
  @ApiResponse({ status: 404, description: "Technical skill not found" })
  findOne(@Param("id") id: string) {
    return this.technicalService.findOne(+id)
  }

  @Post()
  @ApiOperation({ summary: "Create a new technical skill" })
  @ApiBody({ type: CreateTechnicalDto })
  @ApiResponse({ status: 201, description: "Technical skill created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  create(@Body() createTechnicalDto: CreateTechnicalDto) {
    return this.technicalService.create(createTechnicalDto)
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a technical skill" })
  @ApiParam({ name: "id", description: "Technical skill ID", example: 1 })
  @ApiBody({ type: UpdateTechnicalDto })
  @ApiResponse({ status: 200, description: "Technical skill updated successfully" })
  @ApiResponse({ status: 404, description: "Technical skill not found" })
  update(@Param("id") id: string, @Body() updateTechnicalDto: UpdateTechnicalDto) {
    return this.technicalService.update(+id, updateTechnicalDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a technical skill" })
  @ApiParam({ name: "id", description: "Technical skill ID", example: 1 })
  @ApiResponse({ status: 200, description: "Technical skill deleted successfully" })
  @ApiResponse({ status: 404, description: "Technical skill not found" })
  remove(@Param("id") id: string) {
    return this.technicalService.remove(+id)
  }
}
