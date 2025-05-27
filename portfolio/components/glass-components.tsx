"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  intensity?: "subtle" | "light" | "medium" | "heavy" | "ultra"
  variant?: "default" | "frosted" | "crystal" | "premium"
}

export function GlassCard({ children, className, intensity = "medium", variant = "default" }: GlassCardProps) {
  const getGlassStyles = () => {
    const baseStyles = "relative overflow-hidden border"

    switch (variant) {
      case "frosted":
        return cn(
          baseStyles,
          "backdrop-blur-2xl border-white/15 dark:border-white/8",
          intensity === "subtle" && "bg-white/3 dark:bg-white/1",
          intensity === "light" && "bg-white/5 dark:bg-white/2",
          intensity === "medium" && "bg-white/8 dark:bg-white/3",
          intensity === "heavy" && "bg-white/12 dark:bg-white/5",
          intensity === "ultra" && "bg-white/15 dark:bg-white/7",
        )
      case "crystal":
        return cn(
          baseStyles,
          "backdrop-blur-xl border-white/20 dark:border-white/10",
          "bg-gradient-to-br from-white/8 via-white/4 to-white/8 dark:from-white/4 dark:via-white/2 dark:to-white/4",
          intensity === "subtle" &&
            "from-white/4 via-white/2 to-white/4 dark:from-white/2 dark:via-white/1 dark:to-white/2",
          intensity === "light" &&
            "from-white/6 via-white/3 to-white/6 dark:from-white/3 dark:via-white/1.5 dark:to-white/3",
          intensity === "heavy" &&
            "from-white/12 via-white/6 to-white/12 dark:from-white/6 dark:via-white/3 dark:to-white/6",
          intensity === "ultra" &&
            "from-white/16 via-white/8 to-white/16 dark:from-white/8 dark:via-white/4 dark:to-white/8",
        )
      case "premium":
        return cn(
          baseStyles,
          "backdrop-blur-3xl border-white/25 dark:border-white/12",
          "bg-gradient-to-br from-white/10 via-white/6 to-white/10 dark:from-white/5 dark:via-white/2.5 dark:to-white/5",
          "shadow-2xl shadow-black/5 dark:shadow-black/20",
        )
      default:
        return cn(
          baseStyles,
          "backdrop-blur-xl border-white/12 dark:border-white/6",
          intensity === "subtle" && "bg-white/4 dark:bg-white/1.5",
          intensity === "light" && "bg-white/6 dark:bg-white/2.5",
          intensity === "medium" && "bg-white/8 dark:bg-white/3.5",
          intensity === "heavy" && "bg-white/12 dark:bg-white/5",
          intensity === "ultra" && "bg-white/16 dark:bg-white/7",
        )
    }
  }

  return (
    <div className={cn(getGlassStyles(), className)}>
      {/* Enhanced glass reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-40 dark:opacity-20" />

      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/2 to-white/4 dark:from-transparent dark:via-white/1 dark:to-white/2" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface GlassButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "premium"
  size?: "sm" | "md" | "lg"
  intensity?: "subtle" | "medium" | "heavy"
}

export function GlassButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
  intensity = "medium",
}: GlassButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return intensity === "subtle"
          ? "bg-white/8 hover:bg-white/15 border-white/20 hover:border-white/30 text-white"
          : intensity === "heavy"
            ? "bg-white/20 hover:bg-white/30 border-white/35 hover:border-white/45 text-white"
            : "bg-white/12 hover:bg-white/22 border-white/25 hover:border-white/35 text-white"
      case "secondary":
        return intensity === "subtle"
          ? "bg-black/6 hover:bg-black/12 border-white/15 hover:border-white/25"
          : intensity === "heavy"
            ? "bg-black/15 hover:bg-black/25 border-white/25 hover:border-white/35"
            : "bg-black/10 hover:bg-black/18 border-white/20 hover:border-white/30"
      case "ghost":
        return "bg-transparent hover:bg-white/8 border-transparent hover:border-white/15"
      case "premium":
        return "bg-gradient-to-r from-white/15 to-white/10 hover:from-white/25 hover:to-white/20 border-white/30 hover:border-white/40 text-white shadow-lg"
      default:
        return "bg-white/12 hover:bg-white/22 border-white/25 hover:border-white/35"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm"
      case "lg":
        return "px-6 py-3 text-lg"
      default:
        return "px-4 py-2 text-base"
    }
  }

  const getBlurIntensity = () => {
    switch (intensity) {
      case "subtle":
        return "backdrop-blur-md"
      case "heavy":
        return "backdrop-blur-2xl"
      default:
        return "backdrop-blur-xl"
    }
  }

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-lg font-medium transition-all duration-300",
        getBlurIntensity(),
        "border",
        getVariantStyles(),
        getSizeStyles(),
        className,
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Enhanced glass shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Subtle inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 rounded-lg" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

interface GlassBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "secondary" | "accent"
  intensity?: "subtle" | "medium" | "heavy"
}

export function GlassBadge({ children, className, variant = "default", intensity = "medium" }: GlassBadgeProps) {
  const getVariantStyles = () => {
    const baseOpacity = intensity === "subtle" ? "6" : intensity === "heavy" ? "15" : "10"
    const borderOpacity = intensity === "subtle" ? "15" : intensity === "heavy" ? "25" : "20"

    switch (variant) {
      case "primary":
        return `bg-primary/${baseOpacity} border-primary/${borderOpacity} text-primary backdrop-blur-lg`
      case "secondary":
        return `bg-secondary/${baseOpacity} border-secondary/${borderOpacity} text-secondary-foreground backdrop-blur-lg`
      case "accent":
        return `bg-blue-500/${baseOpacity} border-blue-500/${borderOpacity} text-blue-600 dark:text-blue-400 backdrop-blur-lg`
      default:
        return `bg-white/${baseOpacity} border-white/${borderOpacity} text-foreground backdrop-blur-lg`
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        "border relative overflow-hidden",
        getVariantStyles(),
        className,
      )}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/3 rounded-full" />
      <span className="relative z-10">{children}</span>
    </span>
  )
}

export function GlassContainer({
  children,
  className,
  intensity = "medium",
}: {
  children: React.ReactNode
  className?: string
  intensity?: "subtle" | "medium" | "heavy"
}) {
  const getIntensityStyles = () => {
    switch (intensity) {
      case "subtle":
        return "bg-gradient-to-br from-white/3 via-transparent to-white/3 backdrop-blur-xl border-white/8"
      case "heavy":
        return "bg-gradient-to-br from-white/12 via-white/6 to-white/12 backdrop-blur-3xl border-white/20"
      default:
        return "bg-gradient-to-br from-white/6 via-white/3 to-white/6 backdrop-blur-2xl border-white/12"
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Enhanced background glass effect */}
      <div className={cn("absolute inset-0 rounded-2xl border", getIntensityStyles())} />

      {/* Refined reflection gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 rounded-2xl" />

      {/* Subtle edge highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/4 rounded-2xl" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
