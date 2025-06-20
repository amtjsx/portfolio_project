"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EducationForm } from "./education-form";
import { useCreateEducationStore } from "./use-create-education-store";

export function EducationFormSheet() {
  const { open, setOpen, defaultValue } = useCreateEducationStore();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {defaultValue ? "Edit Education" : "Add New Education"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <EducationForm
            education={defaultValue}
            open={open}
            onOpenChange={setOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
