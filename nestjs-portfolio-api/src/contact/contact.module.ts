import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ContactController } from "./contact.controller"
import { ContactService } from "./contact.service"
import { Contact } from "./models/contact.model"

@Module({
  imports: [SequelizeModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService, SequelizeModule],
})
export class ContactModule {}
