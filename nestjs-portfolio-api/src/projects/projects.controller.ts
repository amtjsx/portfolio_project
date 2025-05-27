import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreateProjectDto } from "./dto/create-project.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { ProjectsService } from "./projects.service"

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: "Get all projects" })
  @ApiResponse({
    status: 200,
    description: "All projects retrieved successfully",
    schema: {
      type: "object",
      properties: {
        data: { type: "array", items: { type: "object" } },
        total: { type: "number", example: 3 },
      },
    },
  })
  findAll() {
    return this.projectsService.findAll()
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured projects" })
  @ApiResponse({ status: 200, description: "Featured projects retrieved successfully" })
  findFeatured() {
    return this.projectsService.findFeatured()
  }

  @Get("status/:status")
  @ApiOperation({ summary: "Get projects by status" })
  @ApiResponse({ status: 200, description: "Projects by status retrieved successfully" })
  findByStatus(@Param("status") status: string) {
    return this.projectsService.findByStatus(status)
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get projects for a specific user" })
  @ApiResponse({ status: 200, description: "User projects retrieved successfully" })
  findByUserId(@Param("userId") userId: string) {
    return this.projectsService.findByUserId(userId)
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get projects by category' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  findByCategory(@Param('category') category: string) {
    return this.projectsService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a project" })
  @ApiParam({ name: "id", description: "Project ID", example: 1 })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, description: "Project updated successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', description: 'Project ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
