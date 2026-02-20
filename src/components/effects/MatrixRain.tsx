"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function MatrixRain() {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: {
          value: isDark
            ? ["#22d3ee", "#4ade80", "#f59e0b", "#fb923c"]
            : ["#0891b2", "#16a34a", "#d97706", "#ea580c"],
        },
        shape: { type: "circle" },
        opacity: {
          value: isDark ? { min: 0.15, max: 0.6 } : { min: 0.3, max: 0.8 },
          animation: { enable: true, speed: 0.8, startValue: "random" },
        },
        size: {
          value: isDark ? { min: 1.5, max: 3.5 } : { min: 2, max: 4 },
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 1.2 },
          direction: "none" as const,
          straight: false,
          outModes: { default: "bounce" as const },
          random: true,
          attract: {
            enable: false,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: isDark ? "#22d3ee" : "#0891b2",
          opacity: isDark ? 0.12 : 0.2,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab" as const,
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: isDark ? 0.35 : 0.5,
              color: isDark ? "#f59e0b" : "#d97706",
            },
          },
        },
      },
      detectRetina: true,
    }),
    [isDark]
  );

  if (!init) return null;

  return (
    <Particles
      id="matrix-rain"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}
