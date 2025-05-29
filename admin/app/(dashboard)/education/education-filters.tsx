"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"

interface EducationFiltersProps {
  onFilterChange: (filters: any) => void
}

export function EducationFilters({ onFilterChange }: EducationFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    educationType: "all",
    status: "all",
    verified: "all",
  })

  const educationTypes = [
    { value: "all", label: "All Types" },
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "doctorate", label: "Doctorate" },
    { value: "associate", label: "Associate Degree" },
    { value: "certificate", label: "Certificate" },
    { value: "diploma", label: "Diploma" },
    { value: "high_school", label: "High School" },
    { value: "vocational", label: "Vocational" },
    { value: "online_course", label: "Online Course" },
    { value: "self_study", label: "Self Study" },
    { value: "other", label: "Other" },
  ]

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "current", label: "Current" },
    { value: "completed", label: "Completed" },
  ]

  const verificationStatuses = [
    { value: "all", label: "All Verification" },
    { value: "verified", label: "Verified" },
    { value: "unverified", label: "Unverified" },
  ]

  const updateFilters = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      educationType: "all",
      status: "all",
      verified: "all",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters =
    filters.search || filters.educationType !== "all" || filters.status !== "all" || filters.verified !== "all"

  return (
    <div className="space-y-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search education..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          {/* Education Type Filter */}
          <Select value={filters.educationType} onValueChange={(value) => updateFilters({ educationType: value })}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Education Type" />
            </SelectTrigger>
            <SelectContent>
              {educationTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={filters.status} onValueChange={(value) => updateFilters({ status: value })}>
            <SelectTrigger className="w-full sm:w-40">
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

          {/* Verification Filter */}
          <Select value={filters.verified} onValueChange={(value) => updateFilters({ verified: value })}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Verification" />
            </SelectTrigger>
            <SelectContent>
              {verificationStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearAllFilters} className="w-full sm:w-auto">
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Active Filters:</label>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="text-xs">
                Search: "{filters.search}"
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ search: "" })} />
              </Badge>
            )}
            {filters.educationType !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Type: {educationTypes.find((t) => t.value === filters.educationType)?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ educationType: "all" })} />
              </Badge>
            )}
            {filters.status !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Status: {statuses.find((s) => s.value === filters.status)?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ status: "all" })} />
              </Badge>
            )}
            {filters.verified !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Verification: {verificationStatuses.find((v) => v.value === filters.verified)?.label}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => updateFilters({ verified: "all" })} />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
