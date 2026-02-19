import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/supabase/queries";
import PostContent from "@/components/blog/PostContent";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "글을 찾을 수 없습니다" };

  return {
    title: post.title,
    description: post.excerpt ?? post.content.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.content.slice(0, 150),
      type: "article",
      ...(post.cover_image && { images: [post.cover_image] }),
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div>
      {/* Back link */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          블로그 목록
        </Link>
      </div>

      <PostContent post={post} />
    </div>
  );
}
