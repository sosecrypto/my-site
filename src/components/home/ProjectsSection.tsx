"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

export default function ProjectsSection() {
  return (
    <section className="py-20">
      <SectionHeader command="ls -la projects/" id="projects" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlowCard className="text-center py-12">
          <p className="font-mono text-lg text-accent-amber mb-2">
            $ ls projects/
          </p>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-accent-cyan">drwxr-xr-x</span> coming_soon/
          </p>
          <p className="mt-4 text-sm text-text-secondary">
            프로젝트 포트폴리오를 준비 중입니다.
          </p>
        </GlowCard>
      </motion.div>
    </section>
  );
}
