"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types";
import { MOCK_POSTS } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";

const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
};

interface BlogPreviewProps {
  posts?: Post[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const displayPosts = posts && posts.length > 0
    ? posts.map((p) => ({
        date: p.created_at.slice(0, 10),
        category: p.category,
        title: p.title,
        slug: p.slug,
      }))
    : MOCK_POSTS;

  return (
    <section className="py-20">
      <SectionHeader command="tail -f blog.log" id="blog" />

      <div className="space-y-2 font-mono text-sm">
        {displayPosts.map((post, i) => (
          <motion.a
            key={post.title}
            href={`/blog/${post.slug}`}
            custom={i}
            variants={lineVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-secondary transition-colors group"
          >
            <span className="text-text-secondary shrink-0">[{post.date}]</span>
            <span className="text-accent-amber shrink-0">[{post.category}]</span>
            <span className="text-text-primary group-hover:text-accent-cyan transition-colors">
              {post.title}
            </span>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-accent-cyan hover:text-accent-green transition-colors"
        >
          <ArrowRight size={14} />
          전체 로그 보기 (/blog)
        </Link>
      </motion.div>
    </section>
  );
}
