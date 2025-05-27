"use client";

import { apiClient } from "@/lib/api-client";
import {
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Define proper types for the API response
interface ApiResponse<T> {
  data: T[];
  total: number;
}

// Define the hook parameters type
interface UseInfiniteDataParams {
  keys: string;
  size?: number;
  params?: Record<string, any>;
  initialPageParam?: number;
  enabled?: boolean;
}

export function useData<T>({
  keys,
  size = 10,
  params,
  initialPageParam = 0,
}: UseInfiniteDataParams) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce the search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Create a stable query key
  const stableParams = JSON.stringify(params);
  const queryKey = [keys, debouncedSearch, stableParams];

  // Define the query function with proper typing
  const queryFn = async ({ pageParam }: { pageParam: number }) => {
    try {
      const response = await apiClient.get(`/${keys}`, {
        params: {
          page: pageParam,
          size,
          search: debouncedSearch,
          ...params,
        },
      });

      return {
        total: response.total,
        data: response.data,
      };
    } catch (error) {
      console.log("error use infinite data", error);
      throw error;
    }
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
  } = useInfiniteQuery<ApiResponse<T>, Error>({
    retry: false,
    queryKey,
    queryFn: ({ pageParam = 1 }) => queryFn({ pageParam: pageParam as number }),
    initialPageParam: initialPageParam + 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = allPages.reduce(
        (total, page) => total + (page.data?.length || 0),
        0
      );
      return totalItems < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const queryClient = useQueryClient();

  // Mutation to update count directly in the existing query data
  const { mutate } = useMutation({
    mutationFn: async (count: number) => count,
    onSuccess: (countChange: number) => {
      // Get the current infinite query data
      const currentData =
        queryClient.getQueryData<InfiniteData<ApiResponse<T>>>(queryKey);

      if (currentData) {
        // Create a new pages array with updated total counts
        const updatedPages = currentData.pages.map((page) => ({
          ...page,
          total: page.total + countChange, // Update the total in each page
        }));

        // Update the query data with the new pages
        queryClient.setQueryData(queryKey, {
          ...currentData,
          pages: updatedPages,
        });
      }
    },
  });

  // Function to change the count
  const changeCount = useCallback(
    (countChange: number) => {
      mutate(countChange);
    },
    [mutate]
  );

  // Intersection observer for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (isLoading) return;

      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      // Create new observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      // Observe new node
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage, isFetchingNextPage]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Flatten the data for easier consumption
  const flattenedData = data?.pages.flatMap((page) => page.data) || [];

  const throttledRefetch = throttle(
    async (refetchFn: () => Promise<unknown>) => {
      await refetchFn();
      toast("Refreshed successfully");
    },
    5000
  );

  return {
    data: flattenedData,
    loading: isLoading,
    lastElementRef,
    fetchNextPage,
    hasNextPage,
    queryKey: queryKey as QueryKey,
    changeCount: (count: number) => changeCount(count),
    count: data?.pages[0]?.total,
    pages: data?.pages.length || 0,
    isFetchingNextPage,
    params,
    originalData: data,
    refetch: () => throttledRefetch(refetch),
    error,
    setSearch,
    search,
    debouncedSearch,
  };
}
