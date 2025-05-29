import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Index,
} from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Portfolio } from "../../portfolio/models/portfolio.model";
import { BaseModel } from "../../common/models/base.model";

export enum EducationType {
  BACHELORS = "bachelors",
  MASTERS = "masters",
  DOCTORATE = "doctorate",
  ASSOCIATE = "associate",
  CERTIFICATE = "certificate",
  DIPLOMA = "diploma",
  HIGH_SCHOOL = "high_school",
  VOCATIONAL = "vocational",
  ONLINE_COURSE = "online_course",
  SELF_STUDY = "self_study",
  OTHER = "other",
}

@Table({
  tableName: "educations",
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Education extends BaseModel<Education> {
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  institutionName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  institutionLogo: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  institutionUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  degree: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  fieldOfStudy: string;

  @AllowNull(true)
  @Column(DataType.ENUM(...Object.values(EducationType)))
  educationType: EducationType;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  startDate: Date;

  @AllowNull(true)
  @Column(DataType.DATEONLY)
  endDate: Date;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isCurrent: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  location: string;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  isRemote: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  gpa: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
  courses: string[];

  @AllowNull(true)
  @Column(DataType.JSONB)
  honors: string[];

  @AllowNull(true)
  @Column(DataType.JSONB)
  activities: string[];

  @AllowNull(true)
  @Column(DataType.JSONB)
  projects: string[];

  @AllowNull(true)
  @Column(DataType.JSONB)
  achievements: string[];

  @AllowNull(true)
  @Column(DataType.JSONB)
  skills: string[];

  @Default(false)
  @Column(DataType.BOOLEAN)
  isHighlighted: boolean;

  @Default(0)
  @Column(DataType.INTEGER)
  displayOrder: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  certificateUrl: string;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  isVerified: boolean;

  @AllowNull(true)
  @Column(DataType.DATE)
  verificationDate: Date;

  @AllowNull(true)
  @Column(DataType.STRING)
  verificationMethod: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
  additionalInfo: object;

  // Relationships
  @ForeignKey(() => User)
  @AllowNull(false)
  @Index
  @Column(DataType.UUID)
  userId: string;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Portfolio)
  @AllowNull(true)
  @Index
  @Column(DataType.UUID)
  portfolioId: string;
  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  // Hooks
  @BeforeCreate
  @BeforeUpdate
  static validateDates(instance: Education) {
    // If isCurrent is true, endDate should be null
    if (instance.isCurrent) {
      instance.endDate = null;
    }

    // If endDate is set, isCurrent should be false
    if (instance.endDate) {
      instance.isCurrent = false;
    }

    // Ensure startDate is before endDate if both exist
    if (instance.startDate && instance.endDate) {
      const start = new Date(instance.startDate);
      const end = new Date(instance.endDate);

      if (start > end) {
        throw new Error("Start date must be before end date");
      }
    }
  }

  // Virtual fields
  get duration(): string {
    const start = new Date(this.startDate);
    const end = this.endDate ? new Date(this.endDate) : new Date();

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    let totalMonths = years * 12 + months;
    if (end.getDate() < start.getDate()) {
      totalMonths--;
    }

    const durationYears = Math.floor(totalMonths / 12);
    const durationMonths = totalMonths % 12;

    let result = "";
    if (durationYears > 0) {
      result += `${durationYears} year${durationYears !== 1 ? "s" : ""}`;
    }

    if (durationMonths > 0) {
      if (result.length > 0) result += " ";
      result += `${durationMonths} month${durationMonths !== 1 ? "s" : ""}`;
    }

    if (result.length === 0) {
      result = "Less than a month";
    }

    return result;
  }

  get formattedDates(): string {
    const startYear = new Date(this.startDate).getFullYear();
    const endYear = this.endDate
      ? new Date(this.endDate).getFullYear()
      : "Present";

    return `${startYear} - ${endYear}`;
  }

  get shortDescription(): string {
    return `${this.degree} in ${this.fieldOfStudy}`;
  }
}
