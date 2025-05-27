import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { MulterModule } from "@nestjs/platform-express"
import { ImageController } from "./image.controller"
import { ImageService } from "./image.service"
import { Image } from "./models/image.model"
import { ImageVariant } from "./models/image-variant.model"
import { diskStorage } from "multer"
import { existsSync, mkdirSync } from "fs"

// Ensure temp directory exists
const tempDir = "./uploads/temp"
if (!existsSync(tempDir)) {
  mkdirSync(tempDir, { recursive: true })
}

@Module({
  imports: [
    SequelizeModule.forFeature([Image, ImageVariant]),
    MulterModule.register({
      storage: diskStorage({
        destination: tempDir,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
          const ext = file.originalname.split(".").pop()
          cb(null, `temp-${uniqueSuffix}.${ext}`)
        },
      }),
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService, SequelizeModule],
})
export class ImageModule {}
