"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownEditor from "./MarkdownEditor";
import ImageUploader from "./ImageUploader";
import { CATEGORIES } from "@/lib/constants";
import type { Post } from "@/types";

interface PostFormProps {
  post?: Post;
  onSubmit: (data: PostFormData) => Promise<void>;
}

export interface PostFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  published: boolean;
}

export default function PostForm({ post, onSubmit }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PostFormData>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    content: post?.content ?? "",
    excerpt: post?.excerpt ?? "",
    cover_image: post?.cover_image ?? null,
    category: post?.category ?? "기타",
    tags: post?.tags ?? [],
    published: post?.published ?? false,
  });
  const [tagsInput, setTagsInput] = useState(post?.tags.join(", ") ?? "");

  const generateSlug = () => {
    const ts = Date.now().toString(36);
    setForm((prev) => ({ ...prev, slug: ts }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const excerpt =
      form.excerpt || form.content.replace(/[#*`\n]/g, "").slice(0, 150);

    try {
      await onSubmit({ ...form, tags, excerpt });
      router.push("/admin/posts");
      router.refresh();
    } catch {
      alert("저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Title */}
      <div>
        <label className="block font-mono text-xs text-text-secondary mb-1.5">
          제목
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-secondary
            text-text-primary text-lg focus:outline-none focus:border-accent-cyan"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block font-mono text-xs text-text-secondary mb-1.5">
          슬러그
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
            className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-bg-secondary
              text-text-primary font-mono text-sm focus:outline-none focus:border-accent-cyan"
            required
          />
          <button
            type="button"
            onClick={generateSlug}
            className="px-3 py-2 rounded-lg border border-border text-text-secondary
              hover:text-accent-cyan hover:border-accent-cyan/30 font-mono text-xs"
          >
            자동생성
          </button>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block font-mono text-xs text-text-secondary mb-1.5">
          카테고리
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
          className="px-3 py-2.5 rounded-lg border border-border bg-bg-secondary
            text-text-primary font-mono text-sm focus:outline-none focus:border-accent-cyan"
        >
          {CATEGORIES.filter((c) => c !== "전체").map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-mono text-xs text-text-secondary mb-1.5">
          태그 (쉼표 구분)
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="AI, Web3, 개발"
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-secondary
            text-text-primary font-mono text-sm focus:outline-none focus:border-accent-cyan"
        />
      </div>

      {/* Cover image */}
      <div>
        <label className="block font-mono text-xs text-text-secondary mb-1.5">
          커버 이미지
        </label>
        <ImageUploader
          onUpload={(url) => setForm((p) => ({ ...p, cover_image: url }))}
        />
        {form.cover_image && (
          <p className="mt-1 text-xs text-text-secondary font-mono truncate">
            {form.cover_image}
          </p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label className="block font-mono text-xs text-text-secondary mb-1.5">
          요약 (미입력 시 자동 추출)
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
          rows={2}
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg-secondary
            text-text-primary text-sm focus:outline-none focus:border-accent-cyan resize-none"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block font-mono text-xs text-text-secondary mb-1.5">
          본문 (마크다운)
        </label>
        <MarkdownEditor
          value={form.content}
          onChange={(val) => setForm((p) => ({ ...p, content: val }))}
        />
      </div>

      {/* Published toggle + Submit */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) =>
              setForm((p) => ({ ...p, published: e.target.checked }))
            }
            className="w-4 h-4 accent-accent-cyan"
          />
          <span className="font-mono text-sm text-text-secondary">공개</span>
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg border border-border text-text-secondary
              hover:text-text-primary font-mono text-sm"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-accent-cyan text-bg-primary font-mono text-sm
              hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </form>
  );
}
