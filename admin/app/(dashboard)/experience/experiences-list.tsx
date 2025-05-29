"use client";

import { ExperienceCard } from "./experience-card";
import { ExperienceTimeline } from "./experience-timeline";

// This would come from your API in a real application
import { useData } from "@/hooks/use-infinite-data";
import { Experience } from "@/types/experience";

export function ExperiencesList() {
  const { data: experiences, loading } = useData<Experience>({
    keys: "experience",
  });

  return (
    <div className="space-y-6">
      <ExperienceTimeline experiences={experiences} />
      <div className="grid gap-6">
        {!loading && !experiences.length ? (
          <div className="text-center py-10 text-muted-foreground">
            <h3 className="font-medium mb-2">No experience found</h3>
            <p className="text-sm">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))
        )}
      </div>
    </div>
  );
}
