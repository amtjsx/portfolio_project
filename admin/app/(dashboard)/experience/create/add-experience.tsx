"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreate } from "@/hooks/use-create";
import { Experience } from "@/types/experience";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Plus,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { EmploymentType } from "../mock-experiences";

// Form schema
const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  employmentType: z.nativeEnum(EmploymentType),
  location: z.string().optional(),
  isRemote: z.boolean().default(false),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  companyUrl: z.string().url().optional().or(z.literal("")),
  companyLogoUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().default(0),
  isHighlighted: z.boolean().default(false),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface AddExperienceSheetProps {
  defaultValues?: Partial<Experience>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddExperienceSheet({
  defaultValues,
  open,
  onOpenChange,
}: AddExperienceSheetProps) {
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      companyName: defaultValues?.companyName || "",
      position: defaultValues?.position || "",
      employmentType: defaultValues?.employmentType || EmploymentType.FULL_TIME,
      location: defaultValues?.location || "",
      isRemote: defaultValues?.isRemote || false,
      startDate: defaultValues?.startDate,
      endDate: defaultValues?.endDate,
      isCurrent: defaultValues?.isCurrent || false,
      description: defaultValues?.description,
      responsibilities: defaultValues?.responsibilities || [],
      achievements: defaultValues?.achievements || [],
      technologies: defaultValues?.technologies || [],
      companyUrl: defaultValues?.companyUrl,
      companyLogoUrl: defaultValues?.companyLogoUrl,
      displayOrder: defaultValues?.displayOrder || 0,
      isHighlighted: defaultValues?.isHighlighted || false,
    },
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control: form.control,
    name: "responsibilities",
  });

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const {
    fields: technologyFields,
    append: appendTechnology,
    remove: removeTechnology,
  } = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  const isCurrent = form.watch("isCurrent");

  const { create } = useCreate({ title: "experience", url: "/experience" });

  const onSubmit = async (data: ExperienceFormData) => {
    // If current job, remove end date
    if (data.isCurrent) {
      data.endDate = undefined;
    }

    await create({ data: { ...data } });
    console.log("Experience data:", data);
    form.reset();
    onOpenChange(false);
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      appendResponsibility(newResponsibility.trim());
      setNewResponsibility("");
    }
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      appendAchievement(newAchievement.trim());
      setNewAchievement("");
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim()) {
      appendTechnology(newTechnology.trim());
      setNewTechnology("");
    }
  };

  const formatEmploymentType = (type: EmploymentType) => {
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Add Work Experience
          </SheetTitle>
          <SheetDescription>
            Add a new work experience to your professional timeline. Fill in the
            details below.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-4"
            >
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Google, Microsoft"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(EmploymentType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {formatEmploymentType(type)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of your role and what the company does..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a brief overview of your role and
                        responsibilities
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Location & Remote */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <h3 className="text-lg font-semibold">Location</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. San Francisco, CA"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          City, State or Country
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isRemote"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Remote Work
                          </FormLabel>
                          <FormDescription>
                            This position allows remote work
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

              {/* Date Range */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <h3 className="text-lg font-semibold">Employment Period</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" disabled={isCurrent} {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave empty if this is your current job
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isCurrent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Current Position
                        </FormLabel>
                        <FormDescription>I currently work here</FormDescription>
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

              <Separator />

              {/* Responsibilities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Responsibilities</h3>

                <div className="space-y-2">
                  {responsibilityFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`responsibilities.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Describe a key responsibility..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeResponsibility(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add a responsibility..."
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addResponsibility())
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addResponsibility}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Achievements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Achievements</h3>

                <div className="space-y-2">
                  {achievementFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`achievements.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Describe a key achievement..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeAchievement(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add an achievement..."
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addAchievement())
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAchievement}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Technologies Used</h3>

                <div className="flex flex-wrap gap-2">
                  {technologyFields.map((field, index) => (
                    <Badge
                      key={field.id}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <FormField
                        control={form.control}
                        name={`technologies.${index}`}
                        render={({ field }) => <span>{field.value}</span>}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => removeTechnology(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology..."
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTechnology())
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTechnology}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Company Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Details</h3>

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="companyUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://company.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional: Link to company website
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyLogoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Logo URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://company.com/logo.png"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional: Direct link to company logo image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Display Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <h3 className="text-lg font-semibold">Display Settings</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Higher numbers appear first
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isHighlighted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Featured Experience
                          </FormLabel>
                          <FormDescription>
                            Highlight this experience
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

              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Experience</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
