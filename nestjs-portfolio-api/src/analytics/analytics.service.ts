import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, Sequelize } from "sequelize";
import { UAParser } from "ua-parser-js";
import { Portfolio } from "../portfolio/models/portfolio.model";
import { User } from "../user/models/user.model";
import { AnalyticsQueryDto } from "./dto/analytics-query.dto";
import { TrackPageViewDto } from "./dto/track-page-view.dto";
import { Analytics } from "./models/analytics.model";
import { Visitor } from "./models/visitor.model";

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics) private readonly analyticsModel: typeof Analytics,
    @InjectModel(Visitor) private readonly visitorModel: typeof Visitor
  ) {}

  async trackPageView(trackData: TrackPageViewDto, ipAddress?: string) {
    // Parse user agent for device/browser info
    const userAgentData = this.parseUserAgent(trackData.userAgent || "");

    // Extract referrer domain
    const referrerDomain = this.extractDomain(trackData.referrer);

    // Check if visitor exists
    let visitor = await this.visitorModel.findOne({
      where: { visitorId: trackData.visitorId },
    });

    const isNewVisitor = !visitor;
    const isUniqueVisitor = isNewVisitor;

    // Get portfolio and user info
    const portfolio = await Portfolio.findByPk(trackData.portfolioId, {
      include: [{ model: User, attributes: ["id"] }],
    });

    if (!portfolio) {
      throw new NotFoundException(
        `Portfolio with ID ${trackData.portfolioId} not found`
      );
    }

    // Create or update visitor record
    if (isNewVisitor) {
      visitor = await this.visitorModel.create({
        visitorId: trackData.visitorId,
        portfolioId: trackData.portfolioId,
        userId: portfolio.userId,
        firstVisit: new Date(),
        lastVisit: new Date(),
        visitCount: 1,
        pageViews: 1,
        totalTimeSpent: trackData.timeOnPage || 0,
        firstReferrer: trackData.referrer,
        lastReferrer: trackData.referrer,
        firstLandingPage: trackData.pagePath,
        lastLandingPage: trackData.pagePath,
        country: await this.getCountryFromIP(ipAddress),
        primaryDevice: userAgentData.deviceType,
        primaryBrowser: userAgentData.browser,
        primaryOS: userAgentData.operatingSystem,
        isBot: this.detectBot(trackData.userAgent || ""),
        engagementScore: this.calculateEngagementScore({
          timeOnPage: trackData.timeOnPage || 0,
          scrollDepth: trackData.scrollDepth || 0,
        }),
      });
    } else {
      // Update existing visitor
      await visitor.update({
        lastVisit: new Date(),
        visitCount: visitor.visitCount + 1,
        pageViews: visitor.pageViews + 1,
        totalTimeSpent: visitor.totalTimeSpent + (trackData.timeOnPage || 0),
        lastReferrer: trackData.referrer,
        lastLandingPage: trackData.pagePath,
        engagementScore: this.calculateEngagementScore({
          timeOnPage: visitor.totalTimeSpent + (trackData.timeOnPage || 0),
          scrollDepth: trackData.scrollDepth || 0,
          visitCount: visitor.visitCount + 1,
        }),
      });
    }

    // Create analytics record
    const analyticsRecord = await this.analyticsModel.create({
      portfolioId: trackData.portfolioId,
      userId: portfolio.userId,
      visitorId: trackData.visitorId,
      sessionId: trackData.sessionId,
      pagePath: trackData.pagePath,
      pageTitle: trackData.pageTitle,
      referrer: trackData.referrer,
      referrerDomain,
      userAgent: trackData.userAgent,
      ipAddress,
      country: await this.getCountryFromIP(ipAddress),
      deviceType: userAgentData.deviceType,
      operatingSystem: userAgentData.operatingSystem,
      browser: userAgentData.browser,
      browserVersion: userAgentData.browserVersion,
      screenResolution: trackData.screenResolution,
      language: trackData.language,
      timezone: trackData.timezone,
      timeOnPage: trackData.timeOnPage,
      scrollDepth: trackData.scrollDepth,
      isBot: this.detectBot(trackData.userAgent || ""),
      isUniqueVisitor,
      isReturningVisitor: !isNewVisitor,
      utmSource: trackData.utmSource,
      utmMedium: trackData.utmMedium,
      utmCampaign: trackData.utmCampaign,
      utmTerm: trackData.utmTerm,
      utmContent: trackData.utmContent,
      customData: trackData.customData,
    });

    // Update portfolio analytics
    await this.updatePortfolioAnalytics(trackData.portfolioId);

    return {
      success: true,
      analyticsId: analyticsRecord.id,
      isNewVisitor,
      visitorId: trackData.visitorId,
      sessionId: trackData.sessionId,
    };
  }

  async getPortfolioAnalytics(portfolioId: number, query: AnalyticsQueryDto) {
    const whereClause = this.buildWhereClause(portfolioId, query);
    const dateRange = this.getDateRange(
      query.period,
      query.startDate,
      query.endDate
    );

    // Basic metrics
    const totalViews = await this.analyticsModel.count({
      where: { ...whereClause, createdAt: { [Op.between]: dateRange } },
    });

    const uniqueVisitors = await this.analyticsModel.count({
      where: { ...whereClause, createdAt: { [Op.between]: dateRange } },
      distinct: true,
      col: "visitorId",
    });

    const avgTimeOnPage = await this.analyticsModel.findOne({
      where: { ...whereClause, createdAt: { [Op.between]: dateRange } },
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("timeOnPage")), "avgTime"],
      ],
      raw: true,
    });

    const bounceRate = await this.calculateBounceRate(portfolioId, dateRange);

    // Top pages
    const topPages = await this.analyticsModel.findAll({
      where: { ...whereClause, createdAt: { [Op.between]: dateRange } },
      attributes: [
        "pagePath",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "views"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("visitorId"))
          ),
          "uniqueViews",
        ],
      ],
      group: ["pagePath"],
      order: [[Sequelize.literal("views"), "DESC"]],
      limit: query.limit || 10,
      raw: true,
    });

    // Traffic sources
    const trafficSources = await this.analyticsModel.findAll({
      where: { ...whereClause, createdAt: { [Op.between]: dateRange } },
      attributes: [
        "referrerDomain",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "visits"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("visitorId"))
          ),
          "uniqueVisitors",
        ],
      ],
      group: ["referrerDomain"],
      order: [[Sequelize.literal("visits"), "DESC"]],
      limit: query.limit || 10,
      raw: true,
    });

    // Device breakdown
    const deviceBreakdown = await this.analyticsModel.findAll({
      where: { ...whereClause, createdAt: { [Op.between]: dateRange } },
      attributes: [
        "deviceType",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("visitorId"))
          ),
          "uniqueUsers",
        ],
      ],
      group: ["deviceType"],
      raw: true,
    });

    // Geographic data
    const geographicData = await this.analyticsModel.findAll({
      where: { ...whereClause, createdAt: { [Op.between]: dateRange } },
      attributes: [
        "country",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "visits"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("visitorId"))
          ),
          "uniqueVisitors",
        ],
      ],
      group: ["country"],
      order: [[Sequelize.literal("visits"), "DESC"]],
      limit: query.limit || 10,
      raw: true,
    });

    // Time series data
    const timeSeriesData = await this.getTimeSeriesData(
      portfolioId,
      query,
      dateRange
    );

    return {
      summary: {
        totalViews,
        uniqueVisitors,
        avgTimeOnPage: Math.round(avgTimeOnPage?.avgTime || 0),
        bounceRate: Math.round(bounceRate * 100) / 100,
        period: query.period || "30d",
        dateRange: {
          start: dateRange[0],
          end: dateRange[1],
        },
      },
      topPages,
      trafficSources,
      deviceBreakdown,
      geographicData,
      timeSeriesData,
    };
  }

  async getRealtimeAnalytics(portfolioId: number) {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);

    const activeVisitors = await this.analyticsModel.count({
      where: {
        portfolioId,
        createdAt: { [Op.gte]: new Date(Date.now() - 5 * 60 * 1000) }, // Last 5 minutes
      },
      distinct: true,
      col: "visitorId",
    });

    const last24HoursViews = await this.analyticsModel.count({
      where: {
        portfolioId,
        createdAt: { [Op.gte]: last24Hours },
      },
    });

    const lastHourViews = await this.analyticsModel.count({
      where: {
        portfolioId,
        createdAt: { [Op.gte]: lastHour },
      },
    });

    const currentPages = await this.analyticsModel.findAll({
      where: {
        portfolioId,
        createdAt: { [Op.gte]: new Date(Date.now() - 10 * 60 * 1000) }, // Last 10 minutes
      },
      attributes: [
        "pagePath",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "activeUsers"],
      ],
      group: ["pagePath"],
      order: [[Sequelize.literal("activeUsers"), "DESC"]],
      limit: 10,
      raw: true,
    });

    return {
      activeVisitors,
      last24HoursViews,
      lastHourViews,
      currentPages,
      timestamp: new Date().toISOString(),
    };
  }

  async getVisitorJourney(visitorId: string) {
    const journey = await this.analyticsModel.findAll({
      where: { visitorId },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: Portfolio,
          attributes: ["id", "title"],
        },
      ],
    });

    const visitor = await this.visitorModel.findOne({
      where: { visitorId },
    });

    return {
      visitor,
      journey,
      totalPages: journey.length,
      totalTime: journey.reduce((sum, page) => sum + (page.timeOnPage || 0), 0),
      firstVisit: journey[0]?.createdAt,
      lastVisit: journey[journey.length - 1]?.createdAt,
    };
  }

  async getTopReferrers(portfolioId: number, days = 30) {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    return this.analyticsModel.findAll({
      where: {
        portfolioId,
        createdAt: { [Op.gte]: startDate },
        referrerDomain: { [Op.ne]: null },
      },
      attributes: [
        "referrerDomain",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "visits"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("visitorId"))
          ),
          "uniqueVisitors",
        ],
        [Sequelize.fn("AVG", Sequelize.col("timeOnPage")), "avgTimeOnPage"],
      ],
      group: ["referrerDomain"],
      order: [[Sequelize.literal("visits"), "DESC"]],
      limit: 20,
      raw: true,
    });
  }

  async getConversionFunnel(
    portfolioId: number,
    funnelSteps: string[],
    days = 30
  ) {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const funnelData = [];

    for (let i = 0; i < funnelSteps.length; i++) {
      const step = funnelSteps[i];
      const visitors = await this.analyticsModel.findAll({
        where: {
          portfolioId,
          pagePath: step,
          createdAt: { [Op.gte]: startDate },
        },
        attributes: ["visitorId"],
        group: ["visitorId"],
        raw: true,
      });

      const uniqueVisitors = visitors.length;

      // Calculate conversion rate from previous step
      const conversionRate =
        i === 0 ? 100 : (uniqueVisitors / funnelData[i - 1].visitors) * 100;

      funnelData.push({
        step: i + 1,
        pagePath: step,
        visitors: uniqueVisitors,
        conversionRate: Math.round(conversionRate * 100) / 100,
        dropoffRate: Math.round((100 - conversionRate) * 100) / 100,
      });
    }

    return funnelData;
  }

  // Helper methods
  private parseUserAgent(userAgent: string) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
      browser: result.browser.name || "Unknown",
      browserVersion: result.browser.version || "Unknown",
      operatingSystem:
        `${result.os.name || "Unknown"} ${result.os.version || ""}`.trim(),
      deviceType: this.getDeviceType(result.device.type),
    };
  }

  private getDeviceType(deviceType?: string): "desktop" | "mobile" | "tablet" {
    if (deviceType === "mobile") return "mobile";
    if (deviceType === "tablet") return "tablet";
    return "desktop";
  }

  private extractDomain(url?: string): string | null {
    if (!url) return null;
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  }

  private detectBot(userAgent: string): boolean {
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /googlebot/i,
      /bingbot/i,
      /facebookexternalhit/i,
      /twitterbot/i,
      /linkedinbot/i,
    ];

    return botPatterns.some((pattern) => pattern.test(userAgent));
  }

  private calculateEngagementScore(data: {
    timeOnPage: number;
    scrollDepth?: number;
    visitCount?: number;
  }): number {
    let score = 0;

    // Time on page (40% of score)
    if (data.timeOnPage > 0) {
      score += Math.min((data.timeOnPage / 300) * 40, 40); // Max 40 points for 5+ minutes
    }

    // Scroll depth (30% of score)
    if (data.scrollDepth) {
      score += (data.scrollDepth / 100) * 30;
    }

    // Visit frequency (30% of score)
    if (data.visitCount) {
      score += Math.min(data.visitCount * 5, 30); // Max 30 points for 6+ visits
    }

    return Math.round(score);
  }

  private async getCountryFromIP(ipAddress?: string): Promise<string | null> {
    // In a real implementation, you would use a GeoIP service
    // For now, return null or implement with a service like MaxMind
    return null;
  }

  private buildWhereClause(portfolioId: number, query: AnalyticsQueryDto) {
    const whereClause: any = { portfolioId };

    if (query.pagePath) {
      whereClause.pagePath = query.pagePath;
    }

    if (query.country) {
      whereClause.country = query.country;
    }

    if (query.deviceType) {
      whereClause.deviceType = query.deviceType;
    }

    if (query.referrerDomain) {
      whereClause.referrerDomain = query.referrerDomain;
    }

    return whereClause;
  }

  private getDateRange(
    period?: string,
    startDate?: string,
    endDate?: string
  ): [Date, Date] {
    const now = new Date();
    let start: Date;
    let end: Date = now;

    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      switch (period) {
        case "1d":
          start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7d":
          start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "90d":
          start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case "1y":
          start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        case "all":
          start = new Date("2020-01-01");
          break;
        default: // 30d
          start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
    }

    return [start, end];
  }

  private async calculateBounceRate(
    portfolioId: number,
    dateRange: [Date, Date]
  ): Promise<number> {
    const totalSessions = await this.analyticsModel.count({
      where: {
        portfolioId,
        createdAt: { [Op.between]: dateRange },
      },
      distinct: true,
      col: "sessionId",
    });

    const singlePageSessions = await this.analyticsModel.findAll({
      where: {
        portfolioId,
        createdAt: { [Op.between]: dateRange },
      },
      attributes: [
        "sessionId",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "pageCount"],
      ],
      group: ["sessionId"],
      having: Sequelize.literal("COUNT(id) = 1"),
      raw: true,
    });

    return totalSessions > 0 ? singlePageSessions.length / totalSessions : 0;
  }

  private async getTimeSeriesData(
    portfolioId: number,
    query: AnalyticsQueryDto,
    dateRange: [Date, Date]
  ) {
    const groupBy = query.groupBy || "day";
    let dateFormat: string;

    switch (groupBy) {
      case "hour":
        dateFormat = "%Y-%m-%d %H:00:00";
        break;
      case "week":
        dateFormat = "%Y-%u";
        break;
      case "month":
        dateFormat = "%Y-%m";
        break;
      default: // day
        dateFormat = "%Y-%m-%d";
    }

    return this.analyticsModel.findAll({
      where: {
        portfolioId,
        createdAt: { [Op.between]: dateRange },
      },
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), dateFormat),
          "date",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "views"],
        [
          Sequelize.fn(
            "COUNT",
            Sequelize.fn("DISTINCT", Sequelize.col("visitorId"))
          ),
          "uniqueVisitors",
        ],
        [Sequelize.fn("AVG", Sequelize.col("timeOnPage")), "avgTimeOnPage"],
      ],
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), dateFormat),
      ],
      order: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), dateFormat),
          "ASC",
        ],
      ],
      raw: true,
    });
  }

  private async updatePortfolioAnalytics(portfolioId: string) {
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) return;

    const totalViews = await this.analyticsModel.count({
      where: { portfolioId },
    });

    const uniqueVisitors = await this.analyticsModel.count({
      where: { portfolioId },
      distinct: true,
      col: "visitorId",
    });

    const popularPages = await this.analyticsModel.findAll({
      where: { portfolioId },
      attributes: [
        "pagePath",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "views"],
      ],
      group: ["pagePath"],
      order: [[Sequelize.literal("views"), "DESC"]],
      limit: 5,
      raw: true,
    });

    await portfolio.update({});
  }
}
