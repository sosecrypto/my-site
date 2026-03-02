"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "@/types";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import CareerTimeline from "@/components/home/CareerTimeline";
import BlogPreview from "@/components/home/BlogPreview";
import ContactSection from "@/components/home/ContactSection";
import HobbiesSection from "@/components/home/hobbies-section";
import DailyLifeSection from "@/components/home/daily-life-section";
import PhilosophySection from "@/components/home/philosophy-section";
import ReadingSection from "@/components/home/reading-section";
import BootSequence from "@/components/terminal/BootSequence";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import InteractiveShell from "@/components/terminal/InteractiveShell";
import ModeTransition from "@/components/effects/ModeTransition";
import { useViewMode } from "@/hooks/useViewMode";
import { useLifeWork } from "@/hooks/useLifeWork";

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

interface HomeClientProps {
  recentPosts: Post[];
}

export default function HomeClient({ recentPosts }: HomeClientProps) {
  const { isCli } = useViewMode();
  const { mode } = useLifeWork();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [mode]);

  return (
    <ModeTransition>
      {isCli ? (
        <div className="min-h-screen flex items-center justify-center p-4 pt-20">
          <TerminalWindow>
            <InteractiveShell />
          </TerminalWindow>
        </div>
      ) : (
        <>
          <BootSequence />
          <Hero />
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <AnimatePresence mode="wait">
              {mode === "work" ? (
                <motion.div
                  key="work"
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <AboutSection />
                  <PortfolioSection />
                  <CareerTimeline />
                  <BlogPreview posts={recentPosts} />
                  <ContactSection />
                </motion.div>
              ) : (
                <motion.div
                  key="life"
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <HobbiesSection />
                  <DailyLifeSection />
                  <PhilosophySection />
                  <ReadingSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </ModeTransition>
  );
}
