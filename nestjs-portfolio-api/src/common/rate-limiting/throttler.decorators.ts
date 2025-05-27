import { SkipThrottle, Throttle } from "@nestjs/throttler";

// Skip rate limiting for specific routes
export const SkipRateLimiting = SkipThrottle();

// Apply short rate limit (useful for login/register endpoints)
export const ShortRateLimit = Throttle({ default: { limit: 10, ttl: 60 } });

// Apply medium rate limit (default for most API endpoints)
export const MediumRateLimit = Throttle({ default: { limit: 100, ttl: 60 } });

// Apply long rate limit (for endpoints that should have higher limits)
export const LongRateLimit = Throttle({ default: { limit: 1000, ttl: 60 } });

// Apply custom rate limit
export const CustomRateLimit = (limit: number, ttl: number) =>
  Throttle({ default: { limit, ttl } });
