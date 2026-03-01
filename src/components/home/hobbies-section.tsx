"use client";

import { motion } from "framer-motion";
import { LIFE_PROFILE } from "@/lib/constants";
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

export default function HobbiesSection() {
  return (
    <section className="py-20">
      <SectionHeader command="ls -la ~/hobbies/" id="hobbies" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {LIFE_PROFILE.hobbies.map((hobby) => (
          <motion.div
            key={hobby.title}
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GlowCard className="h-full">
              <motion.div
                className="text-3xl mb-3 inline-block"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {hobby.icon}
              </motion.div>
              <h3 className="font-mono text-sm font-bold text-accent-amber mb-2">
                {hobby.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {hobby.desc}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
