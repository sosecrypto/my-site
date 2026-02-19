"use client";

import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import CareerTimeline from "@/components/home/CareerTimeline";
import ProjectsSection from "@/components/home/ProjectsSection";
import BlogPreview from "@/components/home/BlogPreview";
import ContactSection from "@/components/home/ContactSection";
import BootSequence from "@/components/terminal/BootSequence";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import InteractiveShell from "@/components/terminal/InteractiveShell";
import ModeTransition from "@/components/effects/ModeTransition";
import { useViewMode } from "@/hooks/useViewMode";

export default function Home() {
  const { isCli } = useViewMode();

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
            <AboutSection />
            <CareerTimeline />
            <ProjectsSection />
            <BlogPreview />
            <ContactSection />
          </div>
        </>
      )}
    </ModeTransition>
  );
}
