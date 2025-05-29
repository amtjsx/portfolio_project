import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Portfolio } from "../portfolio/models/portfolio.model";
import { User } from "../user/models/user.model";
import { mockCategories } from "./data/mock-skills";
import { CreateSkillCategoryDto } from "./dto/create-skill-category.dto";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { SkillQueryDto } from "./dto/skill-query.dto";
import { UpdateSkillCategoryDto } from "./dto/update-skill-category.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { SkillCategory } from "./models/skill-category.model";
import { Skill, type ProficiencyLevel } from "./models/skill.model";

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill)
    private skillModel: typeof Skill,
    @InjectModel(SkillCategory)
    private skillCategoryModel: typeof SkillCategory,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Portfolio)
    private portfolioModel: typeof Portfolio
  ) {}

  // Skill Category Methods
  async createCategory(
    createSkillCategoryDto: CreateSkillCategoryDto,
    user: User
  ): Promise<SkillCategory> {
    // Get the highest display order for this user's categories
    const highestOrder =
      (await this.skillCategoryModel.max("displayOrder", {
        where: { userId: user.id },
      })) || 0;

    // Create the category with the next display order
    return this.skillCategoryModel.create({
      ...createSkillCategoryDto,
      userId: user.id,
      displayOrder: (highestOrder as number) + 1,
    });
  }

  async findAllCategories(userId: string) {
    const { rows: categories, count } =
      await this.skillCategoryModel.findAndCountAll({
        where: { userId },
        order: [["displayOrder", "ASC"]],
      });
    return { data: categories, total: count };
  }

  async findCategoryById(id: string): Promise<SkillCategory> {
    const category = await this.skillCategoryModel.findByPk(id, {
      include: [
        {
          model: Skill,
          as: "skills",
          order: [["displayOrder", "ASC"]],
        },
      ],
    });

    if (!category) {
      throw new NotFoundException(`Skill category with ID ${id} not found`);
    }

    return category;
  }

  async updateCategory(
    id: string,
    updateSkillCategoryDto: UpdateSkillCategoryDto,
    user: User
  ): Promise<SkillCategory> {
    const category = await this.findCategoryById(id);
    await category.update(updateSkillCategoryDto);
    return this.findCategoryById(id);
  }

  async removeCategory(id: string): Promise<void> {
    const category = await this.findCategoryById(id);

    // Check if category has skills
    const skillCount = await this.skillModel.count({
      where: { categoryId: id },
    });
    if (skillCount > 0) {
      throw new BadRequestException(
        `Cannot delete category with ${skillCount} skills. Remove or reassign skills first.`
      );
    }

    await category.destroy();
  }

  async reorderCategories(userId: string, categoryIds: string[]) {
    // Verify all categories exist and belong to the user
    const categories = await this.skillCategoryModel.findAll({
      where: {
        id: { [Op.in]: categoryIds },
        userId,
      },
    });

    if (categories.length !== categoryIds.length) {
      throw new BadRequestException(
        "One or more categories not found or do not belong to the user"
      );
    }

    // Update display order in a transaction
    for (let i = 0; i < categoryIds.length; i++) {
      await this.skillCategoryModel.update(
        { displayOrder: i },
        {
          where: { id: categoryIds[i] },
        }
      );
    }

    return mockCategories;
  }

  // Skill Methods
  async create(createSkillDto: CreateSkillDto, user: User): Promise<Skill> {
    // Get the highest display order for this user's skills in the category (if provided)
    const whereClause: any = { userId: user.id };
    if (createSkillDto.categoryId) {
      whereClause.categoryId = createSkillDto.categoryId;
    }

    const highestOrder =
      (await this.skillModel.max("displayOrder", {
        where: whereClause,
      })) || 0;

    // Create the skill with the next display order
    return this.skillModel.create({
      ...createSkillDto,
      userId: user.id,
      portfolioId: user.id,
      displayOrder: createSkillDto.displayOrder ?? (highestOrder as number) + 1,
    });
  }

  async findAll(query: SkillQueryDto, user: User) {
    const {
      categoryId,
      proficiencyLevel,
      minYearsOfExperience,
      isFeatured,
      search,
      page = 1,
      limit = 10,
      sortBy = "displayOrder",
      sortDirection = "ASC",
      includeCategory = false,
    } = query;

    // Build where clause
    const whereClause: any = { userId: user.id };
    if (categoryId) whereClause.categoryId = categoryId;
    if (proficiencyLevel) whereClause.proficiencyLevel = proficiencyLevel;
    if (minYearsOfExperience !== undefined) {
      whereClause.yearsOfExperience = { [Op.gte]: minYearsOfExperience };
    }
    if (isFeatured !== undefined) whereClause.isFeatured = isFeatured;
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Build include array
    const include = [];
    if (includeCategory) {
      include.push({
        model: SkillCategory,
        as: "category",
      });
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Get skills
    const { count, rows: skills } = await this.skillModel.findAndCountAll({
      where: whereClause,
      include,
      order: [[sortBy, sortDirection]],
      limit,
      offset,
    });

    return {
      data: skills,
      total: count,
    };
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel.findByPk(id, {
      include: [
        {
          model: SkillCategory,
          as: "category",
        },
      ],
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return skill;
  }

  async findByUser(userId: string): Promise<Skill[]> {
    return this.skillModel.findAll({
      where: { userId },
      include: [
        {
          model: SkillCategory,
          as: "category",
        },
      ],
      order: [
        ["categoryId", "ASC"],
        ["displayOrder", "ASC"],
      ],
    });
  }

  async findByPortfolio(portfolioId: string): Promise<Skill[]> {
    return this.skillModel.findAll({
      where: { portfolioId },
      include: [
        {
          model: SkillCategory,
          as: "category",
        },
      ],
      order: [
        ["categoryId", "ASC"],
        ["displayOrder", "ASC"],
      ],
    });
  }

  async findByCategory(categoryId: string): Promise<Skill[]> {
    return this.skillModel.findAll({
      where: { categoryId },
      order: [["displayOrder", "ASC"]],
    });
  }

  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
    user: User
  ): Promise<Skill> {
    const skill = await this.findOne(id);

    // Check if portfolio exists if portfolioId is provided
    if (updateSkillDto.portfolioId) {
      const portfolio = await this.portfolioModel.findByPk(
        updateSkillDto.portfolioId
      );
      if (!portfolio) {
        throw new NotFoundException(
          `Portfolio with ID ${updateSkillDto.portfolioId} not found`
        );
      }
    }

    // Check if category exists if categoryId is provided
    if (updateSkillDto.categoryId) {
      const category = await this.skillCategoryModel.findByPk(
        updateSkillDto.categoryId
      );
      if (!category) {
        throw new NotFoundException(
          `Skill category with ID ${updateSkillDto.categoryId} not found`
        );
      }
    }

    await skill.update(updateSkillDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const skill = await this.findOne(id);
    await skill.destroy();
  }

  async reorderSkills(
    userId: string,
    categoryId: string,
    skillIds: string[]
  ): Promise<Skill[]> {
    // Verify all skills exist, belong to the user, and are in the category
    const skills = await this.skillModel.findAll({
      where: {
        id: { [Op.in]: skillIds },
        userId,
        categoryId,
      },
    });

    if (skills.length !== skillIds.length) {
      throw new BadRequestException(
        "One or more skills not found, do not belong to the user, or are not in the specified category"
      );
    }

    // Update display order in a transaction
    for (let i = 0; i < skillIds.length; i++) {
      await this.skillModel.update(
        { displayOrder: i },
        {
          where: { id: skillIds[i] },
        }
      );
    }

    return this.findByCategory(categoryId);
  }

  async addEndorsement(id: string): Promise<Skill> {
    const skill = await this.findOne(id);
    await skill.update({
      endorsementCount: skill.endorsementCount + 1,
    });
    return this.findOne(id);
  }

  async getSkillsByProficiencyLevel(
    userId: string,
    level: ProficiencyLevel
  ): Promise<Skill[]> {
    return this.skillModel.findAll({
      where: {
        userId,
        proficiencyLevel: level,
      },
      include: [
        {
          model: SkillCategory,
          as: "category",
        },
      ],
      order: [["displayOrder", "ASC"]],
    });
  }

  async getSkillsWithCategories(userId: string): Promise<any[]> {
    const categories = await this.skillCategoryModel.findAll({
      where: { userId },
      order: [["displayOrder", "ASC"]],
      include: [
        {
          model: Skill,
          as: "skills",
          required: false,
          order: [["displayOrder", "ASC"]],
        },
      ],
    });

    return categories;
  }
}
