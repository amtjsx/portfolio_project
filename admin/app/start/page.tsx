"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
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
import {
  Eye,
  FileText,
  Globe,
  ImageIcon,
  Palette,
  Save,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

interface PortfolioFormData {
  title: string;
  subtitle: string;
  summary: string;
  email: string;
  phoneNumber: string;
  location: string;
  theme: "modern" | "classic" | "minimal" | "creative";
  primaryColor: string;
  secondaryColor: string;
  visibility: "public" | "private" | "unlisted";
  customDomain: string | undefined;
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
  isPublished: boolean;
  isFeatured: boolean;
}

export default function PortfolioForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: "",
    subtitle: "",
    summary: "",
    email: "",
    phoneNumber: "",
    location: "",
    theme: "modern",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    visibility: "public",
    customDomain: undefined,
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
    isPublished: false,
    isFeatured: false,
  });

  const [newKeyword, setNewKeyword] = useState("");

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent as keyof PortfolioFormData], [field]: value },
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

  const { create } = useCreate({
    title: "portfolio",
    url: "/portfolio",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Portfolio data:", formData);
    setLoading(true);
    await create({ data: formData });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Portfolio
          </h1>
          <p className="text-lg text-gray-600">
            Build your professional portfolio with customizable sections and
            themes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-6 w-6" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Set up the fundamental details of your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Portfolio Title *</Label>
                  <Input
                    id="title"
                    placeholder="John Doe - Full Stack Developer"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    required
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) =>
                      updateFormData("visibility", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Private
                        </div>
                      </SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="123-456-7890"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="New York, USA"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
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
                  placeholder="Tell visitors about your professional background, skills, and what makes you unique..."
                  value={formData.summary}
                  onChange={(e) => updateFormData("summary", e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  placeholder="https://yourname.com"
                  value={formData.customDomain}
                  onChange={(e) =>
                    updateFormData("customDomain", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">
                      Publication Status
                    </Label>
                    <p className="text-sm text-gray-500">
                      Make your portfolio visible to the public
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublished}
                    onCheckedChange={(checked) =>
                      updateFormData("isPublished", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">
                      Featured Portfolio
                    </Label>
                    <p className="text-sm text-gray-500">
                      Highlight this portfolio in featured sections
                    </p>
                  </div>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      updateFormData("isFeatured", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design & Theme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Palette className="h-6 w-6" />
                Design & Theme
              </CardTitle>
              <CardDescription>
                Customize the visual appearance of your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select
                  value={formData.theme}
                  onValueChange={(value) => updateFormData("theme", value)}
                >
                  <SelectTrigger className="w-full lg:w-1/2">
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) =>
                        updateFormData("primaryColor", e.target.value)
                      }
                      className="w-20 h-12 p-1 border rounded cursor-pointer"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) =>
                        updateFormData("primaryColor", e.target.value)
                      }
                      placeholder="#3B82F6"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-3">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) =>
                        updateFormData("secondaryColor", e.target.value)
                      }
                      className="w-20 h-12 p-1 border rounded cursor-pointer"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) =>
                        updateFormData("secondaryColor", e.target.value)
                      }
                      placeholder="#1E40AF"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Media Assets
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">
                        Upload profile image
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">
                        Upload cover image
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Resume/CV</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <FileText className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">
                        Upload resume
                      </p>
                      <p className="text-xs text-gray-400">PDF up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Search className="h-6 w-6" />
                SEO Settings
              </CardTitle>
              <CardDescription>
                Optimize your portfolio for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    placeholder="John Doe - Full Stack Developer Portfolio"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      updateFormData("metaTitle", e.target.value)
                    }
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
                    <Button
                      type="button"
                      onClick={addKeyword}
                      variant="outline"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Experienced full stack developer specializing in React, Node.js, and modern web technologies..."
                  value={formData.metaDescription}
                  onChange={(e) =>
                    updateFormData("metaDescription", e.target.value)
                  }
                  rows={3}
                  className="resize-none"
                />
              </div>

              {formData.metaKeywords.length > 0 && (
                <div className="space-y-2">
                  <Label>Current Keywords</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.metaKeywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {keyword}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Portfolio Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="h-6 w-6" />
                Portfolio Sections
              </CardTitle>
              <CardDescription>
                Choose which sections to include in your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(formData.sections).map(([section, enabled]) => (
                  <div
                    key={section}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <Label className="capitalize font-medium text-base cursor-pointer">
                        {section}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        {section === "about" && "Personal information and bio"}
                        {section === "skills" && "Technical and soft skills"}
                        {section === "experience" &&
                          "Work experience and career history"}
                        {section === "education" && "Educational background"}
                        {section === "projects" &&
                          "Portfolio projects and work samples"}
                        {section === "contact" &&
                          "Contact information and form"}
                        {section === "testimonials" &&
                          "Client and colleague testimonials"}
                        {section === "blog" && "Blog posts and articles"}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        updateNestedField("sections", section, checked)
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings className="h-6 w-6" />
                Portfolio Settings
              </CardTitle>
              <CardDescription>
                Configure functionality and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(formData.settings).map(([setting, enabled]) => (
                  <div
                    key={setting}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <Label className="font-medium text-base cursor-pointer">
                        {setting === "showContactForm" && "Show Contact Form"}
                        {setting === "allowDownloadResume" &&
                          "Allow Resume Download"}
                        {setting === "enableAnalytics" && "Enable Analytics"}
                        {setting === "enableComments" && "Enable Comments"}
                        {setting === "maintenanceMode" && "Maintenance Mode"}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        {setting === "showContactForm" &&
                          "Display a contact form for visitors"}
                        {setting === "allowDownloadResume" &&
                          "Let visitors download your resume"}
                        {setting === "enableAnalytics" &&
                          "Track portfolio visits and engagement"}
                        {setting === "enableComments" &&
                          "Allow comments on portfolio sections"}
                        {setting === "maintenanceMode" &&
                          "Temporarily disable portfolio access"}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        updateNestedField("settings", setting, checked)
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t-2">
            <Button
              type="submit"
              size="lg"
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Save className="h-5 w-5" />
              Create Portfolio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
