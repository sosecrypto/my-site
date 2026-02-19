"use client";

import { createContext, useState, useCallback, type ReactNode } from "react";

export interface ViewModeContextType {
  isCli: boolean;
  toggleMode: () => void;
  isTransitioning: boolean;
}

export const ViewModeContext = createContext<ViewModeContextType>({
  isCli: false,
  toggleMode: () => {},
  isTransitioning: false,
});

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [isCli, setIsCli] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleMode = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsCli((prev) => !prev);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  }, []);

  return (
    <ViewModeContext.Provider value={{ isCli, toggleMode, isTransitioning }}>
      {children}
    </ViewModeContext.Provider>
  );
}
