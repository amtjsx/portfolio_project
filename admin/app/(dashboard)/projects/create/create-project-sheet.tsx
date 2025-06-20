import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CreateProjectForm } from "./page";
import { useCreateProjectStore } from "./use-create-project-store";

function CreateProjectSheet() {
  const { open, setOpen, defaultValue } = useCreateProjectStore();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full lg:max-w-5xl p-0 overflow-y-auto">
        <CreateProjectForm
          open={open}
          onOpenChange={setOpen}
          project={defaultValue}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CreateProjectSheet;
