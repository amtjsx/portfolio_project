"use client"

import type React from "react"

import Link from "next/link"
import {
  Mail,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Phone,
  MapPin,
  Clock,
  Send,
  Calendar,
  MessageSquare,
  Video,
  Coffee,
  Download,
  ExternalLink,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedSection, AnimatedTitle, AnimatedText, FadeInWhenVisible } from "@/components/animated-section"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: "",
      })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "alex.morgan@example.com",
      description: "Best for detailed project discussions",
      action: "Send Email",
      href: "mailto:alex.morgan@example.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Available Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      href: "tel:+15551234567",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "+1 (555) 123-4567",
      description: "Quick questions and updates",
      action: "Message",
      href: "https://wa.me/15551234567",
      color: "from-green-600 to-green-400",
    },
    {
      icon: Video,
      title: "Video Call",
      value: "Schedule Meeting",
      description: "Perfect for project planning",
      action: "Book Call",
      href: "https://calendly.com/alexmorgan",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/in/alexmorgan",
      followers: "2.5K",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com/alexmorgan",
      followers: "1.8K",
      color: "from-gray-700 to-gray-500",
    },
    {
      icon: Twitter,
      name: "X (Twitter)",
      href: "https://twitter.com/alexmorgan",
      followers: "3.2K",
      color: "from-gray-900 to-gray-700",
    },
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://facebook.com/alexmorgan",
      followers: "1.2K",
      color: "from-blue-700 to-blue-500",
    },
  ]

  const quickActions = [
    {
      icon: Download,
      title: "Download Resume",
      description: "Get my latest CV",
      action: "Download PDF",
      href: "/resume.pdf",
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Book a 30-min consultation",
      action: "Book Now",
      href: "https://calendly.com/alexmorgan",
    },
    {
      icon: Coffee,
      title: "Coffee Chat",
      description: "Casual project discussion",
      action: "Let's Chat",
      href: "mailto:alex.morgan@example.com?subject=Coffee Chat",
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container px-4 md:px-6 relative">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-primary font-medium">Let's Connect</span>
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <AnimatedTitle className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Get In Touch
            </AnimatedTitle>
            <FadeInWhenVisible delay={0.2}>
              <div className="mt-4 h-1 w-24 rounded bg-gradient-to-r from-primary to-secondary"></div>
            </FadeInWhenVisible>
            <AnimatedText delay={0.3} className="text-xl text-muted-foreground max-w-2xl">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together!
            </AnimatedText>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <AnimatedSection delay={0.2} className="lg:col-span-2">
              <div className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Send Me a Message</h3>
                    <p className="text-muted-foreground">I'll get back to you within 24 hours</p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground">Thank you for reaching out. I'll respond soon!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                          <span>Name</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                          <span>Email</span>
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="projectType" className="text-sm font-medium">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
                        >
                          <option value="">Select project type</option>
                          <option value="website">Website Development</option>
                          <option value="webapp">Web Application</option>
                          <option value="mobile">Mobile App</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="consulting">Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
                        >
                          <option value="">Select budget range</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                          <option value="discuss">Let's discuss</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
                        <span>Subject</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
                        placeholder="Brief description of your project"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                        <span>Message</span>
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="flex min-h-[150px] w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 resize-none"
                        placeholder="Tell me more about your project, goals, and requirements..."
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Message...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Send Message
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <AnimatedSection delay={0.3}>
                <div className="rounded-3xl border bg-card/50 backdrop-blur-sm p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Contact Methods
                  </h3>
                  <div className="space-y-4">
                    {contactMethods.map((method, index) => (
                      <motion.div
                        key={method.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="group"
                      >
                        <Link
                          href={method.href}
                          className="block p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${method.color} text-white`}>
                              <method.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm">{method.title}</h4>
                              <p className="text-xs text-muted-foreground truncate">{method.value}</p>
                              <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Quick Actions */}
              <AnimatedSection delay={0.4}>
                <div className="rounded-3xl border bg-card/50 backdrop-blur-sm p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={action.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link
                          href={action.href}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <action.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{action.title}</h4>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Social Links */}
              <AnimatedSection delay={0.5}>
                <div className="rounded-3xl border bg-card/50 backdrop-blur-sm p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Follow Me
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={social.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link
                          href={social.href}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                        >
                          <div className={`p-3 rounded-full bg-gradient-to-r ${social.color} text-white`}>
                            <social.icon className="h-5 w-5" />
                          </div>
                          <div className="text-center">
                            <h4 className="font-medium text-xs">{social.name}</h4>
                            <p className="text-xs text-muted-foreground">{social.followers} followers</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Availability Status */}
              <AnimatedSection delay={0.6}>
                <div className="rounded-3xl border bg-card/50 backdrop-blur-sm p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold">Available for Work</h3>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Response time: Within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Based in New York, EST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Next availability: Immediate</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Bottom CTA */}
          <AnimatedSection delay={0.7} className="mt-16 text-center">
            <div className="rounded-3xl border bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-sm p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's turn your vision into reality. I'm here to help you build something extraordinary that drives
                results and exceeds expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Link href="mailto:alex.morgan@example.com">
                      <Mail className="h-5 w-5 mr-2" />
                      Start a Project
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm">
                    <Link href="https://calendly.com/alexmorgan">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule a Call
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
