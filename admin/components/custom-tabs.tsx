"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CustomTabsProps {
  tabs: string[]
  defaultTab?: string
  onChange?: (tab: string) => void
  className?: string
}

export function CustomTabs({ tabs, defaultTab, onChange, className }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (onChange) {
      onChange(tab)
    }
  }

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative grid w-full max-w-md grid-cols-3 p-1 rounded-xl bg-muted/50 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={cn(
              "relative z-10 px-6 py-3 text-sm font-medium transition-all",
              activeTab === tab ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {activeTab === tab && (
              <motion.span
                layoutId="activeTabBackground"
                className="absolute inset-0 z-[-1] rounded-lg bg-primary"
                style={{ borderRadius: 8 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
