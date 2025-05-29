import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CreateProjectForm } from "./page";
import { Project } from "@/types/project";

function CreateProjectSheet({
  open,
  onOpenChange,
  project,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Partial<Project>;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full lg:max-w-5xl p-0 overflow-y-auto">
        <CreateProjectForm
          open={open}
          onOpenChange={onOpenChange}
          project={project}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CreateProjectSheet;
