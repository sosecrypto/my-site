"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // 모바일/터치 기기에서는 비활성화
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

  // 모바일에서는 렌더링하지 않음
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

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
          className="rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
          style={{
            width: isPointer ? 40 : 8,
            height: isPointer ? 40 : 8,
            background: isPointer ? "transparent" : "var(--accent-cyan)",
            border: isPointer ? "2px solid var(--accent-cyan)" : "none",
            boxShadow: `0 0 ${isPointer ? 15 : 10}px var(--glow-color)`,
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
            background: "var(--accent-cyan)",
            filter: "blur(8px)",
          }}
        />
      </div>
    </>
  );
}
