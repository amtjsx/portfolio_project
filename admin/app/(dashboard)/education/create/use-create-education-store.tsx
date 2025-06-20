import { Education } from "@/types/education";
import { create } from "zustand";

interface CreateEducationStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue: Partial<Education> | undefined;
  setDefaultValue: (defaultValue: Partial<Education> | undefined) => void;
}

export const useCreateEducationStore = create<CreateEducationStore>((set) => ({
  open: false,
  defaultValue: undefined,
  setOpen: (open) => set({ open }),
  setDefaultValue: (defaultValue) => set({ defaultValue }),
}));
