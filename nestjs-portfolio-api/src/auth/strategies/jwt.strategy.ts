import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          console.log("req", req.cookies);
          if (req?.cookies?.access_token) return req.cookies.access_token;

          // Fallback to Authorization header for mobile
          const authHeader = req?.headers?.authorization;
          if (authHeader && authHeader.startsWith("Bearer ")) {
            return authHeader.replace("Bearer ", "");
          }

          return null;
        },
      ]),
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET", "your-secret-key"),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.validateJwtPayload(payload);
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
