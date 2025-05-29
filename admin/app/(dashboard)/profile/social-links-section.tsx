"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/hooks/use-infinite-data";
import { Edit, ExternalLink, Github, Linkedin } from "lucide-react";
import { EditSocialLinksDialog } from "./edit/edit-social-links-dialog";

interface SocialLink {
  platform: string;
  url: string;
}

export function SocialLinksSection() {
  const { data: socialLinks } = useData<SocialLink>({ keys: "socialLinks" });

  const handleSave = (links: SocialLink[]) => {
    // Here you would typically save to your API
    console.log("Saving social links:", links);
  };

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

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

              <EditSocialLinksDialog data={socialLinks} onSave={handleSave}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Links
                </Button>
              </EditSocialLinksDialog>
            </div>
          </CardHeader>

          <CardContent>
            {socialLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getIcon(link.platform)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium capitalize">{link.platform}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {link.url}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No social links added yet.</p>
                <EditSocialLinksDialog data={socialLinks} onSave={handleSave}>
                  <Button variant="outline" className="mt-2">
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
