"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function MatrixRain() {
  const [init, setInit] = useState(false);

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
        color: { value: ["#22d3ee", "#4ade80", "#f59e0b", "#fb923c"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.15, max: 0.6 },
          animation: { enable: true, speed: 0.8, startValue: "random" },
        },
        size: {
          value: { min: 1.5, max: 3.5 },
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
          color: "#22d3ee",
          opacity: 0.12,
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
              opacity: 0.35,
              color: "#f59e0b",
            },
          },
        },
      },
      detectRetina: true,
    }),
    []
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
