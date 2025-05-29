import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface ProjectTimelineProps {
  project: {
    startDate: string;
    endDate?: string;
    status: "completed" | "in-progress" | "planned";
  };
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  // Mock timeline data - in a real app, this would come from your API
  const timelineEvents = [
    {
      id: "1",
      title: "Project Planning & Research",
      description:
        "Initial project planning, requirements gathering, and technology research",
      date: project.startDate,
      status: "completed",
      type: "milestone",
    },
    {
      id: "2",
      title: "UI/UX Design",
      description: "Created wireframes, mockups, and design system",
      date: "2023-02-01",
      status: "completed",
      type: "design",
    },
    {
      id: "3",
      title: "Backend Development",
      description: "API development, database design, and server setup",
      date: "2023-02-15",
      status: "completed",
      type: "development",
    },
    {
      id: "4",
      title: "Frontend Development",
      description: "React components, state management, and UI implementation",
      date: "2023-03-01",
      status: "completed",
      type: "development",
    },
    {
      id: "5",
      title: "Testing & QA",
      description: "Unit tests, integration tests, and quality assurance",
      date: "2023-03-20",
      status: project.status === "completed" ? "completed" : "in-progress",
      type: "testing",
    },
    {
      id: "6",
      title: "Deployment",
      description: "Production deployment and monitoring setup",
      date: project.endDate || "2023-04-01",
      status: project.status === "completed" ? "completed" : "planned",
      type: "deployment",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      milestone: "bg-purple-100 text-purple-800",
      design: "bg-pink-100 text-pink-800",
      development: "bg-blue-100 text-blue-800",
      testing: "bg-orange-100 text-orange-800",
      deployment: "bg-green-100 text-green-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-background border-2 border-border rounded-full">
                    {getStatusIcon(event.status)}
                  </div>

                  {/* Event content */}
                  <div className="flex-1 min-w-0 pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Project Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {timelineEvents.filter((e) => e.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Completed Phases
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {
                  timelineEvents.filter((e) => e.status === "in-progress")
                    .length
                }
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {timelineEvents.filter((e) => e.status === "planned").length}
              </div>
              <div className="text-sm text-muted-foreground">Planned</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
