"use client";

import { motion } from "framer-motion";
import { Mail, Github, Send, Linkedin, Download } from "lucide-react";
import { PROFILE } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const SOCIALS = [
  { icon: Github, href: PROFILE.links.github, label: "GitHub" },
  { icon: Send, href: PROFILE.links.telegram, label: "Telegram" },
  { icon: Linkedin, href: PROFILE.links.linkedin, label: "LinkedIn" },
];

export default function ContactSection() {
  return (
    <section className="py-20">
      <SectionHeader command="bash contact.sh" id="contact" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <GlowCard className="text-center">
          <Mail size={32} className="mx-auto mb-4 text-accent-cyan" />
          <p className="text-text-secondary mb-4 text-sm">
            커피챗 &amp; 토론 모두 환영합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-mono text-sm
                bg-accent-cyan text-bg-primary hover:opacity-90 transition-opacity"
            >
              <Mail size={16} />
              {PROFILE.email}
            </a>
            <a
              href="/resume/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-mono text-sm
                border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
            >
              <Download size={16} />
              CV 다운로드
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent-cyan transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </GlowCard>
      </motion.div>
    </section>
  );
}
