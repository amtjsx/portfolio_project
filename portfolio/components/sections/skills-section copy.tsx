"use client";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Code,
  ExternalLink,
  Medal,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import type React from "react";

import {
  AnimatedList,
  AnimatedSection,
  AnimatedText,
  AnimatedTitle,
  FadeInWhenVisible,
} from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Enums matching the Sequelize model
enum ProficiencyLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

// Interfaces matching the Sequelize models
interface SkillCategory {
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

interface Skill {
  id: string;
  name: string;
  description: string;
  proficiencyLevel: ProficiencyLevel;
  yearsOfExperience: number;
  lastUsedDate: string;
  icon: string;
  color: string;
  isFeatured: boolean;
  displayOrder: number;
  endorsementCount: number;
  metadata: any;
  userId: string;
  portfolioId: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Certificate {
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "project" | "contribution" | "recognition" | "milestone";
  icon: React.ReactNode;
  value?: string;
}

interface SkillCardProps {
  name: string;
  level: ProficiencyLevel;
  percentage: number;
  icon?: React.ReactNode;
  description?: string;
  projects?: number;
  certificates?: Certificate[];
  achievements?: Achievement[];
}

// Mock data based on Sequelize models
const mockUserId = "550e8400-e29b-41d4-a716-446655440000";
const mockPortfolioId = "660e8400-e29b-41d4-a716-446655440000";

const mockSkillCategories: SkillCategory[] = [
  {
    id: "770e8400-e29b-41d4-a716-446655440001",
    name: "Frontend Development",
    description:
      "Creating beautiful, responsive, and interactive user interfaces with modern frameworks and libraries",
    displayOrder: 1,
    isVisible: true,
    userId: mockUserId,
    createdAt: "2023-01-15T10:00:00.000Z",
    updatedAt: "2023-05-20T14:30:00.000Z",
    deletedAt: null,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440002",
    name: "Backend Development",
    description:
      "Building scalable and secure server-side applications with robust architectures",
    displayOrder: 2,
    isVisible: true,
    userId: mockUserId,
    createdAt: "2023-01-15T10:05:00.000Z",
    updatedAt: "2023-05-20T14:35:00.000Z",
    deletedAt: null,
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440003",
    name: "Tools & Technologies",
    description:
      "Development tools and technologies that enhance productivity and streamline workflows",
    displayOrder: 3,
    isVisible: true,
    userId: mockUserId,
    createdAt: "2023-01-15T10:10:00.000Z",
    updatedAt: "2023-05-20T14:40:00.000Z",
    deletedAt: null,
  },
];

const mockSkills: Skill[] = [
  // Frontend Development Skills
  {
    id: "880e8400-e29b-41d4-a716-446655440001",
    name: "React",
    description:
      "Building complex UIs with hooks, context, and modern React patterns",
    proficiencyLevel: ProficiencyLevel.EXPERT,
    yearsOfExperience: 5.5,
    lastUsedDate: "2023-05-28T00:00:00.000Z",
    icon: "⚛️",
    color: "#61DAFB",
    isFeatured: true,
    displayOrder: 1,
    endorsementCount: 42,
    metadata: {
      frameworks: ["Next.js", "Gatsby", "Create React App"],
      libraries: ["React Router", "React Query", "Zustand"],
      projects: 25,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440001",
    createdAt: "2023-01-20T09:00:00.000Z",
    updatedAt: "2023-05-28T16:20:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440002",
    name: "TypeScript",
    description:
      "Type-safe JavaScript development with advanced type system features",
    proficiencyLevel: ProficiencyLevel.EXPERT,
    yearsOfExperience: 4.2,
    lastUsedDate: "2023-05-28T00:00:00.000Z",
    icon: "🔷",
    color: "#3178C6",
    isFeatured: true,
    displayOrder: 2,
    endorsementCount: 38,
    metadata: {
      features: [
        "Generics",
        "Utility Types",
        "Decorators",
        "Module Augmentation",
      ],
      projects: 20,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440001",
    createdAt: "2023-01-22T10:30:00.000Z",
    updatedAt: "2023-05-28T17:15:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440003",
    name: "Next.js",
    description: "Full-stack React framework with SSR, SSG, and API routes",
    proficiencyLevel: ProficiencyLevel.EXPERT,
    yearsOfExperience: 3.8,
    lastUsedDate: "2023-05-27T00:00:00.000Z",
    icon: "▲",
    color: "#000000",
    isFeatured: true,
    displayOrder: 3,
    endorsementCount: 35,
    metadata: {
      features: [
        "App Router",
        "Server Components",
        "Middleware",
        "Edge Runtime",
      ],
      projects: 18,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440001",
    createdAt: "2023-02-01T11:00:00.000Z",
    updatedAt: "2023-05-27T18:45:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440004",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    proficiencyLevel: ProficiencyLevel.EXPERT,
    yearsOfExperience: 3.5,
    lastUsedDate: "2023-05-28T00:00:00.000Z",
    icon: "🎨",
    color: "#06B6D4",
    isFeatured: true,
    displayOrder: 4,
    endorsementCount: 30,
    metadata: {
      features: [
        "Custom Design Systems",
        "JIT Compilation",
        "Plugin Development",
      ],
      projects: 22,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440001",
    createdAt: "2023-02-10T14:20:00.000Z",
    updatedAt: "2023-05-28T19:30:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440005",
    name: "Vue.js",
    description: "Progressive JavaScript framework with composition API",
    proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
    yearsOfExperience: 2.0,
    lastUsedDate: "2023-03-15T00:00:00.000Z",
    icon: "💚",
    color: "#4FC08D",
    isFeatured: false,
    displayOrder: 5,
    endorsementCount: 18,
    metadata: {
      features: ["Composition API", "Pinia", "Vue Router"],
      projects: 8,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440001",
    createdAt: "2023-03-01T09:15:00.000Z",
    updatedAt: "2023-03-15T12:00:00.000Z",
    deletedAt: null,
  },

  // Backend Development Skills
  {
    id: "880e8400-e29b-41d4-a716-446655440006",
    name: "Node.js",
    description: "Server-side JavaScript runtime for scalable applications",
    proficiencyLevel: ProficiencyLevel.EXPERT,
    yearsOfExperience: 6.0,
    lastUsedDate: "2023-05-28T00:00:00.000Z",
    icon: "🟢",
    color: "#339933",
    isFeatured: true,
    displayOrder: 1,
    endorsementCount: 40,
    metadata: {
      features: ["Express.js", "Fastify", "Worker Threads", "Streams"],
      projects: 20,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440002",
    createdAt: "2023-01-18T08:30:00.000Z",
    updatedAt: "2023-05-28T20:15:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440007",
    name: "PostgreSQL",
    description:
      "Advanced relational database with complex queries and optimization",
    proficiencyLevel: ProficiencyLevel.ADVANCED,
    yearsOfExperience: 4.0,
    lastUsedDate: "2023-05-25T00:00:00.000Z",
    icon: "🐘",
    color: "#336791",
    isFeatured: true,
    displayOrder: 2,
    endorsementCount: 30,
    metadata: {
      features: [
        "Complex Queries",
        "Indexing",
        "Stored Procedures",
        "JSON Operations",
      ],
      projects: 15,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440002",
    createdAt: "2023-01-25T13:45:00.000Z",
    updatedAt: "2023-05-25T15:30:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440008",
    name: "MongoDB",
    description: "NoSQL document database for flexible data modeling",
    proficiencyLevel: ProficiencyLevel.ADVANCED,
    yearsOfExperience: 3.5,
    lastUsedDate: "2023-05-20T00:00:00.000Z",
    icon: "🍃",
    color: "#47A248",
    isFeatured: false,
    displayOrder: 3,
    endorsementCount: 28,
    metadata: {
      features: ["Aggregation Pipeline", "Sharding", "Replica Sets", "GridFS"],
      projects: 12,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440002",
    createdAt: "2023-02-05T16:20:00.000Z",
    updatedAt: "2023-05-20T11:45:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440009",
    name: "GraphQL",
    description: "Query language for APIs with type-safe schema design",
    proficiencyLevel: ProficiencyLevel.ADVANCED,
    yearsOfExperience: 3.0,
    lastUsedDate: "2023-05-22T00:00:00.000Z",
    icon: "🔗",
    color: "#E10098",
    isFeatured: false,
    displayOrder: 4,
    endorsementCount: 25,
    metadata: {
      features: ["Schema Design", "Resolvers", "Subscriptions", "Federation"],
      projects: 10,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440002",
    createdAt: "2023-02-15T10:10:00.000Z",
    updatedAt: "2023-05-22T14:20:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440010",
    name: "Python",
    description:
      "Versatile programming language for web development and automation",
    proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
    yearsOfExperience: 2.5,
    lastUsedDate: "2023-04-10T00:00:00.000Z",
    icon: "🐍",
    color: "#3776AB",
    isFeatured: false,
    displayOrder: 5,
    endorsementCount: 18,
    metadata: {
      frameworks: ["Django", "FastAPI", "Flask"],
      projects: 6,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440002",
    createdAt: "2023-03-10T12:30:00.000Z",
    updatedAt: "2023-04-10T16:45:00.000Z",
    deletedAt: null,
  },

  // Tools & Technologies Skills
  {
    id: "880e8400-e29b-41d4-a716-446655440011",
    name: "Git",
    description: "Version control system for collaborative development",
    proficiencyLevel: ProficiencyLevel.EXPERT,
    yearsOfExperience: 7.0,
    lastUsedDate: "2023-05-28T00:00:00.000Z",
    icon: "📚",
    color: "#F05032",
    isFeatured: true,
    displayOrder: 1,
    endorsementCount: 45,
    metadata: {
      features: ["Advanced Branching", "Rebasing", "Hooks", "Submodules"],
      repositories: 50,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440003",
    createdAt: "2023-01-16T07:00:00.000Z",
    updatedAt: "2023-05-28T21:00:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440012",
    name: "Docker",
    description: "Containerization platform for consistent deployments",
    proficiencyLevel: ProficiencyLevel.ADVANCED,
    yearsOfExperience: 3.2,
    lastUsedDate: "2023-05-26T00:00:00.000Z",
    icon: "🐳",
    color: "#2496ED",
    isFeatured: true,
    displayOrder: 2,
    endorsementCount: 28,
    metadata: {
      features: ["Multi-stage Builds", "Docker Compose", "Swarm", "Registry"],
      projects: 14,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440003",
    createdAt: "2023-02-20T15:30:00.000Z",
    updatedAt: "2023-05-26T13:15:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440013",
    name: "AWS",
    description: "Cloud computing platform for scalable infrastructure",
    proficiencyLevel: ProficiencyLevel.ADVANCED,
    yearsOfExperience: 4.0,
    lastUsedDate: "2023-05-24T00:00:00.000Z",
    icon: "☁️",
    color: "#FF9900",
    isFeatured: true,
    displayOrder: 3,
    endorsementCount: 30,
    metadata: {
      services: ["EC2", "S3", "Lambda", "RDS", "CloudFormation"],
      projects: 12,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440003",
    createdAt: "2023-01-30T11:20:00.000Z",
    updatedAt: "2023-05-24T17:40:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440014",
    name: "Jest",
    description: "JavaScript testing framework with snapshot testing",
    proficiencyLevel: ProficiencyLevel.ADVANCED,
    yearsOfExperience: 3.5,
    lastUsedDate: "2023-05-23T00:00:00.000Z",
    icon: "🧪",
    color: "#C21325",
    isFeatured: false,
    displayOrder: 4,
    endorsementCount: 25,
    metadata: {
      features: ["Unit Testing", "Integration Testing", "Mocking", "Coverage"],
      projects: 15,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440003",
    createdAt: "2023-02-25T09:45:00.000Z",
    updatedAt: "2023-05-23T14:30:00.000Z",
    deletedAt: null,
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440015",
    name: "Figma",
    description: "UI/UX design tool for collaborative design workflows",
    proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
    yearsOfExperience: 2.8,
    lastUsedDate: "2023-05-21T00:00:00.000Z",
    icon: "🎨",
    color: "#F24E1E",
    isFeatured: false,
    displayOrder: 5,
    endorsementCount: 22,
    metadata: {
      features: ["Design Systems", "Prototyping", "Auto Layout", "Components"],
      projects: 18,
    },
    userId: mockUserId,
    portfolioId: mockPortfolioId,
    categoryId: "770e8400-e29b-41d4-a716-446655440003",
    createdAt: "2023-03-05T13:15:00.000Z",
    updatedAt: "2023-05-21T10:20:00.000Z",
    deletedAt: null,
  },
];

// Helper functions to transform data
function mapProficiencyToLevel(
  proficiency: ProficiencyLevel
): "Beginner" | "Intermediate" | "Advanced" | "Expert" {
  switch (proficiency) {
    case ProficiencyLevel.BEGINNER:
      return "Beginner";
    case ProficiencyLevel.INTERMEDIATE:
      return "Intermediate";
    case ProficiencyLevel.ADVANCED:
      return "Advanced";
    case ProficiencyLevel.EXPERT:
      return "Expert";
    default:
      return "Intermediate";
  }
}

function calculateProficiencyPercentage(proficiency: ProficiencyLevel): number {
  switch (proficiency) {
    case ProficiencyLevel.BEGINNER:
      return 25;
    case ProficiencyLevel.INTERMEDIATE:
      return 50;
    case ProficiencyLevel.ADVANCED:
      return 75;
    case ProficiencyLevel.EXPERT:
      return 95;
    default:
      return 50;
  }
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "certification":
        return {
          icon: <Award className="w-4 h-4" />,
          color: "from-yellow-500 to-orange-500",
          bgColor: "bg-yellow-500/10 border-yellow-500/20",
          textColor: "text-yellow-600 dark:text-yellow-400",
        };
      case "course":
        return {
          icon: <BookOpen className="w-4 h-4" />,
          color: "from-blue-500 to-indigo-500",
          bgColor: "bg-blue-500/10 border-blue-500/20",
          textColor: "text-blue-600 dark:text-blue-400",
        };
      case "achievement":
        return {
          icon: <Trophy className="w-4 h-4" />,
          color: "from-purple-500 to-pink-500",
          bgColor: "bg-purple-500/10 border-purple-500/20",
          textColor: "text-purple-600 dark:text-purple-400",
        };
      case "award":
        return {
          icon: <Medal className="w-4 h-4" />,
          color: "from-emerald-500 to-teal-500",
          bgColor: "bg-emerald-500/10 border-emerald-500/20",
          textColor: "text-emerald-600 dark:text-emerald-400",
        };
      default:
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: "from-gray-500 to-slate-500",
          bgColor: "bg-gray-500/10 border-gray-500/20",
          textColor: "text-gray-600 dark:text-gray-400",
        };
    }
  };

  const config = getTypeConfig(certificate.type);

  return (
    <motion.div
      className="group relative p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
      whileHover={{ y: -2, boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              `bg-gradient-to-br ${config.color} text-white shadow-sm`
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {config.icon}
          </motion.div>
          <div>
            <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {certificate.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {certificate.issuer}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn("text-xs", config.textColor, config.bgColor)}
        >
          {certificate.type}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {certificate.date}
        </div>

        {certificate.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {certificate.description}
          </p>
        )}

        {certificate.credentialId && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">ID:</span> {certificate.credentialId}
          </div>
        )}

        {certificate.verificationUrl && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Verify
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "project":
        return {
          color: "from-blue-500 to-cyan-500",
          bgColor: "bg-blue-500/10 border-blue-500/20",
        };
      case "contribution":
        return {
          color: "from-green-500 to-emerald-500",
          bgColor: "bg-green-500/10 border-green-500/20",
        };
      case "recognition":
        return {
          color: "from-purple-500 to-violet-500",
          bgColor: "bg-purple-500/10 border-purple-500/20",
        };
      case "milestone":
        return {
          color: "from-orange-500 to-red-500",
          bgColor: "bg-orange-500/10 border-orange-500/20",
        };
      default:
        return {
          color: "from-gray-500 to-slate-500",
          bgColor: "bg-gray-500/10 border-gray-500/20",
        };
    }
  };

  const config = getTypeConfig(achievement.type);

  return (
    <motion.div
      className="group relative p-3 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <motion.div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            `bg-gradient-to-br ${config.color} text-white shadow-sm`
          )}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          {achievement.icon}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-sm text-foreground truncate">
              {achievement.title}
            </h4>
            {achievement.value && (
              <span className="text-xs font-bold text-primary flex-shrink-0 ml-2">
                {achievement.value}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {achievement.date}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillDetailsDialog({
  skill,
  children,
}: {
  skill: SkillCardProps;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {skill.icon}
            {skill.name}
            <Badge variant="outline" className="ml-auto">
              {skill.level}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-base">
            {skill.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {skill.certificates && skill.certificates.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certificates & Credentials
                <Badge variant="secondary">{skill.certificates.length}</Badge>
              </h3>
              <div className="space-y-3">
                {skill.certificates.map((certificate) => (
                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
                  />
                ))}
              </div>
            </div>
          )}

          {skill.achievements && skill.achievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Achievements & Milestones
                <Badge variant="secondary">{skill.achievements.length}</Badge>
              </h3>
              <div className="space-y-3">
                {skill.achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {skill.percentage}%
              </div>
              <div className="text-sm text-muted-foreground">Proficiency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {skill.projects || 0}
              </div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {skill.certificates?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {skill.achievements?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SkillCard({
  name,
  level,
  percentage,
  icon,
  description,
  projects,
  certificates,
  achievements,
}: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]));
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const getLevelConfig = (level: string) => {
    switch (level) {
      case "Expert":
        return {
          color: "from-emerald-500 to-teal-600",
          bgColor: "bg-emerald-500/10 border-emerald-500/20",
          textColor: "text-emerald-600 dark:text-emerald-400",
          glowColor: "shadow-emerald-500/25",
          icon: <Award className="w-3 h-3" />,
        };
      case "Advanced":
        return {
          color: "from-blue-500 to-indigo-600",
          bgColor: "bg-blue-500/10 border-blue-500/20",
          textColor: "text-blue-600 dark:text-blue-400",
          glowColor: "shadow-blue-500/25",
          icon: <TrendingUp className="w-3 h-3" />,
        };
      case "Intermediate":
        return {
          color: "from-orange-500 to-amber-600",
          bgColor: "bg-orange-500/10 border-orange-500/20",
          textColor: "text-orange-600 dark:text-orange-400",
          glowColor: "shadow-orange-500/25",
          icon: <Target className="w-3 h-3" />,
        };
      default:
        return {
          color: "from-gray-500 to-slate-600",
          bgColor: "bg-gray-500/10 border-gray-500/20",
          textColor: "text-gray-600 dark:text-gray-400",
          glowColor: "shadow-gray-500/25",
          icon: <Star className="w-3 h-3" />,
        };
    }
  };

  const config = getLevelConfig(level);
  const totalCredentials =
    (certificates?.length || 0) + (achievements?.length || 0);

  return (
    <SkillDetailsDialog
      skill={{
        name,
        level,
        percentage,
        icon,
        description,
        projects,
        certificates,
        achievements,
      }}
    >
      <motion.div
        ref={cardRef}
        className="group relative h-full cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className={cn(
            "absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
            `bg-gradient-to-r ${config.color}`
          )}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
        />

        <motion.div
          className="relative h-full rounded-xl bg-card/60 backdrop-blur-xl border border-border/50 p-6 overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? `0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)`
              : "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
          </div>

          {totalCredentials > 0 && (
            <motion.div
              className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
            >
              {totalCredentials}
            </motion.div>
          )}

          <div className="relative z-10 mb-4">
            <motion.div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold",
                `bg-gradient-to-br ${config.color} text-white shadow-lg`
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon || name.charAt(0)}
            </motion.div>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>

          {description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>
          )}

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Proficiency
              </span>
              <span className="text-sm font-bold text-foreground">
                {percentage}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  `bg-gradient-to-r ${config.color}`
                )}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>

          {totalCredentials > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Credentials
                </span>
                <Badge variant="secondary" className="text-xs">
                  {totalCredentials}
                </Badge>
              </div>
              <div className="flex gap-1">
                {certificates?.slice(0, 3).map((cert, index) => (
                  <div
                    key={cert.id}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                ))}
                {achievements?.slice(0, 3).map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{
                      animationDelay: `${
                        (certificates?.length || 0) + index * 0.1
                      }s`,
                    }}
                  />
                ))}
                {totalCredentials > 6 && (
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600" />
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <motion.div
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
                config.bgColor,
                config.textColor
              )}
              whileHover={{ scale: 1.05 }}
            >
              {config.icon}
              {level}
            </motion.div>

            {projects && (
              <div className="text-xs text-muted-foreground">
                {projects} project{projects !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          <motion.div
            className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            Click for details
          </motion.div>

          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute w-1 h-1 rounded-full",
                    `bg-gradient-to-r ${config.color}`
                  )}
                  initial={{
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>
    </SkillDetailsDialog>
  );
}

function CategoryHeader({
  icon,
  title,
  description,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
}) {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="text-primary text-2xl">{icon}</div>
      </motion.div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-2">{description}</p>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
        <Zap className="w-3 h-3" />
        {count} skills mastered
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <FadeInWhenVisible>
              <motion.div
                className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-3 text-primary border border-primary/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Code className="h-6 w-6" />
              </motion.div>
            </FadeInWhenVisible>

            <AnimatedTitle className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Skills & Expertise
            </AnimatedTitle>

            <FadeInWhenVisible delay={0.2}>
              <div className="mt-6 h-1 w-24 rounded bg-gradient-to-r from-primary to-secondary"></div>
            </FadeInWhenVisible>

            <AnimatedText
              delay={0.3}
              className="mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              A comprehensive showcase of my technical skills, professional
              certifications, and achievements gained through years of hands-on
              development experience.
            </AnimatedText>
          </div>

          <AnimatedSection delay={0.4}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-12">
                <TabsList className="relative grid w-full max-w-2xl grid-cols-3 p-2 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/50">
                  {mockSkillCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.name}
                      className="relative z-10 px-8 py-4 text-sm font-medium transition-all data-[state=active]:text-primary-foreground rounded-xl"
                    >
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category.icon}
                        <span className="hidden sm:inline">
                          {category.name.split(" ")[0]}
                        </span>
                      </motion.div>

                      {activeTab === category.name && (
                        <motion.div
                          layoutId="activeTabBackground"
                          className="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-primary to-secondary"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {mockSkillCategories.map((category) => {
                const skills = mockSkills.filter(
                  (skill) => skill.categoryId === category.id
                );
                return (
                  <TabsContent
                    key={category.id}
                    value={category.name}
                    className="mt-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CategoryHeader
                        icon={category.icon}
                        title={category.title}
                        description={category.description}
                        count={skills.length}
                      />

                      <AnimatedList
                        staggerDelay={0.1}
                        gridClassName="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      >
                        {skills.map((skill, index) => (
                          <SkillCard
                            key={`${category.id}-${index}`}
                            name={skill.name}
                            level={skill.proficiencyLevel}
                            percentage={skill.proficiencyPercentage}
                            description={skill.description}
                            projects={skill.projects}
                            icon={skill.icon}
                            achievements={skill.achievements}
                          />
                        ))}
                      </AnimatedList>
                    </motion.div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
