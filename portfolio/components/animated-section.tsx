"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedTitle({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
    >
      {children}
    </motion.h2>
  )
}

export function AnimatedText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mt-4 max-w-[700px] text-lg text-muted-foreground"
    >
      {children}
    </motion.p>
  )
}

interface AnimatedListProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
  gridClassName?: string
  itemClassName?: string
}

export function AnimatedList({
  children,
  staggerDelay = 0.1,
  className,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  itemClassName,
}: AnimatedListProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={cn(className)}
    >
      <div className={gridClassName}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div key={index} variants={item} className={cn("h-full", itemClassName)}>
                {child}
              </motion.div>
            ))
          : children}
      </div>
    </motion.div>
  )
}

export function AnimatedImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <img src={src || "/placeholder.svg"} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  )
}

export function FadeInWhenVisible({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}
