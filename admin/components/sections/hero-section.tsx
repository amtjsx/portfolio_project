"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container px-4 py-24 md:px-6 md:py-32 lg:py-40">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm bg-background/30"
              >
                <span className="mr-1 rounded-full bg-primary h-2 w-2"></span>
                <span className="text-muted-foreground">Available for new projects</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span className="block">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-primary to-purple-400 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent">
                  Alex Morgan
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-[600px] text-xl text-muted-foreground md:text-2xl"
              >
                A passionate full-stack developer crafting beautiful digital experiences
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm border-border">
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-4 text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-background">
                    <Image src={`/client-${i}.png`} alt={`Client ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-medium">20+ projects</span> completed for clients worldwide
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -left-6 -top-6 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm -z-10"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-sm -z-10"
              ></motion.div>

              {/* Profile image with border */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-border bg-background/50 backdrop-blur-sm"
              >
                <Image
                  src="/professional-portrait.png"
                  alt="Alex Morgan - Professional Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
