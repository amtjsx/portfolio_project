"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
  showIcon?: boolean
  showText?: boolean
}

export function LogoutButton({ variant = "ghost", size = "sm", showIcon = true, showText = true }: LogoutButtonProps) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size}>
          {showIcon && <LogOut className={`h-4 w-4 ${showText ? "mr-2" : ""}`} />}
          {showText && "Logout"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to the login page and will need to sign in again to access the admin panel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
