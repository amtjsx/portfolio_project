"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-primary"
          aria-label="Toggle dark mode"
        />
      </motion.div>
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}
