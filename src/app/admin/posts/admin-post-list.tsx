"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { Post } from "@/types";

interface AdminPostListProps {
  initialPosts: Post[];
}

export default function AdminPostList({ initialPosts }: AdminPostListProps) {
  const [posts, setPosts] = useState(initialPosts);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const { deletePost } = await import("@/lib/supabase/admin-queries");
      const success = await deletePost(id);
      if (success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      const { togglePublish } = await import("@/lib/supabase/admin-queries");
      const success = await togglePublish(id, !published);
      if (success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, published: !published } : p
          )
        );
      }
    } catch {
      alert("상태 변경에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-2">
      {posts.length === 0 ? (
        <p className="text-center py-12 font-mono text-text-secondary">
          작성된 글이 없습니다.
        </p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-bg-secondary"
          >
            {/* Published toggle */}
            <button
              onClick={() => handleTogglePublish(post.id, post.published)}
              className={`w-3 h-3 rounded-full shrink-0 transition-colors ${
                post.published ? "bg-accent-green" : "bg-text-secondary"
              }`}
              title={post.published ? "공개" : "비공개"}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary truncate">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge>{post.category}</Badge>
                <span className="text-xs font-mono text-text-secondary">
                  {formatDate(post.created_at)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="p-2 text-text-secondary hover:text-accent-cyan transition-colors"
              >
                <Edit size={16} />
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 text-text-secondary hover:text-accent-rose transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
