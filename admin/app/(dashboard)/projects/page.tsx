"use client";

import { ProjectsManager } from "@/app/(dashboard)/projects/projects-manager";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Projects Management
          </h1>
          <p className="text-muted-foreground">
            Add, edit, and showcase your portfolio projects with images,
            descriptions, and technologies used.
          </p>
        </div>
        <Link href="/projects/create">
          <Button variant="default">Create Project</Button>
        </Link>
      </div>{" "}
      <ProjectsManager />
    </div>
  );
}
