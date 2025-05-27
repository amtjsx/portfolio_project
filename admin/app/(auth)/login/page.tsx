"use client"

import { LoginForm } from "@/app/(auth)/login/login-form"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  if (user) {
    return null
  }

  return <LoginForm />
}
