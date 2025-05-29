"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
    Archive,
    ArrowLeft,
    Calendar,
    Clock,
    Code,
    Copy,
    Download,
    Edit,
    ExternalLink,
    Eye,
    EyeOff,
    Github,
    Globe,
    MoreVertical,
    Share2,
    Star,
    Tag,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectDeleteDialog } from "./project-delete-dialog";
import { ProjectEditDialog } from "./project-edit-dialog";
import { ProjectGallery } from "./project-gallery";
import { ProjectTechnologies } from "./project-technologies";
import { ProjectTimeline } from "./project-timeline";
import { RelatedProjects } from "./related-projects";

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: string;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured: boolean;
    startDate: string;
    endDate?: string;
    status: "completed" | "in-progress" | "planned";
  };
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(project);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planned":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDateRange = () => {
    const start = formatDate(currentProject.startDate);
    const end = currentProject.endDate
      ? formatDate(currentProject.endDate)
      : "Present";
    return { start, end };
  };

  const getDuration = () => {
    const startDate = new Date(currentProject.startDate);
    const endDate = currentProject.endDate
      ? new Date(currentProject.endDate)
      : new Date();
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;

    if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ${
        days > 0 ? `${days} day${days > 1 ? "s" : ""}` : ""
      }`;
    }
    return `${days} day${days > 1 ? "s" : ""}`;
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    // In a real app, this would call your API to delete the project
    console.log("Deleting project:", currentProject.id);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to projects list after deletion
    router.push("/projects");
  };

  const handleUpdateProject = async (updatedData: any) => {
    // In a real app, this would call your API to update the project
    console.log("Updating project:", updatedData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update local state
    setCurrentProject({ ...currentProject, ...updatedData });
  };

  const handleDuplicate = async () => {
    // In a real app, this would call your API to duplicate the project
    console.log("Duplicating project:", currentProject.id);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to new project
    router.push("/projects/new-duplicate-id");
  };

  const handleToggleFeatured = async () => {
    // In a real app, this would call your API
    console.log("Toggling featured status:", currentProject.id);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setCurrentProject({
      ...currentProject,
      featured: !currentProject.featured,
    });
  };

  const handleArchive = async () => {
    // In a real app, this would call your API
    console.log("Archiving project:", currentProject.id);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push("/projects");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProject.title,
          text: currentProject.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const dateRange = getDateRange();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        {/* Project Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleToggleFeatured}>
              {currentProject.featured ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Remove from Featured
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Mark as Featured
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleArchive}>
              <Archive className="mr-2 h-4 w-4" />
              Archive Project
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Hero Section */}
      <div className="space-y-6">
        {/* Project Image */}
        <div className="relative h-64 md:h-96 bg-muted rounded-lg overflow-hidden">
          {currentProject.imageUrl ? (
            <img
              src={currentProject.imageUrl || "/placeholder.svg"}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
              <div className="text-8xl font-bold text-primary/30">
                {currentProject.title.charAt(0)}
              </div>
            </div>
          )}

          {/* Overlay with badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge
              className={cn(
                "text-sm font-medium",
                getStatusColor(currentProject.status)
              )}
            >
              {currentProject.status.replace("-", " ")}
            </Badge>
            {currentProject.featured && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
          </div>

          {/* Action buttons overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="sm" variant="secondary" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Project Header Info */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {currentProject.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {currentProject.description}
              </p>
            </div>

            <div className="flex gap-2">
              {currentProject.githubUrl && (
                <Button asChild>
                  <Link
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Link>
                </Button>
              )}
              {currentProject.liveUrl && (
                <Button asChild>
                  <Link
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium capitalize">
                      {currentProject.category}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{dateRange.start}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{getDuration()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Technologies
                    </p>
                    <p className="font-medium">
                      {currentProject.technologies.length} used
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technologies">Technologies</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {currentProject.longDescription ||
                      currentProject.description}
                  </p>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-sm">
                        User authentication and authorization system
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-sm">
                        Responsive design optimized for all devices
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-sm">
                        Real-time data synchronization
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-sm">
                        Advanced search and filtering capabilities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-sm">
                        Comprehensive admin dashboard
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Challenges & Solutions */}
              <Card>
                <CardHeader>
                  <CardTitle>Challenges & Solutions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Performance Optimization
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Implemented code splitting, lazy loading, and optimized
                      database queries to achieve sub-second load times even
                      with large datasets.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Scalability</h4>
                    <p className="text-sm text-muted-foreground">
                      Designed microservices architecture with containerization
                      to handle increased user load and feature expansion.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      className={cn(
                        "mt-1",
                        getStatusColor(currentProject.status)
                      )}
                    >
                      {currentProject.status.replace("-", " ")}
                    </Badge>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm font-medium">
                        Started: {dateRange.start}
                      </p>
                      <p className="text-sm font-medium">
                        {currentProject.endDate
                          ? `Completed: ${dateRange.end}`
                          : "Ongoing"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {currentProject.category}
                    </Badge>
                  </div>

                  {(currentProject.githubUrl || currentProject.liveUrl) && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Links</p>
                        <div className="space-y-2">
                          {currentProject.githubUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              asChild
                            >
                              <Link
                                href={currentProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4 mr-2" />
                                Source Code
                              </Link>
                            </Button>
                          )}
                          {currentProject.liveUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              asChild
                            >
                              <Link
                                href={currentProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Globe className="w-4 h-4 mr-2" />
                                Live Demo
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Technologies Used */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technologies">
          <ProjectTechnologies technologies={currentProject.technologies} />
        </TabsContent>

        <TabsContent value="timeline">
          <ProjectTimeline project={currentProject} />
        </TabsContent>

        <TabsContent value="gallery">
          <ProjectGallery project={currentProject} />
        </TabsContent>
      </Tabs>

      {/* Related Projects */}
      <RelatedProjects currentProject={currentProject} />

      {/* Delete Confirmation Dialog */}
      <ProjectDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        project={currentProject}
        onConfirm={handleDelete}
      />

      {/* Edit Project Dialog */}
      <ProjectEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        project={currentProject}
        onSubmit={handleUpdateProject}
      />
    </div>
  );
}
