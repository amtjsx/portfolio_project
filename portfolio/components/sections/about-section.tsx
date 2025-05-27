"use client"

import Image from "next/image"
import {
  User,
  MapPin,
  Calendar,
  Code,
  Heart,
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  Award,
  Users,
  Clock,
  Target,
  Star,
} from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedSection, AnimatedTitle, FadeInWhenVisible } from "@/components/animated-section"
import { ThemeAwareCard } from "@/components/theme-aware-animations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

const personalInfo = {
  name: "Alex Johnson",
  title: "Full-Stack Developer & UI/UX Designer",
  location: "San Francisco, CA",
  experience: "5+ Years",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/alexjohnson",
  github: "github.com/alexjohnson",
}

const stats = [
  { icon: Code, label: "Projects Completed", value: "50+", color: "text-blue-500" },
  { icon: Users, label: "Happy Clients", value: "30+", color: "text-green-500" },
  { icon: Award, label: "Awards Won", value: "8", color: "text-purple-500" },
  { icon: Clock, label: "Years Experience", value: "5+", color: "text-orange-500" },
]

const timeline = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    description: "Leading development of enterprise applications with React and Node.js",
    type: "work",
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    description: "Built scalable web applications and improved performance by 40%",
    type: "work",
  },
  {
    year: "2021",
    title: "Frontend Developer",
    company: "WebSolutions",
    description: "Specialized in React development and modern UI/UX design",
    type: "work",
  },
  {
    year: "2020",
    title: "Computer Science Degree",
    company: "University of California",
    description: "Bachelor's in Computer Science with focus on Software Engineering",
    type: "education",
  },
]

const interests = [
  { icon: "🎨", label: "Design", description: "UI/UX and Visual Design" },
  { icon: "📱", label: "Mobile Dev", description: "React Native & Flutter" },
  { icon: "🚀", label: "Innovation", description: "Latest Tech Trends" },
  { icon: "📸", label: "Photography", description: "Landscape & Portrait" },
  { icon: "🏔️", label: "Hiking", description: "Mountain Adventures" },
  { icon: "☕", label: "Coffee", description: "Third Wave Coffee Culture" },
]

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "I believe in delivering high-quality code and exceptional user experiences.",
    percentage: 95,
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together with teams to achieve common goals and share knowledge.",
    percentage: 90,
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Passionate about creating meaningful digital experiences that make a difference.",
    percentage: 98,
  },
  {
    icon: Code,
    title: "Innovation",
    description: "Always exploring new technologies and pushing the boundaries of what's possible.",
    percentage: 88,
  },
]

