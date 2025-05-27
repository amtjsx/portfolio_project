"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Eye, Users, MousePointer, MessageSquare, Globe } from "lucide-react"

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  totalInteractions: number
  contactSubmissions: number
  topPages: Array<{ page: string; views: number }>
  deviceTypes: Array<{ type: string; count: number }>
  browsers: Array<{ browser: string; count: number }>
  dailyViews: Array<{ date: string; views: number }>
  topProjects: Array<{ project: string; views: number }>
  socialClicks: Array<{ platform: string; clicks: number }>
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const daysAgo = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - daysAgo)

      // Fetch total page views
      const { data: pageViews } = await supabase
        .from("page_views")
        .select("*")
        .gte("created_at", startDate.toISOString())

      // Fetch unique visitors (unique session IDs)
      const { data: uniqueVisitors } = await supabase
        .from("page_views")
        .select("session_id")
        .gte("created_at", startDate.toISOString())

      // Fetch user interactions
      const { data: interactions } = await supabase
        .from("user_interactions")
        .select("*")
        .gte("created_at", startDate.toISOString())

      // Fetch contact submissions
      const { data: contacts } = await supabase
        .from("contact_submissions")
        .select("*")
        .gte("created_at", startDate.toISOString())

      // Fetch project views
      const { data: projects } = await supabase
        .from("project_views")
        .select("*")
        .gte("created_at", startDate.toISOString())

      // Fetch social clicks
      const { data: social } = await supabase
        .from("social_clicks")
        .select("*")
        .gte("created_at", startDate.toISOString())

      // Process data
      const uniqueSessionIds = new Set(uniqueVisitors?.map((v) => v.session_id) || [])

      // Top pages
      const pageViewCounts =
        pageViews?.reduce((acc: any, view) => {
          acc[view.page_path] = (acc[view.page_path] || 0) + 1
          return acc
        }, {}) || {}

      const topPages = Object.entries(pageViewCounts)
        .map(([page, views]) => ({ page, views: views as number }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)

      // Device types
      const deviceCounts =
        pageViews?.reduce((acc: any, view) => {
          const device = view.device_type || "unknown"
          acc[device] = (acc[device] || 0) + 1
          return acc
        }, {}) || {}

      const deviceTypes = Object.entries(deviceCounts).map(([type, count]) => ({ type, count: count as number }))

      // Browsers
      const browserCounts =
        pageViews?.reduce((acc: any, view) => {
          const browser = view.browser || "unknown"
          acc[browser] = (acc[browser] || 0) + 1
          return acc
        }, {}) || {}

      const browsers = Object.entries(browserCounts)
        .map(([browser, count]) => ({ browser, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Daily views
      const dailyViewCounts: any = {}
      pageViews?.forEach((view) => {
        const date = new Date(view.created_at!).toISOString().split("T")[0]
        dailyViewCounts[date] = (dailyViewCounts[date] || 0) + 1
      })

      const dailyViews = Object.entries(dailyViewCounts)
        .map(([date, views]) => ({ date, views: views as number }))
        .sort((a, b) => a.date.localeCompare(b.date))

      // Top projects
      const projectCounts =
        projects?.reduce((acc: any, project) => {
          const title = project.project_title || project.project_id
          acc[title] = (acc[title] || 0) + 1
          return acc
        }, {}) || {}

      const topProjects = Object.entries(projectCounts)
        .map(([project, views]) => ({ project, views: views as number }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)

      // Social clicks
      const socialCounts =
        social?.reduce((acc: any, click) => {
          acc[click.platform] = (acc[click.platform] || 0) + 1
          return acc
        }, {}) || {}

      const socialClicks = Object.entries(socialCounts)
        .map(([platform, clicks]) => ({ platform, clicks: clicks as number }))
        .sort((a, b) => b.clicks - a.clicks)

      setAnalytics({
        totalViews: pageViews?.length || 0,
        uniqueVisitors: uniqueSessionIds.size,
        totalInteractions: interactions?.length || 0,
        contactSubmissions: contacts?.length || 0,
        topPages,
        deviceTypes,
        browsers,
        dailyViews,
        topProjects,
        socialClicks,
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Time Range:</span>
        {(["7d", "30d", "90d"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 text-sm rounded-md ${
              timeRange === range
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalInteractions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.contactSubmissions.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    views: {
                      label: "Views",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.dailyViews}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    clicks: {
                      label: "Clicks",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.socialClicks}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="platform" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="clicks" fill="var(--color-clicks)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages on your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{page.page === "/" ? "Home" : page.page}</span>
                    </div>
                    <span className="text-muted-foreground">{page.views} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.deviceTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.deviceTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Browsers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.browsers.map((browser, index) => (
                    <div key={browser.browser} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{browser.browser}</span>
                      </div>
                      <span className="text-muted-foreground">{browser.count} visits</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Viewed Projects</CardTitle>
              <CardDescription>Projects that attract the most attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topProjects.map((project, index) => (
                  <div key={project.project} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{project.project}</span>
                    </div>
                    <span className="text-muted-foreground">{project.views} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
