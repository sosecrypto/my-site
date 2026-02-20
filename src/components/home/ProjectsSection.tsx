"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
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
    <Image
      src={src}
      alt={alt}
      width={640}
      height={360}
      className="aspect-video w-full object-cover"
      onError={() => setError(true)}
    />
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-20">
      <SectionHeader command="ls -la projects/" id="projects" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-6"
      >
        {PROJECTS.map((project) => (
          <motion.div key={project.title} variants={item}>
            <GlowCard className="!p-0 overflow-hidden">
              <div className="overflow-hidden rounded-t-lg">
                <ProjectThumbnail
                  src={project.thumbnail}
                  alt={project.title}
                />
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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

              <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-surface-elevated text-text-secondary border border-border-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
