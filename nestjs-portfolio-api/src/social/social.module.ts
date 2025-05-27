import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Social } from "./models/social.model"
import { SocialController } from "./social.controller"
import { SocialService } from "./social.service"
import { SocialUtilsService } from "./social-utils.service"

@Module({
  imports: [SequelizeModule.forFeature([Social])],
  controllers: [SocialController],
  providers: [SocialService, SocialUtilsService],
  exports: [SocialService, SocialUtilsService, SequelizeModule],
})
export class SocialModule {}
