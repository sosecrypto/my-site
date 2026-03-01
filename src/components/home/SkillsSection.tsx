"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/constants";
import type { SkillCategory } from "@/types";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function SkillsSection() {
  const [filter, setFilter] = useState<SkillCategory | "all">("all");

  const filtered = filter === "all"
    ? SKILLS
    : SKILLS.filter((s) => s.category === filter);

  return (
    <section className="py-20">
      <SectionHeader command="cat ~/.skills" id="skills" />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SKILL_CATEGORIES.map(({ key, label }) => (
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

      {/* Skills grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {filtered.map((skill) => (
            <motion.div key={skill.name} variants={item}>
              <GlowCard className="!p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-text-primary">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-green"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
