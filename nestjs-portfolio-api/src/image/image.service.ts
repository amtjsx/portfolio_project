import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { existsSync, promises as fs, mkdirSync } from "fs";
import { extname, join } from "path";
import * as sharp from "sharp";
import { Op } from "../common/models/sequelize-imports";
import type { CreateImageDto } from "./dto/create-image.dto";
import type { GenerateVariantDto } from "./dto/generate-variant.dto";
import type { ImageQueryDto } from "./dto/image-query.dto";
import type { UpdateImageDto } from "./dto/update-image.dto";
import {
  ImageFormat,
  ImageSize,
  ImageVariant,
} from "./models/image-variant.model";
import { Image, ImageCategory, ImageStatus } from "./models/image.model";

@Injectable()
export class ImageService {
  private readonly uploadsDir = "./uploads";
  private readonly imagesDir = "./uploads/images";
  private readonly variantsDir = "./uploads/images/variants";

  constructor(
    @InjectModel(Image) private imageModel: typeof Image,
    @InjectModel(ImageVariant)
    private imageVariantModel: typeof ImageVariant
  ) {
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist() {
    const directories = [this.uploadsDir, this.imagesDir, this.variantsDir];

    directories.forEach((dir) => {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    });
  }

  async create(
    createImageDto: CreateImageDto,
    file: Express.Multer.File
  ): Promise<Image> {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    // Validate file type
    this.validateFileType(file);

    // Get image dimensions
    const dimensions = await this.getImageDimensions(file.path);

    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname).toLowerCase();
    const filename = `image-${uniqueSuffix}${ext}`;
    const path = join(this.imagesDir, filename);

    // Move file to images directory
    await fs.rename(file.path, path);

    // Extract dominant color
    const dominantColor = await this.extractDominantColor(path);

    // Create image record
    const image = await this.imageModel.create({
      userId: createImageDto.userId,
      originalName: file.originalname,
      filename,
      path,
      mimetype: file.mimetype,
      size: file.size,
      category: createImageDto.category || ImageCategory.GENERAL,
      status: ImageStatus.READY,
      width: dimensions.width,
      height: dimensions.height,
      title: createImageDto.title,
      altText: createImageDto.altText,
      caption: createImageDto.caption,
      description: createImageDto.description,
      focalPointX: createImageDto.focalPointX || 0.5,
      focalPointY: createImageDto.focalPointY || 0.5,
      dominantColor,
      tags: createImageDto.tags || [],
      metadata: await this.extractMetadata(path),
      url: `/api/images/${filename}`,
      isPublic:
        createImageDto.isPublic !== undefined ? createImageDto.isPublic : true,
    });

    // Generate variants if requested
    if (createImageDto.generateVariants !== false) {
      await this.generateDefaultVariants(image.id);
    }

    // Reload image with variants
    return this.findOne(image.id);
  }

