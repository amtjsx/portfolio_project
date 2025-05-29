import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ExternalLink,
  MapPin,
  Star,
  Award,
  CheckCircle,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Education } from "@/types/education";

interface HighlightedEducationCardProps {
  education: Education;
}

export function HighlightedEducationCard({
  education,
}: HighlightedEducationCardProps) {
  const getEducationTypeColor = (type?: string) => {
    const colors = {
      bachelors: "bg-blue-100 text-blue-800",
      masters: "bg-purple-100 text-purple-800",
      doctorate: "bg-red-100 text-red-800",
      associate: "bg-green-100 text-green-800",
      certificate: "bg-orange-100 text-orange-800",
      diploma: "bg-yellow-100 text-yellow-800",
      high_school: "bg-gray-100 text-gray-800",
      vocational: "bg-indigo-100 text-indigo-800",
      online_course: "bg-cyan-100 text-cyan-800",
      self_study: "bg-pink-100 text-pink-800",
      other: "bg-slate-100 text-slate-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatEducationType = (type?: string) => {
    const formatted = {
      bachelors: "Bachelor's",
      masters: "Master's",
      doctorate: "Doctorate",
      associate: "Associate",
      certificate: "Certificate",
      diploma: "Diploma",
      high_school: "High School",
      vocational: "Vocational",
      online_course: "Online Course",
      self_study: "Self Study",
      other: "Other",
    };
    return formatted[type as keyof typeof formatted] || "Education";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getDateRange = () => {
    const start = formatDate(education.startDate);
    const end = education.endDate ? formatDate(education.endDate) : "Present";
    return `${start} - ${end}`;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-background h-fit">
      <div className="flex flex-col lg:flex-row">
        {/* Institution Logo/Info */}
        <div className="relative w-full lg:w-2/5 h-48 lg:h-56 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
          {education.institutionLogo ? (
            <img
              src={education.institutionLogo || "/placeholder.svg"}
              alt={education.institutionName}
              className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary/30">
                {education.institutionName.charAt(0)}
              </div>
            </div>
          )}

          {/* Status Badges */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Highlighted
            </Badge>
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {education.isCurrent && (
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                Current
              </Badge>
            )}
            {education.isVerified && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-3/5 flex flex-col">
          <CardHeader className="pb-3">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                {education.educationType && (
                  <Badge
                    className={cn(
                      "text-xs w-fit",
                      getEducationTypeColor(education.educationType)
                    )}
                  >
                    {formatEducationType(education.educationType)}
                  </Badge>
                )}
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {getDateRange()}
                </div>
              </div>
              <h3 className="font-bold text-lg lg:text-xl leading-tight line-clamp-2">
                {education.institutionName}
              </h3>
              <div className="space-y-1">
                <p className="font-semibold text-base">{education.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {education.fieldOfStudy}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-3 pb-4">
            {/* Location and GPA */}
            <div className="flex flex-wrap gap-4 text-sm">
              {education.location && (
                <div className="flex items-center text-muted-foreground">
                  {education.isRemote ? (
                    <Globe className="w-4 h-4 mr-1" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-1" />
                  )}
                  {education.isRemote ? "Remote" : education.location}
                </div>
              )}
              {education.gpa && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">GPA:</span>
                  <Badge variant="outline" className="text-xs">
                    {education.gpa}
                  </Badge>
                </div>
              )}
            </div>

            {/* Description */}
            {education.description && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {education.description}
              </p>
            )}

            {/* Honors and Achievements */}
            {(education.honors?.length || education.achievements?.length) && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Honors & Achievements
                </h4>
                <div className="flex flex-wrap gap-1">
                  {education.honors?.slice(0, 4).map((honor) => (
                    <Badge key={honor} variant="secondary" className="text-xs">
                      {honor}
                    </Badge>
                  ))}
                  {education.achievements?.slice(0, 2).map((achievement) => (
                    <Badge
                      key={achievement}
                      variant="secondary"
                      className="text-xs"
                    >
                      {achievement}
                    </Badge>
                  ))}
                  {(education.honors?.length || 0) +
                    (education.achievements?.length || 0) >
                    6 && (
                    <Badge variant="secondary" className="text-xs">
                      +
                      {(education.honors?.length || 0) +
                        (education.achievements?.length || 0) -
                        6}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Skills */}
            {education.skills && education.skills.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">
                  Skills Gained
                </h4>
                <div className="flex flex-wrap gap-1">
                  {education.skills.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {education.skills.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{education.skills.length - 6}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {education.institutionUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={education.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Institution
                  </Link>
                </Button>
              )}
              {education.certificateUrl && (
                <Button size="sm" asChild>
                  <Link
                    href={education.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Award className="w-3 h-3 mr-1" />
                    Certificate
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/education/${education.id}`}>Details</Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
