import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UserModule } from "../user/user.module"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"
import { EmailModule } from "../email/email.module"
import { SequelizeModule } from "@nestjs/sequelize"
import { VerificationCode } from "./models/verification-code.model"
import { EmailVerificationService } from "./services/email-verification.service"
import { User } from "src/user/models/user.model"

@Module({
  imports: [
    UserModule,
    EmailModule,
    PassportModule,
    SequelizeModule.forFeature([VerificationCode, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET", "your-secret-key"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN", "7d"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailVerificationService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
