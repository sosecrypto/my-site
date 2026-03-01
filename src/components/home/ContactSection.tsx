"use client";

import { motion } from "framer-motion";
import { Send, Linkedin } from "lucide-react";
import { PROFILE } from "@/lib/constants";
import SectionHeader from "@/components/layout/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const CONTACTS = [
  { icon: Send, href: PROFILE.links.telegram, label: "Telegram", handle: "@sose_crypto" },
  { icon: Linkedin, href: PROFILE.links.linkedin, label: "LinkedIn", handle: "LinkedIn" },
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
          <Send size={32} className="mx-auto mb-4 text-accent-cyan" />
          <p className="text-text-secondary mb-4 text-sm leading-relaxed">
            새로운 프로젝트, 흥미로운 아이디어, 혹은 그냥 커피 한 잔 —<br />
            어떤 이유든 좋습니다. 편하게 연락 주세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {CONTACTS.map(({ icon: Icon, href, label, handle }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-mono text-sm
                  bg-accent-cyan text-bg-primary hover:opacity-90 transition-opacity"
                aria-label={label}
              >
                <Icon size={16} />
                {handle}
              </a>
            ))}
          </div>
        </GlowCard>
      </motion.div>
    </section>
  );
}
