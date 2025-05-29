import { SkillCategory as SkillCategoryType } from "@/types/skill-category";
import { Skill } from "@/types/skills";
import { SkillCard } from "./skill-card";

interface SkillCategoryProps {
  category: SkillCategoryType;
  skills: Skill[];
  onEditSkill?: (skill: Skill) => void;
}

export function SkillCategory({
  category,
  skills,
  onEditSkill,
}: SkillCategoryProps) {
  // Sort skills by display order
  const sortedSkills = [...skills].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{category.name}</h2>
      {sortedSkills.length === 0 && (
        <div className="text-center text-muted-foreground w-full h-full text-sm p-8 bg-muted rounded-sm">
          No skills found in this category.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} onEdit={onEditSkill} />
        ))}
      </div>
    </div>
  );
}
