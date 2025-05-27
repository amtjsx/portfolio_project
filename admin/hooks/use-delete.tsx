"use client";

import { apiClient } from "@/lib/api-client";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import pluralize from "pluralize";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useMutateInfiniteData } from "./use-mutate";

interface UseAxiosOptions {
  url: string;
  headers?: Record<string, string>;
  title: string;
  queryKey?: QueryKey;
}

interface UseAxiosReturn<T = any, E = any> {
  error: E | null;
  deleting: boolean;
  remove: (id: string) => Promise<void>;
  cancel: () => void;
}

export function useDelete<T = any, E = any>(
  options: UseAxiosOptions
): UseAxiosReturn<T, E> {
  const { headers = {}, title, queryKey } = options;
  const [error, setError] = useState<E | null>(null);
  const [deleting, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const { updateData } = useMutateInfiniteData();
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache
    .getAll()
    .map((query) => query.queryKey)
    .filter((q) => q.includes(title));
  const cancel = useCallback(() => {
    if (controller) {
      controller.abort();
      setController(null);
    }
  }, [controller]);

  const remove = useCallback(
    async (id: string) => {
      try {
        // Cancel any ongoing requests
        if (controller) {
          controller.abort();
        }

        // Create a new controller for this request
        const newController = new AbortController();
        setController(newController);

        setLoading(true);
        setError(null);

        apiClient.delete(`/${title}/${id}`, {
          signal: newController.signal,
        });

        queryKeys.map((queryKey) => updateData({ queryKey, id, remove: true }));
        queryClient.setQueryData(
          [pluralize.singular(title), "detail", id],
          undefined
        );
        if (queryKey) {
          queryClient.setQueryData(queryKey, undefined);
        }

        toast.success(`${pluralize.singular(title)} has been deleted`);
      } catch (err: any) {
        // Only set error if it's not a cancellation
        toast.error(err.response?.data?.message || err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [headers, controller]
  );

  return { error, deleting, remove, cancel };
}
