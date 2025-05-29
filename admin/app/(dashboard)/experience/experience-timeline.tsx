import { ExperienceCard } from "./experience-card"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

interface ExperienceTimelineProps {
  experiences: any[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative flex gap-6">
            {/* Timeline dot */}
            <div className="relative flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full border-4 border-background flex items-center justify-center ${
                  experience.isHighlighted ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {experience.companyLogoUrl ? (
                  <img
                    src={experience.companyLogoUrl || "/placeholder.svg"}
                    alt={`${experience.companyName} logo`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Building2 className="w-5 h-5" />
                )}
              </div>
              {experience.isHighlighted && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  Featured
                </Badge>
              )}
            </div>

            {/* Experience content */}
            <div className="flex-1 pb-8">
              <ExperienceCard experience={experience} isTimeline />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
