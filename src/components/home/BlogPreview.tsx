"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";

const MOCK_POSTS = [
  { date: "2026-02-15", category: "기술", title: "AI 시대의 개발자 역할 변화", slug: "#" },
  { date: "2026-02-10", category: "생각", title: "Web3와 탈중앙화의 미래", slug: "#" },
  { date: "2026-01-28", category: "활동", title: "DeSpread 팀과 함께한 1년", slug: "#" },
];

const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
};

export default function BlogPreview() {
  return (
    <section className="py-20">
      <SectionHeader command="tail -f blog.log" id="blog" />

      <div className="space-y-2 font-mono text-sm">
        {MOCK_POSTS.map((post, i) => (
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
