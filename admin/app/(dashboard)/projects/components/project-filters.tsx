"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"

interface ProjectFiltersProps {
  onFilterChange: (filters: any) => void
}

export function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    status: "all",
    technologies: [] as string[],
  })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "desktop", label: "Desktop Apps" },
    { value: "api", label: "APIs & Backend" },
    { value: "data", label: "Data Science" },
    { value: "devops", label: "DevOps" },
  ]

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "In Progress" },
    { value: "planned", label: "Planned" },
  ]

  const allTechnologies = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST API",
    "Tailwind CSS",
    "Vue.js",
    "Angular",
    "Express.js",
    "Django",
    "Flask",
    "Redis",
  ]

  const updateFilters = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const addTechnology = (tech: string) => {
    if (!filters.technologies.includes(tech)) {
      updateFilters({ technologies: [...filters.technologies, tech] })
    }
  }

  const removeTechnology = (tech: string) => {
    updateFilters({ technologies: filters.technologies.filter((t) => t !== tech) })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      category: "all",
      status: "all",
      technologies: [],
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters =
    filters.search || filters.category !== "all" || filters.status !== "all" || filters.technologies.length > 0

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filters.status} onValueChange={(value) => updateFilters({ status: value })}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Technology Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Filter by Technologies:</label>
        <div className="flex flex-wrap gap-1">
          {allTechnologies.map((tech) => (
            <Badge
              key={tech}
              variant={filters.technologies.includes(tech) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => {
                if (filters.technologies.includes(tech)) {
                  removeTechnology(tech)
                } else {
                  addTechnology(tech)
                }
              }}
            >
              {tech}
              {filters.technologies.includes(tech) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Active Filters:</label>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary">
                Search: "{filters.search}"
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ search: "" })} />
              </Badge>
            )}
            {filters.category !== "all" && (
              <Badge variant="secondary">
                Category: {categories.find((c) => c.value === filters.category)?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ category: "all" })} />
              </Badge>
            )}
            {filters.status !== "all" && (
              <Badge variant="secondary">
                Status: {statuses.find((s) => s.value === filters.status)?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ status: "all" })} />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
