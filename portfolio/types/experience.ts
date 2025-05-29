import { EmploymentType } from "@/app/(dashboard)/experience/mock-experiences";

export interface Experience {
  id: string;
  companyName: string;
  position: string;
  employmentType: EmploymentType;
  location?: string;
  isRemote: boolean;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  companyLogoUrl?: string;
  isHighlighted: boolean;
}
