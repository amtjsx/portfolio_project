"use client";

import { apiClient } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import pluralize from "pluralize";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useMutateInfiniteData } from "./use-mutate";

interface UseAxiosOptions {
  url: string;
  headers?: Record<string, string>;
  title: string;
  update?: boolean;
}

interface AxiosRequestConfig {
  data?: any;
}

interface UseAxiosReturn<T = any, E = any> {
  error: E | null;
  creating: boolean;
  create: (
    config: AxiosRequestConfig & { message?: string }
  ) => Promise<T | undefined>;
  cancel: () => void;
}

export function useCreate<T = any, E = any>(
  options: UseAxiosOptions
): UseAxiosReturn<T, E> {
  const { url, title, update = true } = options;
  const [error, setError] = useState<E | null>(null);
  const [creating, setCreating] = useState(false);
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

  const create = useCallback(
    async (
      config: AxiosRequestConfig & { message?: string }
    ): Promise<T | undefined> => {
      try {
        // Cancel any ongoing requests
        if (controller) {
          controller.abort();
        }

        // Create a new controller for this request
        const newController = new AbortController();
        setController(newController);

        setCreating(true);
        setError(null);

        const patch = config?.data?.id || config?.data?.edit;

        console.log("patch", config.data);

        let response;
        if (patch) {
          response = await apiClient.patch(`${url}/${patch}`, config.data);
        } else {
          response = await apiClient.post(`${url}`, config.data);
        }
        if (update) {
          queryKeys.map((queryKey) =>
            updateData({
              queryKey,
              ...response,
              new: patch ? false : true,
            })
          );
          queryClient.setQueryData(
            [pluralize.singular(title), "detail", response.id],
            response
          );
        }

        toast.success(
          `${pluralize.singular(title)} ${
            (response.name || response.first_name) ?? ""
          } has been ${patch ? "updated" : "created"}`,
          { description: config.message }
        );
        return response as T;
      } catch (err: any) {
        toast.error(err.response?.message || err.message, {
          className: "bg-red-500",
        });
        throw err;
      } finally {
        setCreating(false);
      }
    },
    [url, controller]
  );

  return { error, creating, create, cancel };
}
