import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Roles } from "../auth/decorators/roles.decorator"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { User } from "./models/user.model"
import { UserService } from "./user.service"

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully", type: User })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 409, description: "User already exists" })
  create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Return all users", type: [User] })
  findAll() {
    return this.userService.findAll()
  }

  @Get("with-deleted")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users including deleted ones" })
  @ApiResponse({ status: 200, description: "Return all users including deleted ones", type: [User] })
  findAllWithDeleted() {
    return this.userService.findAllWithDeleted()
  }

  @Get("only-deleted")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get only deleted users" })
  @ApiResponse({ status: 200, description: "Return only deleted users", type: [User] })
  findOnlyDeleted() {
    return this.userService.findOnlyDeleted()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Return the user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a user" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User updated successfully", type: User })
  @ApiResponse({ status: 404, description: "User not found" })
  update(@Param('id') id: string, updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete(':id/permanent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Permanently delete a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 204, description: 'User permanently deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  permanentlyRemove(@Param('id') id: string) {
    return this.userService.permanentlyRemove(id);
  }

  @Post(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore a soft-deleted user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User restored successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found or not deleted' })
  restore(@Param('id') id: string) {
    return this.userService.restore(id);
  }
}
