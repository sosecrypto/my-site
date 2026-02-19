"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "전체";

  const handleClick = (category: string) => {
    if (category === "전체") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
            current === cat
              ? "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30"
              : "text-text-secondary border-border hover:text-accent-cyan hover:border-accent-cyan/30"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
