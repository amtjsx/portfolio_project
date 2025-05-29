"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { QueryKey } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";

const DeleteAlert = dynamic(
  () =>
    import("./delete-alert-dialog").then((mod) => ({
      default: mod.default,
    })),
  {
    loading: () => (
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          {/* Title */}
          <Skeleton className="h-6 w-3/4" />
          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 pt-4">
          {/* Cancel button */}
          <Skeleton className="h-10 w-24" />
          {/* Delete button */}
          <Skeleton className="h-10 w-24 bg-destructive/30" />
        </div>
      </div>
    ),
    ssr: false, // Disable server-side rendering for this component
  }
);

export function DeleteDialog({
  title,
  id,
  open,
  setOpen,
  description,
  onDeleted,
  queryKey,
}: {
  title: string;
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  description?: string;
  onDeleted?: () => void;
  queryKey?: QueryKey;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        {open ? (
          <DeleteAlert
            title={title}
            id={id}
            setOpen={setOpen}
            open={open}
            description={description}
            onDeleted={onDeleted}
          />
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
