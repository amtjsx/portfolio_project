"use client";
import { createContext, useEffect, useState } from "react";

const userContext = createContext<{ user: any }>({ user: null });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/portfolios/${process.env.PORTFOLIO_ID}`
      );
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};
