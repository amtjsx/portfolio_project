import { Controller, Get } from "@nestjs/common"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { AppService } from "./app.service"

@ApiTags("health")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Get welcome message" })
  @ApiResponse({ status: 200, description: "Welcome message returned successfully" })
  getHello(): string {
    return this.appService.getHello()
  }

  @Get("health")
  @ApiOperation({ summary: "Health check endpoint" })
  @ApiResponse({
    status: 200,
    description: "Service health status",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        timestamp: { type: "string", example: "2024-01-01T00:00:00.000Z" },
        service: { type: "string", example: "Portfolio API" },
      },
    },
  })
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "Portfolio API",
    }
  }
}
