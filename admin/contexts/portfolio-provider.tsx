"use client";

import { Button } from "@/components/ui/button";
import { useDetail } from "@/hooks/use-detail";
import { useAuth } from "@/lib/auth";
import { Portfolio } from "@/types/portfolio";
import Link from "next/link";
import type React from "react";
import { createContext, useContext } from "react";

interface PortfolioContextType {
  portfolio: Portfolio | null;
}
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export default function PortfolioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { data: portfolio, isLoading } = useDetail<Portfolio>({
    id: user?.id,
    title: "portfolio",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!portfolio) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Link href="/start">
          <Button>Start your portfolio</Button>
        </Link>
      </div>
    );
  }

  return (
    <PortfolioContext.Provider value={{ portfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}
