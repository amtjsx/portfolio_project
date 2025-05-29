"use client";

import type React from "react";

import { AdminNavigation } from "@/components/admin/app-sidebar";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PortfolioProvider from "@/contexts/portfolio-provider";
import { useAuth } from "@/lib/auth";
import { CreditCard, Crown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import AnimationText from "./text-animation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen relative bg-muted/30">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                  P
                </span>
              </div>
              <span className="font-semibold tracking-tight">
                Portfolio Admin
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AnimationText />
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  asChild
                >
                  <div className="relative h-8 w-8 rounded-full bg-muted overflow-hidden cursor-pointer">
                    {user?.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.firstName + " " + user.lastName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-sm font-medium">
                        {user?.firstName?.charAt(0)}
                      </div>
                    )}
                    {/* Plan indicator dot */}
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <Link href="/profile">
                    <DropdownMenuItem className="text-sm flex-col justify-start items-start p-4">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                          <p className="font-medium">
                            {user?.firstName + " " + user?.lastName}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {user?.email}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${user?.planColor} text-white border-0 text-xs font-medium`}
                        >
                          <Crown className="mr-1 h-3 w-3" />
                          {user?.plan}
                        </Badge>
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/pricing">
                    <DropdownMenuItem className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="mr-4 h-4 w-4" />
                        <span>Pricing</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Upgrade
                      </Badge>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem>
                    <Settings className="mr-4 h-4 w-4" />
                    <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <PortfolioProvider>
          <SidebarProvider>
            <AdminNavigation />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </PortfolioProvider>
      </div>
    </AuthGuard>
  );
}
