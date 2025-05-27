import { Injectable, type OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerStorage } from "@nestjs/throttler";
import { ThrottlerStorageRecord } from "@nestjs/throttler/dist/throttler-storage-record.interface";
import Redis from "ioredis";

@Injectable()
export class ThrottlerStorageRedisService
  implements ThrottlerStorage, OnModuleInit
{
  private redisClient: Redis;

  constructor(private configService: ConfigService) {}
  increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string
  ): Promise<ThrottlerStorageRecord> {
    throw new Error("Method not implemented.");
  }

  async onModuleInit() {
    // Initialize Redis client
    const redisUrl = this.configService.get<string>("REDIS_URL");

    if (redisUrl) {
      this.redisClient = new Redis(redisUrl);
    } else {
      // Fallback to local Redis or in-memory if no Redis URL is provided
      this.redisClient = new Redis({
        host: this.configService.get<string>("REDIS_HOST", "localhost"),
        port: this.configService.get<number>("REDIS_PORT", 6379),
        password: this.configService.get<string>("REDIS_PASSWORD", ""),
        db: this.configService.get<number>("REDIS_DB", 0),
      });
    }
  }

  async incre(key: string, ttl: number) {
    const multi = this.redisClient.multi();

    multi.incr(key);
    multi.pexpire(key, ttl);

    const results = await multi.exec();
    return results[0][1] as number;
  }

  async get(key: string): Promise<number> {
    const value = await this.redisClient.get(key);
    return value ? Number.parseInt(value, 10) : 0;
  }
}
