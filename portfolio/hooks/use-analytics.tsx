"use client"

import { useEffect, useCallback } from "react"

// Generate a unique session ID
const generateSessionId = () => {
  if (typeof window !== "undefined") {
    let sessionId = sessionStorage.getItem("portfolio_session_id")
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("portfolio_session_id", sessionId)
    }
    return sessionId
  }
  return null
}

// Get device information
const getDeviceInfo = () => {
  if (typeof window === "undefined") return {}

  const userAgent = navigator.userAgent
  let deviceType = "desktop"
  let browser = "unknown"
  let os = "unknown"

  // Detect device type
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    deviceType = "tablet"
  } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    deviceType = "mobile"
  }

  // Detect browser
  if (userAgent.includes("Chrome")) browser = "Chrome"
  else if (userAgent.includes("Firefox")) browser = "Firefox"
  else if (userAgent.includes("Safari")) browser = "Safari"
  else if (userAgent.includes("Edge")) browser = "Edge"

  // Detect OS
  if (userAgent.includes("Windows")) os = "Windows"
  else if (userAgent.includes("Mac")) os = "macOS"
  else if (userAgent.includes("Linux")) os = "Linux"
  else if (userAgent.includes("Android")) os = "Android"
  else if (userAgent.includes("iOS")) os = "iOS"

  return { deviceType, browser, os }
}

export function usePageTracking() {
  useEffect(() => {
    const trackPageView = async () => {
      const sessionId = generateSessionId()
      if (!sessionId) return

      const deviceInfo = getDeviceInfo()

      const pageView: PageView = {
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: sessionId,
        ...deviceInfo,
      }

      try {
        await supabase.from("page_views").insert([pageView])
      } catch (error) {
        console.error("Error tracking page view:", error)
      }
    }

    trackPageView()
  }, [])
}

export function useInteractionTracking() {
  const trackInteraction = useCallback(
    async (eventType: string, elementId?: string, elementType?: string, data?: any) => {
      const sessionId = generateSessionId()
      if (!sessionId) return

      const interaction: UserInteraction = {
        session_id: sessionId,
        event_type: eventType,
        element_id: elementId,
        element_type: elementType,
        page_path: window.location.pathname,
        data: data,
      }

      try {
        await supabase.from("user_interactions").insert([interaction])
      } catch (error) {
        console.error("Error tracking interaction:", error)
      }
    },
    [],
  )

  return { trackInteraction }
}

export function useProjectTracking() {
  const trackProjectView = useCallback(async (projectId: string, projectTitle?: string) => {
    const sessionId = generateSessionId()
    if (!sessionId) return

    const projectView: ProjectView = {
      project_id: projectId,
      project_title: projectTitle,
      session_id: sessionId,
      referrer: document.referrer || null,
    }

    try {
      await supabase.from("project_views").insert([projectView])
    } catch (error) {
      console.error("Error tracking project view:", error)
    }
  }, [])

  return { trackProjectView }
}

export function useSocialTracking() {
  const trackSocialClick = useCallback(async (platform: string) => {
    const sessionId = generateSessionId()
    if (!sessionId) return

    const socialClick: SocialClick = {
      platform,
      session_id: sessionId,
      page_path: window.location.pathname,
    }

    try {
      await supabase.from("social_clicks").insert([socialClick])
    } catch (error) {
      console.error("Error tracking social click:", error)
    }
  }, [])

  return { trackSocialClick }
}
