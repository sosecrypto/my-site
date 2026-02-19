import { Suspense } from "react";
import { getPublishedPosts } from "@/lib/supabase/queries";
import PostCard from "@/components/blog/PostCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그",
  description: "엄상현의 블로그 — 기술, 생각, 활동에 대한 글",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = params.category;
  const posts = await getPublishedPosts(category);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-sm text-text-secondary mb-2">
          <span className="text-accent-cyan">$</span> ls -la blog/
        </p>
        <h1 className="text-3xl font-bold text-text-primary">블로그</h1>
      </div>

      {/* Category filter */}
      <Suspense fallback={null}>
        <CategoryFilter />
      </Suspense>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-mono text-text-secondary">
            아직 작성된 글이 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
