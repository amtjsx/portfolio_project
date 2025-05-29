"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import dynamic from "next/dynamic";
import { SkillFormSheetSkeleton } from "./skill-form-sheet-skeleton";

// Dynamically import the SkillFormSheet with no SSR
const SkillFormSheet = dynamic(
  () =>
    import("./skill-form-sheet").then((mod) => ({
      default: mod.SkillFormSheet,
    })),
  {
    ssr: false,
    loading: () => <SkillFormSheetSkeleton />,
  }
);

interface SkillFormSheetDynamicProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: any;
}

export function SkillFormSheetDynamic({
  open,
  onOpenChange,
  skill,
}: SkillFormSheetDynamicProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full lg:max-w-3xl overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>{skill ? "Edit Skill" : "Add New Skill"}</SheetTitle>
        </SheetHeader>
        {open && (
          <SkillFormSheet
            open={open}
            onOpenChange={onOpenChange}
            skill={skill}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
