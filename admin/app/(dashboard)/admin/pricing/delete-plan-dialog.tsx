"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingInterval: "month" | "year" | "one-time";
  trialPeriodDays: number;
  features: string[];
  limits: {
    portfolios: number;
    projects: number;
    storage: number;
    customDomain: boolean;
    analytics: boolean;
    removeWatermark: boolean;
    prioritySupport: boolean;
    [key: string]: any;
  };
  tier: "free" | "basic" | "pro" | "enterprise" | "custom";
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  isCustom: boolean;
  discountPercentage: number;
  originalPrice: number | null;
  discountValidUntil: Date | null;
  externalPlanId: string | null;
  paymentProvider: string | null;
  metadata: any;
};

interface DeletePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PricingPlan | null;
  onConfirm: () => void;
}

export function DeletePlanDialog({
  open,
  onOpenChange,
  plan,
  onConfirm,
}: DeletePlanDialogProps) {
  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Pricing Plan
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the "{plan.name}" pricing plan? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2">
            This will permanently delete:
          </h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• The pricing plan "{plan.name}"</li>
            <li>• All associated features and limits</li>
            <li>• Any discount configurations</li>
            <li>• External payment provider connections</li>
          </ul>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
