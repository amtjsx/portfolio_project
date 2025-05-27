import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { User } from "../user/models/user.model";
import { EducationService } from "./education.service";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { EducationQueryDto } from "./dto/education-query.dto";
import { ReorderEducationDto } from "./dto/reorder-education.dto";
import { ApiResponseEntity } from "../common/entities/api-response.entity";

@ApiTags("education")
@Controller("education")
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new education entry" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The education entry has been successfully created.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  async create(
    createEducationDto: CreateEducationDto,
    @CurrentUser() user: User
  ) {
    // Ensure the user can only create education for themselves
    if (user.role !== "admin" && createEducationDto.userId !== user.id) {
      createEducationDto.userId = user.id;
    }

    const education = await this.educationService.create(createEducationDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Education entry created successfully",
      data: education,
    };
  }

  @Get()
  @ApiOperation({ summary: "Get all education entries with filtering" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all education entries based on filters.",
    type: ApiResponseEntity,
  })
  async findAll(@Query() query: EducationQueryDto) {
    const result = await this.educationService.findAll(query);
    return {
      statusCode: HttpStatus.OK,
      message: "Education entries retrieved successfully",
      data: result.data,
      meta: {
        total: result.count,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      },
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific education entry" })
  @ApiParam({ name: "id", description: "Education ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns the education entry.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Education entry not found.",
  })
  async findOne(@Param("id") id: string) {
    const education = await this.educationService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: "Education entry retrieved successfully",
      data: education,
    };
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all education entries for a user" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all education entries for the user.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found.",
  })
  async findByUserId(@Param("userId") userId: string) {
    const educations = await this.educationService.findByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      message: "Education entries retrieved successfully",
      data: educations,
    };
  }

  @Get("portfolio/:portfolioId")
  @ApiOperation({ summary: "Get all education entries for a portfolio" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Returns all education entries for the portfolio.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Portfolio not found.",
  })
  async findByPortfolioId(@Param("portfolioId") portfolioId: string) {
    const educations =
      await this.educationService.findByPortfolioId(portfolioId);
    return {
      statusCode: HttpStatus.OK,
      message: "Education entries retrieved successfully",
      data: educations,
    };
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update an education entry" })
  @ApiParam({ name: "id", description: "Education ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The education entry has been successfully updated.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Education entry not found.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  async update(
    @Param("id") id: string,
    updateEducationDto: UpdateEducationDto,
    @CurrentUser() user: User
  ) {
    // Get the education entry to check ownership
    const education = await this.educationService.findOne(id);

    // Ensure the user can only update their own education entries
    if (user.role !== "admin" && education.userId !== user.id) {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        message: "You are not authorized to update this education entry",
      };
    }

    const updatedEducation = await this.educationService.update(
      id,
      updateEducationDto
    );
    return {
      statusCode: HttpStatus.OK,
      message: "Education entry updated successfully",
      data: updatedEducation,
    };
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete an education entry" })
  @ApiParam({ name: "id", description: "Education ID" })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The education entry has been successfully deleted.",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Education entry not found.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  async remove(@Param("id") id: string, @CurrentUser() user: User) {
    // Get the education entry to check ownership
    const education = await this.educationService.findOne(id);

    // Ensure the user can only delete their own education entries
    if (user.role !== "admin" && education.userId !== user.id) {
      return;
    }

    await this.educationService.remove(id);
  }

  @Post("reorder")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Reorder education entries" })
  @ApiBody({ type: ReorderEducationDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Education entries reordered successfully.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  async reorder(reorderDto: ReorderEducationDto, @CurrentUser() user: User) {
    // Ensure the user can only reorder their own education entries
    if (user.role !== "admin" && reorderDto.userId !== user.id) {
      reorderDto.userId = user.id;
    }

    const educations = await this.educationService.reorder(reorderDto);
    return {
      statusCode: HttpStatus.OK,
      message: "Education entries reordered successfully",
      data: educations,
    };
  }

  @Post(":id/portfolio/:portfolioId")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Add education to a portfolio" })
  @ApiParam({ name: "id", description: "Education ID" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Education added to portfolio successfully.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Education or portfolio not found.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  async addToPortfolio(
    @Param("id") id: string,
    @Param("portfolioId") portfolioId: string,
    @CurrentUser() user: User
  ) {
    // Get the education entry to check ownership
    const education = await this.educationService.findOne(id);

    // Ensure the user can only add their own education entries to portfolios
    if (user.role !== "admin" && education.userId !== user.id) {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        message:
          "You are not authorized to add this education entry to a portfolio",
      };
    }

    const updatedEducation = await this.educationService.addToPortfolio(
      id,
      portfolioId
    );
    return {
      statusCode: HttpStatus.OK,
      message: "Education added to portfolio successfully",
      data: updatedEducation,
    };
  }

  @Delete(":id/portfolio")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Remove education from a portfolio" })
  @ApiParam({ name: "id", description: "Education ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Education removed from portfolio successfully.",
    type: ApiResponseEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Education not found.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  async removeFromPortfolio(
    @Param("id") id: string,
    @CurrentUser() user: User
  ) {
    // Get the education entry to check ownership
    const education = await this.educationService.findOne(id);

    // Ensure the user can only remove their own education entries from portfolios
    if (user.role !== "admin" && education.userId !== user.id) {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        message:
          "You are not authorized to remove this education entry from a portfolio",
      };
    }

    const updatedEducation =
      await this.educationService.removeFromPortfolio(id);
    return {
      statusCode: HttpStatus.OK,
      message: "Education removed from portfolio successfully",
      data: updatedEducation,
    };
  }
}
