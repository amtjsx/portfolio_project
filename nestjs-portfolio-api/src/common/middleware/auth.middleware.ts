import { Injectable, type NestMiddleware } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7)

      try {
        const decoded = this.jwtService.verify(token)
        req.user = decoded
      } catch (error) {
        // Token is invalid, but we don't throw an error here
        // Let the guards handle authentication
      }
    }

    next()
  }
}
