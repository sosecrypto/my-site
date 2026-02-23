"use client";

import Link from "next/link";
import GlowCard from "@/components/ui/GlowCard";
import Badge from "@/components/ui/Badge";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} aria-label={`${post.title} 글 읽기`}>
      <GlowCard className="h-full hover:scale-[1.01] transition-transform">
        {/* Category + Date */}
        <div className="flex items-center gap-3 mb-3">
          <Badge>{post.category}</Badge>
          <span className="text-xs font-mono text-text-secondary">
            {formatDate(post.created_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-text-secondary line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-text-secondary bg-bg-primary px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </GlowCard>
    </Link>
  );
}
