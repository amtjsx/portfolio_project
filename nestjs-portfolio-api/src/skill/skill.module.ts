import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { SkillService } from "./skill.service"
import { SkillController } from "./skill.controller"
import { Skill } from "./models/skill.model"
import { SkillCategory } from "./models/skill-category.model"
import { User } from "../user/models/user.model"
import { Portfolio } from "../portfolio/models/portfolio.model"

@Module({
  imports: [SequelizeModule.forFeature([Skill, SkillCategory, User, Portfolio])],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
