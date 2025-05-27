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
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react";
import { PricingPlanDialog } from "./pricing-plan-dialog";
import { DeletePlanDialog } from "./delete-plan-dialog";

// Mock data based on your model
const mockPricingPlans = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Free",
    description: "Perfect for getting started",
    price: 0,
    currency: "USD",
    billingInterval: "month" as const,
    trialPeriodDays: 0,
    features: ["1 Portfolio", "Basic Templates", "Community Support"],
    limits: {
      portfolios: 1,
      projects: 3,
      storage: 50,
      customDomain: false,
      analytics: false,
      removeWatermark: false,
      prioritySupport: false,
    },
    tier: "free" as const,
    sortOrder: 1,
    isActive: true,
    isFeatured: false,
    isCustom: false,
    discountPercentage: 0,
    originalPrice: null,
    discountValidUntil: null,
    externalPlanId: null,
    paymentProvider: null,
    metadata: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    name: "Pro",
    description: "Perfect for professionals",
    price: 1999,
    currency: "USD",
    billingInterval: "month" as const,
    trialPeriodDays: 14,
    features: [
      "Unlimited Portfolios",
      "Premium Templates",
      "Custom Domain",
      "Analytics",
      "Priority Support",
    ],
    limits: {
      portfolios: -1,
      projects: 100,
      storage: 1000,
      customDomain: true,
      analytics: true,
      removeWatermark: true,
      prioritySupport: true,
    },
    tier: "pro" as const,
    sortOrder: 2,
    isActive: true,
    isFeatured: true,
    isCustom: false,
    discountPercentage: 20,
    originalPrice: 2499,
    discountValidUntil: new Date("2024-12-31"),
    externalPlanId: "price_1234567890",
    paymentProvider: "stripe",
    metadata: { popular: true },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    name: "Enterprise",
    description: "For large organizations",
    price: 9999,
    currency: "USD",
    billingInterval: "month" as const,
    trialPeriodDays: 30,
    features: [
      "Everything in Pro",
      "White Label",
      "API Access",
      "Dedicated Support",
      "Custom Integrations",
    ],
    limits: {
      portfolios: -1,
      projects: -1,
      storage: -1,
      customDomain: true,
      analytics: true,
      removeWatermark: true,
      prioritySupport: true,
    },
    tier: "enterprise" as const,
    sortOrder: 3,
    isActive: true,
    isFeatured: false,
    isCustom: false,
    discountPercentage: 0,
    originalPrice: null,
    discountValidUntil: null,
    externalPlanId: "price_enterprise_123",
    paymentProvider: "stripe",
    metadata: { enterprise: true },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

type PricingPlan = (typeof mockPricingPlans)[0];

export default function PricingAdminPage() {
  const [plans, setPlans] = useState<PricingPlan[]>(mockPricingPlans);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<PricingPlan | null>(null);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price / 100);
  };

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setIsDialogOpen(true);
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleDeletePlan = (plan: PricingPlan) => {
    setPlanToDelete(plan);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleActive = (planId: string) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
      )
    );
  };

  const handleToggleFeatured = (planId: string) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, isFeatured: !plan.isFeatured } : plan
      )
    );
  };

  const handleSavePlan = (planData: Partial<PricingPlan>) => {
    if (selectedPlan) {
      // Update existing plan
      setPlans(
        plans.map((plan) =>
          plan.id === selectedPlan.id
            ? { ...plan, ...planData, updatedAt: new Date() }
            : plan
        )
      );
    } else {
      // Create new plan
      const newPlan: PricingPlan = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...planData,
      } as PricingPlan;
      setPlans([...plans, newPlan]);
    }
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter((plan) => plan.id !== planToDelete.id));
      setIsDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "free":
        return "secondary";
      case "basic":
        return "default";
      case "pro":
        return "default";
      case "enterprise":
        return "destructive";
      case "custom":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pricing Plans</h1>
          <p className="text-muted-foreground">
            Manage your pricing plans and features
          </p>
        </div>
        <Button onClick={handleCreatePlan}>
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </Button>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`${!plan.isActive ? "opacity-60" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <Badge variant={getTierBadgeVariant(plan.tier)}>
                      {plan.tier}
                    </Badge>
                    {plan.isFeatured && (
                      <Badge
                        variant="outline"
                        className="text-yellow-600 border-yellow-600"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {!plan.isActive && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {plan.discountPercentage > 0 && plan.originalPrice ? (
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground line-through">
                          {formatPrice(plan.originalPrice, plan.currency)}
                        </div>
                        <div className="flex items-center gap-2">
                          {formatPrice(plan.price, plan.currency)}
                          <Badge variant="destructive" className="text-xs">
                            -{plan.discountPercentage}%
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      formatPrice(plan.price, plan.currency)
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per {plan.billingInterval}
                  </div>
                  {plan.trialPeriodDays > 0 && (
                    <div className="text-xs text-green-600 mt-1">
                      {plan.trialPeriodDays} day trial
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="text-sm space-y-1">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        • {feature}
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-muted-foreground">
                        • +{plan.features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Limits</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Portfolios:</span>
                      <span>
                        {plan.limits.portfolios === -1
                          ? "Unlimited"
                          : plan.limits.portfolios}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects:</span>
                      <span>
                        {plan.limits.projects === -1
                          ? "Unlimited"
                          : plan.limits.projects}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span>
                        {plan.limits.storage === -1
                          ? "Unlimited"
                          : `${plan.limits.storage}MB`}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(plan.id)}
                    >
                      {plan.isActive ? (
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
                      onClick={() => handleToggleFeatured(plan.id)}
                    >
                      {plan.isFeatured ? (
                        <>
                          <StarOff className="h-4 w-4 mr-1" />
                          Unfeature
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-1" />
                          Feature
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePlan(plan)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PricingPlanDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        plan={selectedPlan}
        onSave={handleSavePlan}
      />

      <DeletePlanDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        plan={planToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
