"use client";

import type { ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

export default function TerminalWindow({
  children,
  title = "visitor@shmksumsun.xyz",
}: TerminalWindowProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Terminal frame */}
      <div className="rounded-xl border border-border overflow-hidden shadow-2xl"
        style={{ background: "var(--bg-secondary)" }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-primary/50">
          {/* macOS dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="flex-1 text-center text-xs font-mono text-text-secondary">
            {title}
          </span>
          <div className="w-12" /> {/* spacer for centering */}
        </div>

        {/* Content */}
        <div className="relative">
          {/* CRT scanlines overlay (터미널 모드용) */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-10"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
