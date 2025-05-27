"use client"

import { SkillsManager } from "@/components/admin/skills-manager"

export default function SkillsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Skills & Expertise</h1>
        <p className="text-muted-foreground">
          Add, edit, and organize your technical skills, certifications, and expertise levels.
        </p>
      </div>

      <SkillsManager />
    </div>
  )
}