  async findAll(
    query: ImageQueryDto
  ): Promise<{ images: Image[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const whereClause: any = {};

    if (query.userId) {
      whereClause.userId = query.userId;
    }

    if (query.category) {
      whereClause.category = query.category;
    }

    if (query.isPublic !== undefined) {
      whereClause.isPublic = query.isPublic;
    }

    if (query.search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${query.search}%` } },
        { altText: { [Op.like]: `%${query.search}%` } },
        { caption: { [Op.like]: `%${query.search}%` } },
        { description: { [Op.like]: `%${query.search}%` } },
      ];
    }

    if (query.tags) {
      const tagList = query.tags.split(",").map((tag) => tag.trim());
      whereClause.tags = { [Op.overlap]: tagList };
    }

    if (query.createdAfter) {
      whereClause.createdAt = {
        ...(whereClause.createdAt || {}),
        [Op.gte]: query.createdAfter,
      };
    }

    if (query.createdBefore) {
      whereClause.createdAt = {
        ...(whereClause.createdAt || {}),
        [Op.lte]: query.createdBefore,
      };
    }

    const { rows, count } = await this.imageModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      ...(query.includeDeleted ? { paranoid: false } : {}),
    });

    return {
      images: rows,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Image> {
    const image = await this.imageModel.findByPk(id, {
      include: [
        {
          model: ImageVariant,
          as: "variants",
        },
      ],
    });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    return image;
  }

  async findByFilename(filename: string): Promise<Image> {
    const image = await this.imageModel.findOne({
      where: { filename },
      include: [
        {
          model: ImageVariant,
          as: "variants",
        },
      ],
    });

    if (!image) {
      throw new NotFoundException(`Image with filename ${filename} not found`);
    }

    return image;
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
    const image = await this.findOne(id);

    await image.update(updateImageDto);

    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const image = await this.findOne(id);

    // Get all variants
    const variants = await this.imageVariantModel.findAll({
      where: { imageId: id },
    });

    // Delete variant files
    for (const variant of variants) {
      try {
        await fs.unlink(variant.path);
      } catch (error) {
        console.error(`Failed to delete variant file: ${variant.path}`, error);
      }
    }

    // Delete original file
    try {
      await fs.unlink(image.path);
    } catch (error) {
      console.error(`Failed to delete image file: ${image.path}`, error);
    }

    // Soft delete image (will cascade to variants)
    await image.softDelete();

    return { message: "Image deleted successfully" };
  }

  async generateVariant(
    id: string,
    generateVariantDto: GenerateVariantDto
  ): Promise<ImageVariant> {
    const image = await this.findOne(id);

    // Check if variant already exists
    const existingVariant = await this.imageVariantModel.findOne({
      where: {
        imageId: id,
        size: generateVariantDto.size,
        format: generateVariantDto.format,
      },
    });

    if (existingVariant) {
      return existingVariant;
    }

    // Generate variant
    const variant = await this.createVariant(image, generateVariantDto);

    return variant;
  }

  async getVariant(
    id: string,
    size: ImageSize,
    format: ImageFormat
  ): Promise<ImageVariant> {
    const variant = await this.imageVariantModel.findOne({
      where: {
        imageId: id,
        size,
        format,
      },
    });

    if (!variant) {
      throw new NotFoundException(
        `Variant with size ${size} and format ${format} not found for image ${id}`
      );
    }

    return variant;
  }

  async getImageFile(
    filename: string
  ): Promise<{ path: string; mimetype: string; size: number }> {
    try {
      const image = await this.findByFilename(filename);
      const stats = await fs.stat(image.path);

      return {
        path: image.path,
        mimetype: image.mimetype,
        size: stats.size,
      };
    } catch (error) {
      throw new NotFoundException("Image file not found");
    }
  }

  async getVariantFile(variantId: string): Promise<{
    path: string;
    mimetype: string;
    size: number;
    filename: string;
  }> {
    try {
      const variant = await this.imageVariantModel.findByPk(variantId);

      if (!variant) {
        throw new NotFoundException(`Variant with ID ${variantId} not found`);
      }

      const stats = await fs.stat(variant.path);

      return {
        path: variant.path,
        mimetype: variant.mimetype,
        size: stats.size,
        filename: variant.filename,
      };
    } catch (error) {
      throw new NotFoundException("Variant file not found");
    }
  }

  async getUserImages(
    userId: string,
    category?: ImageCategory
  ): Promise<{ images: Image[]; total: number; totalSize: number }> {
    const whereClause: any = { userId };

    if (category) {
      whereClause.category = category;
    }

    const images = await this.imageModel.findAll({
      where: whereClause,
      include: [
        {
          model: ImageVariant,
          as: "variants",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const totalSize = images.reduce((sum, image) => sum + image.size, 0);

    return {
      images,
      total: images.length,
      totalSize,
    };
  }

  async getImageStats(): Promise<any> {
    const totalImages = await this.imageModel.count();
    const totalSize = await this.imageModel.sum("size");

    const imagesByCategory = await this.imageModel.findAll({
      attributes: [
        "category",
        [
          require("sequelize").fn("COUNT", require("sequelize").col("id")),
          "count",
        ],
        [
          require("sequelize").fn("SUM", require("sequelize").col("size")),
          "totalSize",
        ],
      ],
      group: ["category"],
      raw: true,
    });

    const totalVariants = await this.imageVariantModel.count();
    const variantSize = await this.imageVariantModel.sum("size");

    const variantsByFormat = await this.imageVariantModel.findAll({
      attributes: [
        "format",
        [
          require("sequelize").fn("COUNT", require("sequelize").col("id")),
          "count",
        ],
        [
          require("sequelize").fn("SUM", require("sequelize").col("size")),
          "totalSize",
        ],
      ],
      group: ["format"],
      raw: true,
    });

    const variantsBySize = await this.imageVariantModel.findAll({
      attributes: [
        "size",
        [
          require("sequelize").fn("COUNT", require("sequelize").col("id")),
          "count",
        ],
        [
          require("sequelize").fn("SUM", require("sequelize").col("size")),
          "totalSize",
        ],
      ],
      group: ["size"],
      raw: true,
    });

    return {
      totalImages,
      totalSize: totalSize || 0,
      imagesByCategory,
      totalVariants,
      variantSize: variantSize || 0,
      variantsByFormat,
      variantsBySize,
      totalStorageUsed: (totalSize || 0) + (variantSize || 0),
    };
  }

  // Helper methods
  private validateFileType(file: Express.Multer.File) {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${file.mimetype} is not allowed`
      );
    }
  }

