import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { MulterModule } from "@nestjs/platform-express"
import { UploadController } from "./upload.controller"
import { UploadService } from "./upload.service"
import { UploadedFile } from "./models/uploaded-file.model"
import { diskStorage } from "multer"
import { extname } from "path"

@Module({
  imports: [
    SequelizeModule.forFeature([UploadedFile]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = file.fieldname === "resume" ? "./uploads/resumes" : "./uploads/images"
          cb(null, uploadPath)
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.fieldname === "resume") {
          // Allow PDF files for resumes
          if (file.mimetype === "application/pdf") {
            cb(null, true)
          } else {
            cb(new Error("Only PDF files are allowed for resumes"), false)
          }
        } else if (file.fieldname === "image" || file.fieldname === "avatar" || file.fieldname === "projectImage") {
          // Allow image files
          if (file.mimetype.startsWith("image/")) {
            cb(null, true)
          } else {
            cb(new Error("Only image files are allowed"), false)
          }
        } else {
          cb(new Error("Invalid field name"), false)
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService, SequelizeModule],
})
export class UploadModule {}
