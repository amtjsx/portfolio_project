"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AnimatedNavProps {
  items: {
    href: string
    label: string
  }[]
  activeSection: string
}

export function AnimatedNav({ items, activeSection }: AnimatedNavProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  })
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Update the indicator position when the active section changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = items.findIndex((item) => item.href === `#${activeSection}`)

      if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
        const activeItem = itemRefs.current[activeIndex]
        if (!activeItem) return

        const navRect = navRef.current?.getBoundingClientRect()
        const activeItemRect = activeItem.getBoundingClientRect()

        if (navRect) {
          setIndicatorStyle({
            left: activeItemRect.left - navRect.left,
            width: activeItemRect.width,
          })
        }
      }
    }

    // Initial update
    updateIndicator()

    // Update on resize
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [activeSection, items])

  return (
    <div ref={navRef} className="relative flex items-center gap-6">
      {/* Animated Indicator */}
      <div
        className="absolute -bottom-1 h-0.5 bg-primary transition-all duration-300 ease-in-out"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />

      {/* Nav Items */}
      {items.map((item, index) => {
        const isActive = `#${activeSection}` === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => (itemRefs.current[index] = el)}
            className={cn(
              "group relative text-sm font-medium transition-colors duration-300",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
            {!isActive && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary/60 transition-all duration-300 group-hover:w-full" />
            )}
          </Link>
        )
      })}
    </div>
  )
}
