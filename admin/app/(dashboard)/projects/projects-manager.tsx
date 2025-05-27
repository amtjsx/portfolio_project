"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDelete } from "@/hooks/use-delete";
import { useData } from "@/hooks/use-infinite-data";
import { Edit, ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured: boolean;
  category: string;
};

export function ProjectsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: projects, loading } = useData<Project>({
    keys: "projects",
    params: {},
  });

  const { remove } = useDelete({ url: "/projects", title: "project" });

  const handleDeleteProject = async (id: string) => {
    await remove(id);
  };

  const handleToggleFeatured = (id: string) => {};

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {!loading && !projects.length ? (
              <div className="flex items-center justify-center h-full w-full py-16 text-muted-foreground text-sm">
                No projects found
              </div>
            ) : (
              projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  onEdit={() => {
                    setIsDialogOpen(true);
                  }}
                  onDelete={() => handleDeleteProject(project.id)}
                  onToggleFeatured={() => handleToggleFeatured(project.id)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="featured" className="space-y-4">
            {!loading && !projects.length ? (
              <div className="flex items-center justify-center h-full w-full py-16 text-muted-foreground text-sm">
                No featured projects found
              </div>
            ) : (
              projects
                .filter((p) => p.featured)
                .map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onEdit={() => {
                      setIsDialogOpen(true);
                    }}
                    onDelete={() => handleDeleteProject(project.id)}
                    onToggleFeatured={() => handleToggleFeatured(project.id)}
                  />
                ))
            )}
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            {!loading && !projects.length ? (
              <div className="flex items-center justify-center h-full w-full py-16 text-muted-foreground text-sm">
                No other projects found
              </div>
            ) : (
              projects
                .filter((p) => !p.featured)
                .map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onEdit={() => {
                      setIsDialogOpen(true);
                    }}
                    onDelete={() => handleDeleteProject(project.id)}
                    onToggleFeatured={() => handleToggleFeatured(project.id)}
                  />
                ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ProjectItem({
  project,
  onEdit,
  onDelete,
  onToggleFeatured,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-lg border p-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{project.title}</h3>
            <div className="flex items-center gap-1">
              {project.featured && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Featured
                </Badge>
              )}
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            View Project
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onToggleFeatured}>
              {project.featured ? "Unfeature" : "Feature"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
