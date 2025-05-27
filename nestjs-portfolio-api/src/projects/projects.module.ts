import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ProjectsController } from "./projects.controller"
import { ProjectsService } from "./projects.service"
import { Project } from "./models/project.model"

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService, SequelizeModule],
})
export class ProjectsModule {}
