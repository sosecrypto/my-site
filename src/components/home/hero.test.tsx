import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Hero from "./Hero";
import { PROFILE, LIFE_PROFILE, PROJECTS } from "@/lib/constants";

// useLifeWork mock
const mockUseLifeWork = vi.fn();
vi.mock("@/hooks/useLifeWork", () => ({
  useLifeWork: () => mockUseLifeWork(),
}));

// useSound mock
vi.mock("@/hooks/useSound", () => ({
  useSound: () => ({ isMuted: true, toggleMute: vi.fn() }),
}));

// Framer Motion mock — filter non-HTML props
const filterProps = (props: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([k, v]) =>
        typeof v !== "object" &&
        typeof v !== "function" &&
        ![
          "initial", "animate", "whileInView", "viewport",
          "transition", "variants", "custom",
        ].includes(k)
    )
  );

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...p }: Record<string, unknown>) => <div {...filterProps(p)}>{children as React.ReactNode}</div>,
    h1: ({ children, ...p }: Record<string, unknown>) => <h1 {...filterProps(p)}>{children as React.ReactNode}</h1>,
    p: ({ children, ...p }: Record<string, unknown>) => <p {...filterProps(p)}>{children as React.ReactNode}</p>,
    span: ({ children, ...p }: Record<string, unknown>) => <span {...filterProps(p)}>{children as React.ReactNode}</span>,
    a: ({ children, ...p }: Record<string, unknown>) => <a {...filterProps(p) as React.AnchorHTMLAttributes<HTMLAnchorElement>}>{children as React.ReactNode}</a>,
    button: ({ children, ...p }: Record<string, unknown>) => <button {...filterProps(p) as React.ButtonHTMLAttributes<HTMLButtonElement>}>{children as React.ReactNode}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// TypeWriter mock — useEffect로 onComplete 호출
function MockTypeWriter({ text, onComplete }: { text: string; onComplete?: () => void }) {
  React.useEffect(() => {
    if (onComplete) onComplete();
  }, [onComplete]);
  return <span data-testid="typewriter">{text}</span>;
}

vi.mock("@/components/terminal/TypeWriter", () => ({
  default: MockTypeWriter,
}));

// GlitchText mock
vi.mock("@/components/effects/GlitchText", () => ({
  default: ({ text, className }: { text: string; className?: string }) => (
    <span data-testid="glitch-text" className={className}>{text}</span>
  ),
}));

// dynamic imports mock (MatrixRain, VideoBackground)
vi.mock("next/dynamic", () => ({
  default: () => {
    const Comp = () => <div data-testid="dynamic-bg" />;
    Comp.displayName = "DynamicComp";
    return Comp;
  },
}));

describe("Hero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderWork = () => {
    mockUseLifeWork.mockReturnValue({ mode: "work", toggle: vi.fn() });
    let result: ReturnType<typeof render>;
    act(() => {
      result = render(<Hero />);
    });
    return result!;
  };

  const renderLife = () => {
    mockUseLifeWork.mockReturnValue({ mode: "life", toggle: vi.fn() });
    let result: ReturnType<typeof render>;
    act(() => {
      result = render(<Hero />);
      vi.runAllTimers();
    });
    return result!;
  };

  // === WORK 모드: 시네마틱 인트로 ===

  describe("WORK 모드 — 시네마틱 인트로", () => {
    it("intro phase(2초 이내)에서 프로젝트 제목이 보이지 않는다", () => {
      renderWork();
      PROJECTS.forEach((project) => {
        expect(screen.queryByText(project.title)).not.toBeInTheDocument();
      });
    });

    it("intro phase에서 터미널 프롬프트가 없다", () => {
      renderWork();
      expect(screen.queryByText("whoami")).not.toBeInTheDocument();
    });

    it("intro phase에서 이름이 보이지 않는다", () => {
      renderWork();
      expect(screen.queryByText(PROFILE.name)).not.toBeInTheDocument();
    });

    it("2초 후 portfolio phase에서 프로젝트 제목 4개가 보인다", () => {
      renderWork();
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      PROJECTS.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    it("reveal phase에서 이름과 소셜 링크가 보인다", () => {
      renderWork();
      // intro → portfolio
      act(() => { vi.runAllTimers(); });
      // portfolio → reveal
      act(() => { vi.runAllTimers(); });
      expect(screen.getByText(PROFILE.name)).toBeInTheDocument();
      expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
      expect(screen.getByLabelText("Telegram")).toBeInTheDocument();
      expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    });

    it("reveal phase에서 스크롤 인디케이터가 보인다", () => {
      renderWork();
      act(() => { vi.runAllTimers(); });
      act(() => { vi.runAllTimers(); });
      const scrollLink = screen.getByText("scroll").closest("a");
      expect(scrollLink).toHaveAttribute("href", "#about");
    });

  });

  // === LIFE 모드: 기존 동작 유지 ===

  describe("LIFE 모드 — 기존 동작", () => {
    it("LIFE 모드에서 터미널 프롬프트를 숨긴다", () => {
      renderLife();
      expect(screen.queryByText("whoami")).not.toBeInTheDocument();
    });

    it("PROFILE.name을 표시한다", () => {
      renderLife();
      expect(screen.getByText(PROFILE.name)).toBeInTheDocument();
    });

    it("LIFE 모드에서 LIFE_PROFILE.title을 일반 텍스트로 표시한다", () => {
      renderLife();
      expect(screen.getByText(LIFE_PROFILE.title)).toBeInTheDocument();
      expect(screen.queryByTestId("glitch-text")).not.toBeInTheDocument();
    });

    it("LIFE 모드에서 LIFE_PROFILE.roles를 표시한다", () => {
      renderLife();
      LIFE_PROFILE.roles.forEach((role) => {
        expect(screen.getByText(role)).toBeInTheDocument();
      });
    });

    it("소셜 링크 3개를 렌더링한다", () => {
      renderLife();
      expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
      expect(screen.getByLabelText("Telegram")).toBeInTheDocument();
      expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    });

    it("LIFE 모드에서 스크롤 링크가 #hobbies이다", () => {
      renderLife();
      const scrollLink = screen.getByText("scroll").closest("a");
      expect(scrollLink).toHaveAttribute("href", "#hobbies");
    });

    it("data-bg 속성으로 배경 타입을 설정한다", () => {
      const { container } = renderLife();
      expect(container.querySelector("[data-bg='video']")).toBeInTheDocument();
    });
  });
});
