"use client";

import { motion } from "framer-motion";
import { LIFE_PROFILE } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function DailyLifeSection() {
  return (
    <section className="py-20">
      <SectionHeader command="tail -f ~/daily.log" id="daily" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative ml-4 sm:ml-8"
      >
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        {LIFE_PROFILE.dailyLife.map((entry) => (
          <motion.div
            key={entry.time}
            variants={item}
            className="relative pl-8 pb-10 last:pb-0"
          >
            {/* Node dot - amber */}
            <div
              className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-1.5 border-2"
              style={{
                borderColor: "var(--accent-amber)",
                background: "var(--accent-amber)",
                boxShadow: "0 0 8px var(--accent-amber)",
              }}
            />

            {/* Content */}
            <div className="group">
              {/* Time */}
              <div className="flex items-center gap-3 mb-1 font-mono text-xs">
                <span className="text-accent-amber">{entry.time}</span>
                <span className="text-xl">{entry.icon}</span>
              </div>

              {/* Activity */}
              <p className="text-base font-semibold text-text-primary">
                {entry.activity}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
