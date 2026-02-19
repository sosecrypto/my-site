"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  enabled?: boolean;
}

export function useTypeWriter({
  text,
  speed = 60,
  delay = 0,
  onComplete,
  enabled = true,
}: UseTypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const reset = useCallback(() => {
    setDisplayText("");
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const delayTimeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;

      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, delay, enabled, onComplete]);

  return { displayText, isComplete, isTyping, reset };
}
