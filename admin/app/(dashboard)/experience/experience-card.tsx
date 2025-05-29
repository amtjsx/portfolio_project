import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  MapPinIcon,
  ExternalLinkIcon,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Experience } from "@/types/experience";
import { EmploymentType } from "./mock-experiences";

interface ExperienceCardProps {
  experience: Experience;
  isTimeline?: boolean;
}

export function ExperienceCard({
  experience,
  isTimeline = false,
}: ExperienceCardProps) {
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Calculate duration
  const calculateDuration = () => {
    const start = new Date(experience.startDate);
    const end = experience.endDate ? new Date(experience.endDate) : new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "year" : "years"}`;
    } else {
      return `${years} ${years === 1 ? "year" : "years"} ${remainingMonths} ${
        remainingMonths === 1 ? "month" : "months"
      }`;
    }
  };

  // Format employment type
  const formatEmploymentType = (type: EmploymentType) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        experience.isHighlighted && "border-primary/50 bg-primary/5",
        isTimeline && "border-l-4 border-l-primary/20"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-3">
            {!isTimeline && (
              <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center shrink-0">
                {experience.companyLogoUrl ? (
                  <img
                    src={experience.companyLogoUrl || "/placeholder.svg"}
                    alt={`${experience.companyName} logo`}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <Building2 className="w-6 h-6" />
                )}
              </div>
            )}

            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{experience.position}</h3>
              <div className="flex items-center gap-2">
                {experience.companyUrl ? (
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-primary"
                    asChild
                  >
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {experience.companyName}
                      <ExternalLinkIcon className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                ) : (
                  <span className="font-medium">{experience.companyName}</span>
                )}
                <Badge variant="secondary">
                  {formatEmploymentType(experience.employmentType)}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {formatDate(experience.startDate)} -{" "}
                    {experience.isCurrent
                      ? "Present"
                      : formatDate(experience.endDate!)}
                  </span>
                  <span className="text-xs">({calculateDuration()})</span>
                </div>

                {(experience.location || experience.isRemote) && (
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>
                      {experience.isRemote ? "Remote" : experience.location}
                      {experience.location &&
                        experience.isRemote &&
                        " (Remote)"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {experience.isHighlighted && !isTimeline && (
            <Badge
              variant="outline"
              className="border-primary text-primary shrink-0"
            >
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {experience.description && (
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        )}

        {experience.responsibilities.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Key Responsibilities</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {experience.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Key Achievements</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1.5">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {experience.technologies.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
