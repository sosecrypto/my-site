"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function AboutSection() {
  return (
    <section className="py-20">
      <SectionHeader command="cat about.md" id="about" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {PROFILE.keywords.map((kw) => (
          <motion.div key={kw.title} variants={item}>
            <GlowCard className="h-full">
              <div className="text-3xl mb-3">{kw.icon}</div>
              <h3 className="font-mono text-sm font-bold text-accent-cyan mb-2">
                {kw.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {kw.desc}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
