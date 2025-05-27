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

type Feature = {
  id: string;
  name: string;
  description: string;
  key: string;
  category:
    | "core"
    | "branding"
    | "analytics"
    | "support"
    | "storage"
    | "advanced";
  type: "boolean" | "numeric" | "text";
  icon: string;
  sortOrder: number;
  isActive: boolean;
  isPremium: boolean;
  metadata: any;
};

interface DeleteFeatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: Feature | null;
  onConfirm: () => void;
}

export function DeleteFeatureDialog({
  open,
  onOpenChange,
  feature,
  onConfirm,
}: DeleteFeatureDialogProps) {
  if (!feature) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Feature
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the "{feature.name}" feature? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2">
            This will permanently delete:
          </h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>
              • The feature "{feature.name}" (key: {feature.key})
            </li>
            <li>• All associations with pricing plans</li>
            <li>• Any metadata and configuration</li>
            <li>• Feature usage tracking data</li>
          </ul>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Feature
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
