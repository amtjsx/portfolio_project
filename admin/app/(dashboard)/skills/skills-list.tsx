"use client";

import { useState } from "react";
import { SkillFormSheetDynamic } from "./create/skill-form-sheet-dynamic";
import { SkillCategory } from "./skill-category";

// This would come from your API in a real application
import { useData } from "@/hooks/use-infinite-data";
import { SkillCategory as SkillCategoryType } from "@/types/skill-category";
import { Skill } from "@/types/skills";

export function SkillsList() {
  const [activeTab, setActiveTab] = useState("all");
  const [editingSkill, setEditingSkill] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);

  const { data: skills } = useData<Skill>({ keys: "skills", params: {} });
  const { data: categories } = useData<SkillCategoryType>({
    keys: "skills/categories",
    params: {},
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

  // Featured skills
  const featuredSkills = skills.filter((skill) => skill.isFeatured);

  const handleEditSkill = (skill: any) => {
    setEditingSkill(skill);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSkill(null);
  };

  return (
    <>
      <div className="space-y-10">
        {categories.map((category, index) => {
          const categorySkills = skillsByCategory[category.id] || [];

          return (
            <SkillCategory
              key={index}
              category={category}
              skills={categorySkills}
              onEditSkill={handleEditSkill}
            />
          );
        })}

        {skillsByCategory["uncategorized"] && (
          <SkillCategory
            category={{ id: "uncategorized", name: "Other Skills" }}
            skills={skillsByCategory["uncategorized"]}
            onEditSkill={handleEditSkill}
          />
        )}
      </div>

      <SkillFormSheetDynamic
        open={isFormOpen}
        onOpenChange={handleCloseForm}
        skill={editingSkill}
      />
    </>
  );
}
