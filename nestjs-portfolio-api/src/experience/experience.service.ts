import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Portfolio } from "../portfolio/models/portfolio.model";
import { User } from "../user/models/user.model";
import { CreateExperienceDto } from "./dto/create-experience.dto";
import { ExperienceQueryDto } from "./dto/experience-query.dto";
import { UpdateExperienceDto } from "./dto/update-experience.dto";
import { Experience } from "./models/experience.model";

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience)
    private experienceModel: typeof Experience
  ) {}

  async create(
    createExperienceDto: CreateExperienceDto,
    user: User
  ): Promise<Experience> {
    // If this is set as current job, ensure endDate is null
    if (createExperienceDto.isCurrent) {
      createExperienceDto.endDate = null;
    }

    // Create the experience
    const experience = await this.experienceModel.create({
      ...createExperienceDto,
      userId: user.id,
      portfolioId: user.id,
    });
    return experience;
  }

  async findAll(query: ExperienceQueryDto = {}, user: User) {
    const whereClause: any = { userId: user.id };

    if (query.portfolioId) {
      whereClause.portfolioId = query.portfolioId;
    }

    if (query.employmentType) {
      whereClause.employmentType = query.employmentType;
    }

    if (query.isCurrent !== undefined) {
      whereClause.isCurrent = query.isCurrent;
    }

    if (query.isHighlighted !== undefined) {
      whereClause.isHighlighted = query.isHighlighted;
    }

    if (query.search) {
      whereClause[Op.or] = [
        { companyName: { [Op.iLike]: `%${query.search}%` } },
        { position: { [Op.iLike]: `%${query.search}%` } },
      ];
    }

    if (query.technology) {
      whereClause.technologies = { [Op.contains]: [query.technology] };
    }

    const experiences = await this.experienceModel.findAndCountAll({
      where: whereClause,
      order: [
        ["isCurrent", "DESC"],
        ["startDate", "DESC"],
        ["displayOrder", "ASC"],
      ],
    });

    return {
      data: [],
      total: 0
    };
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experienceModel.findByPk(id, {});

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    return experience;
  }

  async findByUserId(
    userId: string
  ): Promise<{ data: Experience[]; total: number }> {
    const experiences = await this.experienceModel.findAll({
      where: { userId },
      order: [
        ["isCurrent", "DESC"],
        ["startDate", "DESC"],
        ["displayOrder", "ASC"],
      ],
    });

    return {
      data: experiences,
      total: experiences.length,
    };
  }

  async findByPortfolioId(
    portfolioId: string
  ): Promise<{ data: Experience[]; total: number }> {
    const experiences = await this.experienceModel.findAll({
      where: { portfolioId },
      order: [
        ["isCurrent", "DESC"],
        ["startDate", "DESC"],
        ["displayOrder", "ASC"],
      ],
    });

    return {
      data: experiences,
      total: experiences.length,
    };
  }

  async update(
    id: string,
    updateExperienceDto: UpdateExperienceDto
  ): Promise<Experience> {
    const experience = await this.findOne(id);

    // If setting as current job, ensure endDate is null
    if (updateExperienceDto.isCurrent) {
      updateExperienceDto.endDate = null;
    }

    // If portfolioId is provided, check if it exists
    if (updateExperienceDto.portfolioId) {
      const portfolio = await Portfolio.findByPk(
        updateExperienceDto.portfolioId
      );
      if (!portfolio) {
        throw new NotFoundException(
          `Portfolio with ID ${updateExperienceDto.portfolioId} not found`
        );
      }
    }

    await experience.update(updateExperienceDto);
    return experience;
  }

  async remove(id: string): Promise<Experience> {
    const experience = await this.findOne(id);
    await experience.destroy();
    return experience;
  }

  async reorder(
    userId: string,
    experienceIds: string[]
  ): Promise<Experience[]> {
    // Verify all experiences belong to the user
    const experiences = await this.experienceModel.findAll({
      where: {
        id: experienceIds,
        userId,
      },
    });

    if (experiences.length !== experienceIds.length) {
      throw new NotFoundException(
        "One or more experiences not found or don't belong to the user"
      );
    }

    // Update display order for each experience
    const updatedExperiences = [];
    for (let i = 0; i < experienceIds.length; i++) {
      const experience = experiences.find((e) => e.id === experienceIds[i]);
      await experience.update({ displayOrder: i });
      updatedExperiences.push(experience);
    }

    return updatedExperiences;
  }
}
