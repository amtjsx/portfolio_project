"use client";

import { useSocialTracking } from "@/hooks/use-analytics";
import { useSocialBarVisibility } from "@/hooks/use-social-bar-visibility";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Facebook,
  Github,
  Linkedin,
  Mail,
  Share2,
  Twitter
} from "lucide-react";
import Link from "next/link";

export function FloatingSocialBar({ className }: { className?: string }) {
  const [isCollapsed, setIsCollapsed] = useSocialBarVisibility(false);
  const { trackSocialClick } = useSocialTracking();

  const socialLinks = [
    {
      href: "https://github.com",
      icon: <Github className="h-4 w-4" />,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com",
      icon: <Linkedin className="h-4 w-4" />,
      label: "LinkedIn",
    },
    {
      href: "https://facebook.com",
      icon: <Facebook className="h-4 w-4" />,
      label: "Facebook",
    },
    {
      href: "https://twitter.com",
      icon: <Twitter className="h-4 w-4" />,
      label: "X (Twitter)",
    },
    {
      href: "mailto:alex.morgan@example.com",
      icon: <Mail className="h-4 w-4" />,
      label: "Email",
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-50 md:bottom-10 md:left-10",
        className
      )}
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        {isCollapsed ? (
          // Collapsed state - small expand button
          <motion.button
            layout
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 shadow-lg backdrop-blur-sm border text-muted-foreground hover:text-foreground hover:bg-background/90 transition-colors"
            aria-label="Expand social bar"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        ) : (
          // Expanded state - full social bar
          <motion.div
            layout
            className="relative flex flex-col items-center gap-4 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm border"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCollapsed(true)}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border text-muted-foreground shadow-sm hover:text-foreground"
              aria-label="Close social bar"
            >
              <ChevronDown className="h-3 w-3" />
            </motion.button>

            {socialLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackSocialClick(
                      link.label
                        .toLowerCase()
                        .replace(" (twitter)", "")
                        .replace("x ", "twitter")
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 64 }}
              transition={{ delay: 0.1, duration: 0.1 }}
              className="mt-2 w-0.5 bg-border"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
