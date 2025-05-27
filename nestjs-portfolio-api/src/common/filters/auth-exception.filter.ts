import { type ArgumentsHost, type ExceptionFilter, Catch, UnauthorizedException } from "@nestjs/common"
import { Response } from "express"

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message || "Unauthorized",
      error: "Unauthorized",
    })
  }
}
