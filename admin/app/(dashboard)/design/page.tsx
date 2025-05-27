"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Eye, GitFork, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const templates = [
  {
    id: 1,
    title: "Logo particles (v0 + aws)",
    author: "Alex Chen",
    authorAvatar: "/placeholder.svg?height=32&width=32&query=developer+avatar",
    forks: 6800,
    views: 12500,
    stars: 234,
    preview:
      "/placeholder.svg?height=300&width=500&query=dark+particle+animation+logo",
    category: "Animation",
    trending: true,
  },
  {
    id: 2,
    title: "Creative Agency Portfolio",
    author: "Sarah Wilson",
    authorAvatar: "/placeholder.svg?height=32&width=32&query=designer+avatar",
    forks: 16500,
    views: 28900,
    stars: 892,
    preview:
      "/placeholder.svg?height=300&width=500&query=creative+agency+portfolio+dark+theme",
    category: "Portfolio",
    trending: false,
  },
  {
    id: 3,
    title: "Tetris Game",
    author: "Mike Johnson",
    authorAvatar:
      "/placeholder.svg?height=32&width=32&query=game+developer+avatar",
    forks: 4500,
    views: 8200,
    stars: 156,
    preview:
      "/placeholder.svg?height=300&width=500&query=tetris+game+interface+colorful",
    category: "Game",
    trending: true,
  },
  {
    id: 4,
    title: "Cuisine Selector Chips",
    author: "Emma Davis",
    authorAvatar:
      "/placeholder.svg?height=32&width=32&query=ui+designer+avatar",
    forks: 3200,
    views: 5800,
    stars: 98,
    preview:
      "/placeholder.svg?height=300&width=500&query=cuisine+selector+dark+interface+chips",
    category: "UI Component",
    trending: false,
  },
  {
    id: 5,
    title: "Calendar App",
    author: "David Kim",
    authorAvatar:
      "/placeholder.svg?height=32&width=32&query=product+designer+avatar",
    forks: 8900,
    views: 15600,
    stars: 445,
    preview:
      "/placeholder.svg?height=300&width=500&query=calendar+app+colorful+mountain+background",
    category: "Productivity",
    trending: true,
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    author: "Lisa Rodriguez",
    authorAvatar:
      "/placeholder.svg?height=32&width=32&query=data+analyst+avatar",
    forks: 12100,
    views: 22300,
    stars: 678,
    preview:
      "/placeholder.svg?height=300&width=500&query=analytics+dashboard+charts+metrics",
    category: "Dashboard",
    trending: false,
  },
  {
    id: 7,
    title: "E-commerce Landing",
    author: "Tom Anderson",
    authorAvatar:
      "/placeholder.svg?height=32&width=32&query=frontend+developer+avatar",
    forks: 9700,
    views: 18400,
    stars: 523,
    preview:
      "/placeholder.svg?height=300&width=500&query=ecommerce+landing+page+modern",
    category: "E-commerce",
    trending: true,
  },
  {
    id: 8,
    title: "Social Media App",
    author: "Nina Patel",
    authorAvatar:
      "/placeholder.svg?height=32&width=32&query=mobile+designer+avatar",
    forks: 15300,
    views: 31200,
    stars: 834,
    preview:
      "/placeholder.svg?height=300&width=500&query=social+media+app+interface+mobile",
    category: "Social",
    trending: false,
  },
  {
    id: 9,
    title: "Weather Widget",
    author: "Chris Lee",
    authorAvatar:
      "/placeholder.svg?height=32&width=32&query=weather+app+developer+avatar",
    forks: 5400,
    views: 9800,
    stars: 267,
    preview:
      "/placeholder.svg?height=300&width=500&query=weather+widget+beautiful+interface",
    category: "Widget",
    trending: true,
  },
];

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export default function Component() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="relative border-b backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div
            className={`flex items-center justify-between transition-all duration-1000`}
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
                From the Community
              </h1>
              <p className="text-muted-foreground mt-1 animate-fade-in-up">
                Explore what the community is building with v0.
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground group transition-all duration-300 hover:scale-105"
            >
              Browse All
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <Card
              key={template.id}
              className={`group cursor-pointer transition-all duration-500 border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredCard(template.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0 relative overflow-hidden">
                {/* Trending Badge */}
                {template.trending && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                      🔥 Trending
                    </Badge>
                  </div>
                )}

                {/* Preview Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={template.preview || "/placeholder.svg"}
                    alt={template.title}
                    width={500}
                    height={300}
                    className={`w-full h-48 object-cover transition-all duration-700 ${
                      hoveredCard === template.id
                        ? "scale-110 brightness-110"
                        : "scale-100"
                    }`}
                  />

                  {/* Overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                      hoveredCard === template.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span className="text-xs">
                              <AnimatedCounter
                                value={template.views}
                                duration={1000}
                              />
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span className="text-xs">
                              <AnimatedCounter
                                value={template.stars}
                                duration={1000}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="secondary"
                      className={`bg-background/80 backdrop-blur-sm transition-all duration-300 ${
                        hoveredCard === template.id
                          ? "scale-110 bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      {template.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className={`font-semibold text-foreground mb-3 transition-all duration-300 ${
                      hoveredCard === template.id
                        ? "text-primary transform translate-x-1"
                        : ""
                    }`}
                  >
                    {template.title}
                  </h3>

                  {/* Author and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`relative transition-transform duration-300 ${
                          hoveredCard === template.id ? "scale-110" : ""
                        }`}
                      >
                        <Image
                          src={template.authorAvatar || "/placeholder.svg"}
                          alt={template.author}
                          width={24}
                          height={24}
                          className="rounded-full ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-300"
                        />
                        <div
                          className={`absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 ${
                            hoveredCard === template.id ? "opacity-20" : ""
                          }`}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {template.author}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      <GitFork className="h-3 w-3" />
                      <span className="text-sm">
                        {formatNumber(template.forks)} Forks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-primary opacity-0 transition-opacity duration-300 ${
                    hoveredCard === template.id ? "opacity-20" : ""
                  }`}
                  style={{ padding: "1px" }}
                >
                  <div className="w-full h-full bg-background rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Button
            variant="outline"
            size="lg"
            className="group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <span className="group-hover:animate-pulse">
              Load More Templates
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
