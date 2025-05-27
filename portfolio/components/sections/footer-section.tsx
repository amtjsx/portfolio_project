"use client"

import Link from "next/link"
import { Github, Mail, Linkedin, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

export function FooterSection() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <AnimatedSection delay={0.1}>
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                  P
                </span>
              </div>
              <span className="font-semibold tracking-tight">Alex Morgan</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              A passionate full-stack developer crafting beautiful digital experiences. Based in San Francisco, CA.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Link href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Link href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Link href="mailto:alex.morgan@example.com">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <AnimatedSection delay={0.2}>
              <h4 className="text-sm font-medium">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-muted-foreground transition-colors hover:text-foreground">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-muted-foreground transition-colors hover:text-foreground">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h4 className="text-sm font-medium">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Consulting
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Code Review
                  </Link>
                </li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection delay={0.5} className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Alex Morgan. All rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Designed and built with ❤️ using Next.js and Tailwind CSS
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  )
}
