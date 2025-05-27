import { Project } from "./project";
import { Testimonial } from "./testimonials";
import { Skill } from "./skills";
import { Contact } from "./contact";

export interface Portfolio {
  id: string;
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
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
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
  education: {
    id: string;
    title: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    gpa: string;
  }[];
  contact: Contact;
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
