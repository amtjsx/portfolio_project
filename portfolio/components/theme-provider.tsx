"use client"

import type React from "react"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeTransitionWrapper>{children}</ThemeTransitionWrapper>
    </NextThemesProvider>
  )
}

function ThemeTransitionWrapper({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleThemeChange = () => {
      setIsTransitioning(true)
      setTimeout(() => setIsTransitioning(false), 500)
    }

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          handleThemeChange()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {children}
      <AnimatePresence>{isTransitioning && <ThemeTransitionOverlay />}</AnimatePresence>
    </>
  )
}

function ThemeTransitionOverlay() {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-background pointer-events-none"
    />
  )
}
