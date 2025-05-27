import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { PortfolioController } from "./portfolio.controller"
import { PortfolioService } from "./portfolio.service"
import { Portfolio } from "./models/portfolio.model"
import { UploadModule } from "../upload/upload.module"
import { FileManagementService } from "./file-management.service"

@Module({
  imports: [SequelizeModule.forFeature([Portfolio]), UploadModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, FileManagementService],
  exports: [PortfolioService, SequelizeModule],
})
export class PortfolioModule {}
