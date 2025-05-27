import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { TechnicalController } from "./technical.controller"
import { TechnicalService } from "./technical.service"
import { Technical } from "./models/technical.model"

@Module({
  imports: [SequelizeModule.forFeature([Technical])],
  controllers: [TechnicalController],
  providers: [TechnicalService],
  exports: [TechnicalService, SequelizeModule],
})
export class TechnicalModule {}
