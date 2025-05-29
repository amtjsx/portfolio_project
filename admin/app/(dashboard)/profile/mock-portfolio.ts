import { mockExperiences } from "../experience/mock-experiences";
import { mockProjects } from "../projects/components/mock-data";
import { mockSkills } from "../skills/mock-data";

// Mock portfolio data for demonstration
export const mockPortfolio = {
  id: "1",
  slug: "john-doe",
  name: "John Doe",
  title: "Senior Full Stack Developer",
  bio: "Passionate full-stack developer with 7+ years of experience building scalable web applications. I love creating elegant solutions to complex problems and mentoring the next generation of developers.",
  avatarUrl:
    "/placeholder.svg?height=320&width=320&query=professional developer headshot",
  status: "Available for hire",
  featuredSkills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"],

  socialLinks: [
    { platform: "github", url: "https://github.com/johndoe" },
    { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
    { platform: "website", url: "https://johndoe.dev" },
  ],

  projects: mockProjects,
  skillCategories: mockSkills,
  experiences: mockExperiences,

  contact: {
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
};
