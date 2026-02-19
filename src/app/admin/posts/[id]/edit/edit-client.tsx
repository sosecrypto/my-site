"use client";

import PostForm, { type PostFormData } from "@/components/admin/PostForm";
import { updatePost } from "@/lib/supabase/admin-queries";
import type { Post } from "@/types";

interface EditPostClientProps {
  post: Post;
}

export default function EditPostClient({ post }: EditPostClientProps) {
  const handleSubmit = async (data: PostFormData) => {
    await updatePost(post.id, data);
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <p className="font-mono text-sm text-accent-green mb-1">
          <span className="text-accent-cyan">$</span> vim &quot;{post.title}.md&quot;
        </p>
        <h1 className="text-2xl font-bold text-text-primary">글 수정</h1>
      </div>
      <PostForm post={post} onSubmit={handleSubmit} />
    </div>
  );
}
