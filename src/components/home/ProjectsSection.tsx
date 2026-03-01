"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";
import type { ProjectCategory } from "@/types";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function ProjectThumbnail({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="aspect-video w-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 flex items-center justify-center">
        <span className="font-mono text-sm text-text-secondary">{alt}</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={640}
        height={360}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        loading="lazy"
        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="py-20">
      <SectionHeader command="ls -la projects/" id="projects" />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {PROJECT_CATEGORIES.map(({ key, label }) => (
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

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {filtered.map((project) => (
            <motion.div key={project.title} variants={item} className="group">
              <GlowCard className="!p-0 overflow-hidden">
                <div className="overflow-hidden rounded-t-lg">
                  <ProjectThumbnail
                    src={project.thumbnail}
                    alt={project.title}
                  />
                </div>

                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-mono text-base font-bold text-accent-cyan mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent-cyan transition-colors"
                        aria-label={`${project.title} GitHub`}
                      >
                        <Github size={14} />
                        <span>Source</span>
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent-green transition-colors"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink size={14} />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project details */}
                  {(project.role || project.period) && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-text-secondary mb-2">
                      {project.role && <span>{project.role}</span>}
                      {project.period && <span>{project.period}</span>}
                    </div>
                  )}

                  {project.highlights && (
                    <ul className="space-y-1 mb-3">
                      {project.highlights.map((h) => (
                        <li key={h} className="text-xs text-text-secondary pl-3 border-l-2 border-accent-cyan/20">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-surface-elevated text-text-secondary border border-border-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
