import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      {/* Terminal-style header */}
      <div className="mb-8">
        <p className="font-mono text-sm text-text-secondary mb-4">
          <span className="text-accent-cyan">$</span> cat &quot;{post.title}.md&quot;
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <Badge>{post.category}</Badge>
          <span className="font-mono text-text-secondary">
            {formatDate(post.created_at)}
          </span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-text-secondary bg-bg-secondary px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Markdown content */}
      <div className="prose prose-lg dark:prose-invert prose-terminal max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
