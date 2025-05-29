import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UploadService } from "../upload/upload.service";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";
import { UpdatePortfolioDto } from "./dto/update-portfolio.dto";
import { PortfolioService } from "./portfolio.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("portfolio")
@Controller("portfolio")
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly uploadService: UploadService
  ) {}

  @Get("about")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get personal information and bio" })
  @ApiResponse({
    status: 200,
    description: "Personal information retrieved successfully",
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "John Doe" },
        title: { type: "string", example: "Full Stack Developer" },
        bio: { type: "string", example: "Passionate developer..." },
        location: { type: "string", example: "New York, USA" },
        email: { type: "string", example: "john@example.com" },
        linkedin: {
          type: "string",
          example: "https://linkedin.com/in/johndoe",
        },
        github: { type: "string", example: "https://github.com/johndoe" },
        website: { type: "string", example: "https://johndoe.com" },
      },
    },
  })
  getAbout() {
    return this.portfolioService.getAbout();
  }

  @Get("skills")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get technical and soft skills" })
  @ApiResponse({ status: 200, description: "Skills retrieved successfully" })
  getSkills() {
    return this.portfolioService.getSkills();
  }

  @Get("experience")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get work experience history" })
  @ApiResponse({
    status: 200,
    description: "Experience history retrieved successfully",
  })
  getExperience() {
    return this.portfolioService.getExperience();
  }

  @Get("education")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get education background" })
  @ApiResponse({
    status: 200,
    description: "Education information retrieved successfully",
  })
  getEducation() {
    return this.portfolioService.getEducation();
  }

  @Get("portfolios")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all portfolios" })
  @ApiResponse({
    status: 200,
    description: "Portfolios retrieved successfully",
  })
  findAllPortfolios() {
    return this.portfolioService.findAll();
  }

  @Get("portfolios/published")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all published portfolios" })
  @ApiResponse({
    status: 200,
    description: "Published portfolios retrieved successfully",
  })
  findPublished() {
    return this.portfolioService.findPublished();
  }

  @Get("portfolios/featured")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get featured portfolios" })
  @ApiResponse({
    status: 200,
    description: "Featured portfolios retrieved successfully",
  })
  findFeatured() {
    return this.portfolioService.findFeatured();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a portfolio by ID" })
  @ApiResponse({ status: 200, description: "Portfolio retrieved successfully" })
  @ApiResponse({ status: 404, description: "Portfolio not found" })
  findOnePortfolio(@Param("id") id: string) {
    console.log("get portfolio by id", id, new Date());
    return this.portfolioService.findOne(id);
  }

  @Get("user/:userId")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get portfolios by user ID" })
  @ApiResponse({
    status: 200,
    description: "User portfolios retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  findByUserId(@Param("userId") userId: string) {
    return this.portfolioService.findByUserId(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new portfolio" })
  @ApiBody({ type: CreatePortfolioDto })
  @ApiResponse({ status: 201, description: "Portfolio created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  createPortfolio(
    @Body() createPortfolioDto: CreatePortfolioDto,
    @Request() req: any
  ) {
    return this.portfolioService.create(createPortfolioDto, req.user);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update a portfolio" })
  @ApiParam({ name: "id", description: "Portfolio ID", example: 1 })
  @ApiBody({ type: UpdatePortfolioDto })
  @ApiResponse({ status: 200, description: "Portfolio updated successfully" })
  @ApiResponse({ status: 404, description: "Portfolio not found" })
  updatePortfolio(@Param("id") id: string, @Body() updatePortfolioDto: any) {
    console.log("update portfolio", id, updatePortfolioDto);
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete a portfolio" })
  @ApiParam({ name: "id", description: "Portfolio ID", example: 1 })
  @ApiResponse({ status: 200, description: "Portfolio deleted successfully" })
  @ApiResponse({ status: 404, description: "Portfolio not found" })
  removePortfolio(@Param("id") id: string) {
    return this.portfolioService.remove(+id);
  }

  @Patch(":id/views")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Increment portfolio views" })
  @ApiParam({ name: "id", description: "Portfolio ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Portfolio views incremented successfully",
  })
  @ApiResponse({ status: 404, description: "Portfolio not found" })
  incrementViews(@Param("id") id: string) {
    return this.portfolioService.incrementViews(+id);
  }

  @Get(":id/analytics")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get portfolio analytics" })
  @ApiParam({ name: "id", description: "Portfolio ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Portfolio analytics retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Portfolio not found" })
  getAnalytics(@Param("id") id: string) {
    return this.portfolioService.getAnalytics(id);
  }

  @Post(":id/resume")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Upload and attach resume to portfolio" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        resume: {
          type: "string",
          format: "binary",
          description: "PDF resume file (max 5MB)",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Resume uploaded and attached successfully",
  })
  @UseInterceptors(FileInterceptor("resume"))
  async uploadPortfolioResume(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException("No resume file uploaded");
    }

    // Validate file
    if (file.mimetype !== "application/pdf") {
      throw new BadRequestException("Resume must be a PDF file");
    }

    // Save file and get URL
    const fileInfo = await this.uploadService.saveFileInfo(file, id, "resume"); // In real app, get user ID from auth

    // Update portfolio with resume URL
    const updateDto = { resumeUrl: fileInfo.url };
    const updatedPortfolio = await this.portfolioService.update(id, updateDto);

    return {
      portfolio: updatedPortfolio,
      file: fileInfo,
      message: "Resume uploaded and attached to portfolio successfully",
    };
  }

  @Post(":id/cover-image")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Upload and attach cover image to portfolio" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary",
          description: "Cover image file (JPG, PNG, WebP - max 3MB)",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Cover image uploaded and attached successfully",
  })
  @UseInterceptors(FileInterceptor("image"))
  async uploadPortfolioCoverImage(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException("No image file uploaded");
    }

    // Validate file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException("Image must be JPEG, PNG, or WebP format");
    }

    // Save file and get URL
    const fileInfo = await this.uploadService.saveFileInfo(file, id, "image"); // In real app, get user ID from auth

    // Update portfolio with cover image URL
    const updateDto = { coverImageUrl: fileInfo.url };
    const updatedPortfolio = await this.portfolioService.update(id, updateDto);

    return {
      portfolio: updatedPortfolio,
      file: fileInfo,
      message: "Cover image uploaded and attached to portfolio successfully",
    };
  }

  @Get("portfolios/:id/files")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all files attached to a portfolio" })
  @ApiResponse({
    status: 200,
    description: "Portfolio files retrieved successfully",
  })
  getPortfolioFiles(@Param("id") id: string) {
    return {
      portfolioId: +id,
      files: {
        resume: "/api/upload/files/resume-1234567890-123456789.pdf",
        coverImage: "/api/upload/files/image-1234567890-987654321.jpg",
        avatar: "/api/upload/files/image-1234567890-555555555.jpg",
      },
      message: "Portfolio files retrieved successfully",
    };
  }
}
