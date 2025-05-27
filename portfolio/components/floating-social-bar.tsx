"use client"

import Link from "next/link"
import { Github, Linkedin, Facebook, Twitter, Mail, X, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSocialBarVisibility } from "@/hooks/use-social-bar-visibility"
import { useSocialTracking } from "@/hooks/use-analytics"

export function FloatingSocialBar({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useSocialBarVisibility(true)
  const { trackSocialClick } = useSocialTracking()

  const socialLinks = [
    { href: "https://github.com", icon: <Github className="h-4 w-4" />, label: "GitHub" },
    { href: "https://linkedin.com", icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn" },
    { href: "https://facebook.com", icon: <Facebook className="h-4 w-4" />, label: "Facebook" },
    { href: "https://twitter.com", icon: <Twitter className="h-4 w-4" />, label: "X (Twitter)" },
    { href: "mailto:alex.morgan@example.com", icon: <Mail className="h-4 w-4" />, label: "Email" },
  ]

  return (
    <div className={cn("fixed bottom-6 left-6 z-50 md:bottom-10 md:left-10", className)}>
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative flex flex-col items-center gap-4 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm border">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border text-muted-foreground shadow-sm hover:text-foreground"
                aria-label="Close social bar"
              >
                <X className="h-3 w-3" />
              </motion.button>

              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackSocialClick(link.label.toLowerCase().replace(" (twitter)", "").replace("x ", "twitter"))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-2 h-16 w-0.5 bg-border"
              />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVisible(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
            aria-label="Show social links"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
