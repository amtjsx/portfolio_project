"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
  avatar?: string;
  plan?: string;
  planColor?: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (body: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    location: string;
  }) => Promise<{ success: boolean; error?: string }>;
  verifyResetToken: (
    token: string
  ) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              "Get user failed with status " + response.status
          );
        }
        console.log("response", response);
        const userData = await response.json();
        console.log("userData", userData);
        setUser(userData.user);
        localStorage.setItem(
          "portfolio_admin_user",
          JSON.stringify(userData.user)
        );
      } catch (error: any) {
        console.error("Get user failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call delay
    try {
      console.log("email", email);
      console.log("password", password);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
      console.log("response", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Login failed with status " + response.status
        );
      }

      const userData = await response.json();
      setUser(userData.user);
      localStorage.setItem(
        "portfolio_admin_user",
        JSON.stringify(userData.user)
      );
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Login failed:", error);
      setIsLoading(false);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    // Simulate API call delay
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Signup failed with status " + response.status
        );
      }

      console.log("response", response);
      const userData = await response.json();
      setUser(userData.user);
      localStorage.setItem(
        "portfolio_admin_user",
        JSON.stringify(userData.user)
      );
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Signup failed:", error);
      setIsLoading(false);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Logout failed with status " + response.status
        );
      }
      localStorage.removeItem("portfolio_admin_user");
    } catch (error: any) {
      console.error("Logout failed:", error);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Forgot password failed with status " + response.status
        );
      }
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("portfolio_admin_user", JSON.stringify(userData));
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Forgot password failed:", error);
      setIsLoading(false);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyResetToken = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Verify reset token failed with status " + response.status
        );
      }
      const tokenData = await response.json();
      if (!tokenData) {
        return { success: false, error: "Invalid or expired reset token" };
      }

      return { success: true };
    } catch (error: any) {
      console.error("Verify reset token failed:", error);
      setIsLoading(false);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Reset password failed with status " + response.status
        );
      }
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("portfolio_admin_user", JSON.stringify(userData));
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error("Reset password failed:", error);
      setIsLoading(false);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        forgotPassword,
        resetPassword,
        verifyResetToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
