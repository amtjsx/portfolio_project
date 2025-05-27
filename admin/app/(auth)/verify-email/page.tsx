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
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [email, setEmail] = useState("");
  const [attemptedCode, setAttemptedCode] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  useEffect(() => {
    // Countdown timer for resend cooldown
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);

    // Clear error and reset attempted code when user starts typing a new code
    if (error && value !== verificationCode) {
      setError("");
    }

    // Reset attempted code if user is changing the code
    if (value !== verificationCode && attemptedCode) {
      setAttemptedCode("");
    }
  };

  // Auto-submit when 6 digits are entered
  useEffect(() => {
    if (
      verificationCode.length === 6 &&
      !isVerifying &&
      !error &&
      verificationCode !== attemptedCode
    ) {
      // Small delay to show the complete code before submitting
      const timer = setTimeout(() => {
        setAttemptedCode(verificationCode);
        handleVerifyCode(new Event("submit") as any);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [verificationCode, isVerifying, error, attemptedCode]);

  const handleVerifyCode = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setError("");

    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 2000);
      } else {
        setError(data.error || "Invalid verification code");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("Failed to verify email. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setResendCooldown(60); // 60 second cooldown
        // Show success message briefly
        setError("");
      } else {
        setError(data.error || "Failed to resend verification code");
      }
    } catch (error) {
      console.error("Resend error:", error);
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-background/80 border-border/50 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription className="text-center">
            {email ? (
              <>
                We've sent a 6-digit verification code to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </>
            ) : (
              "We've sent a 6-digit verification code to your email address"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Email verified successfully! Redirecting to login...
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={handleCodeInput}
                  className={`text-center text-2xl font-mono tracking-widest ${
                    verificationCode.length === 6
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : ""
                  }`}
                  maxLength={6}
                  disabled={isVerifying}
                  autoComplete="one-time-code"
                  autoFocus
                />
                {verificationCode.length === 6 && !isVerifying && (
                  <div className="flex items-center justify-center mt-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">
                      Verifying...
                    </span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isVerifying || verificationCode.length !== 6}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={isResending || resendCooldown > 0}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resending...
                    </>
                  ) : resendCooldown > 0 ? (
                    `Resend in ${resendCooldown} seconds`
                  ) : (
                    "Resend Code"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
