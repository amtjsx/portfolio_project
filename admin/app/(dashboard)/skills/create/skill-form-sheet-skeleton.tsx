import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function SkillFormSheetSkeleton() {
  return (
    <div className="mt-6 space-y-6">
      {/* Basic Information Section */}
      <div className="space-y-4">
        {/* Skill Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-3 w-64" />
        </div>

        {/* Proficiency Level and Years of Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Last Used Date */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>

      <Separator />

      {/* Visual Customization Section */}
      <div className="space-y-4">
        <div>
          <Skeleton className="h-6 w-44 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Icon */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-48" />
            <div className="flex flex-wrap gap-1 mt-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8" />
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Organization Section */}
      <div className="space-y-4">
        <div>
          <Skeleton className="h-6 w-28 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-44" />
          </div>
          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-52" />
              </div>
              <Skeleton className="h-6 w-11" />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Metadata Section */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-3 w-80" />
      </div>

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
        <Skeleton className="h-10 w-full sm:w-20" />
        <Skeleton className="h-10 w-full sm:w-24" />
      </div>
    </div>
  );
}
