export interface Skill {
  id?: string;
  name: string;
  description?: string;
  proficiencyLevel: ProficiencyLevel;
  yearsOfExperience?: number;
  lastUsedDate?: string;
  displayOrder?: number;
  metadata?: any;
  icon?: string;
  color?: string;
  isFeatured: boolean;
  endorsementCount: number;
  categoryId: string;
  category: SkillCategory;
  certificates?: Certificate[];
  achievements?: Achievement[];
}

// Enums matching the Sequelize model
export enum ProficiencyLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

// Interfaces matching the Sequelize models
export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  displayOrder: number;
  isVisible: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  type: "certification" | "course" | "achievement" | "award";
  image?: string;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "project" | "contribution" | "recognition" | "milestone";
  icon: React.ReactNode;
  value?: string;
}
