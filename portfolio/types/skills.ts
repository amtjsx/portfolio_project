import { ProficiencyLevel } from "@/app/(dashboard)/skills/mock-data";
import { SkillCategory } from "./skill-category";

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
}