const testimonials = [
  {
    quote:
      "Alex delivered our e-commerce platform ahead of schedule and exceeded all our expectations. The attention to detail and user experience considerations were outstanding.",
    author: "Sarah Johnson",
    role: "CEO, FashionForward",
    image: "/client-1.png",
    rating: 5,
    project: "E-commerce Platform",
    date: "2024",
  },
  {
    quote:
      "Working with Alex was a game-changer for our startup. The task management app they built has streamlined our operations and saved us countless hours.",
    author: "Michael Chen",
    role: "Founder, TaskMaster",
    image: "/client-2.png",
    rating: 5,
    project: "Task Management App",
    date: "2023",
  },
  {
    quote:
      "Alex has a rare combination of technical expertise and creative vision. They transformed our outdated website into a modern, responsive platform that our customers love.",
    author: "Emily Rodriguez",
    role: "Marketing Director, TechInnovate",
    image: "/client-3.png",
    rating: 5,
    project: "Website Redesign",
    date: "2023",
  },
  {
    quote:
      "The real-estate platform Alex built for us has increased our lead generation by 300%. Their understanding of our business needs was exceptional.",
    author: "David Park",
    role: "Real Estate Broker",
    image: "/placeholder.svg?height=40&width=40&query=professional+headshot",
    rating: 5,
    project: "Real Estate Platform",
    date: "2024",
  },
  {
    quote:
      "Alex's AI content generator has revolutionized our content creation process. The quality and efficiency improvements have been remarkable.",
    author: "Lisa Wang",
    role: "Content Director, MediaCorp",
    image: "/placeholder.svg?height=40&width=40&query=professional+woman",
    rating: 5,
    project: "AI Content Generator",
    date: "2024",
  },
]

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"story" | "timeline" | "values" | "testimonials">("story")

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 flex flex-col items-center text-center">
            <FadeInWhenVisible>
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm p-3 text-primary">
                <User className="h-6 w-6" />
              </div>
            </FadeInWhenVisible>
            <AnimatedTitle>About Me</AnimatedTitle>
            <FadeInWhenVisible delay={0.2}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Passionate developer crafting digital experiences with modern technologies and creative solutions
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.3}>
              <div className="mt-4 h-1 w-20 rounded bg-gradient-to-r from-primary to-secondary"></div>
            </FadeInWhenVisible>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            {/* Left Column - Profile & Info */}
            <div className="space-y-8">
              {/* Profile Card */}
              <AnimatedSection delay={0.1}>
                <ThemeAwareCard className="p-8 text-center" intensity="medium">
                  <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-2xl">
                    <Image
                      src="/about-image.png"
                      alt="Profile"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
                  <p className="mt-2 text-lg text-primary font-medium">{personalInfo.title}</p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {personalInfo.location}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {personalInfo.experience}
                    </Badge>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <Button size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download CV
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </ThemeAwareCard>
              </AnimatedSection>

              {/* Contact Info */}
              <AnimatedSection delay={0.2}>
                <ThemeAwareCard className="p-6" intensity="subtle">
                  <h4 className="mb-4 text-lg font-semibold">Get In Touch</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Linkedin className="h-4 w-4 text-primary" />
                      <span>{personalInfo.linkedin}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Github className="h-4 w-4 text-primary" />
                      <span>{personalInfo.github}</span>
                    </div>
                  </div>
                </ThemeAwareCard>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection delay={0.3}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <ThemeAwareCard className="p-4 text-center" intensity="subtle">
                        <stat.icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </ThemeAwareCard>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column - Detailed Content */}
            <div className="space-y-8">
              {/* Tab Navigation */}
              <AnimatedSection delay={0.2}>
                <div className="flex rounded-lg bg-muted/50 p-1">
                  {[
                    { id: "story", label: "My Story", icon: User },
                    { id: "timeline", label: "Timeline", icon: Clock },
                    { id: "values", label: "Values", icon: Heart },
                    { id: "testimonials", label: "Testimonials", icon: Star },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </AnimatedSection>

              {/* Tab Content */}
              <AnimatedSection delay={0.3}>
                <ThemeAwareCard className="p-8" intensity="medium">
                  {activeTab === "story" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold">My Journey in Tech</h3>
                      <div className="space-y-4 text-muted-foreground">
                        <p>
                          My passion for technology began at age 15 when I built my first website. What started as
                          curiosity quickly evolved into a deep love for creating digital experiences that solve
                          real-world problems.
                        </p>
                        <p>
                          Over the past 5 years, I've had the privilege of working with amazing teams and clients,
                          building everything from small business websites to large-scale enterprise applications. Each
                          project has taught me something new and reinforced my belief in the power of technology to
                          make a positive impact.
                        </p>
                        <p>
                          I specialize in full-stack development with a focus on React, Node.js, and modern web
                          technologies. I'm passionate about writing clean, maintainable code and creating intuitive
                          user experiences that delight users and drive business results.
                        </p>
                        <p>
                          When I'm not coding, you'll find me exploring new hiking trails, experimenting with
                          photography, or discovering the latest coffee shops in the city. I believe that diverse
                          experiences outside of tech make me a better developer and more creative problem solver.
                        </p>
                      </div>

                      {/* Interests */}
                      <div className="mt-8">
                        <h4 className="mb-4 text-lg font-semibold">Interests & Hobbies</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {interests.map((interest, index) => (
                            <motion.div
                              key={interest.label}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 text-sm"
                            >
                              <span className="text-lg">{interest.icon}</span>
                              <div>
                                <div className="font-medium">{interest.label}</div>
                                <div className="text-xs text-muted-foreground">{interest.description}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "timeline" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold">Professional Timeline</h3>
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

                        <div className="space-y-8">
                          {timeline.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 }}
                              className="relative flex gap-6"
                            >
                              {/* Timeline dot */}
                              <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                  item.type === "work" ? "bg-primary border-primary" : "bg-secondary border-secondary"
                                }`}
                              >
                                {item.type === "work" ? (
                                  <Code className="h-4 w-4 text-primary-foreground" />
                                ) : (
                                  <Award className="h-4 w-4 text-secondary-foreground" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 pb-8">
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge variant={item.type === "work" ? "default" : "secondary"}>{item.year}</Badge>
                                  <h4 className="font-semibold">{item.title}</h4>
                                </div>
                                <p className="text-primary font-medium mb-2">{item.company}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "values" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold">Core Values & Principles</h3>
                      <p className="text-muted-foreground">
                        These values guide my approach to development and collaboration, ensuring I deliver exceptional
                        results while maintaining integrity and fostering positive relationships.
                      </p>

                      <div className="space-y-6">
                        {values.map((value, index) => (
                          <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <value.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{value.title}</h4>
                                <p className="text-sm text-muted-foreground">{value.description}</p>
                              </div>
                              <div className="text-sm font-medium text-primary">{value.percentage}%</div>
                            </div>
                            <Progress value={value.percentage} className="h-2" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "testimonials" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">What Clients Say</h3>
                        <p className="text-muted-foreground">
                          Real feedback from clients I've had the pleasure of working with
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm font-medium">5.0 average rating</span>
                          <span className="text-sm text-muted-foreground">({testimonials.length} reviews)</span>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                        {testimonials.map((testimonial, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                          >
                            <div className="relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-card/70">
                              {/* Quote Icon */}
                              <div className="absolute top-4 right-4 opacity-10">
                                <svg
                                  className="h-8 w-8 text-primary"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
                                  <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />
                                </svg>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center gap-1 mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>

                              {/* Quote */}
                              <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                                "{testimonial.quote}"
                              </blockquote>

                              {/* Client Info */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                                    <Image
                                      src={testimonial.image || "/placeholder.svg"}
                                      alt={testimonial.author}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <Badge variant="outline" className="mb-1">
                                    {testimonial.project}
                                  </Badge>
                                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                                </div>
                              </div>

                              {/* Hover Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl" />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonials Summary */}
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-center p-4 rounded-lg bg-muted/50"
                        >
                          <div className="text-2xl font-bold text-primary">100%</div>
                          <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-center p-4 rounded-lg bg-muted/50"
                        >
                          <div className="text-2xl font-bold text-primary">95%</div>
                          <div className="text-sm text-muted-foreground">Repeat Clients</div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 }}
                          className="text-center p-4 rounded-lg bg-muted/50"
                        >
                          <div className="text-2xl font-bold text-primary">48h</div>
                          <div className="text-sm text-muted-foreground">Avg Response Time</div>
                        </motion.div>
                      </div>

                      {/* Call to Action */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-center mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border"
                      >
                        <h4 className="text-lg font-semibold mb-2">Ready to Work Together?</h4>
                        <p className="text-muted-foreground mb-4">
                          Join these satisfied clients and let's create something amazing together.
                        </p>
                        <Button className="flex items-center gap-2 mx-auto">
                          <Mail className="h-4 w-4" />
                          Start Your Project
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </ThemeAwareCard>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
