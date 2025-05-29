"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EducationForm } from "./education-form";

interface EducationFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education?: any;
}

export function EducationFormSheet({
  open,
  onOpenChange,
  education,
}: EducationFormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {education ? "Edit Education" : "Add New Education"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <EducationForm
            education={education}
            open={open}
            onOpenChange={onOpenChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
