"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Send, Linkedin, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { PROFILE } from "@/lib/constants";
import TypeWriter from "@/components/terminal/TypeWriter";
import GlitchText from "@/components/effects/GlitchText";

const MatrixRain = dynamic(() => import("@/components/effects/MatrixRain"), {
  ssr: false,
});

const SOCIAL_LINKS = [
  { icon: Github, href: PROFILE.links.github, label: "GitHub" },
  { icon: Send, href: PROFILE.links.telegram, label: "Telegram" },
  { icon: Linkedin, href: PROFILE.links.linkedin, label: "LinkedIn" },
];

export default function Hero() {
  const [nameComplete, setNameComplete] = useState(false);

  const handleNameComplete = useCallback(() => {
    setNameComplete(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-30">
        <MatrixRain />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-sm text-text-secondary mb-6"
        >
          <span className="text-accent-cyan">visitor@terminal</span>
          <span className="text-text-secondary">:</span>
          <span className="text-accent-green">~</span>
          <span className="text-text-secondary">$</span>{" "}
          <span className="text-accent-green">whoami</span>
        </motion.p>

        {/* Name with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-2"
        >
          <TypeWriter
            text={`${PROFILE.name} (${PROFILE.nameEn})`}
            speed={80}
            delay={800}
            onComplete={handleNameComplete}
            className="text-text-primary"
          />
        </motion.h1>

        {/* Title with glitch effect */}
        {nameComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-lg sm:text-xl mb-8">
              <GlitchText
                text={PROFILE.title}
                className="text-accent-cyan"
              />
            </p>

            {/* Roles */}
            <div className="space-y-2 mb-10">
              {PROFILE.roles.map((role, i) => (
                <motion.p
                  key={role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="font-mono text-sm text-text-secondary"
                >
                  <span className="text-accent-amber">→</span> {role}
                </motion.p>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-xl border border-border text-text-secondary
                    hover:text-accent-cyan hover:border-accent-cyan/30
                    hover:shadow-[0_0_20px_var(--glow-color)]
                    transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors"
          >
            <span className="text-xs font-mono">scroll</span>
            <ChevronDown
              size={20}
              className="animate-bounce"
              style={{
                filter: "drop-shadow(0 0 6px var(--accent-cyan))",
              }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
