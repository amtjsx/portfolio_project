import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ExternalLink, Github, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planned":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getDateRange = () => {
    const start = formatDate(project.startDate);
    const end = project.endDate ? formatDate(project.endDate) : "Present";
    return `${start} - ${end}`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-4xl font-bold text-primary/20">
              {project.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={cn(
              "text-xs font-medium",
              getStatusColor(project.status)
            )}
          >
            {project.status.replace("-", " ")}
          </Badge>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Link
              href={`/projects/${project.id}`}
              className="font-semibold text-lg leading-tight line-clamp-1 hover:underline cursor-pointer"
            >
              {project.title}
            </Link>
            <Badge variant="outline" className="text-xs">
              {project.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        {/* Date Range */}
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarIcon className="w-3 h-3 mr-1" />
          {getDateRange()}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between">
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-1" />
                Code
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Live
              </Link>
            </Button>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/projects/${project.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
