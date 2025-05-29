"use client";

import { AnimatedThemeBackground } from "@/components/animated-theme-background";
import { ScrollProgressBar } from "@/components/enhanced-animations";
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle";
import { FloatingSocialBar } from "@/components/floating-social-bar";
import { Header } from "@/components/header";
import { MobileSocialBar } from "@/components/mobile-social-bar";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { AboutSection } from "@/components/sections/about-section";
import BlogSection from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EnhancedHeroSection } from "@/components/sections/enhanced-hero-section";
import { EnhancedProjectsSection } from "@/components/sections/enhanced-projects-section";
import { FooterSection } from "@/components/sections/footer-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { useActiveSection } from "@/hooks/use-active-section";
import { usePageTracking } from "@/hooks/use-analytics";
import { motion } from "framer-motion";
import "./grid-pattern.css";

export default function Home() {
  const activeSection = useActiveSection();

  // Track page views
  usePageTracking();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col relative"
    >
      {/* Scroll progress indicator */}
      <ScrollProgressBar />

      {/* Animated theme-aware background */}
      <AnimatedThemeBackground />

      {/* Floating theme toggle */}
      <EnhancedThemeToggle variant="floating" />

      <Header activeSection={activeSection} />
      <main className="flex-1">
        <EnhancedHeroSection />
        <EnhancedProjectsSection />
        <AboutSection />
        <SkillsSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <ScrollToTopButton />
      <FloatingSocialBar className="hidden md:flex" />
      <MobileSocialBar />
      <FooterSection />
    </motion.div>
  );
}
