"use client";

import type React from "react";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Edit } from "lucide-react";
import { useCreate } from "@/hooks/use-create";
import { Portfolio } from "@/types/portfolio";

const heroSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  status: z.string().min(1, "Status is required"),
  featuredSkills: z.array(z.string()).min(1, "At least one skill is required"),
});

type HeroFormData = z.infer<typeof heroSchema>;

interface EditHeroDialogProps {
  data: Partial<Portfolio>;
  onSave: (data: HeroFormData) => void;
}

export function EditHeroDialog({
  data,
  onSave,
}: EditHeroDialogProps) {
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: data,
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "featuredSkills",
  });

  const { create } = useCreate({ title: "portfolio", url: "/portfolio" });
  const onSubmit = async (formData: HeroFormData) => {
    onSave(formData);
    await create({ data: formData });
    setOpen(false);
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !form.getValues("featuredSkills").includes(newSkill.trim())
    ) {
      appendSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset(data);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit Hero
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Hero Section</DialogTitle>
          <DialogDescription>
            Update your personal information and featured skills.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Senior Full Stack Developer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Status</FormLabel>
                      <FormControl>
                        <Input placeholder="Available for hire" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your current availability status
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell your professional story..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description of your background and expertise
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Featured Skills */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Featured Skills</h3>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {skillFields.map((field, index) => (
                      <Badge
                        key={field.id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <FormField
                          control={form.control}
                          name={`featuredSkills.${index}`}
                          render={({ field }) => <span>{field.value}</span>}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeSkill(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                    />
                    <Button type="button" variant="outline" onClick={addSkill}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <FormMessage>
                  {form.formState.errors.featuredSkills?.message}
                </FormMessage>
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
