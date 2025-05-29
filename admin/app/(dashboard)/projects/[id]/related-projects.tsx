import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects } from "../components/mock-data";
import { ProjectCard } from "../components/project-card";

interface RelatedProjectsProps {
  currentProject: {
    id: string;
    category: string;
    technologies: string[];
  };
}

export function RelatedProjects({ currentProject }: RelatedProjectsProps) {
  // Find related projects based on category and technologies
  const relatedProjects = mockProjects
    .filter((project) => project.id !== currentProject.id)
    .map((project) => {
      let score = 0;

      // Same category gets higher score
      if (project.category === currentProject.category) {
        score += 3;
      }

      // Shared technologies
      const sharedTechs = project.technologies.filter((tech) =>
        currentProject.technologies.includes(tech)
      );
      score += sharedTechs.length;

      return { ...project, relevanceScore: score };
    })
    .filter((project) => project.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
