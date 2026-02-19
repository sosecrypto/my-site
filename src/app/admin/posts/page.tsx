import { getAllPosts } from "@/lib/supabase/admin-queries";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminPostList from "./admin-post-list";

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-sm text-accent-green mb-1">
            <span className="text-accent-cyan">$</span> ls -la posts/
          </p>
          <h1 className="text-2xl font-bold text-text-primary">글 관리</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan
            text-bg-primary font-mono text-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />새 글 작성
        </Link>
      </div>

      <AdminPostList initialPosts={posts} />
    </div>
  );
}
