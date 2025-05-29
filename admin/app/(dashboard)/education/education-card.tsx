import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
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
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col h-full">
      {/* Institution Logo/Header */}
      <div className="relative h-20 bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
        {education.institutionLogo ? (
          <img
            src={education.institutionLogo || "/placeholder.svg"}
            alt={education.institutionName}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-2xl font-bold text-primary/30">
              {education.institutionName.charAt(0)}
            </div>
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-2 right-2 flex gap-1">
          {education.isCurrent && (
            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
              Current
            </Badge>
          )}
          {education.isHighlighted && (
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
              <Star className="w-3 h-3 mr-1" />
              Highlighted
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

      <CardHeader className="pb-2 flex-none">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base leading-tight line-clamp-2">
              {education.institutionName}
            </h3>
            {education.educationType && (
              <Badge
                className={cn(
                  "text-xs shrink-0",
                  getEducationTypeColor(education.educationType)
                )}
              >
                {formatEducationType(education.educationType)}
              </Badge>
            )}
          </div>
          <div className="space-y-1">
            <p className="font-medium text-sm line-clamp-1">
              {education.degree}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {education.fieldOfStudy}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        {/* Date and Location */}
        <div className="space-y-1">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="w-3 h-3 mr-1" />
            {getDateRange()}
          </div>
          {education.location && (
            <div className="flex items-center text-xs text-muted-foreground">
              {education.isRemote ? (
                <Globe className="w-3 h-3 mr-1" />
              ) : (
                <MapPin className="w-3 h-3 mr-1" />
              )}
              {education.isRemote ? "Remote" : education.location}
            </div>
          )}
        </div>

        {/* GPA */}
        {education.gpa && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">GPA:</span>
            <Badge variant="outline" className="text-xs">
              {education.gpa}
            </Badge>
          </div>
        )}

        {/* Description */}
        {education.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {education.description}
          </p>
        )}

        {/* Honors/Achievements */}
        {(education.honors?.length || education.achievements?.length) && (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Award className="w-3 h-3" />
              <span>Honors & Achievements</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {education.honors?.slice(0, 2).map((honor) => (
                <Badge key={honor} variant="secondary" className="text-xs">
                  {honor}
                </Badge>
              ))}
              {education.achievements?.slice(0, 1).map((achievement) => (
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
                3 && (
                <Badge variant="secondary" className="text-xs">
                  +
                  {(education.honors?.length || 0) +
                    (education.achievements?.length || 0) -
                    3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {education.skills && education.skills.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Skills Gained</span>
            <div className="flex flex-wrap gap-1">
              {education.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {education.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{education.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex flex-col gap-2 flex-none">
        <div className="flex gap-2 w-full">
          {education.institutionUrl && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link
                href={education.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                <span className="text-xs">Institution</span>
              </Link>
            </Button>
          )}
          {education.certificateUrl && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link
                href={education.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Award className="w-3 h-3 mr-1" />
                <span className="text-xs">Certificate</span>
              </Link>
            </Button>
          )}
        </div>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href={`/education/${education.id}`}>
            <span className="text-xs">View Details</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
