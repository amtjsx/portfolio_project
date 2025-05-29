"use client";

import { SkillForm } from "./skill-form";

interface SkillFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: any;
}

export function SkillFormSheet({
  open,
  onOpenChange,
  skill,
}: SkillFormSheetProps) {
  return <SkillForm skill={skill} open={open} onOpenChange={onOpenChange} />;
}
