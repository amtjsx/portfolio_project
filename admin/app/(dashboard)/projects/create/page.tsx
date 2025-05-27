"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  X,
  CalendarIcon,
  Upload,
  Github,
  Globe,
  Save,
  Eye,
  ImageIcon,
  Code,
  Settings,
  Info,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCreate } from "@/hooks/use-create";
import { Project } from "@/types/project";

interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  githubUrl: string | undefined;
  liveUrl: string | undefined;
  imageUrl: string | undefined;
  featured: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  status: "completed" | "in-progress" | "planned";
}

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

export default function CreateProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    longDescription: "",
    technologies: [],
    category: "",
    githubUrl: undefined,
    liveUrl: undefined,
    imageUrl: undefined,
    featured: false,
    startDate: undefined,
    endDate: undefined,
    status: "planned",
  });

  const [newTechnology, setNewTechnology] = useState("");

  const updateFormData = (field: keyof ProjectFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTechnology = (tech: string) => {
    if (tech.trim() && !formData.technologies.includes(tech.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()],
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const { create, creating } = useCreate<Project>({
    title: "project",
    url: "/projects",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.startDate
    ) {
      throw new Error("Please fill in all required fields");
    }

    // Format dates for API
    const projectData = {
      ...formData,
      startDate: formData.startDate
        ? format(formData.startDate, "yyyy-MM-dd")
        : null,
      endDate: formData.endDate ? format(formData.endDate, "yyyy-MM-dd") : null,
    };

    console.log("Creating project:", projectData);
    // Here you would make the API call to create the project
    await create({ data: projectData });
  };

  const ProjectPreview = () => (
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
                alt={formData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
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
            {formData.technologies.length > 0 && (
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Project
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new project to your portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Essential details about your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Project Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="E-commerce Platform"
                        value={formData.title}
                        onChange={(e) =>
                          updateFormData("title", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          updateFormData("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Short Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="A brief description of your project (1-2 sentences)"
                      value={formData.description}
                      onChange={(e) =>
                        updateFormData("description", e.target.value)
                      }
                      rows={2}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      {formData.description.length}/200 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">
                      Detailed Description
                    </Label>
                    <Textarea
                      id="longDescription"
                      placeholder="Provide a comprehensive description of your project, including features, challenges, and technical details..."
                      value={formData.longDescription}
                      onChange={(e) =>
                        updateFormData("longDescription", e.target.value)
                      }
                      rows={6}
                    />
                    <p className="text-sm text-gray-500">
                      {formData.longDescription.length} characters
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Details */}
              <Card>
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
                  <div className="space-y-4">
                    <Label>Technologies Used</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology (e.g., React, Node.js)"
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addTechnology(newTechnology))
                        }
                      />
                      <Button
                        type="button"
                        onClick={() => addTechnology(newTechnology)}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {formData.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.technologies.map((tech, index) => (
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
                            disabled={formData.technologies.includes(tech)}
                            className="text-xs justify-start"
                          >
                            {tech}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.startDate
                              ? format(formData.startDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) =>
                              updateFormData("startDate", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate
                              ? format(formData.endDate, "PPP")
                              : "Pick a date (optional)"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => updateFormData("endDate", date)}
                            initialFocus
                            disabled={(date) =>
                              formData.startDate
                                ? date < formData.startDate
                                : false
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Project Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          updateFormData("status", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Media & Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-purple-600" />
                    Media & Links
                  </CardTitle>
                  <CardDescription>
                    Project images and external links
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Project Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="imageUrl"
                        placeholder="https://example.com/project-image.jpg"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          updateFormData("imageUrl", e.target.value)
                        }
                      />
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub Repository</Label>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="githubUrl"
                          placeholder="https://github.com/username/repo"
                          value={formData.githubUrl}
                          onChange={(e) =>
                            updateFormData("githubUrl", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="liveUrl">Live Demo URL</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="liveUrl"
                          placeholder="https://your-project.com"
                          value={formData.liveUrl}
                          onChange={(e) =>
                            updateFormData("liveUrl", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
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
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Featured Project
                      </Label>
                      <p className="text-sm text-gray-500">
                        Highlight this project in your portfolio
                      </p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        updateFormData("featured", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  disabled={creating}
                  className="flex items-center gap-2"
                >
                  {creating ? (
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
              </div>
            </form>
          </div>

          {/* Sidebar with Preview */}
          <div className="lg:col-span-1">
            <ProjectPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
