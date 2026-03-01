"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAPABILITIES, CAPABILITY_CATEGORIES } from "@/lib/constants";
import type { CapabilityCategory } from "@/types";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function SkillsSection() {
  const [filter, setFilter] = useState<CapabilityCategory | "all">("all");

  const filtered = filter === "all"
    ? CAPABILITIES
    : CAPABILITIES.filter((c) => c.category === filter);

  return (
    <section className="py-20">
      <SectionHeader command="cat capabilities.md" id="skills" />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CAPABILITY_CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-all duration-200 ${
              filter === key
                ? "bg-accent-cyan text-bg-primary border-accent-cyan"
                : "border-border text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Capability cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {filtered.map((cap) => (
            <motion.div key={cap.title} variants={item}>
              <GlowCard className="!p-5 h-full">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl leading-none shrink-0">{cap.icon}</span>
                  <h3 className="font-mono text-sm font-semibold text-text-primary leading-tight">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                  {cap.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-border text-accent-cyan bg-accent-cyan/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
