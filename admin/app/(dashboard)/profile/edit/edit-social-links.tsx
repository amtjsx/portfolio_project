"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { usePortfolio } from "@/contexts/portfolio-provider";
import { useCreate } from "@/hooks/use-create";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// Social platform options based on backend enum
export const SOCIAL_PLATFORMS = [
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
  platform: z.enum(
    SOCIAL_PLATFORMS.map((p) => p.value) as [string, ...string[]],
    {
      required_error: "Please select a platform",
    }
  ),
  url: z.string(),
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
  data: SocialLink[];
  onSave: (data: SocialLink[]) => void;
  setOpen: (open: boolean) => void;
}

export function EditSocialLinks({
  data,
  onSave,
  setOpen,
}: EditSocialLinksDialogProps) {
  const form = useForm<SocialLinksFormData>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      links: data.length > 0 ? data : [{ platform: "", url: "" }],
    },
  });

  const { portfolio } = usePortfolio();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const { create } = useCreate({ title: "portfolio", url: "/portfolio" });
  const onSubmit = async (formData: SocialLinksFormData) => {
    onSave(formData.links);
    await create({ data: { socialLinks: formData.links, id: portfolio?.id } });
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
    <div className="space-y-4">
      <ScrollArea className="max-h-[60vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-4"
          >
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name={`links.${index}.platform`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SOCIAL_PLATFORMS.map((platform) => (
                              <SelectItem
                                key={platform.value}
                                value={platform.value}
                              >
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
                        <FormControl>
                          <Input placeholder="Username" type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </form>
        </Form>
      </ScrollArea>

      <div className="flex justify-between items-center p-4 pt-0">
        <Button type="button" variant="outline" onClick={addLink}>
          <Plus className="mr-2 h-4 w-4" />
          Add Social Link
        </Button>
        <div className="flex gap-2 justify-end">
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
        </div>
      </div>
    </div>
  );
}
