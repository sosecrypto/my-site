"use client";

import { useState } from "react";

export default function VideoBackground() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setIsReady(true)}
        aria-label="히어로 섹션 배경 영상"
        className="w-full h-full object-cover scale-110 transition-opacity duration-[2s] ease-out"
        style={{ opacity: isReady ? 1 : 0 }}
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
