"use client";

import { useData } from "@/hooks/use-infinite-data";
import { Project } from "@/types/project";
import { FeaturedProjectCard } from "./featured-project-card";
import { ProjectCard } from "./project-card";
import { ProjectFilters } from "./project-filters";

export function ProjectsList() {
  const { data: projects } = useData<Project>({ keys: "projects" });
  // Filter projects by status
  const featuredProjects = projects?.filter((project) => project.featured);

  return (
    <div className="space-y-8">
      <ProjectFilters onFilterChange={(filters) => console.log(filters)} />

      <div className="space-y-10">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredProjects.slice(0, 2).map((project) => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            All Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {projects?.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <h3 className="font-medium mb-2">No projects found</h3>
            <p className="text-sm">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
