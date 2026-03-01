/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLifeWork } from "@/hooks/useLifeWork";
import type { LifeWorkMode } from "@/contexts/LifeWorkContext";

type CursorZone = "tech" | "human" | "dog";

function getZone(target: HTMLElement, y: number, lifeWorkMode: LifeWorkMode): CursorZone {
  // LIFE 모드에서는 항상 dog 커서
  if (lifeWorkMode === "life") {
    return "dog";
  }

  // WORK 모드: about ~ contact 구간에서 human 커서
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
  dog: { dot: "var(--accent-amber)", glow: "rgba(245, 158, 11, 0.4)" },
};

const DOG_CURSOR_SIZE = 50;

// 발바닥 SVG
const PAW_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
  <ellipse cx="14" cy="18" rx="6" ry="5" fill="#D4A035" opacity="0.9"/>
  <circle cx="7.5" cy="10" r="3" fill="#D4A035" opacity="0.9"/>
  <circle cx="13" cy="7" r="3" fill="#D4A035" opacity="0.9"/>
  <circle cx="19" cy="7.5" r="2.8" fill="#D4A035" opacity="0.9"/>
  <circle cx="23" cy="11.5" r="2.5" fill="#D4A035" opacity="0.9"/>
</svg>
`;

function spawnPawStamp(x: number, y: number) {
  const el = document.createElement("div");
  el.className = "paw-stamp";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.innerHTML = PAW_SVG;
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 800);
}

export default function CustomCursor() {
  const { mode } = useLifeWork();
  const modeRef = useRef<LifeWorkMode>(mode);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [zone, setZone] = useState<CursorZone>("tech");
  const [dogHidden, setDogHidden] = useState(false);
  const zoneRef = useRef<CursorZone>("tech");

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (zoneRef.current === "dog") {
      // 리트리버 숨기고 발자국만 표시
      setDogHidden(true);
      spawnPawStamp(e.clientX, e.clientY);

      // 0.5초 후 리트리버 다시 표시
      setTimeout(() => setDogHidden(false), 500);
    }
  }, []);

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
      setIsPointer(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("a") !== null ||
          target.closest("button") !== null ||
          target.closest("[role='button']") !== null
      );

      const newZone = getZone(target, e.clientY, modeRef.current);
      zoneRef.current = newZone;
      setZone(newZone);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleClick);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleClick);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible, handleClick]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const colors = ZONE_COLORS[zone];
  const isDog = zone === "dog";

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        {isDog ? (
          <img
            src="/images/golden-retriever.png"
            alt=""
            width={DOG_CURSOR_SIZE}
            height={DOG_CURSOR_SIZE}
            className="-translate-x-1/2 -translate-y-1/2"
            style={{
              opacity: dogHidden ? 0 : 1,
              transform: dogHidden ? "scale(0.3)" : "scale(1)",
              transition: "opacity 0.15s, transform 0.15s",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
            }}
          />
        ) : (
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
        )}
      </div>
      {/* Trail (dog 모드에서는 숨김) */}
      {!isDog && (
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
      )}
    </>
  );
}
