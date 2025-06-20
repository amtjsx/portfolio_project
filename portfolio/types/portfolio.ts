import { Contact } from "./contact";
import { Education } from "./education";
import { Experience } from "./experience";
import { Project } from "./project";
import { Skill, SkillCategory } from "./skills";
import { Testimonial } from "./testimonials";

export interface Portfolio {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  summary: string;
  theme: string;
  primaryColor: string;
  resumeId: string;
  coverImageId: string;
  profileImageId: string;
  secondaryColor: string;
  visibility: string;
  customDomain: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  socialLinks: {
    platform: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  skillCategories: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  skills: Skill[];
  sections: {
    about: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    contact: boolean;
    testimonials: boolean;
    blog: boolean;
  };
  education: Education[];
  contact?: Contact;
  settings: {
    showContactForm: boolean;
    allowDownloadResume: boolean;
    enableAnalytics: boolean;
    enableComments: boolean;
    maintenanceMode: boolean;
  };
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
