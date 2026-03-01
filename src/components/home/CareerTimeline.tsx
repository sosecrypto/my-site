"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PROFILE } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";
import Badge from "@/components/ui/Badge";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function CareerTimeline() {
  const [expandedHash, setExpandedHash] = useState<string | null>(null);

  const toggleExpand = (hash: string) => {
    setExpandedHash((prev) => (prev === hash ? null : hash));
  };

  return (
    <section className="py-20">
      <SectionHeader command="git log --oneline career.history" id="career" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative ml-4 sm:ml-8"
      >
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        {PROFILE.career.map((entry) => {
          const isCurrent = entry.endDate === "현재";
          const hasAchievements = entry.achievements && entry.achievements.length > 0;
          const isExpanded = expandedHash === entry.hash;

          return (
            <motion.div
              key={entry.hash}
              variants={item}
              className="relative pl-8 pb-10 last:pb-0"
            >
              {/* Node dot */}
              <div
                className={`absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-1.5 border-2 ${
                  isCurrent ? "animate-pulse-glow" : ""
                }`}
                style={{
                  borderColor:
                    entry.action === "feat"
                      ? "var(--accent-green)"
                      : "var(--accent-amber)",
                  background:
                    entry.action === "feat"
                      ? "var(--accent-green)"
                      : "var(--accent-amber)",
                  boxShadow: `0 0 8px ${
                    entry.action === "feat"
                      ? "var(--accent-green)"
                      : "var(--accent-amber)"
                  }`,
                }}
              />

              {/* Content */}
              <div className="group">
                {/* Hash + Date */}
                <div className="flex items-center gap-3 mb-1 font-mono text-xs">
                  <span className="text-accent-amber">{entry.hash}</span>
                  <span className="text-text-secondary">
                    {entry.date} ~ {entry.endDate}
                  </span>
                  <Badge variant={entry.action}>{entry.action}</Badge>
                </div>

                {/* Org + Role */}
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  {entry.org}{" "}
                  <span className="text-text-secondary font-normal">
                    · {entry.role}
                  </span>
                </h3>

                {/* Detail */}
                <p className="text-sm text-text-secondary">{entry.detail}</p>

                {/* Type badge + achievements toggle */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-block text-xs font-mono text-text-secondary bg-bg-secondary px-2 py-0.5 rounded">
                    {entry.type}
                  </span>
                  {hasAchievements && (
                    <button
                      onClick={() => toggleExpand(entry.hash)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-accent-cyan hover:text-accent-green transition-colors"
                    >
                      <span>{isExpanded ? "접기" : "성과 보기"}</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {/* Achievements */}
                <AnimatePresence>
                  {isExpanded && entry.achievements && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-3 space-y-1"
                    >
                      {entry.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="text-xs font-mono text-text-secondary pl-3 border-l-2 border-accent-cyan/30"
                        >
                          {achievement}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
