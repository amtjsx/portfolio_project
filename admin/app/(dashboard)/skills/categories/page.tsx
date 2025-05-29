"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryFormDialog } from "./category-form-dialog";
import { MoreHorizontal, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { mockCategories } from "../mock-data";
import { SkillCategory } from "@/types/skill-category";

export function CategoryManagement() {
  const [categories, setCategories] = useState(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(
    null
  );

  const handleCreateCategory = async (data: any) => {
    // In a real app, this would call your API
    console.log("Creating category:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add new category to local state
    const newCategory = {
      id: Date.now().toString(),
      ...data,
      skillCount: 0,
      createdAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleUpdateCategory = async (data: any) => {
    // In a real app, this would call your API
    console.log("Updating category:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update category in local state
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === editingCategory?.id ? { ...cat, ...data } : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    // In a real app, this would call your API
    console.log("Deleting category:", categoryId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Remove category from local state
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleToggleActive = async (categoryId: string) => {
    // In a real app, this would call your API
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, isVisible: !cat.isVisible } : cat
      )
    );
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  // Sort categories by display order
  const sortedCategories = [...categories].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Skill Categories
          </h2>
          <p className="text-muted-foreground">
            Organize your skills into meaningful categories
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCategories.map((category) => (
          <Card key={category.id} className="relative group">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {category.icon ? (
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-sm"
                      style={{ backgroundColor: category.color || "#3b82f6" }}
                    >
                      {category.icon}
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: category.color || "#3b82f6" }}
                    >
                      {category.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {category.skillCount || 0} skills
                      </Badge>
                      {!category.isVisible && (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleActive(category.id)}
                    >
                      {category.isVisible ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            {category.description && (
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {category.description}
                </CardDescription>
              </CardContent>
            )}
          </Card>
        ))}

        {/* Empty state */}
        {categories.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="text-muted-foreground text-center">
                <h3 className="font-medium mb-2">No categories yet</h3>
                <p className="text-sm mb-4">
                  Create your first skill category to get started
                </p>
                <Button onClick={() => setIsFormOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <CategoryFormDialog
        open={isFormOpen}
        onOpenChange={handleCloseForm}
        category={editingCategory}
      />
    </div>
  );
}
