"use client";

import { DeleteDialog } from "@/components/delete-dialog/delete-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreate } from "@/hooks/use-create";
import { useData } from "@/hooks/use-infinite-data";
import { cn } from "@/lib/utils";
import { SkillCategory } from "@/types/skill-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CategoryFormDialog } from "../categories/category-form-dialog";
import { ProficiencyLevel } from "../mock-data";

// Form validation schema
const skillFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  description: z.string().optional().nullable(),
  proficiencyLevel: z.nativeEnum(ProficiencyLevel),
  yearsOfExperience: z.number().min(0).max(50).optional().nullable(),
  lastUsedDate: z.date().optional().nullable(),
  icon: z
    .string()
    .max(10, "Icon must be less than 10 characters")
    .optional()
    .nullable(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Color must be a valid hex color")
    .optional()
    .nullable(),
  isFeatured: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  categoryId: z.string().optional().nullable(),
  metadata: z.string().optional().nullable(), // JSON string that will be parsed
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillFormProps {
  skill?: any; // Existing skill for editing
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillForm({ skill, open, onOpenChange }: SkillFormProps) {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: skill?.name || "",
      description: skill?.description || "",
      proficiencyLevel:
        skill?.proficiencyLevel || ProficiencyLevel.INTERMEDIATE,
      yearsOfExperience: skill?.yearsOfExperience || undefined,
      lastUsedDate: skill?.lastUsedDate
        ? new Date(skill.lastUsedDate)
        : undefined,
      icon: skill?.icon || "",
      color: skill?.color || "#3b82f6",
      isFeatured: skill?.isFeatured || false,
      displayOrder: skill?.displayOrder || 0,
      categoryId: skill?.categoryId,
      metadata: skill?.metadata,
    },
  });

  const { data: categories } = useData<SkillCategory>({
    keys: "skills/categories",
  });
  const { create, creating } = useCreate({ title: "skills", url: "/skills" });

  const handleSubmit = async (data: SkillFormValues) => {
    await create({ data: { ...data, id: skill?.id } });
    onOpenChange(false);
  };

  const predefinedColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
  ];

  const commonIcons = [
    "💻",
    "⚛️",
    "🐍",
    "☁️",
    "🔧",
    "📊",
    "🎨",
    "📱",
    "🌐",
    "🔒",
  ];

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 py-4"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., JavaScript, React, Project Management"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your experience and expertise with this skill..."
                      className="min-h-[80px] resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about your experience, specific
                    technologies, or achievements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="proficiencyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency Level *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ProficiencyLevel.BEGINNER}>
                          Beginner
                        </SelectItem>
                        <SelectItem value={ProficiencyLevel.INTERMEDIATE}>
                          Intermediate
                        </SelectItem>
                        <SelectItem value={ProficiencyLevel.ADVANCED}>
                          Advanced
                        </SelectItem>
                        <SelectItem value={ProficiencyLevel.EXPERT}>
                          Expert
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        max="50"
                        placeholder="e.g., 3.5"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? Number.parseFloat(e.target.value)
                              : undefined
                          )
                        }
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="lastUsedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Used Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When did you last use this skill professionally?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Visual Customization */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Visual Customization</h3>
              <p className="text-sm text-muted-foreground">
                Customize how your skill appears in your profile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., ⚛️, 🐍, 💻"
                        maxLength={10}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose an emoji or short text
                    </FormDescription>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {commonIcons.map((icon) => (
                        <Button
                          key={icon}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => field.onChange(icon)}
                        >
                          {icon}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="#3b82f6"
                          {...field}
                          value={field.value || ""}
                          className="font-mono"
                        />
                      </FormControl>
                      <Popover
                        open={colorPickerOpen}
                        onOpenChange={setColorPickerOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                          >
                            <div
                              className="w-4 h-4 rounded"
                              style={{
                                backgroundColor: field.value || "#3b82f6",
                              }}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                          <div className="grid grid-cols-5 gap-1">
                            {predefinedColors.map((color) => (
                              <Button
                                key={color}
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                  field.onChange(color);
                                  setColorPickerOpen(false);
                                }}
                              />
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormDescription>
                      Hex color code for the skill badge
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Organization */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Organization</h3>
              <p className="text-sm text-muted-foreground">
                Organize and categorize your skill.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsCategoryFormOpen(true)}
                            className="h-10 w-10"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id || ""}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Lower numbers appear first
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Featured Skill
                      </FormLabel>
                      <FormDescription>
                        Highlight this skill in your profile
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <FormField
            control={form.control}
            name="metadata"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Metadata (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='{"certifications": ["AWS Certified"], "projects": 5}'
                    className="min-h-[80px] font-mono text-sm resize-none"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Optional JSON data for additional skill information
                  (certifications, projects, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 border-t">
            {skill?.id && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  setIsDeleteDialogOpen(true);
                }}
              >
                Delete
              </Button>
            )}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={creating}
                className="w-full sm:w-auto"
              >
                {creating ? "Saving..." : skill ? "Update Skill" : "Add Skill"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <CategoryFormDialog
        open={isCategoryFormOpen}
        onOpenChange={setIsCategoryFormOpen}
      />
      {skill?.id && (
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          title="Delete Skill"
          id={skill.id || ""}
          description="Are you sure you want to delete this skill?"
          onDeleted={() => {
            onOpenChange(false);
          }}
        />
      )}
    </>
  );
}
