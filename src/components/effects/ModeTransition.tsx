"use client";

import { useViewMode } from "@/hooks/useViewMode";

export default function ModeTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTransitioning } = useViewMode();

  return (
    <div className={isTransitioning ? "mode-transition" : ""}>
      {children}
    </div>
  );
}
