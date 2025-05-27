"use client";

import type React from "react";
import { FileText } from "lucide-react"; // Import FileText here

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  X,
  Plus,
  Palette,
  Search,
  Settings,
  ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PortfolioFormData {
  title: string;
  subtitle: string;
  summary: string;
  theme: "modern" | "classic" | "minimal" | "creative";
  primaryColor: string;
  secondaryColor: string;
  visibility: "public" | "private" | "unlisted";
  customDomain: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  sections: {
    about: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    contact: boolean;
    testimonials: boolean;
    blog: boolean;
  };
  settings: {
    showContactForm: boolean;
    allowDownloadResume: boolean;
    enableAnalytics: boolean;
    enableComments: boolean;
    maintenanceMode: boolean;
  };
  resumeUrl: string;
  coverImageUrl: string;
  avatarUrl: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export default function PortfolioForm() {
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: "",
    subtitle: "",
    summary: "",
    theme: "modern",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    visibility: "public",
    customDomain: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    sections: {
      about: true,
      skills: true,
      experience: true,
      education: true,
      projects: true,
      contact: true,
      testimonials: false,
      blog: false,
    },
    settings: {
      showContactForm: true,
      allowDownloadResume: true,
      enableAnalytics: true,
      enableComments: false,
      maintenanceMode: false,
    },
    resumeUrl: "",
    coverImageUrl: "",
    avatarUrl: "",
    isPublished: false,
    isFeatured: false,
  });

  const [newKeyword, setNewKeyword] = useState("");

  const router = useRouter();
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (
    parent: keyof PortfolioFormData,
    field: keyof PortfolioFormData,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const addKeyword = () => {
    if (
      newKeyword.trim() &&
      !formData.metaKeywords.includes(newKeyword.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        metaKeywords: [...prev.metaKeywords, newKeyword.trim()],
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter((k) => k !== keyword),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Portfolio Data:", formData);
    // Handle form submission here
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Portfolio</h1>
          <p className="text-muted-foreground">
            Set up your professional portfolio with customizable themes,
            sections, and settings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Portfolio</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Essential details about your portfolio and professional identity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Portfolio Title *</Label>
              <Input
                id="title"
                placeholder="John Doe - Full Stack Developer"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                placeholder="Passionate about creating amazing web experiences"
                value={formData.subtitle}
                onChange={(e) => updateFormData("subtitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="Write a brief professional summary..."
                value={formData.summary}
                onChange={(e) => updateFormData("summary", e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={formData.visibility}
                  onValueChange={(value) => updateFormData("visibility", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  placeholder="https://johndoe.com"
                  value={formData.customDomain}
                  onChange={(e) =>
                    updateFormData("customDomain", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Design & Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Design & Theme
            </CardTitle>
            <CardDescription>
              Customize the visual appearance and theme of your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={formData.theme}
                onValueChange={(value) => updateFormData("theme", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) =>
                      updateFormData("primaryColor", e.target.value)
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) =>
                      updateFormData("primaryColor", e.target.value)
                    }
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      updateFormData("secondaryColor", e.target.value)
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={formData.secondaryColor}
                    onChange={(e) =>
                      updateFormData("secondaryColor", e.target.value)
                    }
                    placeholder="#1E40AF"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              SEO Settings
            </CardTitle>
            <CardDescription>
              Optimize your portfolio for search engines and social media.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                placeholder="Portfolio - John Doe"
                value={formData.metaTitle}
                onChange={(e) => updateFormData("metaTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                placeholder="Professional portfolio showcasing my work and experience..."
                value={formData.metaDescription}
                onChange={(e) =>
                  updateFormData("metaDescription", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>SEO Keywords</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add keyword"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addKeyword())
                  }
                />
                <Button type="button" onClick={addKeyword} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.metaKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {keyword}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Sections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Portfolio Sections
            </CardTitle>
            <CardDescription>
              Choose which sections to include in your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(formData.sections).map(([section, enabled]) => (
                <div key={section} className="flex items-center space-x-2">
                  <Checkbox
                    id={section}
                    checked={enabled}
                    onCheckedChange={(checked) =>
                      updateNestedField(
                        "sections",
                        section as keyof PortfolioFormData,
                        checked
                      )
                    }
                  />
                  <Label htmlFor={section} className="capitalize">
                    {section}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Portfolio Settings
            </CardTitle>
            <CardDescription>
              Configure functionality and features for your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Feature Settings</Label>
              {Object.entries(formData.settings).map(([setting, enabled]) => (
                <div
                  key={setting}
                  className="flex items-center justify-between"
                >
                  <Label htmlFor={setting} className="capitalize">
                    {setting.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Switch
                    id={setting}
                    checked={enabled}
                    onCheckedChange={(checked) =>
                      updateNestedField(
                        "settings",
                        setting as keyof PortfolioFormData,
                        checked
                      )
                    }
                  />
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-base font-medium">
                Publication Status
              </Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPublished">Published</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your portfolio visible to the public
                    </p>
                  </div>
                  <Switch
                    id="isPublished"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) =>
                      updateFormData("isPublished", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isFeatured">Featured</Label>
                    <p className="text-sm text-muted-foreground">
                      Highlight this portfolio in featured listings
                    </p>
                  </div>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      updateFormData("isFeatured", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media & Files */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Media & Files
            </CardTitle>
            <CardDescription>
              Upload or link to your profile images and resume.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Profile Avatar URL</Label>
              <div className="flex gap-2">
                <Input
                  id="avatarUrl"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatarUrl}
                  onChange={(e) => updateFormData("avatarUrl", e.target.value)}
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="coverImageUrl"
                  placeholder="https://example.com/cover.jpg"
                  value={formData.coverImageUrl}
                  onChange={(e) =>
                    updateFormData("coverImageUrl", e.target.value)
                  }
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume/CV URL</Label>
              <div className="flex gap-2">
                <Input
                  id="resumeUrl"
                  placeholder="https://example.com/resume.pdf"
                  value={formData.resumeUrl}
                  onChange={(e) => updateFormData("resumeUrl", e.target.value)}
                />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Save Draft
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Create Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
