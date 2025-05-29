import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project";
import { CalendarIcon, ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";

interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
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
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-background h-fit">
      <div className="flex flex-col lg:flex-row">
        {/* Project Image */}
        <div className="relative w-full lg:w-2/5 h-48 lg:h-56 bg-muted overflow-hidden">
          {project.imageUrl ? (
            <img
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
              <div className="text-4xl lg:text-5xl font-bold text-primary/30">
                {project.title.charAt(0)}
              </div>
            </div>
          )}

          {/* Featured Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              className={cn(
                "text-xs font-medium",
                getStatusColor(project.status)
              )}
            >
              {project.status.replace("-", " ")}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-3/5 flex flex-col">
          <CardHeader className="pb-3">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge variant="outline" className="text-xs w-fit">
                  {project.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {getDateRange()}
                </div>
              </div>
              <Link
                href={`/projects/${project.id}`}
                className="font-bold text-lg lg:text-xl leading-tight line-clamp-2 hover:underline cursor-pointer"
              >
                {project.title}
              </Link>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-3 pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 6).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 6 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 6}
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Demo
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/projects/${project.id}`}>Details</Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
