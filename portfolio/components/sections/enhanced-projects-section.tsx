"use client";
import { usePortfolio } from "@/app/portfolio";
import { MagneticWrapper, TextReveal } from "@/components/enhanced-animations";
import { Badge } from "@/components/ui/badge";
import {
  useInteractionTracking,
  useProjectTracking,
} from "@/hooks/use-analytics";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Briefcase, ExternalLink, Eye, Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  featured?: boolean;
  index: number;
}

function GlassProjectCard({
  title,
  description,
  image,
  tags,
  link,
  github,
  featured,
  index,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { trackProjectView } = useProjectTracking();
  const { trackInteraction } = useInteractionTracking();

  const handleProjectClick = () => {
    trackProjectView(title.toLowerCase().replace(/\s+/g, "-"), title);
    trackInteraction("click", "project-card", "card", { project: title });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge with refined glass effect */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.5 + index * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute -top-3 -right-3 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-blue-500/15 rounded-full blur-lg" />
            <div className="relative bg-gradient-to-r from-primary/90 to-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xl border border-white/20">
              Featured
            </div>
          </div>
        </motion.div>
      )}

      {/* Main glass card with refined opacity */}
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl group cursor-pointer"
        whileHover={{ y: -8, rotateX: 2, rotateY: 2 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Enhanced glass background with multiple refined layers */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {/* Primary glass layer with refined opacity */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08) 100%)",
            }}
            animate={{
              background: isHovered
                ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08) 100%)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Enhanced backdrop blur layer */}
          <div className="absolute inset-0 backdrop-blur-2xl" />

          {/* Refined border gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
              padding: "1px",
            }}
            animate={{
              background: isHovered
                ? "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(59,130,246,0.15) 50%, rgba(255,255,255,0.15) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
            }}
          >
            <div className="w-full h-full rounded-2xl bg-black/3 dark:bg-black/15" />
          </motion.div>

          {/* Refined shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
              transform: "translateX(-100%)",
            }}
            animate={{
              transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/2 to-white/4 dark:from-transparent dark:via-white/1 dark:to-white/2 rounded-2xl" />
        </div>

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Image section with refined glass overlay */}
          <div className="aspect-video relative overflow-hidden rounded-t-2xl">
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
              />

              {/* Refined image overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                animate={{ opacity: isHovered ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
              />

              {/* Enhanced glass reflection on image */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* Floating action buttons with refined glass effect */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center gap-3"
                >
                  <MagneticWrapper>
                    <motion.button
                      onClick={handleProjectClick}
                      className="relative group/btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-white/15 backdrop-blur-xl rounded-full border border-white/25" />
                      <div className="relative flex items-center gap-2 px-4 py-2 text-white font-medium">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/15 to-blue-500/15 rounded-full opacity-0 group-hover/btn:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </MagneticWrapper>

                  {github && (
                    <MagneticWrapper>
                      <motion.a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group/btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-black/25 backdrop-blur-xl rounded-full border border-white/15" />
                        <div className="relative flex items-center justify-center p-2 text-white">
                          <Github className="h-4 w-4" />
                        </div>
                      </motion.a>
                    </MagneticWrapper>
                  )}

                  <MagneticWrapper>
                    <motion.a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-white/15 backdrop-blur-xl rounded-full border border-white/25" />
                      <div className="relative flex items-center justify-center p-2 text-white">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </motion.a>
                  </MagneticWrapper>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Refined corner glass accent */}
            <motion.div
              className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: isHovered ? 1 : 0,
                opacity: isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Content section with refined glass background */}
          <div className="relative flex-1 p-6">
            {/* Enhanced content glass background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/4 to-white/8 dark:from-white/2 dark:to-white/4 backdrop-blur-xl" />

            {/* Subtle inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/3 dark:to-white/1.5" />

            <div className="relative z-10 space-y-4 h-full flex flex-col">
              {/* Title with refined glass text effect */}
              <motion.h3
                className="font-bold text-xl group-hover:text-primary transition-colors duration-300 relative"
                layoutId={`title-${index}`}
              >
                <TextReveal>{title}</TextReveal>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/12 to-blue-500/12 blur-lg opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-sm text-muted-foreground leading-relaxed flex-1"
                animate={{ opacity: isHovered ? 1 : 0.85 }}
                transition={{ duration: 0.3 }}
              >
                {description}
              </motion.p>

              {/* Tags with refined glass effect */}
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag, tagIndex) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.1 + tagIndex * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="relative group/tag"
                  >
                    {/* Refined glass tag background */}
                    <div className="absolute inset-0 bg-white/8 dark:bg-white/4 backdrop-blur-lg rounded-full border border-white/15" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300" />

                    {/* Subtle inner glow for tags */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/2 rounded-full" />

                    <Badge
                      variant="secondary"
                      className="relative bg-transparent border-transparent text-xs font-normal hover:bg-transparent"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Refined floating glass particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/25 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: isHovered ? [0, -10, 0] : [0, -5, 0],
                opacity: isHovered ? [0.25, 0.6, 0.25] : [0.1, 0.25, 0.1],
                scale: isHovered ? [1, 1.5, 1] : [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Refined hover glow effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary/12 via-blue-500/12 to-primary/12 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 -z-10"
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function EnhancedProjectsSection() {
  const [filter, setFilter] = useState("all");
  const { trackInteraction } = useInteractionTracking();

  const { portfolio } = usePortfolio();

  const filteredProjects =
    filter === "all"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category?.name === filter);
  const filters = ["all", "web", "mobile", "ai"];

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration with refined opacity */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary/6 to-blue-500/6 rounded-full blur-3xl backdrop-blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-slate-500/6 to-primary/6 rounded-full blur-3xl backdrop-blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Header with refined glass effect */}
          <div className="mb-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-4 relative"
            >
              <div className="absolute inset-0 bg-primary/15 rounded-full blur-xl" />
              <div className="relative inline-flex items-center justify-center rounded-full bg-white/8 dark:bg-white/4 backdrop-blur-xl border border-white/15 p-3 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              <TextReveal>Featured Projects</TextReveal>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 h-1 w-16 rounded bg-gradient-to-r from-primary to-blue-500 origin-center"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 max-w-[700px] text-lg text-muted-foreground"
            >
              <TextReveal delay={0.5}>
                Here's a selection of my recent work. Each project presented
                unique challenges and opportunities for growth.
              </TextReveal>
            </motion.p>
          </div>

          {/* Filter buttons with refined glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/8 dark:bg-white/4 backdrop-blur-2xl rounded-xl border border-white/15" />
              <div className="relative flex gap-2 p-2">
                {filters.map((filterOption) => (
                  <motion.button
                    key={filterOption}
                    onClick={() => {
                      setFilter(filterOption);
                      trackInteraction("click", "project-filter", "button", {
                        filter: filterOption,
                      });
                    }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === filterOption
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter === filterOption && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-500/90 rounded-lg backdrop-blur-xl"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 capitalize">
                      {filterOption === "all" ? "All Projects" : filterOption}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <GlassProjectCard
                  image={""}
                  tags={[]}
                  link={""}
                  key={`${filter}-${project.title}`}
                  {...project}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA with refined glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <MagneticWrapper>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-white/8 dark:bg-white/4 backdrop-blur-2xl rounded-xl border border-white/15" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-blue-500/15 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">
                  View All Projects on GitHub
                </span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </motion.a>
            </MagneticWrapper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
