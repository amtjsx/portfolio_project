"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/contexts/portfolio-provider";
import { useCreate } from "@/hooks/use-create";
import { useAuth } from "@/lib/auth";
import { Portfolio } from "@/types/portfolio";
import {
  Award,
  Building,
  Calendar,
  Check,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  Github,
  Globe,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
  Share2,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PortfolioView() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { portfolio: portfolioData } = usePortfolio();
  const { user } = useAuth();

  const isOwner = user?.id === portfolioData?.id;

  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const [tempAboutText, setTempAboutText] = useState(
    portfolioData?.summary || ""
  );

  const { create } = useCreate<Portfolio>({
    title: "portfolio",
    url: "/portfolio",
  });

  const handleEditAbout = async () => {
    setIsEditingAbout(true);
  };

  const handleSaveAbout = async () => {
    setIsEditingAbout(false);
    await create({ data: { id: portfolioData?.id, summary: tempAboutText } });
    // Handle save logic
  };

  const handleCancelEdit = () => {
    setIsEditingAbout(false);
    // Handle cancel logic
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Handle contact form submission
  };

  if (!portfolioData) {
    return null;
  }

  const SkillBar = ({
    skill,
  }: {
    skill: { name: string; level: number; category: string };
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-gray-600">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${skill.level}%`,
            backgroundColor: portfolioData.primaryColor,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${portfolioData.coverImageId})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white/90">
              <Eye className="h-4 w-4 mr-1" />
              1,234
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90">
              <Heart className="h-4 w-4 mr-1" />
              89
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 relative -mt-24">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage
                src={portfolioData.profileImageId || "/placeholder.svg"}
                alt={portfolioData.title}
              />
              <AvatarFallback className="text-2xl">SJ</AvatarFallback>
            </Avatar>

            <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {portfolioData.title}
                  </h1>
                  <p className="text-xl text-gray-600 mt-1">
                    {portfolioData.subtitle}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    {/* <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {portfolioData.contactInfo.location}
                    </span> */}
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      Available for work
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {portfolioData.settings.allowDownloadResume && (
                    <Button
                      className="flex items-center gap-2"
                      style={{ backgroundColor: portfolioData.primaryColor }}
                    >
                      <Download className="h-4 w-4" />
                      Download Resume
                    </Button>
                  )}
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:col-span-2 space-y-12">
          {/* About Section */}
          {portfolioData.sections.about && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: portfolioData.primaryColor }}
                >
                  About Me
                </h2>
                {isOwner && !isEditingAbout && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditAbout}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                )}
                {isOwner && isEditingAbout && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveAbout}
                      className="flex items-center gap-2"
                      style={{ backgroundColor: portfolioData.primaryColor }}
                    >
                      <Check className="h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <Card className="prose prose-lg max-w-none bg-card rounded-lg shadow h-full min-h-[200px]">
                <CardContent className="p-4">
                  {isEditingAbout ? (
                    <div className="space-y-4">
                      <Textarea
                        value={tempAboutText}
                        onChange={(e) => setTempAboutText(e.target.value)}
                        rows={6}
                        className="w-full resize-none border-2 border-blue-200 focus:border-blue-400"
                        placeholder="Tell visitors about your professional background, skills, and what makes you unique..."
                      />
                      <div className="text-sm text-gray-500">
                        {tempAboutText.length} characters
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {portfolioData.summary}
                    </p>
                  )}
                </CardContent>
              </Card>

              {!isEditingAbout && (
                <div className="flex gap-4 mt-6">
                  {portfolioData.socialLinks?.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {social.platform}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* Experience Section */}
          {portfolioData.sections.experience && (
            <section>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: portfolioData.primaryColor }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {!portfolioData.experience ? (
                  <Card className="text-center py-6">
                    <CardContent>
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Building className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        No experience information provided
                      </p>

                      <Link
                        href="/experience"
                        className="cursor-pointer underline text-xs"
                      >
                        Add Experience
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  portfolioData.experience?.map((exp, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {exp.title}
                            </h3>
                            <p className="text-lg text-gray-600 flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              {exp.company} • {exp.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exp.startDate} -{" "}
                              {exp.current ? "Present" : exp.endDate}
                            </p>
                            {exp.current && (
                              <Badge variant="secondary" className="mt-1">
                                Current
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{exp.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-gray-600">
                            Key Achievements:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {portfolioData.sections.projects && (
            <section>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: portfolioData.primaryColor }}
              >
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioData.projects
                  ?.filter((p) => p.featured)
                  .map((project, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={project.imageId || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Live Demo
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-1" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          )}

          {/* Testimonials Section */}
          {portfolioData.sections.testimonials && (
            <section>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: portfolioData.primaryColor }}
              >
                Testimonials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioData.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="space-y-8">
          {/* Skills Section */}
          {portfolioData.sections.skills && (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle style={{ color: portfolioData.primaryColor }}>
                  Skills
                </CardTitle>
                <Link
                  href="/skills"
                  className="text-muted-foreground cursor-pointer hover:underline"
                >
                  All
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.skills?.map((skill, index) => (
                  <SkillBar key={index} skill={skill} />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          {portfolioData.sections.education && (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle style={{ color: portfolioData.primaryColor }}>
                  Education
                </CardTitle>
                <Link
                  href="/education"
                  className="text-muted-foreground cursor-pointer hover:underline"
                >
                  All
                </Link>
              </CardHeader>
              <CardContent>
                {portfolioData.education?.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {edu.achievements.map((achievement, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Contact Section */}
          {portfolioData.sections.contact && (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle style={{ color: portfolioData.primaryColor }}>
                  Contact Info
                </CardTitle>
                <Link
                  href="/contact"
                  className="text-muted-foreground cursor-pointer hover:underline text-xs"
                >
                  All
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a
                    href={`mailto:${portfolioData.contact?.email}`}
                    className="text-sm hover:underline"
                  >
                    {portfolioData.contact?.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {portfolioData.contact?.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {portfolioData.contact?.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a
                    href={portfolioData.contact?.website}
                    className="text-sm hover:underline"
                  >
                    {portfolioData.contact?.website}
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
