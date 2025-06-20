"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/hooks/use-infinite-data";
import {
  BookOpen,
  Camera,
  Code,
  Edit,
  ExternalLink,
  Facebook,
  Gamepad2,
  Github,
  Globe,
  Headphones,
  Heart,
  Instagram,
  Link,
  Linkedin,
  MessageCircle,
  MessageSquare,
  Palette,
  Share2,
  Twitter,
  Users,
  Video,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { EditSocialLinks } from "./edit/edit-social-links";
import { EditSocialLinksDialog } from "./edit/edit-social-links-dialog";

interface SocialLink {
  platform: string;
  url: string;
}

// Comprehensive social platform configuration
const SOCIAL_PLATFORM_CONFIG = {
  linkedin: {
    icon: Linkedin,
    color: "bg-blue-600",
    label: "LinkedIn",
  },
  github: {
    icon: Github,
    color: "bg-gray-900",
    label: "GitHub",
  },
  twitter: {
    icon: Twitter,
    color: "bg-black",
    label: "Twitter/X",
  },
  instagram: {
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-600 to-pink-600",
    label: "Instagram",
  },
  facebook: {
    icon: Facebook,
    color: "bg-blue-600",
    label: "Facebook",
  },
  youtube: {
    icon: Youtube,
    color: "bg-red-600",
    label: "YouTube",
  },
  dribbble: {
    icon: Palette,
    color: "bg-pink-500",
    label: "Dribbble",
  },
  behance: {
    icon: Palette,
    color: "bg-blue-500",
    label: "Behance",
  },
  medium: {
    icon: BookOpen,
    color: "bg-black",
    label: "Medium",
  },
  dev: {
    icon: Code,
    color: "bg-black",
    label: "Dev.to",
  },
  stackoverflow: {
    icon: Code,
    color: "bg-orange-500",
    label: "Stack Overflow",
  },
  codepen: {
    icon: Code,
    color: "bg-black",
    label: "CodePen",
  },
  discord: {
    icon: MessageCircle,
    color: "bg-indigo-600",
    label: "Discord",
  },
  telegram: {
    icon: MessageSquare,
    color: "bg-blue-500",
    label: "Telegram",
  },
  whatsapp: {
    icon: MessageSquare,
    color: "bg-green-500",
    label: "WhatsApp",
  },
  tiktok: {
    icon: Video,
    color: "bg-black",
    label: "TikTok",
  },
  snapchat: {
    icon: Camera,
    color: "bg-yellow-400",
    label: "Snapchat",
  },
  pinterest: {
    icon: Heart,
    color: "bg-red-600",
    label: "Pinterest",
  },
  reddit: {
    icon: Users,
    color: "bg-orange-500",
    label: "Reddit",
  },
  twitch: {
    icon: Gamepad2,
    color: "bg-purple-600",
    label: "Twitch",
  },
  spotify: {
    icon: Headphones,
    color: "bg-green-500",
    label: "Spotify",
  },
  website: {
    icon: Globe,
    color: "bg-gray-600",
    label: "Personal Website",
  },
  blog: {
    icon: BookOpen,
    color: "bg-blue-600",
    label: "Blog",
  },
  other: {
    icon: Link,
    color: "bg-gray-500",
    label: "Other",
  },
} as const;

export function SocialLinksSection() {
  const [editSocialLinks, setEditSocialLinks] = useState(false);
  const { data: socialLinks, loading } = useData<SocialLink>({
    keys: "social",
  });

  const handleSave = (links: SocialLink[]) => {
    // Here you would typically save to your API
    console.log("Saving social links:", links);
  };

  const getPlatformConfig = (platform: string) => {
    const config =
      SOCIAL_PLATFORM_CONFIG[
        platform.toLowerCase() as keyof typeof SOCIAL_PLATFORM_CONFIG
      ];
    return config || SOCIAL_PLATFORM_CONFIG.other;
  };

  const getDisplayName = (platform: string) => {
    const config = getPlatformConfig(platform);
    return config.label;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Social Links</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Connect with me on social media and professional platforms
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => setEditSocialLinks(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Links
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {editSocialLinks ? (
              <EditSocialLinks
                data={socialLinks}
                onSave={handleSave}
                setOpen={setEditSocialLinks}
              />
            ) : socialLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {socialLinks.map((link, index) => {
                  const config = getPlatformConfig(link.platform);
                  const IconComponent = config.icon;

                  return (
                    <div
                      key={index}
                      className="group flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:shadow-md"
                    >
                      <div
                        className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-200`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">
                          {getDisplayName(link.platform)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {link.url}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:bg-primary/10"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Share2 className="h-8 w-8" />
                </div>
                <p className="text-lg font-medium mb-2">
                  No social links added yet
                </p>
                <p className="text-sm mb-4">
                  Add your social media and professional profile links to
                  connect with others
                </p>
                <EditSocialLinksDialog data={socialLinks} onSave={handleSave}>
                  <Button variant="outline" className="mt-2">
                    <Share2 className="mr-2 h-4 w-4" />
                    Add Social Links
                  </Button>
                </EditSocialLinksDialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
