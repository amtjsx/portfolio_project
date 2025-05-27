"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/lib/blog"

interface FeaturedPostProps {
  post: BlogPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        whileHover={{ scale: 1.02 }}
        className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative h-64 lg:h-full overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-3 h-3" />
                Featured
              </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">{post.category}</span>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{post.excerpt}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/professional-portrait.png"
                  alt={post.author}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
