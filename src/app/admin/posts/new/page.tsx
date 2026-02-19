"use client";

import PostForm, { type PostFormData } from "@/components/admin/PostForm";
import { createPost } from "@/lib/supabase/admin-queries";

export default function NewPostPage() {
  const handleSubmit = async (data: PostFormData) => {
    await createPost(data);
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <p className="font-mono text-sm text-accent-green mb-1">
          <span className="text-accent-cyan">$</span> vim new-post.md
        </p>
        <h1 className="text-2xl font-bold text-text-primary">새 글 작성</h1>
      </div>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
