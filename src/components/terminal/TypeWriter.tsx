"use client";

import { useTypeWriter } from "@/hooks/useTypeWriter";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  enabled?: boolean;
}

export default function TypeWriter({
  text,
  speed = 60,
  delay = 0,
  className = "",
  cursorClassName = "",
  showCursor = true,
  onComplete,
  enabled = true,
}: TypeWriterProps) {
  const { displayText, isComplete, isTyping } = useTypeWriter({
    text,
    speed,
    delay,
    onComplete,
    enabled,
  });

  return (
    <span className={className}>
      {displayText}
      {showCursor && (isTyping || !isComplete) && (
        <span
          className={`inline-block w-2.5 h-[1em] bg-accent-green animate-blink ml-0.5 align-middle ${cursorClassName}`}
        />
      )}
    </span>
  );
}
