import { Injectable } from "@nestjs/common"
import { UploadService } from "../upload/upload.service"

@Injectable()
export class FileManagementService {
  constructor(private readonly uploadService: UploadService) {}

  async attachResumeToPortfolio(portfolioId: number, resumeUrl: string) {
    // In a real application, you would update the portfolio in the database
    return {
      portfolioId,
      resumeUrl,
      message: "Resume attached to portfolio successfully",
      updatedAt: new Date().toISOString(),
    }
  }

  async attachImageToPortfolio(portfolioId: number, imageUrl: string, imageType: "cover" | "avatar") {
    // In a real application, you would update the portfolio in the database
    return {
      portfolioId,
      imageUrl,
      imageType,
      message: `${imageType} image attached to portfolio successfully`,
      updatedAt: new Date().toISOString(),
    }
  }

  async getPortfolioFiles(portfolioId: number) {
    // In a real application, you would query the database for portfolio files
    return {
      portfolioId,
      files: {
        resume: "/api/upload/files/resume-1234567890-123456789.pdf",
        coverImage: "/api/upload/files/image-1234567890-987654321.jpg",
        avatar: "/api/upload/files/image-1234567890-555555555.jpg",
        projectImages: [
          "/api/upload/files/image-1234567890-111111111.jpg",
          "/api/upload/files/image-1234567890-222222222.jpg",
        ],
      },
      totalFiles: 5,
    }
  }

  async removeFileFromPortfolio(portfolioId: number, fileUrl: string) {
    // Extract filename from URL
    const filename = fileUrl.split("/").pop()

    if (filename) {
      await this.uploadService.deleteFile(filename)
    }

    return {
      portfolioId,
      removedFile: fileUrl,
      message: "File removed from portfolio successfully",
      updatedAt: new Date().toISOString(),
    }
  }

  validateFileForPortfolio(file: Express.Multer.File, expectedType: "resume" | "image") {
    if (expectedType === "resume") {
      if (file.mimetype !== "application/pdf") {
        throw new Error("Resume must be a PDF file")
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit for resumes
        throw new Error("Resume file size must be less than 5MB")
      }
    } else if (expectedType === "image") {
      const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      if (!allowedImageTypes.includes(file.mimetype)) {
        throw new Error("Image must be JPEG, PNG, or WebP format")
      }
      if (file.size > 3 * 1024 * 1024) {
        // 3MB limit for images
        throw new Error("Image file size must be less than 3MB")
      }
    }
  }
}
