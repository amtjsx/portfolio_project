"use client";
import { motion } from "framer-motion";
import BlogManager from "./blog-manager";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Create, edit, and manage your blog posts
        </p>
      </motion.div>

      <BlogManager />
    </div>
  );
}
