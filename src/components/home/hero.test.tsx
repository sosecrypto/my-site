import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Hero from "./Hero";
import { PROFILE, LIFE_PROFILE } from "@/lib/constants";

// useLifeWork mock
const mockUseLifeWork = vi.fn();
vi.mock("@/hooks/useLifeWork", () => ({
  useLifeWork: () => mockUseLifeWork(),
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
      vi.runAllTimers();
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

  it("WORK 모드에서 터미널 프롬프트를 표시한다", () => {
    renderWork();
    expect(screen.getByText("whoami")).toBeInTheDocument();
  });

  it("LIFE 모드에서 터미널 프롬프트를 숨긴다", () => {
    renderLife();
    expect(screen.queryByText("whoami")).not.toBeInTheDocument();
  });

  it("PROFILE.name을 표시한다", () => {
    renderWork();
    expect(screen.getByText(PROFILE.name)).toBeInTheDocument();
  });

  it("WORK 모드에서 PROFILE.title을 GlitchText로 표시한다", () => {
    renderWork();
    const glitch = screen.getByTestId("glitch-text");
    expect(glitch).toHaveTextContent(PROFILE.title);
  });

  it("LIFE 모드에서 LIFE_PROFILE.title을 일반 텍스트로 표시한다", () => {
    renderLife();
    expect(screen.getByText(LIFE_PROFILE.title)).toBeInTheDocument();
    expect(screen.queryByTestId("glitch-text")).not.toBeInTheDocument();
  });

  it("WORK 모드에서 PROFILE.roles를 표시한다", () => {
    renderWork();
    PROFILE.roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it("LIFE 모드에서 LIFE_PROFILE.roles를 표시한다", () => {
    renderLife();
    LIFE_PROFILE.roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it("소셜 링크 3개를 렌더링한다", () => {
    renderWork();
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("Telegram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  it("WORK 모드에서 스크롤 링크가 #about이다", () => {
    renderWork();
    const scrollLink = screen.getByText("scroll").closest("a");
    expect(scrollLink).toHaveAttribute("href", "#about");
  });

  it("LIFE 모드에서 스크롤 링크가 #hobbies이다", () => {
    renderLife();
    const scrollLink = screen.getByText("scroll").closest("a");
    expect(scrollLink).toHaveAttribute("href", "#hobbies");
  });

  it("data-bg 속성으로 배경 타입을 설정한다", () => {
    const { container, unmount } = renderWork();
    expect(container.querySelector("[data-bg='matrix']")).toBeInTheDocument();
    unmount();

    const { container: lifeContainer } = renderLife();
    expect(lifeContainer.querySelector("[data-bg='video']")).toBeInTheDocument();
  });
});
