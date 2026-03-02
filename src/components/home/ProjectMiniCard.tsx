"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { ProjectCard } from "@/types";

interface ProjectMiniCardProps {
  project: ProjectCard;
}

function MiniThumbnail({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-16 h-10 shrink-0 rounded bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 flex items-center justify-center">
        <span className="font-mono text-[8px] text-text-secondary">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={40}
      className="w-16 h-10 shrink-0 rounded object-cover"
      onError={() => setError(true)}
    />
  );
}

export default function ProjectMiniCard({ project }: ProjectMiniCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-elevated/50 border border-border/50">
      <MiniThumbnail src={project.thumbnail} alt={project.title} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="font-mono text-xs font-semibold text-accent-cyan truncate">
            {project.title}
          </h4>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-cyan transition-colors"
              aria-label={`${project.title} GitHub`}
            >
              <Github size={12} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-green transition-colors"
                aria-label={`${project.title} Live`}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
        <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
}
