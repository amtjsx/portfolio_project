"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  FileText,
  Briefcase,
  FolderOpen,
  MessageSquare,
  GraduationCap,
  Wrench,
  Mail,
  User,
  ImageIcon,
} from "lucide-react";

interface EmptyFieldProps {
  type:
    | "about"
    | "experience"
    | "projects"
    | "testimonials"
    | "education"
    | "skills"
    | "contact"
    | "profile"
    | "cover";
  isOwner?: boolean;
  onAdd?: () => void;
  className?: string;
}

const emptyStateConfig = {
  about: {
    icon: FileText,
    title: "No about section",
    description: "Add a compelling summary about your background and expertise",
    buttonText: "Add About Section",
  },
  experience: {
    icon: Briefcase,
    title: "No work experience",
    description: "Showcase your professional journey and achievements",
    buttonText: "Add Experience",
  },
  projects: {
    icon: FolderOpen,
    title: "No projects yet",
    description: "Display your best work and technical projects",
    buttonText: "Add Project",
  },
  testimonials: {
    icon: MessageSquare,
    title: "No testimonials",
    description: "Share feedback and recommendations from colleagues",
    buttonText: "Add Testimonial",
  },
  education: {
    icon: GraduationCap,
    title: "No education listed",
    description: "Add your academic background and qualifications",
    buttonText: "Add Education",
  },
  skills: {
    icon: Wrench,
    title: "No skills added",
    description: "Highlight your technical and professional skills",
    buttonText: "Add Skills",
  },
  contact: {
    icon: Mail,
    title: "No contact info",
    description: "Add ways for people to reach out to you",
    buttonText: "Add Contact Info",
  },
  profile: {
    icon: User,
    title: "No profile image",
    description: "Upload a professional photo to personalize your portfolio",
    buttonText: "Upload Photo",
  },
  cover: {
    icon: ImageIcon,
    title: "No cover image",
    description: "Add a background image to make your portfolio stand out",
    buttonText: "Upload Cover",
  },
};

export default function EmptyField({
  type,
  isOwner = false,
  onAdd,
  className = "",
}: EmptyFieldProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  if (!isOwner) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No {type} information available</p>
      </div>
    );
  }

  return (
    <Card
      className={`border-dashed border-2 border-muted-foreground/20 ${className}`}
    >
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="rounded-full bg-muted/50 p-4 mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>

        <h3 className="font-semibold text-lg mb-2 text-foreground">
          {config.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          {config.description}
        </p>

        <Button
          onClick={onAdd}
          variant="outline"
          className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
          {config.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
