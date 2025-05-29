"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/contexts/portfolio-provider";
import { useData } from "@/hooks/use-infinite-data";
import { Skill } from "@/types/skills";
import { SocialLink } from "@/types/social-link";
import {
  Camera,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { EditHeroDialog } from "./edit/edit-hero-dialog";
import { EditProfilePhotoDialog } from "./edit/edit-profile-photo-dialog";

export function PortfolioHero() {
  const { portfolio } = usePortfolio();

  const { data: skills } = useData<Skill>({
    keys: "skills",
  });

  const { data: socialLinks } = useData<SocialLink>({
    keys: "socialLinks",
  });

  const handleSave = (data) => {
    // Here you would typically save to your API
    console.log("Saving hero data:", data);
  };

  const handlePhotoSave = (photoUrl: string) => {
    // Here you would typically upload to your API/storage
    console.log("Saving profile photo:", photoUrl);
  };

  if (!portfolio) {
    return null;
  }

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container max-w-6xl">
        {/* Edit Controls */}
        <div className="absolute top-4 right-4 z-10">
          <EditHeroDialog data={portfolio} onSave={handleSave} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                {portfolio?.status}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {portfolio?.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">
                {portfolio?.subtitle}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {portfolio?.summary.slice(0, 100)}
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill.name} variant="outline">
                  {skill.name}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((link) => (
                <Button key={link.platform} variant="ghost" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.platform === "github" && (
                      <Github className="h-5 w-5" />
                    )}
                    {link.platform === "linkedin" && (
                      <Linkedin className="h-5 w-5" />
                    )}
                    {link.platform === "website" && (
                      <ExternalLink className="h-5 w-5" />
                    )}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src={
                    portfolio.profileImageId
                      ? `${process.env.NEXT_PUBLIC_API_URL}/images/file/${portfolio.profileImageId}`
                      : "/placeholder.svg"
                  }
                  alt={portfolio?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Camera Icon Overlay */}
              <EditProfilePhotoDialog
                currentPhoto={
                  portfolio.profileImageId
                    ? `${process.env.NEXT_PUBLIC_API_URL}/images/file/${portfolio.profileImageId}`
                    : ""
                }
                onSave={handlePhotoSave}
              >
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
              </EditProfilePhotoDialog>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
