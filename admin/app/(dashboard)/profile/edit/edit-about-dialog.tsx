"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreate } from "@/hooks/use-create";

const aboutSchema = z.object({
  aboutTitle: z.string().min(1, "Title is required"),
  aboutDescription: z.string().min(1, "Description is required"),
  yearsOfExperience: z.number().min(0, "Years of experience must be positive"),
  projectsCompleted: z.number().min(0, "Projects completed must be positive"),
  clientsSatisfied: z.number().min(0, "Clients satisfied must be positive"),
});

type AboutFormData = z.infer<typeof aboutSchema>;

interface EditAboutDialogProps {
  children: React.ReactNode;
  data: AboutFormData;
  onSave: (data: AboutFormData) => void;
}

export function EditAboutDialog({
  children,
  data,
  onSave,
}: EditAboutDialogProps) {
  const [open, setOpen] = useState(false);

  
  const form = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: data,
  });
  
  const { create } = useCreate({ title: "portfolio", url: "/portfolio" });
  const onSubmit = async (formData: AboutFormData) => {
    onSave(formData);
    await create({ data: formData });
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset(data);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
          <DialogDescription>
            Update your personal story and professional statistics.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="aboutTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input placeholder="About Me" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aboutDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell your story..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Use line breaks to separate paragraphs. This will be
                      displayed as your professional story.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Professional Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectsCompleted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Projects Completed</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientsSatisfied"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Satisfied Clients</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
