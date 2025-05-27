import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    // Get the IP from the X-Forwarded-For header if present
    // This is important when your app is behind a proxy like Nginx or a load balancer
    const ip = req.headers["x-forwarded-for"] || req.ip;

    // You can also include the user ID if authenticated
    // This allows different rate limits for authenticated users
    const userId = req.user?.id ? req.user.id : "anonymous";

    return Promise.resolve(`${ip}-${userId}`);
  }
}
