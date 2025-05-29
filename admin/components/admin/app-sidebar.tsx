"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Code,
  FolderOpen,
  LayoutDashboard,
  Palette,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

const navigation = [
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    description: "Personal Information",
  },
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
  },
  {
    name: "Blog",
    href: "/blog",
    icon: Book,
    description: "Blog Posts",
  },
  {
    name: "Skills",
    href: "/skills",
    icon: Code,
    description: "Technical Skills & Expertise",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
    description: "Portfolio Projects",
  },
  {
    name: "Education",
    href: "/education",
    icon: FolderOpen,
    description: "Portfolio Projects",
  },
  {
    name: "Experience",
    href: "/experience",
    icon: FolderOpen,
    description: "Portfolio Projects",
  },
  {
    name: "Design",
    href: "/design",
    icon: Palette,
    description: "Theme & Customization",
  },
];

export function AdminNavigation() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="inset" className="bg-card shadow" collapsible="icon">
      {/* Navigation */}
      <SidebarContent className="pt-20 space-y-4 gap-4">
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  className={cn(
                    "h-12",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0")} />
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs opacity-70">
                      {item.description}
                    </span>
                  </div>
                </SidebarMenuButton>
              </Link>
            );
          })}
        </SidebarMenu>
        {/* Toggle Button */}
      </SidebarContent>
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 bottom-6 z-10 h-6 w-6 rounded-full border bg-background p-0 shadow-md"
        onClick={toggleSidebar}
      >
        {state === "collapsed" ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Quick Stats */}
      {state === "expanded" && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <h4 className="text-sm font-medium mb-2">Quick Stats</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Projects</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Skills</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span>Views</span>
                <span className="font-medium">1.2K</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
