import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AnalyticsModule } from "./analytics/analytics.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BlogModule } from "./blog/blog.module";
import { RateLimitingModule } from "./common/rate-limiting/rate-limiting.module";
import { ContactModule } from "./contact/contact.module";
import { DatabaseModule } from "./database/database.module";
import { EmailModule } from "./email/email.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { PricingModule } from "./pricing/pricing.module";
import { ProjectsModule } from "./projects/projects.module";
import { SocialModule } from "./social/social.module";
import { TechnicalModule } from "./technical/technical.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";
import { ImageModule } from "./image/image.module";
import { ExperienceModule } from "./experience/experience.module";
import { SkillModule } from "./skill/skill.module";
import { EducationModule } from "./education/education.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RateLimitingModule,
    DatabaseModule,
    EmailModule,
    AuthModule,
    PortfolioModule,
    ProjectsModule,
    ContactModule,
    TechnicalModule,
    UserModule,
    UploadModule,
    SocialModule,
    AnalyticsModule,
    BlogModule,
    PricingModule,
    ImageModule,
    ExperienceModule,
    SkillModule,
    EducationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
