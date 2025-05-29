"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface ProjectDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: string;
    title: string;
    status: string;
  };
  onConfirm: () => Promise<void>;
}

export function ProjectDeleteDialog({
  open,
  onOpenChange,
  project,
  onConfirm,
}: ProjectDeleteDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
      setConfirmText("");
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setConfirmText("");
  };

  const isConfirmValid = confirmText === project.title;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-3">
            <p>
              Are you sure you want to delete <strong>"{project.title}"</strong>
              ? This action cannot be undone.
            </p>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <h4 className="font-medium text-destructive mb-2">
                This will permanently:
              </h4>
              <ul className="text-sm text-destructive/80 space-y-1">
                <li>• Delete all project data and files</li>
                <li>• Remove project from all portfolios</li>
                <li>• Delete associated images and documents</li>
                <li>• Remove project from search results</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-text" className="text-sm font-medium">
                Type{" "}
                <Badge variant="outline" className="mx-1">
                  {project.title}
                </Badge>{" "}
                to confirm:
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={`Type "${project.title}" here`}
                className="font-mono"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmValid || isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete Project"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
