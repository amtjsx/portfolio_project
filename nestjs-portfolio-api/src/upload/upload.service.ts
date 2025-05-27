import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { existsSync, promises as fs, mkdirSync } from "fs";
import { join } from "path";
import { UploadedFile as UploadedFileModel } from "./models/uploaded-file.model";

@Injectable()
export class UploadService {
  private readonly uploadsDir = "./uploads";
  private readonly resumesDir = "./uploads/resumes";
  private readonly imagesDir = "./uploads/images";

  constructor(
    @InjectModel(UploadedFileModel)
    private readonly uploadedFileModel: typeof UploadedFileModel
  ) {
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist() {
    const directories = [this.uploadsDir, this.resumesDir, this.imagesDir];

    directories.forEach((dir) => {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    });
  }

  async saveFileInfo(
    file: Express.Multer.File,
    userId: string,
    type: "resume" | "image" | "avatar" | "projectImage"
  ) {
    const fileInfo = await this.uploadedFileModel.create({
      userId,
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      type,
      url: `/api/upload/files/${file.filename}`,
      isActive: true,
    });

    return fileInfo;
  }

  async getFileInfo(filename: string) {
    const resumePath = join(this.resumesDir, filename);
    const imagePath = join(this.imagesDir, filename);

    let filePath: string;
    if (existsSync(resumePath)) {
      filePath = resumePath;
    } else if (existsSync(imagePath)) {
      filePath = imagePath;
    } else {
      throw new NotFoundException("File not found");
    }

    try {
      const stats = await fs.stat(filePath);
      return {
        path: filePath,
        size: stats.size,
        lastModified: stats.mtime,
      };
    } catch (error) {
      throw new NotFoundException("File not found");
    }
  }

  async deleteFile(filename: string) {
    // Find file in database
    const fileRecord = await this.uploadedFileModel.findOne({
      where: { filename },
    });

    if (!fileRecord) {
      throw new NotFoundException("File record not found");
    }

    const resumePath = join(this.resumesDir, filename);
    const imagePath = join(this.imagesDir, filename);

    let filePath: string;
    if (existsSync(resumePath)) {
      filePath = resumePath;
    } else if (existsSync(imagePath)) {
      filePath = imagePath;
    } else {
      throw new NotFoundException("File not found");
    }

    try {
      // Delete physical file
      await fs.unlink(filePath);

      // Mark as inactive in database instead of deleting record
      await fileRecord.update({ isActive: false });

      return { message: "File deleted successfully" };
    } catch (error) {
      throw new BadRequestException("Failed to delete file");
    }
  }

  async getUserFiles(
    userId: string,
    type?: "resume" | "image" | "avatar" | "projectImage"
  ) {
    const whereClause: any = {
      userId,
      isActive: true,
    };

    if (type) {
      whereClause.type = type;
    }

    const files = await this.uploadedFileModel.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    return {
      files,
      totalFiles: files.length,
      totalSize,
    };
  }

  async getFileById(id: number) {
    const file = await this.uploadedFileModel.findByPk(id);

    if (!file || !file.isActive) {
      throw new NotFoundException("File not found");
    }

    return file;
  }

  async updateFileDescription(id: number, description: string) {
    const file = await this.uploadedFileModel.findByPk(id);

    if (!file || !file.isActive) {
      throw new NotFoundException("File not found");
    }

    await file.update({ description });
    return file;
  }

  async getFileStats() {
    const totalFiles = await this.uploadedFileModel.count({
      where: { isActive: true },
    });
    const totalSize = await this.uploadedFileModel.sum("size", {
      where: { isActive: true },
    });

    const filesByType = await this.uploadedFileModel.findAll({
      attributes: [
        "type",
        [
          require("sequelize").fn("COUNT", require("sequelize").col("id")),
          "count",
        ],
        [
          require("sequelize").fn("SUM", require("sequelize").col("size")),
          "totalSize",
        ],
      ],
      where: { isActive: true },
      group: ["type"],
      raw: true,
    });

    return {
      totalFiles,
      totalSize: totalSize || 0,
      filesByType,
    };
  }

  validateFileType(file: Express.Multer.File, allowedTypes: string[]) {
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${file.mimetype} is not allowed`
      );
    }
  }

  validateFileSize(file: Express.Multer.File, maxSizeInMB: number) {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new BadRequestException(`File size exceeds ${maxSizeInMB}MB limit`);
    }
  }

  generateThumbnail(imagePath: string) {
    // This would typically use a library like Sharp to generate thumbnails
    // For now, we'll return a placeholder implementation
    return {
      thumbnailUrl: `/api/upload/thumbnails/${imagePath}`,
      message: "Thumbnail generation would be implemented here",
    };
  }
}
