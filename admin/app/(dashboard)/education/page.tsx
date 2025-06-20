import { Suspense } from "react";
import { EducationHeader } from "./education-header";
import { EducationList } from "./education-list";
import { EducationLoading } from "./education-loading";
import { EducationFormSheet } from "./create/education-form-sheet";

export default function EducationPage() {
  return (
    <div className="container py-6 sm:py-8 lg:py-10 max-w-7xl">
      <EducationHeader />
      <Suspense fallback={<EducationLoading />}>
        <EducationList />
      </Suspense>
      <EducationFormSheet />
    </div>
  );
}
