"use client";

import { createContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type LifeWorkMode = "work" | "life";

export interface LifeWorkContextType {
  mode: LifeWorkMode;
  setMode: (mode: LifeWorkMode) => void;
  toggleMode: () => void;
  isTransitioning: boolean;
}

export const LifeWorkContext = createContext<LifeWorkContextType>({
  mode: "work",
  setMode: () => {},
  toggleMode: () => {},
  isTransitioning: false,
});

export function LifeWorkProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LifeWorkMode>("work");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync data-life-mode attribute on html element
  useEffect(() => {
    const html = document.documentElement;
    if (mode === "life") {
      html.setAttribute("data-life-mode", "true");
    } else {
      html.removeAttribute("data-life-mode");
    }
  }, [mode]);

  const setMode = useCallback((newMode: LifeWorkMode) => {
    if (newMode === mode) return;

    setIsTransitioning(true);
    setModeState(newMode);

    // CSS transition (0.5s) 완료 대기
    setTimeout(() => setIsTransitioning(false), 500);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode(mode === "work" ? "life" : "work");
  }, [mode, setMode]);

  return (
    <LifeWorkContext.Provider value={{ mode, setMode, toggleMode, isTransitioning }}>
      {children}
    </LifeWorkContext.Provider>
  );
}
