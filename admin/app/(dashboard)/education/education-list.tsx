"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/hooks/use-infinite-data";
import { Education } from "@/types/education";
import { useState } from "react";
import { EducationCard } from "./education-card";
import { HighlightedEducationCard } from "./highlighted-education-card";

export function EducationList() {
  const [activeTab, setActiveTab] = useState("all");

  const { data: education } = useData<Education>({
    keys: "education",
  });

  // Filter education by type and status
  const highlightedEducation = education.filter((edu) => edu.isHighlighted);
  const currentEducation = education.filter((edu) => edu.isCurrent);
  const completedEducation = education.filter((edu) => !edu.isCurrent);
  const verifiedEducation = education.filter((edu) => edu.isVerified);

  return (
    <div className="space-y-6 lg:space-y-8">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All ({education.length})
            </TabsTrigger>
            <TabsTrigger value="highlighted" className="text-xs sm:text-sm">
              Highlighted ({highlightedEducation.length})
            </TabsTrigger>
            <TabsTrigger value="current" className="text-xs sm:text-sm">
              Current ({currentEducation.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm">
              Completed ({completedEducation.length})
            </TabsTrigger>
            <TabsTrigger value="verified" className="text-xs sm:text-sm">
              Verified ({verifiedEducation.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-8 lg:space-y-10">
          {/* Highlighted Education */}
          {highlightedEducation.length > 0 && (
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
                Highlighted Education
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                {highlightedEducation.slice(0, 4).map((edu) => (
                  <HighlightedEducationCard key={edu.id} education={edu} />
                ))}
              </div>
            </div>
          )}

          {/* All Education */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
              All Education
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {education
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((edu) => (
                  <EducationCard key={edu.id} education={edu} />
                ))}
            </div>
          </div>

          {education.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-2 text-lg">
                  No education records found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="highlighted">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
            {highlightedEducation.map((edu) => (
              <HighlightedEducationCard key={edu.id} education={edu} />
            ))}
          </div>
          {highlightedEducation.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-2 text-lg">
                  No highlighted education found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mark some education as highlighted to see them here
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="current">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {currentEducation.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
          {currentEducation.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-2 text-lg">
                  No current education found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Education currently in progress will appear here
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {completedEducation.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
          {completedEducation.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-2 text-lg">
                  No completed education found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Completed education will appear here
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="verified">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {verifiedEducation.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
          {verifiedEducation.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-2 text-lg">
                  No verified education found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Verified education credentials will appear here
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