  private async getImageDimensions(
    filePath: string
  ): Promise<{ width: number; height: number }> {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        width: metadata.width || 0,
        height: metadata.height || 0,
      };
    } catch (error) {
      console.error("Error getting image dimensions:", error);
      return { width: 0, height: 0 };
    }
  }

  private async extractDominantColor(filePath: string): Promise<string> {
    try {
      // This is a simplified implementation
      // In a real app, you might use a more sophisticated algorithm
      const { data } = await sharp(filePath)
        .resize(50, 50, { fit: "inside" })
        .raw()
        .toBuffer({ resolveWithObject: true });

      // if (data) {
      //   const dominantColor = await this.extractDominantColor(data.data)
      //   return `#${dominantColor.toString(16).padStart(2, "0")}`
      // }

      return "#000000";
    } catch (error) {
      console.error("Error extracting dominant color:", error);
      return "#000000";
    }
  }

  private async extractMetadata(
    filePath: string
  ): Promise<Record<string, any>> {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        format: metadata.format,
        space: metadata.space,
        channels: metadata.channels,
        depth: metadata.depth,
        density: metadata.density,
        chromaSubsampling: metadata.chromaSubsampling,
        isProgressive: metadata.isProgressive,
        hasProfile: metadata.hasProfile,
        hasAlpha: metadata.hasAlpha,
      };
    } catch (error) {
      console.error("Error extracting metadata:", error);
      return {};
    }
  }

  private async generateDefaultVariants(imageId: string): Promise<void> {
    const image = await this.findOne(imageId);

    // Define default variants to generate
    const defaultVariants = [
      { size: ImageSize.THUMBNAIL, format: ImageFormat.WEBP, quality: 80 },
      { size: ImageSize.SMALL, format: ImageFormat.WEBP, quality: 80 },
      { size: ImageSize.MEDIUM, format: ImageFormat.WEBP, quality: 80 },
      { size: ImageSize.LARGE, format: ImageFormat.WEBP, quality: 80 },
    ];

    // Generate each variant
    for (const variant of defaultVariants) {
      await this.createVariant(image, variant);
    }
  }

  private async createVariant(
    image: Image,
    options: { size: ImageSize; format: ImageFormat; quality?: number }
  ): Promise<ImageVariant> {
    const { size, format, quality = 80 } = options;

    // Determine dimensions based on size
    const dimensions = this.getSizeDimensions(size, image.width, image.height);

    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${image.filename.split(".")[0]}-${size}-${uniqueSuffix}.${format}`;
    const path = join(this.variantsDir, filename);

    // Create the variant file
    try {
      let sharpInstance = sharp(image.path).resize(
        dimensions.width,
        dimensions.height,
        {
          fit: "inside",
          withoutEnlargement: true,
        }
      );

      // Apply format-specific options
      switch (format) {
        case ImageFormat.JPEG:
          sharpInstance = sharpInstance.jpeg({ quality });
          break;
        case ImageFormat.PNG:
          sharpInstance = sharpInstance.png({
            quality: Math.floor(quality / 10),
          });
          break;
        case ImageFormat.WEBP:
          sharpInstance = sharpInstance.webp({ quality });
          break;
        case ImageFormat.AVIF:
          sharpInstance = sharpInstance.avif({ quality });
          break;
        case ImageFormat.GIF:
          sharpInstance = sharpInstance.gif();
          break;
      }

      await sharpInstance.toFile(path);

      // Get file size
      const stats = await fs.stat(path);

      // Create variant record
      const variant = await this.imageVariantModel.create({
        imageId: image.id,
        format,
        filename,
        path,
        mimetype: `image/${format === ImageFormat.JPEG ? "jpeg" : format}`,
        size,
        width: dimensions.width,
        height: dimensions.height,
        url: `/api/images/${image.id}/${size}/${format}`,
        quality,
      });

      return variant;
    } catch (error) {
      console.error("Error creating variant:", error);
      throw new InternalServerErrorException("Failed to create image variant");
    }
  }

  private getSizeDimensions(
    size: ImageSize,
    originalWidth: number,
    originalHeight: number
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    switch (size) {
      case ImageSize.THUMBNAIL:
        return { width: 150, height: Math.round(150 / aspectRatio) };
      case ImageSize.SMALL:
        return { width: 300, height: Math.round(300 / aspectRatio) };
      case ImageSize.MEDIUM:
        return { width: 600, height: Math.round(600 / aspectRatio) };
      case ImageSize.LARGE:
        return { width: 1200, height: Math.round(1200 / aspectRatio) };
      case ImageSize.ORIGINAL:
      default:
        return { width: originalWidth, height: originalHeight };
    }
  }
}
