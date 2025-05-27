"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ThemeAwareCardProps {
  children: React.ReactNode
  className?: string
  intensity?: "subtle" | "medium" | "heavy"
}

export function ThemeAwareCard({ children, className, intensity = "medium" }: ThemeAwareCardProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className={className}>{children}</div>

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const getIntensityStyles = () => {
    switch (intensity) {
      case "subtle":
        return isDark ? "bg-card/30 border-border/30 backdrop-blur-lg" : "bg-card/60 border-border/20 backdrop-blur-xl"
      case "heavy":
        return isDark
          ? "bg-card/70 border-border/70 backdrop-blur-3xl"
          : "bg-card/90 border-border/40 backdrop-blur-3xl"
      default:
        return isDark
          ? "bg-card/50 border-border/50 backdrop-blur-2xl"
          : "bg-card/80 border-border/30 backdrop-blur-2xl"
    }
  }

  return (
    <motion.div
      className={cn(
        "rounded-lg border transition-all duration-500 relative overflow-hidden",
        getIntensityStyles(),
        className,
      )}
      animate={{
        boxShadow: isDark
          ? "0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03)"
          : "0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03)",
      }}
      whileHover={{
        boxShadow: isDark
          ? "0 8px 25px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)"
          : "0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06)",
        y: -2,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Refined glass reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-40 dark:opacity-20" />

      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/1 to-white/3 dark:from-transparent dark:via-white/0.5 dark:to-white/1.5" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

interface ThemeAwareButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  className?: string
  onClick?: () => void
  intensity?: "subtle" | "medium" | "heavy"
}

export function ThemeAwareButton({
  children,
  variant = "primary",
  className,
  onClick,
  intensity = "medium",
}: ThemeAwareButtonProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    )

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const getVariantStyles = () => {
    const baseOpacity = intensity === "subtle" ? "8" : intensity === "heavy" ? "20" : "12"
    const hoverOpacity = intensity === "subtle" ? "15" : intensity === "heavy" ? "30" : "22"

    switch (variant) {
      case "primary":
        return isDark
          ? `bg-primary/90 text-primary-foreground hover:bg-primary/95 backdrop-blur-xl`
          : `bg-primary/90 text-primary-foreground hover:bg-primary/95 backdrop-blur-xl`
      case "secondary":
        return isDark
          ? `bg-secondary/${baseOpacity} text-secondary-foreground hover:bg-secondary/${hoverOpacity} backdrop-blur-xl`
          : `bg-secondary text-secondary-foreground hover:bg-secondary/${baseOpacity} backdrop-blur-xl`
      case "outline":
        return isDark
          ? `border border-border/50 bg-background/${baseOpacity} hover:bg-accent/${hoverOpacity} backdrop-blur-xl`
          : `border border-border bg-background/${baseOpacity} hover:bg-accent backdrop-blur-xl`
      default:
        return ""
    }
  }

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-lg px-4 py-2 font-medium transition-all duration-300",
        getVariantStyles(),
        className,
      )}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: isHovered
          ? isDark
            ? "0 8px 25px rgba(var(--primary), 0.25)"
            : "0 8px 25px rgba(var(--primary), 0.15)"
          : "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Refined animated background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isHovered
            ? isDark
              ? "linear-gradient(45deg, rgba(var(--primary), 0.08), rgba(var(--primary), 0.15))"
              : "linear-gradient(45deg, rgba(var(--primary), 0.04), rgba(var(--primary), 0.08))"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Enhanced shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent -skew-x-12"
        animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Subtle inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/2 rounded-lg" />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export function ThemeTransitionIndicator() {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 1000)
    return () => clearTimeout(timer)
  }, [theme, mounted])

  if (!mounted || !isTransitioning) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-2xl border border-white/15 rounded-lg px-3 py-2 text-sm font-medium shadow-lg"
    >
      <motion.div
        className="flex items-center gap-2"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.5, repeat: 1 }}
      >
        <motion.div
          className="w-2 h-2 bg-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        />
        Switching to {theme} mode
      </motion.div>
    </motion.div>
  )
}
