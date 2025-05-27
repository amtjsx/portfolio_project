"use client";

import QueryProvider from "@/contexts/query-provider";
import { AuthProvider } from "@/lib/auth";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";
import "./grid-pattern.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="relative">
        <AuthProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
