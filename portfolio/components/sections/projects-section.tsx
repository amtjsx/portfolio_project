"use client";

import { usePortfolio } from "@/app/portfolio";
import {
  AnimatedList,
  AnimatedSection,
  AnimatedText,
  AnimatedTitle,
  FadeInWhenVisible,
} from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full bg-card/50 backdrop-blur-sm border-border">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1"
              >
                View Project <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { portfolio } = usePortfolio();
  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-center text-center">
            <FadeInWhenVisible>
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm p-2 text-primary">
                <Briefcase className="h-5 w-5" />
              </div>
            </FadeInWhenVisible>
            <AnimatedTitle>Featured Projects</AnimatedTitle>
            <FadeInWhenVisible delay={0.2}>
              <div className="mt-4 h-1 w-16 rounded bg-primary"></div>
            </FadeInWhenVisible>
            <AnimatedText delay={0.3}>
              Here's a selection of my recent work. Each project presented
              unique challenges and opportunities for growth.
            </AnimatedText>
          </div>

          <AnimatedList staggerDelay={0.1}>
            {portfolio.projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={
                  project.imageId
                    ? `${process.env.NEXT_PUBLIC_API_URL}/images/file/${project.imageId}`
                    : ""
                }
                tags={project.technologies}
                link={project.liveUrl || project.githubUrl || ""}
              />
            ))}
          </AnimatedList>

          <AnimatedSection delay={0.6} className="mt-12 flex justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-background/50 backdrop-blur-sm"
            >
              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                View All Projects on GitHub
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
