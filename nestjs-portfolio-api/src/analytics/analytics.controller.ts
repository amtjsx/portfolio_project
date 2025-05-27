import { BadRequestException, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Request } from "express"
import { AnalyticsService } from "./analytics.service"
import { AnalyticsQueryDto } from "./dto/analytics-query.dto"
import { TrackPageViewDto } from "./dto/track-page-view.dto"

@ApiTags("analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post("track")
  @ApiOperation({ summary: "Track a page view" })
  @ApiBody({ type: TrackPageViewDto })
  @ApiResponse({
    status: 201,
    description: "Page view tracked successfully",
    schema: {
      type: "object",
      properties: {
        success: { type: "boolean", example: true },
        analyticsId: { type: "number", example: 12345 },
        isNewVisitor: { type: "boolean", example: true },
        visitorId: { type: "string", example: "visitor_123456789" },
        sessionId: { type: "string", example: "session_987654321" },
      },
    },
  })
  @ApiResponse({ status: 400, description: "Invalid tracking data" })
  @ApiResponse({ status: 404, description: "Portfolio not found" })
  async trackPageView(trackData: TrackPageViewDto, req: Request) {
    const ipAddress = this.getClientIP(req)
    return this.analyticsService.trackPageView(trackData, ipAddress)
  }

  @Get("portfolio/:portfolioId")
  @ApiOperation({ summary: "Get portfolio analytics" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID", example: 1 })
  @ApiQuery({ name: "period", required: false, enum: ["1d", "7d", "30d", "90d", "1y", "all"] })
  @ApiQuery({ name: "startDate", required: false, description: "Start date (YYYY-MM-DD)" })
  @ApiQuery({ name: "endDate", required: false, description: "End date (YYYY-MM-DD)" })
  @ApiQuery({ name: "groupBy", required: false, enum: ["hour", "day", "week", "month"] })
  @ApiQuery({ name: "pagePath", required: false, description: "Filter by page path" })
  @ApiQuery({ name: "country", required: false, description: "Filter by country" })
  @ApiQuery({ name: "deviceType", required: false, enum: ["desktop", "mobile", "tablet"] })
  @ApiQuery({ name: "referrerDomain", required: false, description: "Filter by referrer domain" })
  @ApiQuery({ name: "limit", required: false, description: "Limit results", type: "number" })
  @ApiResponse({
    status: 200,
    description: "Portfolio analytics retrieved successfully",
    schema: {
      type: "object",
      properties: {
        summary: {
          type: "object",
          properties: {
            totalViews: { type: "number", example: 1250 },
            uniqueVisitors: { type: "number", example: 890 },
            avgTimeOnPage: { type: "number", example: 145 },
            bounceRate: { type: "number", example: 0.35 },
            period: { type: "string", example: "30d" },
          },
        },
        topPages: { type: "array" },
        trafficSources: { type: "array" },
        deviceBreakdown: { type: "array" },
        geographicData: { type: "array" },
        timeSeriesData: { type: "array" },
      },
    },
  })
  async getPortfolioAnalytics(
    @Param("portfolioId", ParseIntPipe) portfolioId: number,
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getPortfolioAnalytics(portfolioId, query)
  }

  @Get("portfolio/:portfolioId/realtime")
  @ApiOperation({ summary: "Get real-time analytics for portfolio" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Real-time analytics retrieved successfully",
    schema: {
      type: "object",
      properties: {
        activeVisitors: { type: "number", example: 5 },
        last24HoursViews: { type: "number", example: 125 },
        lastHourViews: { type: "number", example: 8 },
        currentPages: { type: "array" },
        timestamp: { type: "string", example: "2024-01-01T00:00:00.000Z" },
      },
    },
  })
  async getRealtimeAnalytics(@Param("portfolioId", ParseIntPipe) portfolioId: number) {
    return this.analyticsService.getRealtimeAnalytics(portfolioId)
  }

  @Get("portfolio/:portfolioId/referrers")
  @ApiOperation({ summary: "Get top referrers for portfolio" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID", example: 1 })
  @ApiQuery({ name: "days", required: false, description: "Number of days to analyze", type: "number" })
  @ApiResponse({ status: 200, description: "Top referrers retrieved successfully" })
  async getTopReferrers(@Param("portfolioId", ParseIntPipe) portfolioId: number, @Query("days") days?: string) {
    const daysNumber = days ? Number.parseInt(days, 10) : 30
    return this.analyticsService.getTopReferrers(portfolioId, daysNumber)
  }

  @Get("portfolio/:portfolioId/funnel")
  @ApiOperation({ summary: "Get conversion funnel analytics" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID", example: 1 })
  @ApiQuery({
    name: "steps",
    required: true,
    description: "Comma-separated list of page paths",
    example: "/,/about,/projects,/contact",
  })
  @ApiQuery({ name: "days", required: false, description: "Number of days to analyze", type: "number" })
  @ApiResponse({ status: 200, description: "Conversion funnel data retrieved successfully" })
  async getConversionFunnel(
    @Param("portfolioId", ParseIntPipe) portfolioId: number,
    @Query("steps") steps: string,
    @Query("days") days?: string,
  ) {
    if (!steps) {
      throw new BadRequestException("Steps parameter is required")
    }

    const funnelSteps = steps.split(",").map((step) => step.trim())
    const daysNumber = days ? Number.parseInt(days, 10) : 30

    return this.analyticsService.getConversionFunnel(portfolioId, funnelSteps, daysNumber)
  }

  @Get("visitor/:visitorId/journey")
  @ApiOperation({ summary: "Get visitor journey" })
  @ApiParam({ name: "visitorId", description: "Visitor ID", example: "visitor_123456789" })
  @ApiResponse({
    status: 200,
    description: "Visitor journey retrieved successfully",
    schema: {
      type: "object",
      properties: {
        visitor: { type: "object" },
        journey: { type: "array" },
        totalPages: { type: "number", example: 5 },
        totalTime: { type: "number", example: 300 },
        firstVisit: { type: "string", example: "2024-01-01T00:00:00.000Z" },
        lastVisit: { type: "string", example: "2024-01-01T00:05:00.000Z" },
      },
    },
  })
  async getVisitorJourney(@Param("visitorId") visitorId: string) {
    return this.analyticsService.getVisitorJourney(visitorId)
  }

  @Get("portfolio/:portfolioId/export")
  @ApiOperation({ summary: "Export analytics data" })
  @ApiParam({ name: "portfolioId", description: "Portfolio ID", example: 1 })
  @ApiQuery({ name: "format", required: false, enum: ["json", "csv"], description: "Export format" })
  @ApiQuery({ name: "period", required: false, enum: ["1d", "7d", "30d", "90d", "1y", "all"] })
  @ApiResponse({ status: 200, description: "Analytics data exported successfully" })
  async exportAnalytics(
    @Param("portfolioId", ParseIntPipe) portfolioId: number,
    @Query() query: AnalyticsQueryDto & { format?: "json" | "csv" },
  ) {
    const data = await this.analyticsService.getPortfolioAnalytics(portfolioId, query)

    if (query.format === "csv") {
      // Convert to CSV format
      return this.convertToCSV(data)
    }

    return data
  }

  @Get("health")
  @ApiOperation({ summary: "Analytics service health check" })
  @ApiResponse({
    status: 200,
    description: "Analytics service health status",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "healthy" },
        timestamp: { type: "string", example: "2024-01-01T00:00:00.000Z" },
        metrics: {
          type: "object",
          properties: {
            totalRecords: { type: "number", example: 50000 },
            last24Hours: { type: "number", example: 1250 },
            avgResponseTime: { type: "number", example: 45 },
          },
        },
      },
    },
  })
  async healthCheck() {
    // Implement health check logic
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      metrics: {
        totalRecords: 50000, // Get from actual count
        last24Hours: 1250, // Get from actual count
        avgResponseTime: 45, // Calculate average response time
      },
    }
  }

  // Helper methods
  private getClientIP(req: Request): string {
    return (
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      (req.headers["x-real-ip"] as string) ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      ""
    )
  }

  private convertToCSV(data: any): string {
    // Simple CSV conversion - in production, use a proper CSV library
    const headers = Object.keys(data.summary).join(",")
    const values = Object.values(data.summary).join(",")
    return `${headers}\n${values}`
  }
}
