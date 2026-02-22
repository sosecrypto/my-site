"use client";

import { motion } from "framer-motion";
import { Briefcase, Heart } from "lucide-react";
import { useLifeWork } from "@/hooks/useLifeWork";
import type { LifeWorkMode } from "@/contexts/LifeWorkContext";

const MODES: { key: LifeWorkMode; label: string; icon: typeof Briefcase }[] = [
  { key: "work", label: "WORK", icon: Briefcase },
  { key: "life", label: "LIFE", icon: Heart },
];

export default function LifeWorkToggle() {
  const { mode, setMode, isTransitioning } = useLifeWork();

  return (
    <div className="inline-flex items-center rounded-full border border-border backdrop-blur-md bg-bg-primary/40 p-0.5 gap-0.5">
      {MODES.map(({ key, label, icon: Icon }) => {
        const isActive = mode === key;
        return (
          <button
            key={key}
            onClick={() => setMode(key)}
            disabled={isTransitioning}
            className={`relative flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono
              transition-colors duration-200 ${
                isActive
                  ? "text-bg-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            aria-label={`${label} 모드로 전환`}
          >
            {isActive && (
              <motion.div
                layoutId="life-work-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    key === "work"
                      ? "var(--accent-cyan)"
                      : "var(--accent-amber)",
                  boxShadow:
                    key === "work"
                      ? "0 0 12px rgba(34, 211, 238, 0.3)"
                      : "0 0 12px rgba(245, 158, 11, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Icon size={10} />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
