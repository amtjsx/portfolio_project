"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Views",
      value: "12,543",
      change: "+12.5%",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Contact Forms",
      value: "89",
      change: "+8.2%",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Project Inquiries",
      value: "34",
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      type: "contact",
      message: "New contact form submission from Sarah Johnson",
      time: "2 hours ago",
      status: "new",
    },
    {
      type: "project",
      message: "Project inquiry for e-commerce platform",
      time: "4 hours ago",
      status: "pending",
    },
    {
      type: "view",
      message: "Portfolio viewed 25 times today",
      time: "6 hours ago",
      status: "info",
    },
    {
      type: "skill",
      message: "Added React certification to skills",
      time: "1 day ago",
      status: "completed",
    },
  ];

  const quickActions = [
    {
      title: "Add New Project",
      description: "Showcase your latest work",
      href: "/projects",
      icon: Plus,
      color: "bg-blue-500",
    },
    {
      title: "Update Skills",
      description: "Add new certifications",
      href: "/skills",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Customize Design",
      description: "Update theme and colors",
      href: "/design",
      icon: AlertCircle,
      color: "bg-purple-500",
    },
  ];

  return (
    <main className="flex-1 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your portfolio performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest updates and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        activity.status === "new"
                          ? "bg-blue-500"
                          : activity.status === "pending"
                          ? "bg-yellow-500"
                          : activity.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        activity.status === "new"
                          ? "default"
                          : activity.status === "pending"
                          ? "secondary"
                          : activity.status === "completed"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <div className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${action.color} text-white`}
                  >
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content Overview */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Profile Status</CardTitle>
              <CardDescription>Your profile completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Complete</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[85%] rounded-full bg-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Add more skills and projects to complete your profile
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Summary</CardTitle>
              <CardDescription>Your portfolio content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Projects</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Skills</span>
                  <Badge variant="secondary">24</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Certificates</span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Social Links</span>
                  <Badge variant="secondary">5</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>This month's metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Page Views</span>
                  <span className="font-medium text-green-600">+12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Contact Rate</span>
                  <span className="font-medium text-green-600">+8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Project Inquiries</span>
                  <span className="font-medium text-green-600">+15.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Social Engagement</span>
                  <span className="font-medium text-green-600">+6.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
