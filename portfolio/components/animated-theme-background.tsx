"use client"

import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedThemeBackground() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="dark-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Dark mode gradient - clean blues and purples */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950"
              animate={{
                background: [
                  "linear-gradient(to bottom right, #111827, #1e293b, #030712)",
                  "linear-gradient(to bottom right, #1f2937, #334155, #111827)",
                  "linear-gradient(to bottom right, #111827, #1e293b, #030712)",
                ],
              }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Dark mode particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={`dark-particle-${i}`}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.5, 1.5, 0.5],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Dark mode aurora effect - clean colors */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
                  "radial-gradient(ellipse at 40% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
                  "radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="light-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Light mode gradient - clean whites and soft blues */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"
              animate={{
                background: [
                  "linear-gradient(to bottom right, #f8fafc, #ffffff, #eff6ff)",
                  "linear-gradient(to bottom right, #f1f5f9, #f8fafc, #e0f2fe)",
                  "linear-gradient(to bottom right, #f8fafc, #ffffff, #eff6ff)",
                ],
              }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Light mode particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`light-particle-${i}`}
                  className="absolute w-2 h-2 bg-primary/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.6, 0.1],
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Light mode subtle rays - clean blues and purples */}
            <motion.div
              className="absolute inset-0 opacity-15"
              animate={{
                background: [
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59, 130, 246, 0.1) 60deg, transparent 120deg, rgba(139, 92, 246, 0.1) 180deg, transparent 240deg, rgba(99, 102, 241, 0.1) 300deg, transparent 360deg)",
                  "conic-gradient(from 60deg at 50% 50%, transparent 0deg, rgba(59, 130, 246, 0.1) 60deg, transparent 120deg, rgba(139, 92, 246, 0.1) 180deg, transparent 240deg, rgba(99, 102, 241, 0.1) 300deg, transparent 360deg)",
                  "conic-gradient(from 120deg at 50% 50%, transparent 0deg, rgba(59, 130, 246, 0.1) 60deg, transparent 120deg, rgba(139, 92, 246, 0.1) 180deg, transparent 240deg, rgba(99, 102, 241, 0.1) 300deg, transparent 360deg)",
                ],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid pattern overlay */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"
        animate={{ opacity: isDark ? [0.05, 0.03, 0.05] : [0.02, 0.04, 0.02] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}
