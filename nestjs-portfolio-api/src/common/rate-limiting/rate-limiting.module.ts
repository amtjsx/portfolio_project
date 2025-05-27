import { Module } from "@nestjs/common"
import { ThrottlerModule } from "@nestjs/throttler"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { ThrottlerBehindProxyGuard } from "./throttler-behind-proxy.guard"
import { ThrottlerStorageRedisService } from "./throttler-storage-redis.service"

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          name: "short",
          ttl: config.get("THROTTLE_SHORT_TTL", 1000), // 1 second
          limit: config.get("THROTTLE_SHORT_LIMIT", 3), // 3 requests per second
        },
        {
          name: "medium",
          ttl: config.get("THROTTLE_MEDIUM_TTL", 60000), // 1 minute
          limit: config.get("THROTTLE_MEDIUM_LIMIT", 20), // 20 requests per minute
        },
        {
          name: "long",
          ttl: config.get("THROTTLE_LONG_TTL", 3600000), // 1 hour
          limit: config.get("THROTTLE_LONG_LIMIT", 100), // 100 requests per hour
        },
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    ThrottlerStorageRedisService,
  ],
  exports: [ThrottlerModule],
})
export class RateLimitingModule {}
