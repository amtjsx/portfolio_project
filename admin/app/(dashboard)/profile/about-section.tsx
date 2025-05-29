"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, User } from "lucide-react";
import { EditAboutDialog } from "./edit/edit-about-dialog";

interface AboutData {
  aboutTitle: string;
  aboutDescription: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  clientsSatisfied: number;
}

export function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData>({
    aboutTitle: "About Me",
    aboutDescription:
      "I'm a passionate full-stack developer with a love for creating innovative solutions that make a difference. With over 7 years of experience in the industry, I've had the opportunity to work on diverse projects ranging from small business websites to large-scale enterprise applications.\n\nMy journey in tech started with a curiosity about how things work, which led me to pursue computer science and eventually specialize in web development. I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices.\n\nWhen I'm not coding, you can find me contributing to open-source projects, mentoring junior developers, or exploring new technologies. I'm always excited to take on new challenges and collaborate with like-minded individuals.",
    yearsOfExperience: 7,
    projectsCompleted: 50,
    clientsSatisfied: 25,
  });

  const handleSave = (data: AboutData) => {
    setAboutData(data);
    // Here you would typically save to your API
    console.log("Saving about data:", data);
  };

  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle className="text-2xl">
                  {aboutData.aboutTitle}
                </CardTitle>
              </div>

              <EditAboutDialog data={aboutData} onSave={handleSave}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit About
                </Button>
              </EditAboutDialog>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* About Description */}
            <div className="prose prose-gray max-w-none">
              {aboutData.aboutDescription
                .split("\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {aboutData.yearsOfExperience}+
                </div>
                <p className="text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {aboutData.projectsCompleted}+
                </div>
                <p className="text-sm text-muted-foreground">
                  Projects Completed
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {aboutData.clientsSatisfied}+
                </div>
                <p className="text-sm text-muted-foreground">
                  Satisfied Clients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
