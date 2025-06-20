"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreate } from "@/hooks/use-create";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// Social platform options based on backend enum
const SOCIAL_PLATFORMS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter/X" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "dribbble", label: "Dribbble" },
  { value: "behance", label: "Behance" },
  { value: "medium", label: "Medium" },
  { value: "dev", label: "Dev.to" },
  { value: "stackoverflow", label: "Stack Overflow" },
  { value: "codepen", label: "CodePen" },
  { value: "discord", label: "Discord" },
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "tiktok", label: "TikTok" },
  { value: "snapchat", label: "Snapchat" },
  { value: "pinterest", label: "Pinterest" },
  { value: "reddit", label: "Reddit" },
  { value: "twitch", label: "Twitch" },
  { value: "spotify", label: "Spotify" },
  { value: "website", label: "Personal Website" },
  { value: "blog", label: "Blog" },
  { value: "other", label: "Other" },
] as const;

const socialLinkSchema = z.object({
  platform: z.enum(SOCIAL_PLATFORMS.map(p => p.value) as [string, ...string[]], {
    required_error: "Please select a platform",
  }),
  url: z.string().url("Please enter a valid URL"),
});

const socialLinksSchema = z.object({
  links: z.array(socialLinkSchema),
});

type SocialLinksFormData = z.infer<typeof socialLinksSchema>;

interface SocialLink {
  platform: string;
  url: string;
}

interface EditSocialLinksDialogProps {
  children: React.ReactNode;
  data: SocialLink[];
  onSave: (data: SocialLink[]) => void;
}

export function EditSocialLinksDialog({
  children,
  data,
  onSave,
}: EditSocialLinksDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<SocialLinksFormData>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      links: data.length > 0 ? data : [{ platform: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const { create } = useCreate({ title: "portfolio", url: "/portfolio" });
  const onSubmit = async (formData: SocialLinksFormData) => {
    onSave(formData.links);
    await create({ data: formData.links });
    setOpen(false);
  };

  const addLink = () => {
    append({ platform: "", url: "" });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset({
        links: data.length > 0 ? data : [{ platform: "", url: "" }],
      });
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Social Links</DialogTitle>
          <DialogDescription>
            Add or update your social media and professional profile links.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-3 p-4 border rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name={`links.${index}.platform`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SOCIAL_PLATFORMS.map((platform) => (
                                <SelectItem key={platform.value} value={platform.value}>
                                  {platform.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`links.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
                              type="url"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                      className="shrink-0 mt-6"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addLink}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Social Link
              </Button>
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
