"use client";

import { useEffect, useRef, useState } from "react";

type CursorZone = "tech" | "human";

function getZone(y: number): CursorZone {
  // about 섹션(#about) ~ contact 섹션(#contact) 부근에서 따뜻한 색상
  const aboutEl = document.getElementById("about");
  const contactEl = document.getElementById("contact");

  if (aboutEl && contactEl) {
    const aboutTop = aboutEl.getBoundingClientRect().top + window.scrollY;
    const contactBottom =
      contactEl.getBoundingClientRect().bottom + window.scrollY;
    const scrollY = window.scrollY + y;

    if (scrollY >= aboutTop && scrollY <= contactBottom) {
      return "human";
    }
  }

  return "tech";
}

const ZONE_COLORS: Record<CursorZone, { dot: string; glow: string }> = {
  tech: { dot: "var(--accent-cyan)", glow: "rgba(34, 211, 238, 0.3)" },
  human: { dot: "var(--accent-amber)", glow: "rgba(245, 158, 11, 0.3)" },
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [zone, setZone] = useState<CursorZone>("tech");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const target = e.target as HTMLElement;
      const computed = window.getComputedStyle(target);
      setIsPointer(
        computed.cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null
      );

      setZone(getZone(e.clientY));
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const colors = ZONE_COLORS[zone];

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        <div
          className="rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isPointer ? 40 : 8,
            height: isPointer ? 40 : 8,
            background: isPointer ? "transparent" : colors.dot,
            border: isPointer ? `2px solid ${colors.dot}` : "none",
            boxShadow: `0 0 ${isPointer ? 15 : 10}px ${colors.glow}`,
            transition: "width 0.15s, height 0.15s, background 0.4s, border 0.4s, box-shadow 0.4s",
          }}
        />
      </div>
      {/* Trail */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          opacity: visible ? 0.4 : 0,
          transition: "transform 0.15s ease-out, opacity 0.15s",
        }}
      >
        <div
          className="w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: colors.dot,
            filter: "blur(8px)",
            transition: "background 0.4s",
          }}
        />
      </div>
    </>
  );
}
