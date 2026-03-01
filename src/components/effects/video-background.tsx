"use client";

import { useRef, useState, useCallback } from "react";

interface VideoBackgroundProps {
  variant?: "work" | "life";
  muted?: boolean;
  targetLoops?: number;
  onLoopComplete?: () => void;
}

const VIDEO_SRC = {
  work: "/videos/hero-work",
  life: "/videos/hero-bg",
} as const;

export default function VideoBackground({
  variant = "life",
  muted = true,
  targetLoops,
  onLoopComplete,
}: VideoBackgroundProps) {
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);
  const src = VIDEO_SRC[variant];
  const hasTargetLoops = targetLoops !== undefined;

  const handleEnded = useCallback(() => {
    if (!hasTargetLoops || loopCountRef.current < 0) return;
    loopCountRef.current += 1;
    if (loopCountRef.current >= targetLoops) {
      loopCountRef.current = -1;
      onLoopComplete?.();
      if (videoRef.current) {
        videoRef.current.loop = true;
        videoRef.current.play();
      }
    } else if (videoRef.current) {
      videoRef.current.play();
    }
  }, [hasTargetLoops, targetLoops, onLoopComplete]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        loop={!hasTargetLoops}
        playsInline
        preload="auto"
        onCanPlay={() => setIsReady(true)}
        onEnded={handleEnded}
        aria-label="히어로 섹션 배경 영상"
        className="w-full h-full object-cover scale-110 transition-opacity duration-[2s] ease-out"
        style={{ opacity: isReady ? 1 : 0 }}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
