import { Catch, type ArgumentsHost, type ExceptionFilter } from "@nestjs/common"
import { ThrottlerException } from "@nestjs/throttler"
import { Request, Response } from "express"

@Catch(ThrottlerException)
export class RateLimitExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // Get the path that was rate limited
    const path = request.path

    // Log the rate limit exception
    console.warn(`Rate limit exceeded for ${request.ip} on ${path}`)

    // Return a more detailed response
    response.status(429).json({
      statusCode: 429,
      message: "Too Many Requests",
      error: "Rate limit exceeded",
      path: path,
      timestamp: new Date().toISOString(),
      // Add retry-after header to indicate when to try again
      retryAfter: "1", // Default to 1 second
    })
  }
}
