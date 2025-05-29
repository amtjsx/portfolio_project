"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, GraduationCap } from "lucide-react";
import { EducationFormSheet } from "./create/education-form-sheet";
import { useState } from "react";

export function EducationHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Education
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Academic background, certifications, and learning achievements
        </p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Filter className="mr-2 h-4 w-4" />
          <span className="sm:inline">Filters</span>
        </Button>
        <Button className="flex-1 sm:flex-none" onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span className="sm:inline">Add Education</span>
        </Button>
      </div>
      <EducationFormSheet open={open} onOpenChange={setOpen} />
    </div>
  );
}
