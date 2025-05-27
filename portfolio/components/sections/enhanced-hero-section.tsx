"use client"

import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  EnhancedButton,
  MagneticWrapper,
  TextReveal,
  FloatingElement,
  MorphingBlob,
} from "@/components/enhanced-animations"
import { useInteractionTracking } from "@/hooks/use-analytics"

export function EnhancedHeroSection() {
  const { trackInteraction } = useInteractionTracking()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <MorphingBlob className="top-20 left-20 w-72 h-72 bg-primary/30" />
        <MorphingBlob className="bottom-20 right-20 w-96 h-96 bg-purple-500/20" />
        <MorphingBlob className="top-1/2 left-1/2 w-64 h-64 bg-blue-500/20" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingElement key={i} duration={4 + i * 0.5}>
            <motion.div
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          </FloatingElement>
        ))}
      </div>

      {/* Grid pattern */}
      <motion.div className="absolute inset-0 opacity-5" style={{ y: y1 }}>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <motion.div className="container px-4 py-24 md:px-6" style={{ opacity }}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              {/* Status badge with pulse animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm bg-background/30 relative overflow-hidden"
              >
                <motion.span
                  className="mr-2 rounded-full bg-primary h-2 w-2"
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(var(--primary), 0.7)", "0 0 0 10px rgba(var(--primary), 0)"],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-muted-foreground">Available for new projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                />
              </motion.div>

              {/* Main heading with text reveal */}
              <div className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Hi, I'm
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-primary to-purple-400 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TextReveal delay={0.7}>Alex Morgan</TextReveal>
                  <motion.div
                    className="absolute -top-4 -right-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="h-8 w-8 text-primary/60" />
                  </motion.div>
                </motion.span>
              </div>

              {/* Subtitle with typewriter effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[600px] text-xl text-muted-foreground md:text-2xl"
              >
                <TextReveal delay={1}>
                  A passionate full-stack developer crafting beautiful digital experiences
                </TextReveal>
              </motion.div>
            </div>

            {/* Enhanced buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <MagneticWrapper>
                <EnhancedButton
                  variant="primary"
                  size="lg"
                  onClick={() => trackInteraction("click", "hero-cta", "button")}
                  href="#projects"
                  className="group"
                >
                  View My Work
                  <motion.div
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </EnhancedButton>
              </MagneticWrapper>

              <MagneticWrapper>
                <EnhancedButton
                  variant="outline"
                  size="lg"
                  onClick={() => trackInteraction("click", "hero-contact", "button")}
                  href="#contact"
                  className="bg-background/50 backdrop-blur-sm border-border"
                >
                  Get In Touch
                </EnhancedButton>
              </MagneticWrapper>
            </motion.div>

            {/* Client showcase with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1.6 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.1,
                      zIndex: 10,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-background cursor-pointer"
                  >
                    <Image src={`/client-${i}.png`} alt={`Client ${i}`} fill className="object-cover" />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 }}
              >
                <span className="font-medium">20+ projects</span> completed for clients worldwide
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced profile image section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: y2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
              {/* Animated decorative elements */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -30, rotate: -10 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                className="absolute -left-6 -top-6 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm -z-10"
                whileHover={{ rotate: 10, scale: 1.1 }}
              />

              <motion.div
                initial={{ opacity: 0, x: 30, y: 30, rotate: 10 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8, type: "spring" }}
                className="absolute -bottom-6 -right-6 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm -z-10"
                whileHover={{ rotate: -10, scale: 1.1 }}
              />

              {/* Profile image with enhanced effects */}
              <MagneticWrapper strength={0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-border bg-background/50 backdrop-blur-sm group"
                  whileHover={{
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src="/professional-portrait.png"
                    alt="Alex Morgan - Professional Portrait"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />

                  {/* Overlay gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </MagneticWrapper>

              {/* Floating skill badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                React Expert
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
                className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                5+ Years
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
