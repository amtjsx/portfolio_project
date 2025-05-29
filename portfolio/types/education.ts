export interface Education {
  id: string;
  institutionName: string;
  institutionLogo: string;
  institutionUrl: string;
  degree: string;
  fieldOfStudy: string;
  educationType: EducationType;
  startDate: Date;
  endDate: Date;
  description: string;
  isCurrent: boolean;
  isHighlighted: boolean;
  isVerified: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

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
