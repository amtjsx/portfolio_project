import { Injectable, NotFoundException } from "@nestjs/common";
import { Op } from "sequelize";
import { User } from "../user/models/user.model";
import { CreateTechnicalDto } from "./dto/create-technical.dto";
import { UpdateTechnicalDto } from "./dto/update-technical.dto";
import { Technical } from "./models/technical.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class TechnicalService {
  constructor(
    @InjectModel(Technical) private readonly technicalModel: typeof Technical
  ) {}

  async findAll() {
    const technical = await this.technicalModel.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "username"],
        },
      ],
      order: [
        ["level", "DESC"],
        ["name", "ASC"],
      ],
    });

    return {
      data: technical,
      total: technical.length,
    };
  }

  async findOne(id: number) {
    const tech = await this.technicalModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "username"],
        },
      ],
    });

    if (!tech) {
      throw new NotFoundException(`Technical skill with ID ${id} not found`);
    }
    return tech;
  }

  async findByCategory(category: string) {
    const technical = await this.technicalModel.findAll({
      where: { category: category.toLowerCase() },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [
        ["level", "DESC"],
        ["name", "ASC"],
      ],
    });

    return {
      data: technical,
      total: technical.length,
      category,
    };
  }

  async create(createTechnicalDto: CreateTechnicalDto) {
    const technical = await this.technicalModel.create(createTechnicalDto);
    return technical;
  }

  async update(id: number, updateTechnicalDto: UpdateTechnicalDto) {
    const tech = await this.technicalModel.findByPk(id);
    if (!tech) {
      throw new NotFoundException(`Technical skill with ID ${id} not found`);
    }

    await tech.update(updateTechnicalDto);
    return tech;
  }

  async remove(id: number) {
    const tech = await this.technicalModel.findByPk(id);
    if (!tech) {
      throw new NotFoundException(`Technical skill with ID ${id} not found`);
    }

    await tech.destroy();
    return tech;
  }

  async getSkillsByLevel(minLevel = 0) {
    const technical = await this.technicalModel.findAll({
      where: {
        level: {
          [Op.gte]: minLevel,
        },
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [
        ["level", "DESC"],
        ["name", "ASC"],
      ],
    });

    return {
      data: technical,
      total: technical.length,
      minLevel,
    };
  }

  async getCurrentlyUsed() {
    const technical = await this.technicalModel.findAll({
      where: { isCurrentlyUsing: true },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [
        ["level", "DESC"],
        ["name", "ASC"],
      ],
    });

    return {
      data: technical,
      total: technical.length,
    };
  }

  async findByUserId(userId: string) {
    const technical = await this.technicalModel.findAll({
      where: { userId },
      order: [
        ["level", "DESC"],
        ["name", "ASC"],
      ],
    });

    return {
      data: technical,
      total: technical.length,
    };
  }

  async getTopSkills(limit = 10) {
    const technical = await this.technicalModel.findAll({
      order: [
        ["level", "DESC"],
        ["yearsOfExperience", "DESC"],
      ],
      limit,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    return {
      data: technical,
      total: technical.length,
      limit,
    };
  }
}
