"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ThumbsUp, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skill } from "@/types/skills";
import { ProficiencyLevel } from "./mock-data";

interface SkillCardProps {
  skill: Skill;
  onEdit?: (skill: Skill) => void;
}

export function SkillCard({ skill, onEdit }: SkillCardProps) {
  // Calculate proficiency percentage for progress bar
  const proficiencyPercentage = () => {
    switch (skill.proficiencyLevel) {
      case ProficiencyLevel.BEGINNER:
        return 25;
      case ProficiencyLevel.INTERMEDIATE:
        return 50;
      case ProficiencyLevel.ADVANCED:
        return 75;
      case ProficiencyLevel.EXPERT:
        return 100;
      default:
        return 0;
    }
  };

  // Format last used date
  const formatLastUsed = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md group",
        skill.isFeatured && "border-primary/50 bg-primary/5"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {skill.icon ? (
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ backgroundColor: skill.color || "#e2e8f0" }}
              >
                {skill.icon}
              </div>
            ) : (
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{ backgroundColor: skill.color || "#e2e8f0" }}
              >
                {skill.name.charAt(0)}
              </div>
            )}
            <h3 className="font-semibold text-lg">{skill.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            {skill.isFeatured && (
              <Badge variant="outline" className="border-primary text-primary">
                Featured
              </Badge>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEdit(skill)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {skill.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {skill.description}
          </p>
        )}

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Proficiency</span>
            <span className="font-medium">
              {skill.proficiencyLevel.toLowerCase()}
            </span>
          </div>
          <Progress value={proficiencyPercentage()} className="h-1.5" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {skill.yearsOfExperience !== undefined && (
            <div className="space-y-1">
              <span className="text-muted-foreground">Experience</span>
              <p className="font-medium">
                {skill.yearsOfExperience}{" "}
                {skill.yearsOfExperience === 1 ? "year" : "years"}
              </p>
            </div>
          )}

          {skill.lastUsedDate && (
            <div className="space-y-1">
              <span className="text-muted-foreground">Last used</span>
              <p className="font-medium flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {formatLastUsed(skill.lastUsedDate)}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      {skill.endorsementCount > 0 && (
        <CardFooter className="pt-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ThumbsUp className="h-3 w-3" />
            <span>
              {skill.endorsementCount}{" "}
              {skill.endorsementCount === 1 ? "endorsement" : "endorsements"}
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
