import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutateInfiniteData<
  T extends { id: string; queryKey: QueryKey; new?: true; remove?: true }
>() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: T & { queryKey: QueryKey; remove?: boolean }) =>
      data,
    onSuccess: (data: T & { queryKey: QueryKey; remove?: boolean }) => {
      const existData = queryClient.getQueryData(data.queryKey) as {
        pages: { total: number; data: T[] }[];
        pageParams: unknown[];
      };

      if (!existData) return;

      let itemExists = false;

      const updatedPages = existData.pages.map((page, index) => {
        const isLastPage = index === existData.pages.length - 1;

        // 1. Handle deletion
        if (data.remove) {
          return {
            total: page.total - 1,
            data: page.data.filter((item) => item.id !== data.id),
          };
        }

        // 2. Check for existing item
        const newData = page.data.map((item) => {
          if (item.id === data.id) {
            itemExists = true;
            return data;
          }
          return item;
        });

        return {
          ...page,
          data: newData,
        };
      });

      // 3. If item was not found in any page, treat as new and insert at top of last page
      if (!itemExists && !data.remove) {
        const lastPageIndex = existData.pages.length - 1;
        updatedPages[lastPageIndex] = {
          total: updatedPages[lastPageIndex].total + 1,
          data: [data, ...updatedPages[lastPageIndex].data],
        };
      }

      queryClient.setQueryData(data.queryKey, {
        ...existData,
        pages: updatedPages,
      });
    },
  });

  const updateData = (data: T & { queryKey: QueryKey; remove?: boolean }) =>
    mutate(data);

  return { updateData };
}
