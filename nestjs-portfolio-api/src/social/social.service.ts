import { Injectable, NotFoundException } from "@nestjs/common";
import { Op } from "sequelize";
import { Portfolio } from "../portfolio/models/portfolio.model";
import { User } from "../user/models/user.model";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";
import { Social } from "./models/social.model";
import { InjectModel } from "@nestjs/sequelize";
import { mockSocialLinks } from "./data/mock-social-links";

@Injectable()
export class SocialService {
  constructor(
    @InjectModel(Social) private readonly socialModel: typeof Social
  ) {}

  async findAll() {
    const socialLinks = await this.socialModel.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "username"],
        },
        {
          model: Portfolio,
          attributes: ["id", "title"],
          required: false,
        },
      ],
      order: [
        ["userId", "ASC"],
        ["displayOrder", "ASC"],
        ["platform", "ASC"],
      ],
    });

    return {
      data: mockSocialLinks,
      total: mockSocialLinks.length,
    };
  }

  async findOne(id: number) {
    const socialLink = await this.socialModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "username", "email"],
        },
        {
          model: Portfolio,
          attributes: ["id", "title", "theme"],
          required: false,
        },
      ],
    });

    if (!socialLink) {
      throw new NotFoundException(`Social link with ID ${id} not found`);
    }

    return socialLink;
  }

  async findByUserId(userId: string) {
    const socialLinks = await this.socialModel.findAll({
      where: { userId },
      order: [
        ["displayOrder", "ASC"],
        ["platform", "ASC"],
      ],
    });

    return {
      data: socialLinks,
      total: socialLinks.length,
    };
  }

  async findByPortfolioId(portfolioId: number) {
    const socialLinks = await this.socialModel.findAll({
      where: { portfolioId },
      order: [
        ["displayOrder", "ASC"],
        ["platform", "ASC"],
      ],
    });

    return {
      data: socialLinks,
      total: socialLinks.length,
    };
  }

  async findByPlatform(platform: string) {
    const socialLinks = await this.socialModel.findAll({
      where: { platform: platform.toLowerCase() },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "username"],
        },
      ],
      order: [["followerCount", "DESC"]],
    });

    return {
      data: socialLinks,
      total: socialLinks.length,
      platform,
    };
  }

  async findActive() {
    const socialLinks = await this.socialModel.findAll({
      where: { isActive: true },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [
        ["userId", "ASC"],
        ["displayOrder", "ASC"],
      ],
    });

    return {
      data: socialLinks,
      total: socialLinks.length,
    };
  }

  async findNavigation(userId: string) {
    const socialLinks = await this.socialModel.findAll({
      where: {
        userId,
        isActive: true,
        showInNav: true,
      },
      order: [["displayOrder", "ASC"]],
    });

    return {
      data: socialLinks,
      total: socialLinks.length,
    };
  }

  async create(createSocialDto: CreateSocialDto) {
    const socialLink = await this.socialModel.create(createSocialDto);
    return socialLink;
  }

  async update(id: string, updateSocialDto: UpdateSocialDto) {
    const socialLink = await this.socialModel.findByPk(id);

    if (!socialLink) {
      throw new NotFoundException(`Social link with ID ${id} not found`);
    }

    await socialLink.update(updateSocialDto);
    return socialLink;
  }

  async remove(id: string) {
    const socialLink = await this.socialModel.findByPk(id);

    if (!socialLink) {
      throw new NotFoundException(`Social link with ID ${id} not found`);
    }

    await socialLink.destroy();
    return socialLink;
  }

  async incrementClickCount(id: string) {
    const socialLink = await this.socialModel.findByPk(id);

    if (!socialLink) {
      throw new NotFoundException(`Social link with ID ${id} not found`);
    }

    await socialLink.increment("clickCount");
    return socialLink.reload();
  }

  async updateDisplayOrder(
    userId: string,
    orderUpdates: { id: string; displayOrder: number }[]
  ) {
    const updates = orderUpdates.map(async (update) => {
      const socialLink = await this.socialModel.findOne({
        where: { id: update.id, userId },
      });

      if (socialLink) {
        await socialLink.update({ displayOrder: update.displayOrder });
        return socialLink;
      }
      return null;
    });

    const results = await Promise.all(updates);
    const validResults = results.filter((result) => result !== null);

    return {
      updated: validResults,
      count: validResults.length,
    };
  }

  async toggleActive(id: string) {
    const socialLink = await this.socialModel.findByPk(id);

    if (!socialLink) {
      throw new NotFoundException(`Social link with ID ${id} not found`);
    }

    await socialLink.update({ isActive: !socialLink.isActive });
    return socialLink;
  }

  async getPopularPlatforms() {
    const platforms = await this.socialModel.findAll({
      attributes: [
        "platform",
        [
          this.socialModel.sequelize.fn(
            "COUNT",
            this.socialModel.sequelize.col("id")
          ),
          "count",
        ],
        [
          this.socialModel.sequelize.fn(
            "SUM",
            this.socialModel.sequelize.col("clickCount")
          ),
          "totalClicks",
        ],
        [
          this.socialModel.sequelize.fn(
            "AVG",
            this.socialModel.sequelize.col("followerCount")
          ),
          "avgFollowers",
        ],
      ],
      where: { isActive: true },
      group: ["platform"],
      order: [[this.socialModel.sequelize.literal("count"), "DESC"]],
      raw: true,
    });

    return {
      data: platforms,
      total: platforms.length,
    };
  }

  async getStatsByUser(userId: string) {
    const stats = await this.socialModel.findAll({
      attributes: [
        [
          this.socialModel.sequelize.fn(
            "COUNT",
            this.socialModel.sequelize.col("id")
          ),
          "totalLinks",
        ],
        [
          this.socialModel.sequelize.fn(
            "SUM",
            this.socialModel.sequelize.col("clickCount")
          ),
          "totalClicks",
        ],
        [
          this.socialModel.sequelize.fn(
            "SUM",
            this.socialModel.sequelize.col("followerCount")
          ),
          "totalFollowers",
        ],
        [
          this.socialModel.sequelize.fn(
            "COUNT",
            this.socialModel.sequelize.literal(
              "CASE WHEN is_active = true THEN 1 END"
            )
          ),
          "activeLinks",
        ],
      ],
      where: { userId },
      raw: true,
    });

    const platformBreakdown = await this.socialModel.findAll({
      attributes: [
        "platform",
        [
          this.socialModel.sequelize.fn(
            "COUNT",
            this.socialModel.sequelize.col("id")
          ),
          "count",
        ],
        [
          this.socialModel.sequelize.fn(
            "SUM",
            this.socialModel.sequelize.col("clickCount")
          ),
          "clicks",
        ],
      ],
      where: { userId },
      group: ["platform"],
      raw: true,
    });

    return {
      overview: stats[0] || {
        totalLinks: 0,
        totalClicks: 0,
        totalFollowers: 0,
        activeLinks: 0,
      },
      platformBreakdown,
    };
  }

  async searchSocialLinks(query: string) {
    const socialLinks = await this.socialModel.findAll({
      where: {
        [Op.or]: [
          { label: { [Op.iLike]: `%${query}%` } },
          { username: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { url: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "username"],
        },
      ],
      order: [["clickCount", "DESC"]],
    });

    return {
      data: socialLinks,
      total: socialLinks.length,
      query,
    };
  }

  async bulkUpdateActive(userId: string, isActive: boolean) {
    const [affectedCount] = await this.socialModel.update(
      { isActive },
      {
        where: { userId },
      }
    );

    return {
      affectedCount,
      isActive,
      message: `${affectedCount} social links updated`,
    };
  }
}
