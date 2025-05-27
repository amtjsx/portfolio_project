import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { Op, type WhereOptions } from "sequelize";
import { Education } from "./models/education.model";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { EducationQueryDto } from "./dto/education-query.dto";
import { ReorderEducationDto } from "./dto/reorder-education.dto";
import { User } from "../user/models/user.model";
import { Portfolio } from "../portfolio/models/portfolio.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education)
    private educationModel: typeof Education,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Portfolio)
    private portfolioModel: typeof Portfolio
  ) {}

  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    // Check if user exists
    const user = await this.userModel.findByPk(createEducationDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createEducationDto.userId} not found`
      );
    }

    // Check if portfolio exists if portfolioId is provided
    if (createEducationDto.portfolioId) {
      const portfolio = await this.portfolioModel.findByPk(
        createEducationDto.portfolioId
      );
      if (!portfolio) {
        throw new NotFoundException(
          `Portfolio with ID ${createEducationDto.portfolioId} not found`
        );
      }

      // Check if portfolio belongs to the user
      if (portfolio.userId !== createEducationDto.userId) {
        throw new BadRequestException(
          `Portfolio with ID ${createEducationDto.portfolioId} does not belong to user with ID ${createEducationDto.userId}`
        );
      }
    }

    // Create education
    return this.educationModel.create(createEducationDto);
  }

  async findAll(query: EducationQueryDto): Promise<{
    data: Education[];
    count: number;
    totalPages: number;
    currentPage: number;
  }> {
    const {
      userId,
      portfolioId,
      institutionName,
      degree,
      fieldOfStudy,
      educationType,
      isCurrent,
      isHighlighted,
      isVerified,
      startDateFrom,
      startDateTo,
      endDateFrom,
      endDateTo,
      sortBy = "startDate",
      sortDirection = "DESC",
      page = 1,
      limit = 10,
    } = query;

    // Build where clause
    const whereClause: WhereOptions = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (portfolioId) {
      whereClause.portfolioId = portfolioId;
    }

    if (institutionName) {
      whereClause.institutionName = { [Op.iLike]: `%${institutionName}%` };
    }

    if (degree) {
      whereClause.degree = { [Op.iLike]: `%${degree}%` };
    }

    if (fieldOfStudy) {
      whereClause.fieldOfStudy = { [Op.iLike]: `%${fieldOfStudy}%` };
    }

    if (educationType) {
      whereClause.educationType = educationType;
    }

    if (isCurrent !== undefined) {
      whereClause.isCurrent = isCurrent;
    }

    if (isHighlighted !== undefined) {
      whereClause.isHighlighted = isHighlighted;
    }

    if (isVerified !== undefined) {
      whereClause.isVerified = isVerified;
    }

    // Date range filters
    if (startDateFrom || startDateTo) {
      whereClause.startDate = {};

      if (startDateFrom) {
        whereClause.startDate[Op.gte] = startDateFrom;
      }

      if (startDateTo) {
        whereClause.startDate[Op.lte] = startDateTo;
      }
    }

    if (endDateFrom || endDateTo) {
      whereClause.endDate = {};

      if (endDateFrom) {
        whereClause.endDate[Op.gte] = endDateFrom;
      }

      if (endDateTo) {
        whereClause.endDate[Op.lte] = endDateTo;
      }
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Get total count
    const count = await this.educationModel.count({ where: whereClause });

    // Get data with pagination
    const data = await this.educationModel.findAll({
      where: whereClause,
      order: [[sortBy, sortDirection]],
      limit,
      offset,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Portfolio,
          attributes: ["id", "title", "slug"],
        },
      ],
    });

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    return {
      data,
      count,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: string): Promise<Education> {
    const education = await this.educationModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Portfolio,
          attributes: ["id", "title", "slug"],
        },
      ],
    });

    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }

    return education;
  }

  async findByUserId(userId: string): Promise<Education[]> {
    // Check if user exists
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.educationModel.findAll({
      where: { userId },
      order: [
        ["isCurrent", "DESC"],
        ["startDate", "DESC"],
      ],
      include: [
        {
          model: Portfolio,
          attributes: ["id", "title", "slug"],
        },
      ],
    });
  }

  async findByPortfolioId(portfolioId: string): Promise<Education[]> {
    // Check if portfolio exists
    const portfolio = await this.portfolioModel.findByPk(portfolioId);
    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
    }

    return this.educationModel.findAll({
      where: { portfolioId },
      order: [
        ["displayOrder", "ASC"],
        ["isCurrent", "DESC"],
        ["startDate", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
  }

  async update(
    id: string,
    updateEducationDto: UpdateEducationDto
  ): Promise<Education> {
    const education = await this.findOne(id);

    // Check if portfolio exists if portfolioId is provided
    if (updateEducationDto.portfolioId) {
      const portfolio = await this.portfolioModel.findByPk(
        updateEducationDto.portfolioId
      );
      if (!portfolio) {
        throw new NotFoundException(
          `Portfolio with ID ${updateEducationDto.portfolioId} not found`
        );
      }

      // Check if portfolio belongs to the user
      if (portfolio.userId !== education.userId) {
        throw new BadRequestException(
          `Portfolio with ID ${updateEducationDto.portfolioId} does not belong to user with ID ${education.userId}`
        );
      }
    }

    // Update education
    await education.update(updateEducationDto);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const education = await this.findOne(id);
    await education.destroy();
  }

  async reorder(reorderDto: ReorderEducationDto): Promise<Education[]> {
    const { userId, educationIds } = reorderDto;

    // Check if user exists
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if all education entries exist and belong to the user
    const educations = await this.educationModel.findAll({
      where: {
        id: { [Op.in]: educationIds },
        userId,
      },
    });

    if (educations.length !== educationIds.length) {
      throw new BadRequestException(
        "Some education entries do not exist or do not belong to the user"
      );
    }

    // Update display order in a transaction

    try {
      for (let i = 0; i < educationIds.length; i++) {
        await this.educationModel.update(
          { displayOrder: i },
          {
            where: { id: educationIds[i] },
          }
        );
      }
    } catch (error) {
      throw error;
    }

    // Return updated education entries
    return this.educationModel.findAll({
      where: { userId },
      order: [["displayOrder", "ASC"]],
    });
  }

  async verifyEducation(
    id: string,
    verificationMethod: string
  ): Promise<Education> {
    const education = await this.findOne(id);

    await education.update({
      isVerified: true,
      verificationDate: new Date(),
      verificationMethod,
    });

    return education;
  }

  async addToPortfolio(
    educationId: string,
    portfolioId: string
  ): Promise<Education> {
    const education = await this.findOne(educationId);
    const portfolio = await this.portfolioModel.findByPk(portfolioId);

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
    }

    // Check if portfolio belongs to the user
    if (portfolio.userId !== education.userId) {
      throw new BadRequestException(
        `Portfolio with ID ${portfolioId} does not belong to user with ID ${education.userId}`
      );
    }

    // Update education
    await education.update({ portfolioId });

    return this.findOne(educationId);
  }

  async removeFromPortfolio(educationId: string): Promise<Education> {
    const education = await this.findOne(educationId);

    // Update education
    await education.update({ portfolioId: null });

    return this.findOne(educationId);
  }
}
