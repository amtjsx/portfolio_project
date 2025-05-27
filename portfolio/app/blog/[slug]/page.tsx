"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Facebook, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog"
import Link from "next/link"
import Image from "next/image"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => router.push("/blog")}>Back to Blog</Button>
        </div>
      </div>
    )
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `Check out this article: ${post.title}`

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-4 text-white hover:text-white/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              {post.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Image
                  src="/professional-portrait.png"
                  alt={post.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="font-semibold mb-4">Share this article</h3>
                <div className="flex gap-3">
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="block group">
                        <h4 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{relatedPost.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
