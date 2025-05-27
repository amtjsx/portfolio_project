import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { databaseConfig } from "./database.config"
import { DatabaseService } from "./database.service"
import { DatabaseController } from "./database.controller"
import { User } from "../user/models/user.model"
import { Portfolio } from "../portfolio/models/portfolio.model"
import { Project } from "../projects/models/project.model"
import { Technical } from "../technical/models/technical.model"
import { Contact } from "../contact/models/contact.model"
import { UploadedFile } from "../upload/models/uploaded-file.model"
import { Social } from "../social/models/social.model"
import { Analytics } from "../analytics/models/analytics.model"
import { Visitor } from "../analytics/models/visitor.model"
import { VerificationCode } from "../auth/models/verification-code.model"

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([
      User,
      Portfolio,
      Project,
      Technical,
      Contact,
      UploadedFile,
      Social,
      Analytics,
      Visitor,
      VerificationCode,
    ]),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [SequelizeModule, DatabaseService],
})
export class DatabaseModule {}
