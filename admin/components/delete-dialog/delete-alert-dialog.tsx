"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDelete } from "@/hooks/use-delete";
import type { QueryKey } from "@tanstack/react-query";

interface DeleteAlertProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  id: string;
  queryKey?: QueryKey;
  onDeleted?: () => void;
  onClick?: () => void;
}

export default function DeleteAlertDialog({
  open,
  setOpen,
  title,
  description,
  id,
  queryKey,
  onDeleted,
  onClick,
}: DeleteAlertProps) {
  const { deleting, remove } = useDelete({
    title: `${title}`,
    url: `/${title}`,
    queryKey,
  });

  const handleDelete = async () => {
    await remove(id);
    onDeleted?.();
    setOpen(false);
  };

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {title}</AlertDialogTitle>
        <AlertDialogDescription>
          {description || "Are you sure you want to delete this?"}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          disabled={deleting}
          onClick={onClick || handleDelete}
          className="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-destructive/60 disabled:opacity-50"
          aria-label="Confirm deletion"
        >
          {deleting ? "Deleting..." : "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
