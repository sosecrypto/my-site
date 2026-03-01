"use client";

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "검색어를 입력하세요..." }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(value.trim());
    },
    [value, onSearch]
  );

  const handleClear = useCallback(() => {
    setValue("");
    onSearch("");
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg font-mono text-sm
            bg-bg-secondary text-text-primary border border-border
            focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan/30
            placeholder:text-text-secondary/50 transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="검색어 지우기"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
}
