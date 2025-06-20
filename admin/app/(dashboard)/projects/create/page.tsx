"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Code,
  Eye,
  Github,
  Globe,
  ImageIcon,
  Plus,
  Save,
  Settings,
  Star,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetFooter } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreate } from "@/hooks/use-create";
import { Project } from "@/types/project";
import { z } from "zod";
import { EditProfilePhotoDialog } from "../../profile/edit/edit-profile-photo-dialog";

const projectFormSchema = z.object({
  imageUrl: z.string(),
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be less than 200 characters"),
  longDescription: z.string().optional(),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  category: z.string().min(1, "Category is required"),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid live demo URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["completed", "in-progress", "planned"]).default("planned"),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

const projectCategories = [
  "web",
  "mobile",
  "desktop",
  "api",
  "library",
  "tool",
  "game",
  "ai/ml",
  "blockchain",
  "iot",
  "other",
];

const commonTechnologies = [
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Go",
  "Rust",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Firebase",
  "Supabase",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "Chakra UI",
  "GraphQL",
  "REST API",
  "Socket.io",
  "Jest",
  "Cypress",
  "Webpack",
  "Vite",
];

export function CreateProjectForm({
  project,
  open,
  onOpenChange,
}: {
  project?: Partial<Project>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [newTechnology, setNewTechnology] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title,
      description: project?.description,
      technologies: project?.technologies || [],
      category: project?.category,
      githubUrl: project?.githubUrl,
      liveUrl: project?.liveUrl,
      imageUrl: project?.imageUrl,
      featured: project?.featured,
      status: project?.status,
    },
  });

  const watchedValues = form.watch();

  const addTechnology = (tech: string) => {
    const currentTechnologies = form.getValues("technologies");
    if (tech.trim() && !currentTechnologies.includes(tech.trim())) {
      form.setValue("technologies", [...currentTechnologies, tech.trim()], {
        shouldValidate: true,
      });
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    const currentTechnologies = form.getValues("technologies");
    form.setValue(
      "technologies",
      currentTechnologies.filter((t) => t !== tech),
      { shouldValidate: true }
    );
  };

  const { create, creating } = useCreate({
    title: "projects",
    url: "/projects",
  });

  const onSubmit = async (data: ProjectFormValues) => {
    const projectData = {
      ...data,
      githubUrl: data.githubUrl || undefined,
      liveUrl: data.liveUrl || undefined,
      imageUrl: data.imageUrl || undefined,
    };
    await create({ data: { ...projectData, id: project?.id } });
    onOpenChange(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Information */}
        <Card className="border-none shadow-none rounded-none">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Image URL</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="https://example.com/project-image.jpg"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <EditProfilePhotoDialog
                      currentPhoto={
                        field.value
                          ? `${process.env.NEXT_PUBLIC_API_URL}/images/file/${field.value}`
                          : ""
                      }
                      onSave={(image: any) => field.onChange(image.id)}
                    >
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </EditProfilePhotoDialog>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Project Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce Platform" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectCategories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="capitalize"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Short Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your project (1-2 sentences)"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/200 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a comprehensive description of your project, including features, challenges, and technical details..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0} characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card className="border-none shadow-none rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-green-600" />
              Technical Details
            </CardTitle>
            <CardDescription>
              Technologies used and project timeline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology (e.g., React, Node.js)"
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTechnology(newTechnology);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addTechnology(newTechnology)}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tech}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-red-500"
                              onClick={() => removeTechnology(tech)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Quick add popular technologies:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {commonTechnologies.slice(0, 16).map((tech) => (
                          <Button
                            key={tech}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addTechnology(tech)}
                            disabled={field.value.includes(tech)}
                            className="text-xs justify-start"
                          >
                            {tech}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Media & Links */}
        <Card className="border-none shadow-none rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-600" />
              Media & Links
            </CardTitle>
            <CardDescription>Project images and external links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repository</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="https://github.com/username/repo"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="https://your-project.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-none shadow-none rounded-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-600" />
              Project Settings
            </CardTitle>
            <CardDescription>
              Configure project visibility and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2 text-base">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Featured Project
                    </FormLabel>
                    <FormDescription>
                      Highlight this project in your portfolio
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
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <SheetFooter className="flex justify-end gap-4 p-6 border-t sticky bottom-0 bg-card shadow-sm">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}

interface ProjectPreviewProps {
  formData: Partial<ProjectFormValues>;
}

function ProjectPreview({ formData }: ProjectPreviewProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </CardTitle>
        <CardDescription>See how your project will appear</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl || "/placeholder.svg"}
                alt={formData.title || "Project"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ImageIcon className="h-12 w-12" />
                <span className="ml-2">No image</span>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              {formData.category && (
                <Badge variant="secondary" className="capitalize">
                  {formData.category}
                </Badge>
              )}
              {formData.featured && (
                <Badge variant="default" className="bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {formData.status && (
                <Badge variant="outline" className="capitalize">
                  {formData.status.replace("-", " ")}
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold">
              {formData.title || "Project Title"}
            </h3>
            <p className="text-sm text-gray-600">
              {formData.description ||
                "Project description will appear here..."}
            </p>
            {formData.technologies && formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {formData.technologies.slice(0, 6).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {formData.technologies.length > 6 && (
                  <Badge variant="secondary" className="text-xs">
                    +{formData.technologies.length - 6}
                  </Badge>
                )}
              </div>
            )}
            {(formData.githubUrl || formData.liveUrl) && (
              <div className="flex gap-2">
                {formData.liveUrl && (
                  <Button size="sm" className="text-xs">
                    <Globe className="h-3 w-3 mr-1" />
                    Demo
                  </Button>
                )}
                {formData.githubUrl && (
                  <Button variant="outline" size="sm" className="text-xs">
                    <Github className="h-3 w-3 mr-1" />
                    Code
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
