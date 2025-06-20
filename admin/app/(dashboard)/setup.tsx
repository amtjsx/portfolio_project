import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Download,
  Settings,
  Users,
  Zap,
  Palette,
  Shield,
  Bell,
  BarChart3,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function SetupGuide() {
  const steps = [
    {
      number: 1,
      title: "Download & Install",
      description: "Download and install app",
      icon: Download,
      status: "completed",
      progress: 100,
      link: "/download",
    },
    {
      number: 2,
      title: "Create Account",
      description: "Sign up or log in",
      icon: Users,
      status: "completed",
      progress: 100,
      link: "/signup",
    },
    {
      number: 3,
      title: "Configure Settings",
      description: "Set preferences",
      icon: Settings,
      status: "current",
      progress: 65,
      link: "/settings",
    },
    {
      number: 4,
      title: "Connect Services",
      description: "Link integrations",
      icon: Zap,
      status: "progress",
      progress: 30,
      link: "/integrations",
    },
    {
      number: 5,
      title: "Complete Setup",
      description: "Finalize config",
      icon: CheckCircle,
      status: "pending",
      progress: 0,
      link: "/complete",
    },
    {
      number: 6,
      title: "Customize Theme",
      description: "Personalize appearance",
      icon: Palette,
      status: "pending",
      progress: 0,
      link: "/theme",
    },
    {
      number: 7,
      title: "Security Setup",
      description: "Enable 2FA & permissions",
      icon: Shield,
      status: "pending",
      progress: 0,
      link: "/security",
    },
    {
      number: 8,
      title: "Notifications",
      description: "Configure alerts",
      icon: Bell,
      status: "pending",
      progress: 0,
      link: "/notifications",
    },
    {
      number: 9,
      title: "Analytics Setup",
      description: "Track usage & metrics",
      icon: BarChart3,
      status: "pending",
      progress: 0,
      link: "/analytics",
    },
    {
      number: 10,
      title: "Go Live",
      description: "Launch your project",
      icon: Rocket,
      status: "pending",
      progress: 0,
      link: "/launch",
    },
  ];

  const overallProgress = Math.round(
    steps.reduce((acc, step) => acc + step.progress, 0) / steps.length
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-3">
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">Setup Guide</h1>
        <p className="text-xs text-muted-foreground">
          10 steps to complete setup
        </p>
        <div className="mt-2">
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground">Overall Progress:</span>
            <span className="font-semibold text-primary">
              {overallProgress}%
            </span>
            <span className="text-muted-foreground">
              ({steps.filter((s) => s.status === "completed").length}/10
              completed)
            </span>
          </div>
          <Progress value={overallProgress} className="h-1.5 mt-1" />
        </div>
      </div>

      <div className="space-y-1">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";
          const isInProgress = step.status === "progress";

          return (
            <Link key={step.number} href={step.link} className="block group">
              <div
                className={`flex items-center gap-2 p-2 rounded-md border transition-all hover:bg-accent hover:shadow-sm ${
                  isCurrent
                    ? "bg-primary/5 border-primary/20"
                    : isInProgress
                    ? "bg-orange-50 border-orange-200"
                    : "hover:border-border"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isInProgress
                      ? "bg-orange-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Icon className="w-3 h-3" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="font-medium text-xs group-hover:text-primary">
                      {step.number}. {step.title}
                    </span>
                    {isCompleted && (
                      <Badge
                        variant="secondary"
                        className="h-4 px-1 text-xs bg-green-100 text-green-700"
                      >
                        ✓
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge variant="default" className="h-4 px-1 text-xs">
                        Now
                      </Badge>
                    )}
                    {isInProgress && (
                      <Badge
                        variant="secondary"
                        className="h-4 px-1 text-xs bg-orange-100 text-orange-700"
                      >
                        Started
                      </Badge>
                    )}
                    {step.number > 5 && (
                      <Badge variant="outline" className="h-4 px-1 text-xs">
                        Advanced
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground truncate flex-1">
                      {step.description}
                    </p>
                    <span className="text-xs font-medium text-right">
                      {step.progress}%
                    </span>
                  </div>
                  {(isCurrent || isInProgress) &&
                    step.progress > 0 &&
                    step.progress < 100 && (
                      <Progress value={step.progress} className="h-1 mt-1" />
                    )}
                </div>

                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-3 flex justify-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span>Done</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
          <span>Started</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
}
