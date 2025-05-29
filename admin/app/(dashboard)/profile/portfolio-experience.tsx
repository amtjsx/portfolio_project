"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useData } from "@/hooks/use-infinite-data";
import { Experience } from "@/types/experience";
import { Building2, CalendarIcon, MapPinIcon } from "lucide-react";

export function PortfolioExperience() {
  const { data: experiences } = useData<Experience>({ keys: "experience" });

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the companies I've had the privilege to
            work with.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex gap-8">
                {/* Timeline dot */}
                <div className="relative hidden md:flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-background bg-primary flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* Experience content */}
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {experience.position}
                        </h3>
                        <p className="text-lg font-medium text-primary">
                          {experience.companyName}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <Badge variant="secondary">
                          {experience.isCurrent ? "Current" : "Past"}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {experience.startDate} - {experience.endDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-medium">Key Achievements:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
