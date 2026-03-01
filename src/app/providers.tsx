"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Lenis from "lenis";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import { LifeWorkProvider } from "@/contexts/LifeWorkContext";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ViewModeProvider>
        <LifeWorkProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LifeWorkProvider>
      </ViewModeProvider>
    </ThemeProvider>
  );
}
