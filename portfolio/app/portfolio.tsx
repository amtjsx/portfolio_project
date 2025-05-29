"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Portfolio } from "../types/portfolio";

interface PortfolioContextValue {
  portfolio: Portfolio;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      setPortfolio(data);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return null;
  }

  if (!portfolio) {
    return null;
  }

  return (
    <PortfolioContext.Provider value={{ portfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};
