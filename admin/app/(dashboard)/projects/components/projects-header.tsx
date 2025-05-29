"use client"
import { Button } from "@/components/ui/button"
import { PlusCircle, Filter } from "lucide-react"
import { useState } from "react"
import CreateProjectSheet from "../create/create-project-sheet"

export function ProjectsHeader() {
  const [isCreateProjectSheetOpen, setIsCreateProjectSheetOpen] = useState(false)
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects Portfolio</h1>
        <p className="text-muted-foreground mt-1">Showcase of my development projects and technical achievements</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button onClick={() => setIsCreateProjectSheetOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>
      <CreateProjectSheet open={isCreateProjectSheetOpen} onOpenChange={setIsCreateProjectSheetOpen}/>
    </div>
  )
}
