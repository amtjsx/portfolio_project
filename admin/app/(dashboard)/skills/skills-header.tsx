"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CategoryFormDialog } from "./categories/category-form-dialog";
import { SkillFormSheetDynamic } from "./create/skill-form-sheet-dynamic";

export function SkillsHeader() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Skills & Expertise
          </h1>
          <p className="text-muted-foreground mt-1">
            Showcase your professional skills and technical expertise
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={"link"} onClick={() => setIsCategoryFormOpen(true)}>
            Create Category
          </Button>
          <Button className="shrink-0" onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>

      <SkillFormSheetDynamic open={isFormOpen} onOpenChange={setIsFormOpen} />
      <CategoryFormDialog
        open={isCategoryFormOpen}
        onOpenChange={setIsCategoryFormOpen}
      />
    </>
  );
}
