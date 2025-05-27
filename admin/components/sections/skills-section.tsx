"use client"
import {
  Code,
  Zap,
  Star,
  TrendingUp,
  Award,
  Target,
  Medal,
  Trophy,
  Calendar,
  ExternalLink,
  CheckCircle,
  BookOpen,
} from "lucide-react"
import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedList,
  FadeInWhenVisible,
} from "@/components/animated-section"
import { cn } from "@/lib/utils"

interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  credentialId?: string
  verificationUrl?: string
  type: "certification" | "course" | "achievement" | "award"
  image?: string
  description?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: "project" | "contribution" | "recognition" | "milestone"
  icon: React.ReactNode
  value?: string
}

interface SkillCardProps {
  name: string
  level: "Expert" | "Advanced" | "Intermediate" | "Beginner"
  percentage: number
  icon?: React.ReactNode
  description?: string
  projects?: number
  certificates?: Certificate[]
  achievements?: Achievement[]
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
        }
      case "course":
        return {
          icon: <BookOpen className="w-4 h-4" />,
          color: "from-blue-500 to-indigo-500",
          bgColor: "bg-blue-500/10 border-blue-500/20",
          textColor: "text-blue-600 dark:text-blue-400",
        }
      case "achievement":
        return {
          icon: <Trophy className="w-4 h-4" />,
          color: "from-purple-500 to-pink-500",
          bgColor: "bg-purple-500/10 border-purple-500/20",
          textColor: "text-purple-600 dark:text-purple-400",
        }
      case "award":
        return {
          icon: <Medal className="w-4 h-4" />,
          color: "from-emerald-500 to-teal-500",
          bgColor: "bg-emerald-500/10 border-emerald-500/20",
          textColor: "text-emerald-600 dark:text-emerald-400",
        }
      default:
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: "from-gray-500 to-slate-500",
          bgColor: "bg-gray-500/10 border-gray-500/20",
          textColor: "text-gray-600 dark:text-gray-400",
        }
    }
  }

  const config = getTypeConfig(certificate.type)

  return (
    <motion.div
      className="group relative p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
      whileHover={{ y: -2, boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Certificate header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              `bg-gradient-to-br ${config.color} text-white shadow-sm`,
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {config.icon}
          </motion.div>
          <div>
            <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {certificate.name}
            </h4>
            <p className="text-xs text-muted-foreground">{certificate.issuer}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn("text-xs", config.textColor, config.bgColor)}>
          {certificate.type}
        </Badge>
      </div>

      {/* Certificate details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {certificate.date}
        </div>

        {certificate.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{certificate.description}</p>
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
            <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 mr-1" />
              Verify
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "project":
        return {
          color: "from-blue-500 to-cyan-500",
          bgColor: "bg-blue-500/10 border-blue-500/20",
        }
      case "contribution":
        return {
          color: "from-green-500 to-emerald-500",
          bgColor: "bg-green-500/10 border-green-500/20",
        }
      case "recognition":
        return {
          color: "from-purple-500 to-violet-500",
          bgColor: "bg-purple-500/10 border-purple-500/20",
        }
      case "milestone":
        return {
          color: "from-orange-500 to-red-500",
          bgColor: "bg-orange-500/10 border-orange-500/20",
        }
      default:
        return {
          color: "from-gray-500 to-slate-500",
          bgColor: "bg-gray-500/10 border-gray-500/20",
        }
    }
  }

  const config = getTypeConfig(achievement.type)

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
            `bg-gradient-to-br ${config.color} text-white shadow-sm`,
          )}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          {achievement.icon}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-sm text-foreground truncate">{achievement.title}</h4>
            {achievement.value && (
              <span className="text-xs font-bold text-primary flex-shrink-0 ml-2">{achievement.value}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{achievement.description}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {achievement.date}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SkillDetailsDialog({ skill, children }: { skill: SkillCardProps; children: React.ReactNode }) {
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
          <DialogDescription className="text-base">{skill.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Certificates Section */}
          {skill.certificates && skill.certificates.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certificates & Credentials
                <Badge variant="secondary">{skill.certificates.length}</Badge>
              </h3>
              <div className="space-y-3">
                {skill.certificates.map((certificate) => (
                  <CertificateCard key={certificate.id} certificate={certificate} />
                ))}
              </div>
            </div>
          )}

          {/* Achievements Section */}
          {skill.achievements && skill.achievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Achievements & Milestones
                <Badge variant="secondary">{skill.achievements.length}</Badge>
              </h3>
              <div className="space-y-3">
                {skill.achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skill Stats */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{skill.percentage}%</div>
              <div className="text-sm text-muted-foreground">Proficiency</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{skill.projects || 0}</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{skill.certificates?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{skill.achievements?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
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
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]))
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]))

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const getLevelConfig = (level: string) => {
    switch (level) {
      case "Expert":
        return {
          color: "from-emerald-500 to-teal-600",
          bgColor: "bg-emerald-500/10 border-emerald-500/20",
          textColor: "text-emerald-600 dark:text-emerald-400",
          glowColor: "shadow-emerald-500/25",
          icon: <Award className="w-3 h-3" />,
        }
      case "Advanced":
        return {
          color: "from-blue-500 to-indigo-600",
          bgColor: "bg-blue-500/10 border-blue-500/20",
          textColor: "text-blue-600 dark:text-blue-400",
          glowColor: "shadow-blue-500/25",
          icon: <TrendingUp className="w-3 h-3" />,
        }
      case "Intermediate":
        return {
          color: "from-orange-500 to-amber-600",
          bgColor: "bg-orange-500/10 border-orange-500/20",
          textColor: "text-orange-600 dark:text-orange-400",
          glowColor: "shadow-orange-500/25",
          icon: <Target className="w-3 h-3" />,
        }
      default:
        return {
          color: "from-gray-500 to-slate-600",
          bgColor: "bg-gray-500/10 border-gray-500/20",
          textColor: "text-gray-600 dark:text-gray-400",
          glowColor: "shadow-gray-500/25",
          icon: <Star className="w-3 h-3" />,
        }
    }
  }

  const config = getLevelConfig(level)
  const totalCredentials = (certificates?.length || 0) + (achievements?.length || 0)

  return (
    <SkillDetailsDialog skill={{ name, level, percentage, icon, description, projects, certificates, achievements }}>
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
        {/* Glow effect */}
        <motion.div
          className={cn(
            "absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
            `bg-gradient-to-r ${config.color}`,
          )}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
        />

        {/* Main card */}
        <motion.div
          className="relative h-full rounded-xl bg-card/60 backdrop-blur-xl border border-border/50 p-6 overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? `0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)`
              : "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
          </div>

          {/* Credentials indicator */}
          {totalCredentials > 0 && (
            <motion.div
              className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 15 }}
            >
              {totalCredentials}
            </motion.div>
          )}

          {/* Skill icon */}
          <div className="relative z-10 mb-4">
            <motion.div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold",
                `bg-gradient-to-br ${config.color} text-white shadow-lg`,
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon || name.charAt(0)}
            </motion.div>
          </div>

          {/* Skill name */}
          <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Description */}
          {description && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>}

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Proficiency</span>
              <span className="text-sm font-bold text-foreground">{percentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", `bg-gradient-to-r ${config.color}`)}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Credentials preview */}
          {totalCredentials > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Credentials</span>
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
                    style={{ animationDelay: `${(certificates?.length || 0) + index * 0.1}s` }}
                  />
                ))}
                {totalCredentials > 6 && (
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600" />
                )}
              </div>
            </div>
          )}

          {/* Level badge and projects */}
          <div className="flex items-center justify-between">
            <motion.div
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
                config.bgColor,
                config.textColor,
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

          {/* Click indicator */}
          <motion.div
            className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            Click for details
          </motion.div>

          {/* Floating particles */}
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={cn("absolute w-1 h-1 rounded-full", `bg-gradient-to-r ${config.color}`)}
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
  )
}

