import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Project } from "@/types/project";
import { CalendarIcon, Edit, ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";
import { useCreateProjectStore } from "../create/use-create-project-store";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
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

  const setOpen = useCreateProjectStore((state) => state.setOpen);
  const setDefaultValue = useCreateProjectStore(
    (state) => state.setDefaultValue
  );

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {project.imageUrl ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/images/file/${project.imageUrl}`}
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
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:text-primary z-10"
            onClick={() => {
              setOpen(true);
              setDefaultValue(project);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
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
