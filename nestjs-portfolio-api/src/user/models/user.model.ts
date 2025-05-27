import {
  Table,
  Column,
  DataType,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
  Scopes,
  DefaultScope,
} from "sequelize-typescript";
import { Op } from "sequelize";
import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Portfolio } from "../../portfolio/models/portfolio.model";
import { Project } from "../../projects/models/project.model";
import { Technical } from "../../technical/models/technical.model";
import { Contact } from "../../contact/models/contact.model";
import { UploadedFile } from "../../upload/models/uploaded-file.model";
import { Social } from "../../social/models/social.model";
import { BaseModel } from "../../common/models/base.model";
import { Subscription } from "../../pricing/models/subscription.model";

@DefaultScope(() => ({
  where: {
    deletedAt: null,
  },
}))
@Scopes(() => ({
  withDeleted: {
    where: {},
  },
  onlyDeleted: {
    where: {
      deletedAt: { [Op.ne]: null },
    },
  },
}))
@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
export class User extends BaseModel<User> {
  @ApiProperty({
    description: "User UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ApiProperty({ description: "Username", example: "johndoe" })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username: string;

  @ApiProperty({ description: "Email address", example: "john@example.com" })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

  @ApiProperty({ description: "First name", example: "John" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ description: "Last name", example: "Doe" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ description: "Profile avatar URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  avatarUrl: string;

  @ApiProperty({ description: "User bio", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @ApiProperty({ description: "Phone number", required: false })
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone: string;

  @ApiProperty({ description: "Location", example: "New York, USA" })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  location: string;

  @ApiProperty({ description: "Website URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  website: string;

  @ApiProperty({ description: "LinkedIn profile URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  linkedinUrl: string;

  @ApiProperty({ description: "GitHub profile URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  githubUrl: string;

  @ApiProperty({ description: "Twitter profile URL", required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  twitterUrl: string;

  @ApiProperty({
    description: "User role",
    example: "admin",
    enum: ["admin", "user", "guest"],
  })
  @Column({
    type: DataType.ENUM("admin", "user", "guest"),
    allowNull: false,
    defaultValue: "user",
  })
  role: "admin" | "user" | "guest";

  @ApiProperty({
    description: "Account status",
    example: "active",
    enum: ["active", "inactive", "suspended"],
  })
  @Column({
    type: DataType.ENUM("active", "inactive", "suspended"),
    allowNull: false,
    defaultValue: "active",
  })
  status: "active" | "inactive" | "suspended";

  @ApiProperty({ description: "Email verification status", example: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isEmailVerified: boolean;

  @ApiProperty({ description: "Profile completion percentage", example: 85 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100,
    },
  })
  profileCompleteness: number;

  @ApiProperty({ description: "Last login timestamp", required: false })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastLoginAt: Date;

  @ApiProperty({
    description: "Account creation timestamp",
    example: "2023-01-01T00:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @ApiProperty({
    description: "Last update timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  // Associations
  @HasMany(() => Portfolio)
  portfolios: Portfolio[];

  @HasMany(() => Project)
  projects: Project[];

  @HasMany(() => Technical)
  technicalSkills: Technical[];

  @HasMany(() => Contact)
  contacts: Contact[];

  @HasMany(() => UploadedFile)
  uploadedFiles: UploadedFile[];

  @HasMany(() => Social)
  socialLinks: Social[];

  @HasMany(() => Subscription)
  subscriptions: Subscription[];

  // Hooks
  @BeforeCreate
  static async generateUuid(instance: User) {
    if (!instance.id) {
      instance.id = uuidv4();
    }
  }

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @BeforeUpdate
  static calculateProfileCompleteness(instance: User) {
    const fields = [
      "firstName",
      "lastName",
      "email",
      "bio",
      "phone",
      "location",
      "website",
      "linkedinUrl",
      "githubUrl",
      "avatarUrl",
    ];

    const completedFields = fields.filter(
      (field) => instance[field] && instance[field].toString().trim() !== ""
    );
    instance.profileCompleteness = Math.round(
      (completedFields.length / fields.length) * 100
    );
  }

  // Instance methods
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}
