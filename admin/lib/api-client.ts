"use client";

// This is a simplified API client that handles token refresh
const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  private accessToken: string | null = null;

  // Set the access token in memory
  private setAccessToken(token: string): void {
    this.accessToken = token;
  }

  // Clear the access token from memory
  private clearAccessToken(): void {
    this.accessToken = null;
  }

  // Make a request with the access token
  private async request<T>(
    endpoint: string,
    options: RequestInit & {
      params?: Record<string, string | number | boolean | undefined>;
    } = {}
  ): Promise<T | boolean> {
    const url = new URL(`${API_URL}${endpoint}`);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers: headers as HeadersInit,
      credentials: "include", // Important for cookies (refresh token)
    };
    const response = await fetch(url.toString(), config);
    console.log("response status after clear console", response.status);
    // Handle 401 Unauthorized - attempt to refresh token
    if (response.status === 401) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        console.log("Token refreshed. Retrying request...");
        return this.request(endpoint, options);
      } else {
        throw new Error("Session expired. Please login again.");
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "API request failed";

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Not a JSON response
        errorMessage = errorText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    if (config.method === "DELETE") return null as any;
    const body = await response.json();
    return body;
  }

  // Refresh the access token using the refresh token (in HTTP-only cookie)
  private async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", // Important for cookies
        body: JSON.stringify({ s_id: this.accessToken }),
      });
      const data = await response.json();
      console.log("refresh response", data);

      if (data.status === 401) {
        this.clearAccessToken();
        return false;
      }
      if (!response.ok) {
        this.clearAccessToken();
        return false;
      }

      this.setAccessToken(data.accessToken);
      return true;
    } catch (error) {
      console.log("refresh error", error);
      this.clearAccessToken();
      return false;
    }
  }

  // Public methods
  async get<T = any>(
    endpoint: string,
    options?: RequestInit & {
      params?: Record<string, string | number | boolean | undefined>;
    }
  ): Promise<T | boolean> {
    return this.request<T>(endpoint, { method: "GET", ...options });
  }

  async post<T = any>(endpoint: string, data?: any): Promise<T | boolean> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T = any>(endpoint: string, data?: any): Promise<T | boolean> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T | boolean> {
    return this.request<T>(endpoint, { method: "DELETE", ...options });
  }

  // Set initial access token (e.g., after login)
  setToken(token: string): void {
    this.setAccessToken(token);
  }

  // Clear tokens (e.g., for logout)
  clearTokens(): void {
    this.clearAccessToken();
  }
}

export const apiClient = new ApiClient();
