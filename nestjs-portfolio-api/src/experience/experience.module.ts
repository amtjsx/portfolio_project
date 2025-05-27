import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ExperienceService } from "./experience.service"
import { ExperienceController } from "./experience.controller"
import { Experience } from "./models/experience.model"

@Module({
  imports: [SequelizeModule.forFeature([Experience])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
