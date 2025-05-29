"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScrollProgress, useParallax, useStaggeredInView, useMousePosition } from "@/hooks/use-scroll-animations"

// Enhanced Button with micro-interactions
interface EnhancedButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export function EnhancedButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  disabled = false,
}: EnhancedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      y: 0,
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-lg font-medium transition-colors",
        {
          "bg-primary text-primary-foreground": variant === "primary",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-border bg-background": variant === "outline",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-6 py-3 text-lg": size === "lg",
        },
        className,
      )}
      variants={buttonVariants}
      initial="idle"
      animate={isPressed ? "tap" : isHovered ? "hover" : "idle"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTapEnd={() => setIsPressed(false)}
      whileFocus={{
        boxShadow: "0 0 0 3px rgba(var(--primary), 0.3)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={isPressed ? { scale: 4, opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.6 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <span className="relative z-10">{children}</span>
    </Component>
  )
}

// Magnetic interaction component
export function MagneticWrapper({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}

// Scroll progress indicator
export function ScrollProgressBar() {
  const scaleX = useScrollProgress()

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left" style={{ scaleX }} />
}

// Enhanced card with hover effects
interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: "lift" | "glow" | "tilt" | "scale"
}

export function EnhancedCard({ children, className, hoverEffect = "lift" }: EnhancedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const mousePosition = useMousePosition()
  const ref = useRef<HTMLDivElement>(null)
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!ref.current || !isHovered) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateX = (mousePosition.y - centerY) / 10
    const rotateY = (centerX - mousePosition.x) / 10

    setCardPosition({ x: rotateY, y: rotateX })
  }, [mousePosition, isHovered])

  const cardVariants = {
    idle: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: hoverEffect === "scale" ? 1.05 : 1.02,
      rotateX: hoverEffect === "tilt" ? cardPosition.y : 0,
      rotateY: hoverEffect === "tilt" ? cardPosition.x : 0,
      boxShadow: hoverEffect === "glow" ? "0 20px 40px rgba(var(--primary), 0.3)" : "0 20px 40px rgba(0, 0, 0, 0.15)",
      y: hoverEffect === "lift" ? -8 : 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn("rounded-lg border bg-card/50 backdrop-blur-sm", className)}
      variants={cardVariants}
      initial="idle"
      animate={isHovered ? "hover" : "idle"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation
export function TextReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const words = children.split(" ")

  return (
    <span ref={ref} className="inline-block">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Staggered list animation
export function StaggeredList({ children, className }: { children: React.ReactNode[]; className?: string }) {
  const { ref, isInView } = useStaggeredInView()

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// Parallax container
export function ParallaxContainer({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) {
  const { ref, y } = useParallax(offset)

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

// Floating elements
export function FloatingElement({ children, duration = 6 }: { children: React.ReactNode; duration?: number }) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Morphing blob background
export function MorphingBlob({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl opacity-20", className)}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        borderRadius: ["50%", "40%", "50%"],
      }}
      transition={{
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  )
}
