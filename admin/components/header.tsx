"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedNav } from "@/components/animated-nav"

interface HeaderProps {
  activeSection: string
}

export function Header({ activeSection }: HeaderProps) {
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="relative h-8 w-8 overflow-hidden rounded-full bg-primary"
          >
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
              P
            </span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-semibold tracking-tight"
          >
            Portfolio
          </motion.span>
        </Link>

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:block"
        >
          <AnimatedNav items={navItems} activeSection={activeSection} />
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <Button asChild className="hidden md:flex">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </motion.div>
      </div>
    </header>
  )
}
