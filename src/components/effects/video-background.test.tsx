import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import VideoBackground from "./video-background";

describe("VideoBackground", () => {
  it("video 요소를 렌더링한다", () => {
    render(<VideoBackground />);
    const video = document.querySelector("video");
    expect(video).toBeInTheDocument();
  });

  it("autoPlay, muted, loop, playsInline 속성을 가진다", () => {
    render(<VideoBackground />);
    const video = document.querySelector("video") as HTMLVideoElement;
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.playsInline).toBe(true);
  });

  it("absolute inset-0 z-0 포지셔닝을 가진다", () => {
    render(<VideoBackground />);
    const wrapper = document.querySelector("video")!.parentElement!;
    expect(wrapper.className).toContain("absolute");
    expect(wrapper.className).toContain("inset-0");
    expect(wrapper.className).toContain("z-0");
  });

  it("video에 object-cover와 scale-110을 적용한다", () => {
    render(<VideoBackground />);
    const video = document.querySelector("video") as HTMLVideoElement;
    expect(video.className).toContain("object-cover");
    expect(video.className).toContain("scale-110");
  });

  it("로드 전 opacity가 0이다", () => {
    render(<VideoBackground />);
    const video = document.querySelector("video") as HTMLVideoElement;
    expect(video.style.opacity).toBe("0");
  });

  it("webm 소스를 우선으로 포함한다", () => {
    render(<VideoBackground />);
    const sources = Array.from(document.querySelectorAll("source"));
    expect(sources[0].type).toBe("video/webm");
    expect(sources[0].src).toContain("/videos/hero-bg.webm");
  });

  it("mp4 소스를 폴백으로 포함한다", () => {
    render(<VideoBackground />);
    const sources = Array.from(document.querySelectorAll("source"));
    expect(sources[1].type).toBe("video/mp4");
    expect(sources[1].src).toContain("/videos/hero-bg.mp4");
  });

  it("aria-label을 가진다", () => {
    render(<VideoBackground />);
    const video = document.querySelector("video") as HTMLVideoElement;
    expect(video).toHaveAttribute("aria-label");
  });
});
