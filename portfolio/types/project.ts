export interface Project {
  featured: boolean;
  id: string;
  title: string;
  description: string;
  imageId: string;
  url: string;
  githubUrl: string;
  technologies: string[];
  portfolioId: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  category: ProjectCategory;
}

export enum ProjectStatus {
  Completed = "completed",
  InProgress = "in-progress",
  Planned = "planned",
}

export interface ProjectCategory {
  id: string;
  name: string;
}
