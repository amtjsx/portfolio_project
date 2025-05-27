"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedTitle, AnimatedText, AnimatedList, FadeInWhenVisible } from "@/components/animated-section"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
}

function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      <Card className="overflow-hidden h-full bg-card/50 backdrop-blur-sm shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <svg
                className="absolute -left-1 -top-1 h-6 w-6 text-primary/40"
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
              <p className="pl-6 text-muted-foreground italic">{quote}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
                <Image src={image || "/placeholder.svg"} alt={author} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-medium">{author}</h4>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Alex delivered our e-commerce platform ahead of schedule and exceeded all our expectations. The attention to detail and user experience considerations were outstanding.",
      author: "Sarah Johnson",
      role: "CEO, FashionForward",
      image: "/client-1.png",
    },
    {
      quote:
        "Working with Alex was a game-changer for our startup. The task management app they built has streamlined our operations and saved us countless hours.",
      author: "Michael Chen",
      role: "Founder, TaskMaster",
      image: "/client-2.png",
    },
    {
      quote:
        "Alex has a rare combination of technical expertise and creative vision. They transformed our outdated website into a modern, responsive platform that our customers love.",
      author: "Emily Rodriguez",
      role: "Marketing Director, TechInnovate",
      image: "/client-3.png",
    },
  ]

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-center text-center">
            <AnimatedTitle>What Clients Say</AnimatedTitle>
            <FadeInWhenVisible delay={0.2}>
              <div className="mt-4 h-1 w-16 rounded bg-primary"></div>
            </FadeInWhenVisible>
            <AnimatedText delay={0.3}>
              I've had the pleasure of working with amazing clients. Here's what they have to say about our
              collaboration.
            </AnimatedText>
          </div>

          <AnimatedList staggerDelay={0.2} gridClassName="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
              />
            ))}
          </AnimatedList>
        </div>
      </div>
    </section>
  )
}
