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
          value: 60,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: { value: ["#22d3ee", "#4ade80", "#f59e0b"] },
        shape: { type: "char", options: { char: { value: ["0", "1", ">", "$", "#", "@", "&", "%", "█"], font: "JetBrains Mono", style: "", weight: "400" } } },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: { enable: true, speed: 0.5, startValue: "random" },
        },
        size: {
          value: { min: 8, max: 14 },
        },
        move: {
          enable: true,
          speed: { min: 0.5, max: 2 },
          direction: "bottom" as const,
          straight: true,
          outModes: { default: "out" as const },
        },
        links: {
          enable: false,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse" as const,
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
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
