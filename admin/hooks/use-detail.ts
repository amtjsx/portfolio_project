"use client";
import { apiClient } from "@/lib/api-client";
import { QueryKey, useQuery } from "@tanstack/react-query";
import pluralize from "pluralize";

const queryFn = async <T>(
  id: string | undefined,
  title: string,
  params: any
): Promise<T> => {
  try {
    const response = await apiClient.get(id ? `/${title}/${id}` : `/${title}`, {
      params,
    });

    return response;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export function useDetail<T>({
  id,
  title,
  params,
  keys = [],
}: {
  id?: string;
  title: string;
  params?: any;
  keys?: QueryKey;
}) {
  const queryKey: QueryKey = [pluralize.singular(title), "detail", id, ...keys];

  const data = useQuery({
    retry: false,
    queryKey,
    queryFn: () => queryFn<T>(id, title, params),
  });

  return { ...data, queryKey };
}
