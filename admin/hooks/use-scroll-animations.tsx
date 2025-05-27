"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useScroll, useTransform, useSpring } from "framer-motion"

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return scaleX
}

export function useParallax(offset = 50) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return { ref, y }
}

export function useStaggeredInView(threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: "-100px",
  })

  return { ref, isInView }
}

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    let lastScrollY = scrollY.get()
    let lastTime = Date.now()

    const unsubscribe = scrollY.onChange((current) => {
      const now = Date.now()
      const timeDelta = now - lastTime
      const scrollDelta = current - lastScrollY

      if (timeDelta > 0) {
        setVelocity(Math.abs(scrollDelta / timeDelta))
      }

      lastScrollY = current
      lastTime = now
    })

    return unsubscribe
  }, [scrollY])

  return velocity
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return mousePosition
}
