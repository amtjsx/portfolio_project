import { Project } from "@/types/project";
import { create } from "zustand";

interface CreateProjectStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue: Partial<Project> | undefined;
  setDefaultValue: (defaultValue: Partial<Project> | undefined) => void;
}

export const useCreateProjectStore = create<CreateProjectStore>((set) => ({
  open: false,
  defaultValue: undefined,
  setOpen: (open) => set({ open }),
  setDefaultValue: (defaultValue) => set({ defaultValue }),
}));
