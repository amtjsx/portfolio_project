"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import { JSX, useEffect, useState } from "react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: JSX.Element;
  isActive: boolean;
  position: "header" | "floating" | "footer" | "contact" | "all";
}

export function SocialLinksManager() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      id: "github",
      platform: "GitHub",
      url: "github.com/alexmorgan",
      icon: <Github className="h-5 w-5" />,
      isActive: true,
      position: "all",
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      url: "linkedin.com/in/alexmorgan",
      icon: <Linkedin className="h-5 w-5" />,
      isActive: true,
      position: "all",
    },
    {
      id: "facebook",
      platform: "Facebook",
      url: "facebook.com/alexmorgan",
      icon: <Facebook className="h-5 w-5" />,
      isActive: true,
      position: "all",
    },
    {
      id: "twitter",
      platform: "X (Twitter)",
      url: "twitter.com/alexmorgan",
      icon: <Twitter className="h-5 w-5" />,
      isActive: true,
      position: "all",
    },
    {
      id: "email",
      platform: "Email",
      url: "alex.morgan@example.com",
      icon: <Mail className="h-5 w-5" />,
      isActive: true,
      position: "all",
    },
    {
      id: "instagram",
      platform: "Instagram",
      url: "instagram.com/alexmorgan",
      icon: <Instagram className="h-5 w-5" />,
      isActive: false,
      position: "all",
    },
    {
      id: "youtube",
      platform: "YouTube",
      url: "",
      icon: <Youtube className="h-5 w-5" />,
      isActive: false,
      position: "all",
    },
    {
      id: "website",
      platform: "Personal Website",
      url: "",
      icon: <Globe className="h-5 w-5" />,
      isActive: false,
      position: "all",
    },
  ]);

  const [displayOption, setDisplayOption] = useState<"all" | "active">("all");
  const [defaultVisibility, setDefaultVisibility] = useState(true);

  const handleLinkChange = (id: string, value: string) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, url: value } : link
      )
    );
  };

  const handleToggleActive = (id: string) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, isActive: !link.isActive } : link
      )
    );
  };

  const handlePositionChange = (
    id: string,
    position: SocialLink["position"]
  ) => {
    setSocialLinks(
      socialLinks.map((link) => (link.id === id ? { ...link, position } : link))
    );
  };

  const filteredLinks =
    displayOption === "all"
      ? socialLinks
      : socialLinks.filter((link) => link.isActive);

  const saveDefaultVisibility = () => {
    localStorage.setItem("socialBarVisible", defaultVisibility.toString());
    // This would typically be saved to a database in a real application
  };

  // Load the default visibility from localStorage when the component mounts
  useEffect(() => {
    const savedVisibility = localStorage.getItem("socialBarVisible");
    if (savedVisibility !== null) {
      setDefaultVisibility(savedVisibility === "true");
    }
  }, []);

  return (
    <div className="space-y-4">
      {filteredLinks.map((link) => (
        <div
          key={link.id}
          className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {link.icon}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label htmlFor={`social-${link.id}`} className="font-medium">
                {link.platform}
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {link.isActive ? "Active" : "Inactive"}
                </span>
                <Switch
                  checked={link.isActive}
                  onCheckedChange={() => handleToggleActive(link.id)}
                  aria-label={`Toggle ${link.platform} visibility`}
                />
              </div>
            </div>
            <Input
              id={`social-${link.id}`}
              value={link.url}
              onChange={(e) => handleLinkChange(link.id, e.target.value)}
              placeholder={`Enter your ${link.platform} URL or username`}
              disabled={!link.isActive}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
