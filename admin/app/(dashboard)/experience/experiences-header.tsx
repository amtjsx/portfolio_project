"use client";
import { Button } from "@/components/ui/button";
import { Download, PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddExperienceSheet } from "./create/add-experience";

export function ExperiencesHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Work Experience</h1>
        <p className="text-muted-foreground mt-1">
          Professional journey and career highlights
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Resume
        </Button>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
      <AddExperienceSheet open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
