import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
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
import { UploadService } from "./upload.service";

@ApiTags("upload")
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("resume")
  @ApiOperation({ summary: "Upload a resume/CV file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        resume: {
          type: "string",
          format: "binary",
          description: "PDF file (max 10MB)",
        },
        userId: {
          type: "number",
          description: "User ID",
          example: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Resume uploaded successfully",
    schema: {
      type: "object",
      properties: {
        id: { type: "number", example: 1234567890 },
        userId: { type: "number", example: 1 },
        originalName: { type: "string", example: "john-doe-resume.pdf" },
        filename: {
          type: "string",
          example: "resume-1234567890-123456789.pdf",
        },
        url: {
          type: "string",
          example: "/api/upload/files/resume-1234567890-123456789.pdf",
        },
        size: { type: "number", example: 1024000 },
        type: { type: "string", example: "resume" },
        uploadedAt: { type: "string", example: "2024-01-01T00:00:00.000Z" },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Invalid file type or size" })
  @UseInterceptors(FileInterceptor("resume"))
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userId: string }
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    if (!body.userId) {
      throw new BadRequestException("User ID is required");
    }

    // Additional validation
    this.uploadService.validateFileType(file, ["application/pdf"]);
    this.uploadService.validateFileSize(file, 10); // 10MB limit

    return this.uploadService.saveFileInfo(file, body.userId, "resume");
  }

  @Post("image")
  @ApiOperation({ summary: "Upload an image file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary",
          description: "Image file (JPG, PNG, GIF, WebP - max 10MB)",
        },
        userId: {
          type: "number",
          description: "User ID",
          example: 1,
        },
        type: {
          type: "string",
          description: "Image type",
          enum: ["avatar", "projectImage", "image"],
          example: "avatar",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Image uploaded successfully",
    schema: {
      type: "object",
      properties: {
        id: { type: "number", example: 1234567890 },
        userId: { type: "number", example: 1 },
        originalName: { type: "string", example: "profile-photo.jpg" },
        filename: { type: "string", example: "image-1234567890-123456789.jpg" },
        url: {
          type: "string",
          example: "/api/upload/files/image-1234567890-123456789.jpg",
        },
        size: { type: "number", example: 512000 },
        type: { type: "string", example: "avatar" },
        uploadedAt: { type: "string", example: "2024-01-01T00:00:00.000Z" },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Invalid file type or size" })
  @UseInterceptors(FileInterceptor("image"))
  async uploadImage(
    file: Express.Multer.File,
    @Body() body: { userId: string; type: "avatar" | "projectImage" | "image" }
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    if (!body.userId) {
      throw new BadRequestException("User ID is required");
    }

    // Additional validation
    this.uploadService.validateFileType(file, [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ]);
    this.uploadService.validateFileSize(file, 10); // 10MB limit

    const fileInfo = await this.uploadService.saveFileInfo(file, body.userId, body.type);

    // Generate thumbnail for images
    const thumbnail = this.uploadService.generateThumbnail(file.filename);

    return {
      ...fileInfo,
      thumbnail,
    };
  }

  @Post("multiple")
  @ApiOperation({ summary: "Upload multiple files" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
          description: "Multiple files (max 5 files, 10MB each)",
        },
        userId: {
          type: "number",
          description: "User ID",
          example: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Files uploaded successfully",
    schema: {
      type: "object",
      properties: {
        uploadedFiles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              filename: { type: "string" },
              url: { type: "string" },
              size: { type: "number" },
              type: { type: "string" },
            },
          },
        },
        totalFiles: { type: "number", example: 3 },
        totalSize: { type: "number", example: 2048000 },
      },
    },
  })
  @UseInterceptors(FilesInterceptor("files", 5)) // Max 5 files
  async uploadMultipleFiles(files: Express.Multer.File[], @Body() body: { userId: string }) {
    if (!files || files.length === 0) {
      throw new BadRequestException("No files uploaded");
    }

    if (!body.userId) {
      throw new BadRequestException("User ID is required");
    }

    const uploadedFiles = [];
    let totalSize = 0;

    for (const file of files) {
      // Determine file type based on mimetype
      let fileType: "resume" | "image" | "avatar" | "projectImage" = "image";
      if (file.mimetype === "application/pdf") {
        fileType = "resume";
      } else if (file.mimetype.startsWith("image/")) {
        fileType = "image";
      }

      const fileInfo = await this.uploadService.saveFileInfo(
        file,
        body.userId,
        fileType
      );
      uploadedFiles.push(fileInfo);
      totalSize += file.size;
    }

    return {
      uploadedFiles,
      totalFiles: uploadedFiles.length,
      totalSize,
      message: `Successfully uploaded ${uploadedFiles.length} files`,
    };
  }

  @Get("files/:filename")
  @ApiOperation({ summary: "Serve uploaded files" })
  @ApiParam({
    name: "filename",
    description: "File name",
    example: "resume-1234567890-123456789.pdf",
  })
  @ApiResponse({ status: 200, description: "File served successfully" })
  @ApiResponse({ status: 404, description: "File not found" })
  async serveFile(@Param("filename") filename: string, @Res() res: Response) {
    try {
      const fileInfo = await this.uploadService.getFileInfo(filename);

      // Set appropriate headers
      res.setHeader("Content-Type", this.getContentType(filename));
      res.setHeader("Content-Length", fileInfo.size);
      res.setHeader("Last-Modified", fileInfo.lastModified.toUTCString());

      // Enable caching for 1 hour
      res.setHeader("Cache-Control", "public, max-age=3600");

      res.sendFile(fileInfo.path, { root: "." });
    } catch (error) {
      res.status(404).json({ message: "File not found" });
    }
  }

  @Get("info/:filename")
  @ApiOperation({ summary: "Get file information" })
  @ApiParam({
    name: "filename",
    description: "File name",
    example: "resume-1234567890-123456789.pdf",
  })
  @ApiResponse({
    status: 200,
    description: "File information retrieved successfully",
    schema: {
      type: "object",
      properties: {
        filename: {
          type: "string",
          example: "resume-1234567890-123456789.pdf",
        },
        size: { type: "number", example: 1024000 },
        lastModified: { type: "string", example: "2024-01-01T00:00:00.000Z" },
        url: {
          type: "string",
          example: "/api/upload/files/resume-1234567890-123456789.pdf",
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: "File not found" })
  async getFileInfo(@Param("filename") filename: string) {
    const fileInfo = await this.uploadService.getFileInfo(filename);
    return {
      filename,
      size: fileInfo.size,
      lastModified: fileInfo.lastModified,
      url: `/api/upload/files/${filename}`,
    };
  }

  @Delete("files/:filename")
  @ApiOperation({ summary: "Delete an uploaded file" })
  @ApiParam({
    name: "filename",
    description: "File name",
    example: "resume-1234567890-123456789.pdf",
  })
  @ApiResponse({ status: 200, description: "File deleted successfully" })
  @ApiResponse({ status: 404, description: "File not found" })
  async deleteFile(@Param("filename") filename: string) {
    return this.uploadService.deleteFile(filename);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all files uploaded by a user" })
  @ApiParam({ name: "userId", description: "User ID", example: 1 })
  @ApiQuery({
    name: "type",
    required: false,
    description: "Filter by file type",
    enum: ["resume", "image", "avatar", "projectImage"],
  })
  @ApiResponse({
    status: 200,
    description: "User files retrieved successfully",
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              userId: { type: "number" },
              filename: { type: "string" },
              originalName: { type: "string" },
              url: { type: "string" },
              size: { type: "number" },
              type: { type: "string" },
              uploadedAt: { type: "string" },
            },
          },
        },
        totalFiles: { type: "number", example: 5 },
        totalSize: { type: "number", example: 5120000 },
      },
    },
  })
  async getUserFiles(
    @Param("userId") userId: string,
    @Query("type") type?: "resume" | "image" | "avatar" | "projectImage"
  ) {
    return this.uploadService.getUserFiles(userId, type);
  }

  @Get("stats")
  @ApiOperation({ summary: "Get file upload statistics" })
  @ApiResponse({
    status: 200,
    description: "File statistics retrieved successfully",
  })
  async getFileStats() {
    return this.uploadService.getFileStats();
  }

  @Get("file/:id")
  @ApiOperation({ summary: "Get file information by ID" })
  @ApiParam({ name: "id", description: "File ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "File information retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "File not found" })
  async getFileById(@Param("id") id: string) {
    return this.uploadService.getFileById(+id);
  }

  @Patch("file/:id/description")
  @ApiOperation({ summary: "Update file description" })
  @ApiParam({ name: "id", description: "File ID", example: 1 })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        description: { type: "string", example: "Updated file description" },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "File description updated successfully",
  })
  async updateFileDescription(
    @Param("id") id: string,
    @Body() body: { description: string }
  ) {
    return this.uploadService.updateFileDescription(+id, body.description);
  }

  private getContentType(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase();

    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    };

    return mimeTypes[ext || ""] || "application/octet-stream";
  }
}