function CategoryHeader({
  icon,
  title,
  description,
  count,
}: {
  icon: React.ReactNode
  title: string
  description: string
  count: number
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
  )
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState("frontend")

  const skillsData = {
    frontend: {
      icon: <Code className="w-6 h-6" />,
      title: "Frontend Development",
      description: "Creating beautiful, responsive, and interactive user interfaces",
      skills: [
        {
          name: "React",
          level: "Expert" as const,
          percentage: 95,
          description: "Building complex UIs with hooks and context",
          projects: 25,
          icon: "⚛️",
          certificates: [
            {
              id: "react-cert-1",
              name: "React Developer Certification",
              issuer: "Meta",
              date: "2023",
              type: "certification" as const,
              credentialId: "META-REACT-2023-001",
              verificationUrl: "https://developers.facebook.com/certificate/verify",
              description: "Advanced React development patterns and best practices",
            },
            {
              id: "react-cert-2",
              name: "Advanced React Patterns",
              issuer: "Frontend Masters",
              date: "2023",
              type: "course" as const,
              description: "Compound components, render props, and advanced hooks",
            },
          ],
          achievements: [
            {
              id: "react-ach-1",
              title: "React Contributor",
              description: "Contributed to React open source project",
              date: "2023",
              type: "contribution" as const,
              icon: <Code className="w-4 h-4" />,
            },
            {
              id: "react-ach-2",
              title: "Performance Optimization",
              description: "Improved app performance by 40% using React optimization techniques",
              date: "2023",
              type: "milestone" as const,
              icon: <Zap className="w-4 h-4" />,
              value: "40%",
            },
          ],
        },
        {
          name: "TypeScript",
          level: "Expert" as const,
          percentage: 92,
          description: "Type-safe JavaScript development",
          projects: 20,
          icon: "🔷",
          certificates: [
            {
              id: "ts-cert-1",
              name: "TypeScript Fundamentals",
              issuer: "Microsoft",
              date: "2022",
              type: "certification" as const,
              credentialId: "MS-TS-2022-001",
              description: "Core TypeScript concepts and advanced type system",
            },
          ],
          achievements: [
            {
              id: "ts-ach-1",
              title: "Type Safety Champion",
              description: "Migrated 5 large codebases from JavaScript to TypeScript",
              date: "2023",
              type: "project" as const,
              icon: <CheckCircle className="w-4 h-4" />,
              value: "5",
            },
          ],
        },
        {
          name: "Next.js",
          level: "Expert" as const,
          percentage: 90,
          description: "Full-stack React framework",
          projects: 18,
          icon: "▲",
          certificates: [
            {
              id: "next-cert-1",
              name: "Next.js Expert",
              issuer: "Vercel",
              date: "2023",
              type: "certification" as const,
              credentialId: "VERCEL-NEXT-2023-001",
              verificationUrl: "https://vercel.com/certificate/verify",
              description: "Advanced Next.js features including SSR, SSG, and API routes",
            },
          ],
          achievements: [
            {
              id: "next-ach-1",
              title: "Performance Leader",
              description: "Built fastest loading e-commerce site with 98 Lighthouse score",
              date: "2023",
              type: "recognition" as const,
              icon: <Trophy className="w-4 h-4" />,
              value: "98",
            },
          ],
        },
        {
          name: "Tailwind CSS",
          level: "Expert" as const,
          percentage: 88,
          description: "Utility-first CSS framework",
          projects: 22,
          icon: "🎨",
          certificates: [
            {
              id: "tailwind-cert-1",
              name: "Tailwind CSS Mastery",
              issuer: "Tailwind Labs",
              date: "2023",
              type: "course" as const,
              description: "Advanced Tailwind CSS techniques and custom design systems",
            },
          ],
          achievements: [
            {
              id: "tailwind-ach-1",
              title: "Design System Creator",
              description: "Created reusable design system used across 10+ projects",
              date: "2023",
              type: "project" as const,
              icon: <Star className="w-4 h-4" />,
              value: "10+",
            },
          ],
        },
        {
          name: "Framer Motion",
          level: "Advanced" as const,
          percentage: 85,
          description: "Advanced animations and interactions",
          projects: 15,
          icon: "🎭",
          achievements: [
            {
              id: "framer-ach-1",
              title: "Animation Expert",
              description: "Created award-winning animated portfolio website",
              date: "2023",
              type: "recognition" as const,
              icon: <Award className="w-4 h-4" />,
            },
          ],
        },
        {
          name: "Vue.js",
          level: "Intermediate" as const,
          percentage: 75,
          description: "Progressive JavaScript framework",
          projects: 8,
          icon: "💚",
          certificates: [
            {
              id: "vue-cert-1",
              name: "Vue.js Fundamentals",
              issuer: "Vue School",
              date: "2022",
              type: "course" as const,
              description: "Core Vue.js concepts and composition API",
            },
          ],
        },
        {
          name: "Angular",
          level: "Intermediate" as const,
          percentage: 70,
          description: "Enterprise-grade applications",
          projects: 6,
          icon: "🅰️",
          certificates: [
            {
              id: "angular-cert-1",
              name: "Angular Developer",
              issuer: "Google",
              date: "2022",
              type: "certification" as const,
              credentialId: "GOOGLE-NG-2022-001",
              description: "Angular framework and enterprise application development",
            },
          ],
        },
        {
          name: "Svelte",
          level: "Intermediate" as const,
          percentage: 65,
          description: "Compile-time optimized framework",
          projects: 4,
          icon: "🧡",
          achievements: [
            {
              id: "svelte-ach-1",
              title: "Early Adopter",
              description: "Built production app with Svelte before v1.0",
              date: "2022",
              type: "milestone" as const,
              icon: <Star className="w-4 h-4" />,
            },
          ],
        },
      ],
    },
    backend: {
      icon: <Target className="w-6 h-6" />,
      title: "Backend Development",
      description: "Building scalable and secure server-side applications",
      skills: [
        {
          name: "Node.js",
          level: "Expert" as const,
          percentage: 93,
          description: "Server-side JavaScript runtime",
          projects: 20,
          icon: "🟢",
          certificates: [
            {
              id: "node-cert-1",
              name: "Node.js Application Developer",
              issuer: "OpenJS Foundation",
              date: "2023",
              type: "certification" as const,
              credentialId: "OPENJS-NODE-2023-001",
              verificationUrl: "https://openjsf.org/certification/verify",
              description: "Advanced Node.js development and best practices",
            },
          ],
          achievements: [
            {
              id: "node-ach-1",
              title: "Scalability Expert",
              description: "Built API handling 1M+ requests per day",
              date: "2023",
              type: "milestone" as const,
              icon: <TrendingUp className="w-4 h-4" />,
              value: "1M+",
            },
          ],
        },
        {
          name: "Express",
          level: "Expert" as const,
          percentage: 90,
          description: "Fast, minimalist web framework",
          projects: 18,
          icon: "🚀",
          achievements: [
            {
              id: "express-ach-1",
              title: "API Architect",
              description: "Designed RESTful APIs for 15+ production applications",
              date: "2023",
              type: "project" as const,
              icon: <Code className="w-4 h-4" />,
              value: "15+",
            },
          ],
        },
        {
          name: "PostgreSQL",
          level: "Advanced" as const,
          percentage: 85,
          description: "Advanced relational database",
          projects: 15,
          icon: "🐘",
          certificates: [
            {
              id: "postgres-cert-1",
              name: "PostgreSQL Administration",
              issuer: "PostgreSQL Global Development Group",
              date: "2023",
              type: "certification" as const,
              description: "Database administration and performance optimization",
            },
          ],
        },
        {
          name: "MongoDB",
          level: "Advanced" as const,
          percentage: 82,
          description: "NoSQL document database",
          projects: 12,
          icon: "🍃",
          certificates: [
            {
              id: "mongo-cert-1",
              name: "MongoDB Developer",
              issuer: "MongoDB University",
              date: "2022",
              type: "certification" as const,
              credentialId: "MONGO-DEV-2022-001",
              description: "MongoDB development and data modeling",
            },
          ],
        },
        {
          name: "GraphQL",
          level: "Advanced" as const,
          percentage: 80,
          description: "Query language for APIs",
          projects: 10,
          icon: "🔗",
          achievements: [
            {
              id: "graphql-ach-1",
              title: "Schema Designer",
              description: "Designed GraphQL schemas for complex enterprise applications",
              date: "2023",
              type: "project" as const,
              icon: <Target className="w-4 h-4" />,
            },
          ],
        },
        {
          name: "Redis",
          level: "Advanced" as const,
          percentage: 78,
          description: "In-memory data structure store",
          projects: 8,
          icon: "🔴",
          certificates: [
            {
              id: "redis-cert-1",
              name: "Redis Certified Developer",
              issuer: "Redis Labs",
              date: "2023",
              type: "certification" as const,
              description: "Redis data structures and caching strategies",
            },
          ],
        },
        {
          name: "Python",
          level: "Intermediate" as const,
          percentage: 72,
          description: "Versatile programming language",
          projects: 6,
          icon: "🐍",
          certificates: [
            {
              id: "python-cert-1",
              name: "Python Programming",
              issuer: "Python Software Foundation",
              date: "2022",
              type: "course" as const,
              description: "Core Python programming and web development",
            },
          ],
        },
        {
          name: "Docker",
          level: "Advanced" as const,
          percentage: 85,
          description: "Containerization platform",
          projects: 14,
          icon: "🐳",
          certificates: [
            {
              id: "docker-cert-1",
              name: "Docker Certified Associate",
              issuer: "Docker Inc.",
              date: "2023",
              type: "certification" as const,
              credentialId: "DOCKER-DCA-2023-001",
              verificationUrl: "https://docker.com/certificate/verify",
              description: "Container orchestration and deployment strategies",
            },
          ],
        },
      ],
    },
    tools: {
      icon: <Award className="w-6 h-6" />,
      title: "Tools & Technologies",
      description: "Development tools and technologies that enhance productivity",
      skills: [
        {
          name: "Git",
          level: "Expert" as const,
          percentage: 95,
          description: "Version control system",
          projects: 30,
          icon: "📚",
          achievements: [
            {
              id: "git-ach-1",
              title: "Git Master",
              description: "Managed version control for 50+ repositories",
              date: "2023",
              type: "milestone" as const,
              icon: <Code className="w-4 h-4" />,
              value: "50+",
            },
          ],
        },
        {
          name: "VS Code",
          level: "Expert" as const,
          percentage: 92,
          description: "Code editor and IDE",
          projects: 25,
          icon: "💻",
          achievements: [
            {
              id: "vscode-ach-1",
              title: "Extension Creator",
              description: "Published VS Code extension with 10K+ downloads",
              date: "2023",
              type: "contribution" as const,
              icon: <Star className="w-4 h-4" />,
              value: "10K+",
            },
          ],
        },
        {
          name: "Figma",
          level: "Advanced" as const,
          percentage: 88,
          description: "UI/UX design tool",
          projects: 20,
          icon: "🎨",
          certificates: [
            {
              id: "figma-cert-1",
              name: "Figma Professional",
              issuer: "Figma",
              date: "2023",
              type: "course" as const,
              description: "Advanced Figma techniques and design systems",
            },
          ],
        },
        {
          name: "AWS",
          level: "Advanced" as const,
          percentage: 82,
          description: "Cloud computing platform",
          projects: 12,
          icon: "☁️",
          certificates: [
            {
              id: "aws-cert-1",
              name: "AWS Solutions Architect",
              issuer: "Amazon Web Services",
              date: "2023",
              type: "certification" as const,
              credentialId: "AWS-SAA-2023-001",
              verificationUrl: "https://aws.amazon.com/verification",
              description: "Cloud architecture and AWS services",
            },
            {
              id: "aws-cert-2",
              name: "AWS Developer Associate",
              issuer: "Amazon Web Services",
              date: "2022",
              type: "certification" as const,
              credentialId: "AWS-DVA-2022-001",
              description: "AWS development and deployment",
            },
          ],
        },
        {
          name: "Vercel",
          level: "Expert" as const,
          percentage: 90,
          description: "Frontend deployment platform",
          projects: 18,
          icon: "▲",
          achievements: [
            {
              id: "vercel-ach-1",
              title: "Deployment Expert",
              description: "Deployed 100+ applications with zero downtime",
              date: "2023",
              type: "milestone" as const,
              icon: <CheckCircle className="w-4 h-4" />,
              value: "100+",
            },
          ],
        },
        {
          name: "Jest",
          level: "Advanced" as const,
          percentage: 85,
          description: "JavaScript testing framework",
          projects: 15,
          icon: "🧪",
          certificates: [
            {
              id: "jest-cert-1",
              name: "Testing with Jest",
              issuer: "Testing Library",
              date: "2023",
              type: "course" as const,
              description: "Unit testing and test-driven development",
            },
          ],
        },
        {
          name: "Cypress",
          level: "Advanced" as const,
          percentage: 80,
          description: "End-to-end testing",
          projects: 10,
          icon: "🌲",
          achievements: [
            {
              id: "cypress-ach-1",
              title: "Testing Champion",
              description: "Achieved 95% test coverage across all projects",
              date: "2023",
              type: "milestone" as const,
              icon: <Trophy className="w-4 h-4" />,
              value: "95%",
            },
          ],
        },
        {
          name: "Webpack",
          level: "Intermediate" as const,
          percentage: 75,
          description: "Module bundler",
          projects: 8,
          icon: "📦",
          certificates: [
            {
              id: "webpack-cert-1",
              name: "Webpack Configuration",
              issuer: "Webpack Academy",
              date: "2022",
              type: "course" as const,
              description: "Advanced webpack configuration and optimization",
            },
          ],
        },
      ],
    },
  }

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
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

            <AnimatedText delay={0.3} className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A comprehensive showcase of my technical skills, professional certifications, and achievements gained
              through years of hands-on development experience.
            </AnimatedText>
          </div>

          {/* Skills tabs */}
          <AnimatedSection delay={0.4}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tab navigation */}
              <div className="flex justify-center mb-12">
                <TabsList className="relative grid w-full max-w-2xl grid-cols-3 p-2 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/50">
                  {Object.entries(skillsData).map(([key, data]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="relative z-10 px-8 py-4 text-sm font-medium transition-all data-[state=active]:text-primary-foreground rounded-xl"
                    >
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {data.icon}
                        <span className="hidden sm:inline">{data.title.split(" ")[0]}</span>
                      </motion.div>

                      {activeTab === key && (
                        <motion.div
                          layoutId="activeTabBackground"
                          className="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-primary to-secondary"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab content */}
              {Object.entries(skillsData).map(([key, data]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CategoryHeader
                      icon={data.icon}
                      title={data.title}
                      description={data.description}
                      count={data.skills.length}
                    />

                    <AnimatedList
                      staggerDelay={0.1}
                      gridClassName="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                      {data.skills.map((skill, index) => (
                        <SkillCard
                          key={`${key}-${index}`}
                          name={skill.name}
                          level={skill.level}
                          percentage={skill.percentage}
                          description={skill.description}
                          projects={skill.projects}
                          icon={<span className="text-lg">{skill.icon}</span>}
                          certificates={skill.certificates}
                          achievements={skill.achievements}
                        />
                      ))}
                    </AnimatedList>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
