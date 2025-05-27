import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { PricingService } from "./pricing.service"
import { PricingController } from "./pricing.controller"
import { PricingPlan } from "./models/pricing.model"
import { Subscription } from "./models/subscription.model"
import { Payment } from "./models/payment.model"
import { Coupon } from "./models/coupon.model"
import { Feature } from "./models/feature.model"
import { PricingFeature } from "./models/pricing-feature.model"
import { User } from "../user/models/user.model"

@Module({
  imports: [SequelizeModule.forFeature([PricingPlan, Subscription, Payment, Coupon, Feature, PricingFeature, User])],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
