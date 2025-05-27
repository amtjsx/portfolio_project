"use client"

import { useState, useEffect } from "react"

export function useSocialBarVisibility(defaultValue = true) {
  const [isVisible, setIsVisible] = useState(defaultValue)

  // Load visibility state from localStorage on component mount
  useEffect(() => {
    const savedVisibility = localStorage.getItem("socialBarVisible")
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === "true")
    }
  }, [])

  // Save visibility state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("socialBarVisible", isVisible.toString())
  }, [isVisible])

  return [isVisible, setIsVisible] as const
}
