"use client"

import { useState, useEffect, useRef } from "react"

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Options for the observer
    const options = {
      root: null, // viewport is used as the root
      rootMargin: "0px 0px -50% 0px", // Consider section in view when it's 50% visible
      threshold: 0.1, // Trigger when 10% of the section is visible
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // If the section is in view and has an id
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id)
        }
      })
    }

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersect, options)

    // Observe all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return activeSection
}
