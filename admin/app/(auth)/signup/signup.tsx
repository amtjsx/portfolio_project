"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatLocationDisplay, searchLocations } from "./location-search";

export function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signup, isLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [loadingLocationSuggestions, setLoadingLocationSuggestions] =
    useState(false);

  const validatePassword = (password: string) => {
    const requirements = [];
    if (password.length < 8) requirements.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) requirements.push("one uppercase letter");
    if (!/[a-z]/.test(password)) requirements.push("one lowercase letter");
    if (!/[0-9]/.test(password)) requirements.push("one number");
    return requirements;
  };

  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    try {
      const response = await fetch("/api/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      setUsernameAvailable(data.available);
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleLocationSearch = async (query: string) => {
    if (query.length < 2) {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
      return;
    }

    setLoadingLocationSuggestions(true);
    try {
      const suggestions = await searchLocations(query);
      const formattedSuggestions = suggestions.map(formatLocationDisplay);
      setLocationSuggestions(formattedSuggestions);
      setShowLocationSuggestions(formattedSuggestions.length > 0);
    } catch (error) {
      console.error("Error searching locations:", error);
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    } finally {
      setLoadingLocationSuggestions(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !location ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    if (usernameAvailable === false) {
      setError("Username is not available");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRequirements = validatePassword(password);
    if (passwordRequirements.length > 0) {
      setError(`Password must contain ${passwordRequirements.join(", ")}`);
      return;
    }

    const result = await signup({
      firstName,
      lastName,
      username,
      email,
      location,
      password,
    });
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError(result.error || "Registration failed");
    }
  };

  const passwordRequirements = validatePassword(password);
  const isPasswordValid =
    passwordRequirements.length === 0 && password.length > 0;

  return (
    <Card className="backdrop-blur-sm bg-background/80 border-border/50 shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to create your admin account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="space-y-4">
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Account created successfully! Redirecting to login...
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2 w-full">
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameAvailable(null);
                  }}
                  className="pl-10"
                  disabled={isLoading || checkingUsername}
                />
                {checkingUsername && (
                  <div className="absolute right-3 top-3">
                    <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                  </div>
                )}
                {usernameAvailable !== null && (
                  <div className="absolute right-3 top-3">
                    {usernameAvailable ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Lock className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter city or country"
                  value={location}
                  onChange={(e) => {
                    const value = e.target.value;
                    setLocation(value);
                    if (value.length >= 2) {
                      const timeoutId = setTimeout(
                        () => handleLocationSearch(value),
                        300
                      );
                      return () => clearTimeout(timeoutId);
                    } else {
                      setLocationSuggestions([]);
                      setShowLocationSuggestions(false);
                    }
                  }}
                  onFocus={() => {
                    if (locationSuggestions.length > 0) {
                      setShowLocationSuggestions(true);
                    }
                  }}
                  onBlur={() => {
                    // Delay hiding suggestions to allow for clicks
                    setTimeout(() => setShowLocationSuggestions(false), 200);
                  }}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                {loadingLocationSuggestions && (
                  <div className="absolute right-3 top-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>

              {showLocationSuggestions && locationSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                  {locationSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-muted focus:bg-muted focus:outline-none text-sm"
                      onClick={() => {
                        setLocation(suggestion);
                        setShowLocationSuggestions(false);
                      }}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {suggestion}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-8 w-8 p-0"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordRequirements.length > 0 && (
                <div className="text-red-600 text-sm">
                  Password must contain {passwordRequirements.join(", ")}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 h-8 w-8 p-0"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        )}

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
