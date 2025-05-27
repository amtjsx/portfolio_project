"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Loader2, CheckCircle, Info } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { forgotPassword, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    const result = await forgotPassword(email)
    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error || "Failed to send reset email")
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="w-full max-w-md">
          <Card className="backdrop-blur-sm bg-background/80 border-border/50">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>We've sent a password reset link to your email address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  If you don't see the email in your inbox, please check your spam folder. The reset link will expire in
                  15 minutes.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/login">Back to login</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSuccess(false)
                    setEmail("")
                  }}
                >
                  Try different email
                </Button>
              </div>

              {/* Demo Info */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Demo Mode:</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Check the browser console for the reset link</p>
                  <p>In production, this would be sent via email</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
            P
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email to receive a reset link</p>
        </div>

        <Card className="backdrop-blur-sm bg-background/80 border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Forgot your password?</CardTitle>
            <CardDescription className="text-center">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@portfolio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="ghost" asChild>
                <Link href="/login" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </Button>
            </div>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Demo Email:</p>
              <div className="text-xs text-muted-foreground">
                <p>
                  <strong>Email:</strong> admin@portfolio.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
