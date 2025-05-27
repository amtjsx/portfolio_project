"use client"

import Link from "next/link"
import { Github, Linkedin, Facebook, Twitter, Mail, X, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSocialBarVisibility } from "@/hooks/use-social-bar-visibility"
import { useSocialTracking } from "@/hooks/use-analytics"

export function MobileSocialBar() {
  const [isVisible, setIsVisible] = useSocialBarVisibility(true)
  const { trackSocialClick } = useSocialTracking()

  const socialLinks = [
    { href: "https://github.com", icon: <Github className="h-5 w-5" />, label: "GitHub" },
    { href: "https://linkedin.com", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { href: "https://facebook.com", icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { href: "https://twitter.com", icon: <Twitter className="h-5 w-5" />, label: "X (Twitter)" },
    { href: "mailto:alex.morgan@example.com", icon: <Mail className="h-5 w-5" />, label: "Email" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex items-center justify-around bg-background/90 p-3 backdrop-blur-sm border-t">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackSocialClick(link.label.toLowerCase().replace(" (twitter)", "").replace("x ", "twitter"))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVisible(false)}
              className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-background border text-muted-foreground shadow-sm hover:text-foreground"
              aria-label="Close social bar"
            >
              <X className="h-3 w-3" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex justify-center pb-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVisible(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
              aria-label="Show social links"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
