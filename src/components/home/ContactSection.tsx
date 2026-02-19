"use client";

import { motion } from "framer-motion";
import { Github, Send, Linkedin } from "lucide-react";
import { PROFILE } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const CONTACTS = [
  {
    icon: Github,
    platform: "GitHub",
    handle: "@sosecrypto",
    href: PROFILE.links.github,
  },
  {
    icon: Send,
    platform: "Telegram",
    handle: "@crypto_offroad",
    href: PROFILE.links.telegram,
  },
  {
    icon: Linkedin,
    platform: "LinkedIn",
    handle: "Sanghyun Eom",
    href: PROFILE.links.linkedin,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactSection() {
  return (
    <section className="py-20">
      <SectionHeader command="bash contact.sh" id="contact" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-text-secondary mb-8 text-center"
      >
        커피챗 &amp; 토론 모두 환영합니다.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
      >
        {CONTACTS.map(({ icon: Icon, platform, handle, href }) => (
          <motion.div key={platform} variants={item}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <GlowCard className="text-center hover:scale-[1.02] transition-transform">
                <Icon size={24} className="mx-auto mb-3 text-accent-cyan" />
                <h3 className="font-mono text-sm font-bold text-text-primary mb-1">
                  {platform}
                </h3>
                <p className="text-xs text-text-secondary">{handle}</p>
              </GlowCard>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
