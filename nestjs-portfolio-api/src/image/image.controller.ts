import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { User } from "src/user/models/user.model";
import { GenerateVariantDto } from "./dto/generate-variant.dto";
import { ImageQueryDto } from "./dto/image-query.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { ImageService } from "./image.service";
import { ImageFormat, ImageSize } from "./models/image-variant.model";
import { ImageCategory } from "./models/image.model";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("images")
@Controller("images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiOperation({ summary: "Upload a new image" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
          description: "Image file (JPG, PNG, GIF, WebP)",
        },
        category: {
          type: "string",
          enum: Object.values(ImageCategory),
          description: "Image category",
        },
        title: {
          type: "string",
          description: "Image title",
        },
        altText: {
          type: "string",
          description: "Image alt text",
        },
        caption: {
          type: "string",
          description: "Image caption",
        },
        description: {
          type: "string",
          description: "Image description",
        },
        focalPointX: {
          type: "number",
          description: "Image focal point X (0-1)",
        },
        focalPointY: {
          type: "number",
          description: "Image focal point Y (0-1)",
        },
        tags: {
          type: "string",
          description: "Image tags (comma-separated)",
        },
        isPublic: {
          type: "boolean",
          description: "Whether image is public",
        },
        generateVariants: {
          type: "boolean",
          description: "Generate variants automatically",
        },
      },
      required: ["file"],
    },
  })
  @ApiResponse({ status: 201, description: "Image uploaded successfully" })
  @ApiResponse({ status: 400, description: "Invalid file type or size" })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/temp",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `temp-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
          cb(null, true);
        } else {
          cb(new Error("Only image files are allowed"), false);
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    })
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: any,
    @CurrentUser() user: User
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    // Parse tags if they come as a string
    if (typeof createImageDto.tags === "string") {
      createImageDto.tags = (createImageDto.tags as unknown as string)
        .split(",")
        .map((tag) => tag.trim());
    }

    return this.imageService.create(createImageDto, file, user);
  }

  @Get()
  @ApiOperation({ summary: "Get all images" })
  @ApiResponse({ status: 200, description: "Return all images" })
  async findAll(@Query() query: ImageQueryDto) {
    return this.imageService.findAll(query);
  }

  @Get("stats")
  @ApiOperation({ summary: "Get image statistics" })
  @ApiResponse({ status: 200, description: "Return image statistics" })
  async getStats() {
    return this.imageService.getImageStats();
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all images for a user" })
  @ApiParam({ name: "userId", description: "User ID" })
  @ApiQuery({
    name: "category",
    required: false,
    enum: Object.values(ImageCategory),
    description: "Filter by category",
  })
  @ApiResponse({ status: 200, description: "Return all images for a user" })
  async getUserImages(
    @Param("userId") userId: string,
    @Query("category") category?: ImageCategory
  ) {
    return this.imageService.getUserImages(userId, category);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an image by ID" })
  @ApiParam({ name: "id", description: "Image ID" })
  @ApiResponse({ status: 200, description: "Return the image" })
  @ApiResponse({ status: 404, description: "Image not found" })
  async findOne(@Param("id") id: string) {
    return this.imageService.findOne(id);
  }

  @Get("file/:filename")
  @ApiOperation({ summary: "Serve an image file" })
  @ApiParam({ name: "filename", description: "Image filename" })
  @ApiResponse({ status: 200, description: "Return the image file" })
  @ApiResponse({ status: 404, description: "Image file not found" })
  async serveFile(@Param("filename") filename: string, @Res() res: Response) {
    try {
      console.log("filename", filename);
      const fileInfo = await this.imageService.getImageFile(filename);

      // Set appropriate headers
      res.setHeader("Content-Type", fileInfo.mimetype);
      res.setHeader("Content-Length", fileInfo.size);

      // Enable caching for 1 day
      res.setHeader("Cache-Control", "public, max-age=86400");

      res.sendFile(fileInfo.path, { root: "." });
    } catch (error) {
      console.log("error", error);
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: "Image file not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  @Get(":id/:size/:format")
  @ApiOperation({ summary: "Get an image variant" })
  @ApiParam({ name: "id", description: "Image ID" })
  @ApiParam({
    name: "size",
    description: "Image size",
    enum: Object.values(ImageSize),
  })
  @ApiParam({
    name: "format",
    description: "Image format",
    enum: Object.values(ImageFormat),
  })
  @ApiResponse({ status: 200, description: "Return the image variant" })
  @ApiResponse({ status: 404, description: "Image variant not found" })
  async getVariant(
    @Param("id") id: string,
    @Param("size") size: ImageSize,
    @Param("format") format: ImageFormat,
    @Res() res: Response
  ) {
    try {
      // First, check if the variant exists
      const variant = await this.imageService.getVariant(id, size, format);

      // Get the file info
      const fileInfo = await this.imageService.getVariantFile(variant.id);

      // Set appropriate headers
      res.setHeader("Content-Type", fileInfo.mimetype);
      res.setHeader("Content-Length", fileInfo.size);

      // Enable caching for 1 day
      res.setHeader("Cache-Control", "public, max-age=86400");

      res.sendFile(fileInfo.path, { root: "." });
    } catch (error) {
      if (error instanceof NotFoundException) {
        // If variant doesn't exist, try to generate it
        try {
          const variant = await this.imageService.generateVariant(id, {
            size,
            format,
          });
          const fileInfo = await this.imageService.getVariantFile(variant.id);

          // Set appropriate headers
          res.setHeader("Content-Type", fileInfo.mimetype);
          res.setHeader("Content-Length", fileInfo.size);

          // Enable caching for 1 day
          res.setHeader("Cache-Control", "public, max-age=86400");

          res.sendFile(fileInfo.path, { root: "." });
        } catch (genError) {
          res.status(404).json({
            message: "Image variant not found and could not be generated",
          });
        }
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  @Post(":id/variants")
  @ApiOperation({ summary: "Generate a new image variant" })
  @ApiParam({ name: "id", description: "Image ID" })
  @ApiBody({ type: GenerateVariantDto })
  @ApiResponse({
    status: 201,
    description: "Image variant generated successfully",
  })
  @ApiResponse({ status: 404, description: "Image not found" })
  async generateVariant(
    @Param("id") id: string,
    @Body() generateVariantDto: GenerateVariantDto
  ) {
    return this.imageService.generateVariant(id, generateVariantDto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an image" })
  @ApiParam({ name: "id", description: "Image ID" })
  @ApiBody({ type: UpdateImageDto })
  @ApiResponse({ status: 200, description: "Image updated successfully" })
  @ApiResponse({ status: 404, description: "Image not found" })
  async update(
    @Param("id") id: string,
    @Body() updateImageDto: UpdateImageDto
  ) {
    return this.imageService.update(id, updateImageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an image" })
  @ApiParam({ name: "id", description: "Image ID" })
  @ApiResponse({ status: 200, description: "Image deleted successfully" })
  @ApiResponse({ status: 404, description: "Image not found" })
  async remove(@Param("id") id: string) {
    return this.imageService.remove(id);
  }
}
