import { Skeleton } from "@/components/ui/skeleton";

export function ExperiencesLoading() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-6">
          <div className="flex flex-col items-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-0.5 h-32 mt-4" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
