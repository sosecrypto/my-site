"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CAPABILITIES, CAPABILITY_CATEGORIES, PROJECTS } from "@/lib/constants";
import type { CapabilityCategory } from "@/types";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import ProjectMiniCard from "./ProjectMiniCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const defaultExpanded = new Set(
  CAPABILITIES.filter((c) => c.projectIds?.length).map((c) => c.title),
);

export default function PortfolioSection() {
  const [filter, setFilter] = useState<CapabilityCategory | "all">("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(defaultExpanded);

  const filtered = filter === "all"
    ? CAPABILITIES
    : CAPABILITIES.filter((c) => c.category === filter);

  const toggleExpand = (title: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const getLinkedProjects = (projectIds: string[]) =>
    projectIds
      .map((id) => PROJECTS.find((p) => p.title === id))
      .filter((p): p is (typeof PROJECTS)[number] => Boolean(p));

  const handleFilterChange = (key: CapabilityCategory | "all") => {
    setFilter(key);
    setExpandedCards(new Set(defaultExpanded));
  };

  return (
    <section className="py-20">
      <SectionHeader command="cat portfolio.md" id="portfolio" />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="카테고리 필터">
        {CAPABILITY_CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleFilterChange(key)}
            aria-pressed={filter === key}
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
          {filtered.map((cap) => {
            const projectIds = cap.projectIds ?? [];
            const hasProjects = projectIds.length > 0;
            const isExpanded = expandedCards.has(cap.title);
            const linkedProjects = hasProjects ? getLinkedProjects(projectIds) : [];

            return (
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
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cap.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-border text-accent-cyan bg-accent-cyan/5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Project toggle */}
                  {hasProjects && (
                    <>
                      <button
                        onClick={() => toggleExpand(cap.title)}
                        aria-expanded={isExpanded}
                        className="flex items-center gap-1.5 text-xs font-mono text-accent-cyan hover:text-accent-green transition-colors"
                      >
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                        프로젝트 보기 ({projectIds.length})
                      </button>

                      {/* Accordion content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 space-y-2">
                              {linkedProjects.map((project) => (
                                <ProjectMiniCard key={project.title} project={project} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
