import { notFound } from "next/navigation";
import { Suspense } from "react";
import { mockProjects } from "../components/mock-data";
import { ProjectDetail } from "./project-detail";
import { ProjectDetailLoading } from "./project-detail-loading";

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  // In a real app, you would fetch the project from your API
  const project = mockProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-10 max-w-6xl">
      <Suspense fallback={<ProjectDetailLoading />}>
        <ProjectDetail project={project} />
      </Suspense>
    </div>
  );
}
