"use client";

import { useEffect, useRef, useState } from "react";

interface SectionHeaderProps {
  command: string;
  id?: string;
}

export default function SectionHeader({ command, id }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i <= command.length) {
        setTyped(command.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [started, command]);

  return (
    <div ref={ref} id={id} className="mb-10 scroll-mt-24">
      <h2 className="font-mono text-sm text-text-secondary">
        <span className="text-accent-cyan">$</span>{" "}
        <span className="text-accent-green">{typed}</span>
        {typed.length < command.length && (
          <span className="inline-block w-2 h-4 bg-accent-green animate-blink ml-0.5 align-middle" />
        )}
      </h2>
    </div>
  );
}
