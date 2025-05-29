"use client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useData } from "@/hooks/use-infinite-data";
import { SkillCategory } from "@/types/skill-category";
import { Skill } from "@/types/skills";

export function PortfolioSkills() {
  const { data: skills } = useData<Skill>({ keys: "skills" });
  const { data: skillCategories } = useData<SkillCategory>({
    keys: "skills/categories",
  });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc: any, skill: any) => {
    const categoryId = skill.categoryId || "uncategorized";
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(skill);
    return acc;
  }, {});

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => {
            const categorySkills = skillsByCategory[category.id] || [];
            if (categorySkills.length === 0) return null;

            return (
              <div key={category.name} className="space-y-4">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <div className="space-y-3">
                  {categorySkills.map((skill: Skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {skill.proficiencyLevel}
                        </Badge>
                      </div>
                      <Progress
                        value={skill.yearsOfExperience ? skill.yearsOfExperience * 10 : 0}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
