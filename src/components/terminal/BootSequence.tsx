"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "[████████████████] Booting shmksumsun.xyz...", delay: 0 },
  { text: "Loading modules... done.", delay: 400 },
  { text: "Initializing profile... done.", delay: 800 },
  { text: "Initializing humanity module... always on.", delay: 1100 },
  { text: "Mounting /career... done.", delay: 1400 },
  { text: "> run hello_world.sh", delay: 1700 },
];

const noop = () => () => {};

function useHasBooted() {
  return useSyncExternalStore(
    noop,
    () => sessionStorage.getItem("booted") === "true",
    () => false
  );
}

export default function BootSequence() {
  const hasBooted = useHasBooted();
  const [visible, setVisible] = useState(!hasBooted);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startBoot = useCallback(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    BOOT_LINES.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
    });

    setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (hasBooted) return;

    const cleanup = startBoot();
    sessionStorage.setItem("booted", "true");

    return cleanup;
  }, [hasBooted, startBoot]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
            }}
          />

          <div className="w-full max-w-lg px-6">
            <div className="mb-6 h-1 w-full rounded-full overflow-hidden bg-border">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--accent-green)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="font-mono text-xs sm:text-sm space-y-1">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-accent-green"
                >
                  {line}
                </motion.div>
              ))}
              {lines.length > 0 && lines.length < BOOT_LINES.length && (
                <span className="inline-block w-2 h-3.5 bg-accent-green animate-blink" />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
