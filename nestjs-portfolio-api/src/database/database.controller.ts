import { Controller, Get } from "@nestjs/common"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { DatabaseService } from "./database.service"

@ApiTags("database")
@Controller("database")
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get("health")
  @ApiOperation({ summary: "Check database connection health" })
  @ApiResponse({
    status: 200,
    description: "Database health status",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "healthy" },
        connected: { type: "boolean", example: true },
        timestamp: { type: "string", example: "2024-01-01T00:00:00.000Z" },
      },
    },
  })
  async checkHealth() {
    const isConnected = await this.databaseService.checkConnection()
    return {
      status: isConnected ? "healthy" : "unhealthy",
      connected: isConnected,
      timestamp: new Date().toISOString(),
    }
  }

  @Get("info")
  @ApiOperation({ summary: "Get database information" })
  @ApiResponse({
    status: 200,
    description: "Database information retrieved successfully",
  })
  async getDatabaseInfo() {
    return this.databaseService.getDatabaseInfo()
  }

  @Get("stats")
  @ApiOperation({ summary: "Get database statistics" })
  @ApiResponse({
    status: 200,
    description: "Database statistics retrieved successfully",
  })
  async getTableStats() {
    return this.databaseService.getTableStats()
  }
}
