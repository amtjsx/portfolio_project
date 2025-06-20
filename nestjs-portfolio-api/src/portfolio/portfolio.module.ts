import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Social } from "src/social/models/social.model";
import { UploadModule } from "../upload/upload.module";
import { FileManagementService } from "./file-management.service";
import { Portfolio } from "./models/portfolio.model";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";

@Module({
  imports: [SequelizeModule.forFeature([Portfolio, Social]), UploadModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, FileManagementService],
  exports: [PortfolioService, SequelizeModule],
})
export class PortfolioModule {}
