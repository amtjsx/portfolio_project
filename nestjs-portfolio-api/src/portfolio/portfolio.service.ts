import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Education } from "src/education/models/education.model";
import { Experience } from "src/experience/models/experience.model";
import { SkillCategory } from "src/skill/models/skill-category.model";
import { Skill } from "src/skill/models/skill.model";
import { Social } from "src/social/models/social.model";
import { Project } from "../projects/models/project.model";
import { User } from "../user/models/user.model";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";
import { UpdatePortfolioDto } from "./dto/update-portfolio.dto";
import { Portfolio } from "./models/portfolio.model";

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio)
    private readonly portfolioModel: typeof Portfolio,
    @InjectModel(Social)
    private readonly socialModel: typeof Social
  ) {}

  // Legacy methods for backward compatibility
  async getAbout() {
    const portfolio = await this.portfolioModel.findOne({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email", "location"],
        },
      ],
    });

    if (!portfolio) {
      throw new NotFoundException("Portfolio not found");
    }

    return {
      name: `${portfolio.user.firstName} ${portfolio.user.lastName}`,
      title: portfolio.title,
      bio: portfolio.summary,
      location: portfolio.user.location,
      email: portfolio.user.email,
      linkedin: portfolio.socialLinks?.find(
        (social) => social.platform === "linkedin"
      )?.url,
      github: portfolio.socialLinks?.find(
        (social) => social.platform === "github"
      )?.url,
      website: portfolio.customDomain
        ? `https://${portfolio.customDomain}`
        : "https://johndoe.com",
    };
  }

  getSkills() {
    return {
      technical: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "React", level: 88 },
        { name: "Node.js", level: 82 },
        { name: "NestJS", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "Docker", level: 65 },
      ],
      soft: [
        "Problem Solving",
        "Team Collaboration",
        "Communication",
        "Project Management",
        "Agile Methodologies",
      ],
    };
  }

  getExperience() {
    return [
      {
        id: 1,
        company: "Tech Company Inc.",
        position: "Senior Full Stack Developer",
        startDate: "2022-01-01",
        endDate: null,
        current: true,
        description:
          "Leading development of web applications using React and Node.js.",
        technologies: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      },
      {
        id: 2,
        company: "Startup XYZ",
        position: "Frontend Developer",
        startDate: "2020-06-01",
        endDate: "2021-12-31",
        current: false,
        description:
          "Developed responsive web applications and improved user experience.",
        technologies: ["React", "JavaScript", "CSS", "REST APIs"],
      },
    ];
  }

  getEducation() {
    return [
      {
        id: 1,
        institution: "University Name",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2016-09-01",
        endDate: "2020-05-31",
        gpa: "3.8/4.0",
        description: "Focused on software engineering and web development.",
      },
    ];
  }

  // New portfolio model methods
  async findAll() {
    const portfolios = await this.portfolioModel.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Project,
          attributes: ["id", "title", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: portfolios,
      total: portfolios.length,
    };
  }

  async findOne(id: string) {
    const portfolio = await this.portfolioModel.findByPk(id, {
      attributes: [
        "id",
        "name",
        "title",
        "summary",
        "customDomain",
        "isFeatured",
        "publishedAt",
        "profileImageId",
        "coverImageId",
        "resumeId",
      ],
      include: [
        {
          model: Project,
          as: "projects",
          required: false,
        },
        { model: Education, as: "educations", required: false },
        { model: Experience, as: "experiences", required: false },
        { model: Skill, as: "skills", required: false },
        { model: SkillCategory, as: "skillCategories", required: false },
        {
          model: Social,
          as: "socialLinks",
          required: false,
        },
      ],
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    console.log("protfolio social links", portfolio.socialLinks);

    return portfolio;
  }

  async findByUserId(userId: string) {
    const portfolios = await this.portfolioModel.findAll({
      where: { userId },
      include: [
        {
          model: Project,
          attributes: ["id", "title", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: portfolios,
      total: portfolios.length,
    };
  }

  async findPublished() {
    const portfolios = await this.portfolioModel.findAll({
      where: {
        isPublished: true,
        visibility: "public",
      },
      include: [
        {
          model: Project,
          attributes: ["id", "title", "status"],
        },
      ],
      order: [["publishedAt", "DESC"]],
    });

    return {
      data: portfolios,
      total: portfolios.length,
    };
  }

  async findFeatured() {
    const portfolios = await this.portfolioModel.findAll({
      where: {
        isFeatured: true,
        isPublished: true,
      },
      include: [
        {
          model: Project,
          attributes: ["id", "title", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: portfolios,
      total: portfolios.length,
    };
  }

  async create(createPortfolioDto: CreatePortfolioDto, user: User) {
    const { socialLinks, ...rest } = createPortfolioDto;
    const portfolio = await this.portfolioModel.create({
      ...rest,
      id: user.id,
      userId: user.id,
      publishedAt: createPortfolioDto.isPublished ? new Date() : null,
    });

    if (socialLinks && socialLinks.length > 0)
      await this.socialModel.bulkCreate(
        socialLinks.map((link) => ({
          userId: user.id,
          portfolioId: portfolio.id,
          platform: link.platform as any,
          url: link.url,
        }))
      );

    return portfolio;
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto, user: User) {
    const portfolio = await this.portfolioModel.findByPk(id);

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    const updateData = {
      ...updatePortfolioDto,
      publishedAt:
        updatePortfolioDto.isPublished && !portfolio.isPublished
          ? new Date()
          : portfolio.publishedAt,
    };

    const { socialLinks, ...rest } = updatePortfolioDto;
    await portfolio.update(rest);

    if (socialLinks && socialLinks.length > 0) {
      await this.socialModel.destroy({ where: { portfolioId: id } });
      await this.socialModel.bulkCreate(
        socialLinks.map((link) => ({
          userId: user.id,
          portfolioId: portfolio.id,
          platform: link.platform as any,
          url: link.url,
        }))
      );
    }
    return portfolio;
  }

  async remove(id: number) {
    const portfolio = await this.portfolioModel.findByPk(id);

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    await portfolio.destroy();
    return portfolio;
  }

  async incrementViews(id: number) {
    const portfolio = await this.portfolioModel.findByPk(id);

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    const analytics = {
      ...portfolio,
      totalViews: 1,
      lastViewedAt: new Date().toISOString(),
    };

    await portfolio.update({ ...analytics });
    return portfolio;
  }

  async getAnalytics(id: string) {
    const portfolio = await this.findOne(id);
    return portfolio;
  }
}
