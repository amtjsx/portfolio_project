import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { EducationService } from "./education.service"
import { EducationController } from "./education.controller"
import { Education } from "./models/education.model"
import { User } from "../user/models/user.model"
import { Portfolio } from "../portfolio/models/portfolio.model"

@Module({
  imports: [SequelizeModule.forFeature([Education, User, Portfolio])],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
