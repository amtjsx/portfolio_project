import { Injectable, type NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { ThrottlerStorageRedisService } from "./throttler-storage-redis.service";

@Injectable()
export class RateLimitHeadersMiddleware implements NestMiddleware {
  constructor(private throttlerStorage: ThrottlerStorageRedisService) {}

  async use(req: any, res: Response, next: NextFunction) {
    // Get the tracker (IP + userId)
    const ip = req.headers["x-forwarded-for"] || req.ip;
    const userId = req.user?.id ? req.user.id : "anonymous";
    const tracker = `${ip}-${userId}`;

    // Get current usage for different limits
    const shortKey = `${tracker}-short`;
    const mediumKey = `${tracker}-medium`;
    const longKey = `${tracker}-long`;

    const shortUsage = await this.throttlerStorage.get(shortKey);
    const mediumUsage = await this.throttlerStorage.get(mediumKey);
    const longUsage = await this.throttlerStorage.get(longKey);

    // Add rate limit headers
    res.header("X-RateLimit-Short-Limit", "3");
    res.header("X-RateLimit-Short-Remaining", `${Math.max(0, 3 - shortUsage)}`);

    res.header("X-RateLimit-Medium-Limit", "20");
    res.header(
      "X-RateLimit-Medium-Remaining",
      `${Math.max(0, 20 - mediumUsage)}`
    );

    res.header("X-RateLimit-Long-Limit", "100");
    res.header("X-RateLimit-Long-Remaining", `${Math.max(0, 100 - longUsage)}`);

    next();
  }
}
