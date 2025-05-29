import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../user/models/user.model";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./models/project.model";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private readonly projectModel: typeof Project
  ) {}

  async findAll(query: any, user: User) {
    const { rows, count } = await this.projectModel.findAndCountAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });

    return {
      data: rows,
      total: count,
    };
  }

  async findOne(id: number) {
    const project = await this.projectModel.findByPk(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto, user: User) {
    const project = await this.projectModel.create({
      ...createProjectDto,
      userId: user.id,
      portfolioId: user.id,
    });
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await project.update(updateProjectDto);
    return project;
  }

  async remove(id: number) {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await project.destroy();
    return project;
  }

  async findByCategory(category: string) {
    const projects = await this.projectModel.findAll({
      where: { category: category.toLowerCase() },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: projects,
      total: projects.length,
      category,
    };
  }

  async findFeatured() {
    const projects = await this.projectModel.findAll({
      where: { featured: true },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: projects,
      total: projects.length,
    };
  }

  async findByUserId(userId: string) {
    const projects = await this.projectModel.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return {
      data: projects,
      total: projects.length,
    };
  }

  async findByStatus(status: string) {
    const projects = await this.projectModel.findAll({
      where: { status },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: projects,
      total: projects.length,
      status,
    };
  }
}
