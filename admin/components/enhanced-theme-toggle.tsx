"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  variant?: "switch" | "button" | "floating"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function EnhancedThemeToggle({ variant = "switch", size = "md", className }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const handleThemeChange = () => {
    setIsAnimating(true)

    // Create ripple effect from toggle position
    const toggleElement = document.querySelector("[data-theme-toggle]") as HTMLElement
    if (toggleElement) {
      createRippleEffect(toggleElement, !isDark)
    }

    setTimeout(() => {
      setTheme(isDark ? "light" : "dark")
      setTimeout(() => setIsAnimating(false), 300)
    }, 150)
  }

  if (!mounted) {
    return <div className={cn("h-9 w-9", className)} />
  }

  if (variant === "switch") {
    return (
      <div className={cn("flex items-center gap-2", className)} data-theme-toggle>
        <motion.div
          animate={{
            rotate: isDark ? 0 : 180,
            scale: isDark ? 1 : 0.8,
            opacity: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sun className="h-4 w-4 text-muted-foreground" />
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Switch
            checked={isDark}
            onCheckedChange={handleThemeChange}
            className={cn(
              "data-[state=checked]:bg-primary transition-all duration-300",
              isAnimating && "animate-pulse",
            )}
            aria-label="Toggle dark mode"
          />

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isDark ? "0 0 20px rgba(var(--primary), 0.3)" : "0 0 20px rgba(255, 193, 7, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 0.8 : 1,
            opacity: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Moon className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </div>
    )
  }

  if (variant === "button") {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={className} data-theme-toggle>
        <Button
          variant="ghost"
          size={size}
          onClick={handleThemeChange}
          className={cn("relative overflow-hidden", isAnimating && "animate-pulse")}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Dark</span>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">Light</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            animate={{ x: isAnimating ? ["-100%", "100%"] : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </Button>
      </motion.div>
    )
  }

  if (variant === "floating") {
    return (
      <motion.div
        className={cn("fixed bottom-6 right-6 z-50", "md:bottom-10 md:right-10", className)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        data-theme-toggle
      >
        <motion.button
          onClick={handleThemeChange}
          className={cn(
            "relative h-14 w-14 rounded-full shadow-lg",
            "bg-background/80 backdrop-blur-sm border",
            "flex items-center justify-center",
            "hover:shadow-xl transition-shadow duration-300",
          )}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon-floating"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <Moon className="h-6 w-6 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="sun-floating"
                initial={{ rotate: 180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -180, scale: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <Sun className="h-6 w-6 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Orbital rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-primary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.button>
      </motion.div>
    )
  }

  return null
}

// Ripple effect function
function createRippleEffect(element: HTMLElement, isDarkMode: boolean) {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const ripple = document.createElement("div")
  ripple.style.position = "fixed"
  ripple.style.left = centerX + "px"
  ripple.style.top = centerY + "px"
  ripple.style.width = "0"
  ripple.style.height = "0"
  ripple.style.borderRadius = "50%"
  ripple.style.background = isDarkMode
    ? "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
    : "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
  ripple.style.transform = "translate(-50%, -50%)"
  ripple.style.pointerEvents = "none"
  ripple.style.zIndex = "9998"
  ripple.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)"

  document.body.appendChild(ripple)

  // Trigger animation
  requestAnimationFrame(() => {
    const maxDimension = Math.max(window.innerWidth, window.innerHeight)
    ripple.style.width = maxDimension * 2 + "px"
    ripple.style.height = maxDimension * 2 + "px"
    ripple.style.opacity = "0"
  })

  // Clean up
  setTimeout(() => {
    document.body.removeChild(ripple)
  }, 600)
}
