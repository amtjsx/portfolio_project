import { Suspense } from "react"
import { ProjectsList } from "./components/projects-list"
import { ProjectsHeader } from "./components/projects-header"
import { ProjectsLoading } from "./components/projects-loading"

export default function ProjectsPage() {
  return (
    <div className="container py-10 max-w-7xl">
      <ProjectsHeader />
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsList />
      </Suspense>
    </div>
  )
}
