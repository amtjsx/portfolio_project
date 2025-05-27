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
import { Plus, Edit, Trash2, Eye, EyeOff, Crown } from "lucide-react";
import { FeatureDialog } from "./feature-dialog";
import { DeleteFeatureDialog } from "./delete-feature-dialog";

// Mock features data based on your Feature model
const mockFeatures = [
  {
    id: "feat-1",
    name: "Custom Domain",
    description: "Connect your own domain to your portfolio",
    key: "custom_domain",
    category: "branding" as const,
    type: "boolean" as const,
    icon: "globe",
    sortOrder: 1,
    isActive: true,
    isPremium: true,
    metadata: { tooltip: "Requires DNS configuration" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "feat-2",
    name: "Analytics Dashboard",
    description: "Detailed analytics and visitor insights",
    key: "analytics_dashboard",
    category: "analytics" as const,
    type: "boolean" as const,
    icon: "bar-chart",
    sortOrder: 2,
    isActive: true,
    isPremium: true,
    metadata: { integrations: ["google-analytics", "mixpanel"] },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "feat-3",
    name: "Priority Support",
    description: "24/7 priority customer support",
    key: "priority_support",
    category: "support" as const,
    type: "boolean" as const,
    icon: "headphones",
    sortOrder: 3,
    isActive: true,
    isPremium: true,
    metadata: { responseTime: "< 2 hours" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "feat-4",
    name: "Storage Limit",
    description: "Maximum storage space in MB",
    key: "storage_limit",
    category: "storage" as const,
    type: "numeric" as const,
    icon: "hard-drive",
    sortOrder: 4,
    isActive: true,
    isPremium: false,
    metadata: { unit: "MB", min: 10, max: 10000 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "feat-5",
    name: "Portfolio Limit",
    description: "Maximum number of portfolios",
    key: "portfolio_limit",
    category: "core" as const,
    type: "numeric" as const,
    icon: "folder",
    sortOrder: 5,
    isActive: true,
    isPremium: false,
    metadata: { min: 1, max: 100 },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "feat-6",
    name: "Remove Watermark",
    description: "Remove platform branding from your portfolio",
    key: "remove_watermark",
    category: "branding" as const,
    type: "boolean" as const,
    icon: "eye-off",
    sortOrder: 6,
    isActive: true,
    isPremium: true,
    metadata: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "feat-7",
    name: "API Access",
    description: "Programmatic access to your portfolio data",
    key: "api_access",
    category: "advanced" as const,
    type: "text" as const,
    icon: "code",
    sortOrder: 7,
    isActive: false,
    isPremium: true,
    metadata: { rateLimit: "1000 requests/hour" },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

type Feature = (typeof mockFeatures)[0];

export default function FeaturesAdminPage() {
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState<Feature | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "core",
    "branding",
    "analytics",
    "support",
    "storage",
    "advanced",
  ];

  const handleCreateFeature = () => {
    setSelectedFeature(null);
    setIsDialogOpen(true);
  };

  const handleEditFeature = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsDialogOpen(true);
  };

  const handleDeleteFeature = (feature: Feature) => {
    setFeatureToDelete(feature);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleActive = (featureId: string) => {
    setFeatures(
      features.map((feature) =>
        feature.id === featureId
          ? { ...feature, isActive: !feature.isActive }
          : feature
      )
    );
  };

  const handleTogglePremium = (featureId: string) => {
    setFeatures(
      features.map((feature) =>
        feature.id === featureId
          ? { ...feature, isPremium: !feature.isPremium }
          : feature
      )
    );
  };

  const handleSaveFeature = (featureData: Partial<Feature>) => {
    if (selectedFeature) {
      // Update existing feature
      setFeatures(
        features.map((feature) =>
          feature.id === selectedFeature.id
            ? { ...feature, ...featureData, updatedAt: new Date() }
            : feature
        )
      );
    } else {
      // Create new feature
      const newFeature: Feature = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...featureData,
      } as Feature;
      setFeatures([...features, newFeature]);
    }
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (featureToDelete) {
      setFeatures(
        features.filter((feature) => feature.id !== featureToDelete.id)
      );
      setIsDeleteDialogOpen(false);
      setFeatureToDelete(null);
    }
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "core":
        return "default";
      case "branding":
        return "secondary";
      case "analytics":
        return "outline";
      case "support":
        return "destructive";
      case "storage":
        return "default";
      case "advanced":
        return "secondary";
      default:
        return "default";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "core":
        return "⚡";
      case "branding":
        return "🎨";
      case "analytics":
        return "📊";
      case "support":
        return "🎧";
      case "storage":
        return "💾";
      case "advanced":
        return "🚀";
      default:
        return "📦";
    }
  };

  const filteredFeatures = features
    .filter(
      (feature) =>
        selectedCategory === "all" || feature.category === selectedCategory
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Features</h1>
          <p className="text-muted-foreground">
            Manage features available in your pricing plans
          </p>
        </div>
        <Button onClick={handleCreateFeature}>
          <Plus className="h-4 w-4 mr-2" />
          Create Feature
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category !== "all" && (
              <span className="mr-1">{getCategoryIcon(category)}</span>
            )}
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredFeatures.map((feature) => (
          <Card
            key={feature.id}
            className={`${!feature.isActive ? "opacity-60" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{feature.name}</CardTitle>
                    <Badge variant={getCategoryBadgeVariant(feature.category)}>
                      <span className="mr-1">
                        {getCategoryIcon(feature.category)}
                      </span>
                      {feature.category}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {feature.type}
                    </Badge>
                    {feature.isPremium && (
                      <Badge
                        variant="outline"
                        className="text-yellow-600 border-yellow-600"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    {!feature.isActive && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Sort: {feature.sortOrder}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Key:{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      {feature.key}
                    </code>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  {feature.icon && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Icon:</span>{" "}
                      {feature.icon}
                    </div>
                  )}
                  {feature.metadata && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Metadata:</span>
                      <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs">
                        {JSON.stringify(feature.metadata)}
                      </code>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditFeature(feature)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleActive(feature.id)}
                  >
                    {feature.isActive ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePremium(feature.id)}
                  >
                    <Crown className="h-4 w-4 mr-1" />
                    {feature.isPremium ? "Remove Premium" : "Make Premium"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFeature(feature)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FeatureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        feature={selectedFeature}
        onSave={handleSaveFeature}
      />

      <DeleteFeatureDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        feature={featureToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
