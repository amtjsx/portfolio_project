import { ConflictException, Injectable } from "@nestjs/common";
import { Op } from "sequelize";
import { BaseService } from "../common/services/base.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if username or email already exists
    const existingUser = await this.userModel.scope("withDeleted").findOne({
      where: {
        [Op.or]: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      },
    });

    if (existingUser) {
      // If user exists but is soft-deleted, allow reactivation
      if (existingUser.deletedAt) {
        await existingUser.restore();
        // Update with new data
        existingUser.set(createUserDto);
        return existingUser.save();
      }

      throw new ConflictException("Username or email already exists");
    }

    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return super.findAll();
  }

  async updateLastLogin(userId: string): Promise<User> {
    const user = await this.findById(userId);
    user.lastLoginAt = new Date();
    return user.save();
  }

  async findAllWithDeleted(): Promise<User[]> {
    return super.findAllWithDeleted();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.scope("withDeleted").findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.scope("withDeleted").findOne({ where: { email } });
  }

  async findOnlyDeleted(): Promise<User[]> {
    return super.findOnlyDeleted();
  }

  async findById(id: string): Promise<User> {
    return super.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    await user.update(updateUserDto);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.softDelete(id);
  }

  async permanentlyRemove(id: string): Promise<void> {
    await this.permanentDelete(id);
  }

  async restore(id: string): Promise<User> {
    return super.restore(id);
  }
}
