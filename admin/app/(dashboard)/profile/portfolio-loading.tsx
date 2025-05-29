import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioLoading() {
  return (
    <div className="min-h-screen space-y-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16" />
                ))}
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Skeleton className="w-80 h-80 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
