"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Send, Linkedin, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PROFILE, LIFE_PROFILE, PROJECTS } from "@/lib/constants";
import { useLifeWork } from "@/hooks/useLifeWork";
import { useSound } from "@/hooks/useSound";
import TypeWriter from "@/components/terminal/TypeWriter";

const MatrixRain = dynamic(() => import("@/components/effects/MatrixRain"), {
  ssr: false,
});

const VideoBackground = dynamic(
  () => import("@/components/effects/video-background"),
  { ssr: false }
);

const SOCIAL_LINKS = [
  { icon: Github, href: PROFILE.links.github, label: "GitHub" },
  { icon: Send, href: PROFILE.links.telegramChannel, label: "Telegram" },
  { icon: Linkedin, href: PROFILE.links.linkedin, label: "LinkedIn" },
];

type WorkPhase = "intro" | "portfolio" | "reveal";

const POLAROID_LAYOUTS = [
  { x: -260, y: -70, rotate: -6 },
  { x: 160, y: -100, rotate: 5 },
  { x: -180, y: 90, rotate: 3 },
  { x: 220, y: 60, rotate: -4 },
] as const;

const STAGGER_DELAY_S = 0.5;
const STAGGER_DELAY_MS = 500;
const REVEAL_DELAY_MS = 1500;

export default function Hero() {
  const [nameComplete, setNameComplete] = useState(false);
  const [workPhase, setWorkPhase] = useState<WorkPhase>("intro");
  const { mode } = useLifeWork();
  const { isMuted } = useSound();

  const isLife = mode === "life";
  const bgType = isLife ? "video" : "matrix";
  const title = isLife ? LIFE_PROFILE.title : PROFILE.title;
  const roles = isLife ? LIFE_PROFILE.roles : PROFILE.roles;

  const handleNameComplete = useCallback(() => {
    setNameComplete(true);
  }, []);

  // 접속 2초 후 portfolio, 이후 자동 reveal
  useEffect(() => {
    if (isLife) return;
    const introTimer = setTimeout(() => {
      setWorkPhase("portfolio");
    }, 2000);
    return () => clearTimeout(introTimer);
  }, [isLife]);

  useEffect(() => {
    if (workPhase !== "portfolio") return;
    const totalStaggerTime = PROJECTS.length * STAGGER_DELAY_MS;
    const timer = setTimeout(() => {
      setWorkPhase("reveal");
    }, totalStaggerTime + REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [workPhase]);

  return (
    <section data-bg={bgType} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isLife ? 0 : 0.55 }}
      >
        <VideoBackground
          variant="work"
          muted={isMuted || isLife}
        />
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isLife ? 0 : 0.3 }}
      >
        <MatrixRain />
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: isLife ? 0.55 : 0 }}
      >
        <VideoBackground variant="life" muted={isMuted || !isLife} />
      </div>

      {/* Vignette + gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: isLife
            ? [
                "radial-gradient(ellipse at 30% 50%, rgba(212, 160, 53, 0.1) 0%, transparent 50%)",
                "radial-gradient(ellipse at 70% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)",
                "radial-gradient(ellipse at center, transparent 40%, var(--bg-primary) 90%)",
              ].join(", ")
            : [
                "radial-gradient(ellipse at 30% 50%, rgba(251, 146, 60, 0.08) 0%, transparent 50%)",
                "radial-gradient(ellipse at 70% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)",
                "radial-gradient(ellipse at center, transparent 40%, var(--bg-primary) 80%)",
              ].join(", "),
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {isLife ? (
          /* === LIFE 모드: 기존 레이아웃 === */
          <>
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-2 font-bold"
            >
              {nameComplete ? (
                <motion.span
                  animate={{ scale: [1, 1.005, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
                  className="inline-block text-text-primary"
                >
                  {PROFILE.name}
                </motion.span>
              ) : (
                <TypeWriter
                  text={PROFILE.name}
                  speed={80}
                  delay={800}
                  onComplete={handleNameComplete}
                  className="text-text-primary"
                />
              )}
            </motion.h1>

            {nameComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-lg sm:text-xl mb-8">
                  <span className="text-accent-amber">{title}</span>
                </p>
                <div className="space-y-2 mb-10">
                  {roles.map((role, i) => (
                    <motion.p
                      key={role}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="font-mono text-sm text-text-secondary"
                    >
                      <span className="text-accent-amber">&rarr;</span> {role}
                    </motion.p>
                  ))}
                </div>
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
          </>
        ) : (
          /* === WORK 모드: 시네마틱 인트로 === */
          <>
            {/* Portfolio phase: 폴라로이드 카드 */}
            <AnimatePresence>
              {(workPhase === "portfolio" || workPhase === "reveal") && (
                <div className="relative w-full h-[400px] flex items-center justify-center mb-8">
                  {PROJECTS.slice(0, POLAROID_LAYOUTS.length).map((project, i) => {
                    const layout = POLAROID_LAYOUTS[i];
                    return (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, scale: 0, y: -200, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: layout.x,
                        y: layout.y,
                        rotate: layout.rotate,
                      }}
                      transition={{
                        delay: i * STAGGER_DELAY_S,
                        duration: 0.5,
                        type: "spring",
                        damping: 12,
                        stiffness: 120,
                      }}
                      className="absolute w-[180px] rounded-sm overflow-hidden
                        bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                        ring-1 ring-white/20"
                      style={{ padding: "8px 8px 36px" }}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={164}
                        height={112}
                        sizes="180px"
                        className="w-full h-28 object-cover rounded-[2px]"
                      />
                      <p className="absolute bottom-2 left-0 right-0 text-center text-[11px] text-gray-600 font-mono tracking-tight">
                        {project.title}
                      </p>
                    </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>

            {/* Reveal phase: 이름 + 소셜 + 스크롤 */}
            <AnimatePresence>
              {workPhase === "reveal" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-6 font-extrabold text-text-primary">
                    {PROFILE.name}
                  </h1>
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
            </AnimatePresence>
          </>
        )}

        {/* Scroll indicator — LIFE 항상, WORK는 reveal에서만 */}
        {(isLife || workPhase === "reveal") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isLife ? 2.5 : 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a
              href={mode === "work" ? "#about" : "#hobbies"}
              className="flex flex-col items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors"
            >
              <span className="text-xs font-mono">scroll</span>
              <ChevronDown
                size={20}
                className="animate-bounce"
                style={{ filter: "drop-shadow(0 0 6px var(--accent-cyan))" }}
              />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
