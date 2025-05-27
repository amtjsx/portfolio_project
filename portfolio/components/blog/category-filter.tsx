"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: Array<{ name: string; count: number }>;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3 justify-center">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(null)}
          className="rounded-full"
        >
          All Posts
        </Button>

        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category.name)}
            className="rounded-full"
          >
            {category.name}
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {category.count}
            </span>
          </Button>
        ))}

        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectCategory(null)}
            className="rounded-full text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filter
          </Button>
        )}
      </div>
    </div>
  );
}
