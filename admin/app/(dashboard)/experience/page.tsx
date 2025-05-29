import { Suspense } from "react"
import { ExperiencesList } from "./experiences-list"
import { ExperiencesHeader } from "./experiences-header"
import { ExperiencesLoading } from "./experiences-loading"

export default function ExperiencesPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <ExperiencesHeader />
      <Suspense fallback={<ExperiencesLoading />}>
        <ExperiencesList />
      </Suspense>
    </div>
  )
}
