"use client";

import { motion } from "framer-motion";
import { Library } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

export default function ReadingSection() {
  return (
    <section className="py-20">
      <SectionHeader command="ls ~/bookshelf/" id="reading" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlowCard className="text-center py-16">
          <Library className="mx-auto mb-4 text-accent-amber" size={40} />
          <h3 className="font-mono text-lg font-bold text-text-primary mb-3">
            Coming Soon
          </h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            읽고 있는 책과 독서 기록을 준비하고 있습니다.
          </p>
        </GlowCard>
      </motion.div>
    </section>
  );
}
