import { Suspense } from "react";
import { SkillsHeader } from "./skills-header";
import { SkillsList } from "./skills-list";
import { SkillsLoading } from "./skills-loading";

export default function SkillsPage() {
  return (
    <div className="container py-10 max-w-5xl">
      <SkillsHeader />
      <Suspense fallback={<SkillsLoading />}>
        <SkillsList />
      </Suspense>
    </div>
  );
}
