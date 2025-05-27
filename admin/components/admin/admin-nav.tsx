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
import { useState } from "react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative border-r h-full bg-background/50 backdrop-blur-sm transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background p-0 shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="p-4 pt-6">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-sm"
                    : "text-muted-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("h-4 w-4 flex-shrink-0")} />
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs opacity-70">
                      {item.description}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      {!isCollapsed && (
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
    </div>
  );
}
