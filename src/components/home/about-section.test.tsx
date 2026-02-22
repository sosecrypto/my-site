import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutSection from "./AboutSection";
import { PROFILE } from "@/lib/constants";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
      const { variants, initial, whileInView, viewport, transition, ...rest } =
        props as Record<string, unknown>;
      void variants; void initial; void whileInView; void viewport; void transition;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => typeof v !== "object" || v === null)
      );
      return <div {...htmlProps}>{children}</div>;
    },
  },
}));

describe("AboutSection", () => {
  it("id='about'을 가진다", () => {
    render(<AboutSection />);

    expect(document.getElementById("about")).toBeInTheDocument();
  });

  it("섹션 헤더를 렌더링한다", () => {
    render(<AboutSection />);

    const header = document.getElementById("about");
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("PROFILE.keywords 개수만큼 카드를 렌더링한다", () => {
    render(<AboutSection />);

    PROFILE.keywords.forEach((kw) => {
      expect(screen.getByText(kw.title)).toBeInTheDocument();
    });
  });

  it("각 키워드의 아이콘, 타이틀, 설명을 표시한다", () => {
    render(<AboutSection />);

    PROFILE.keywords.forEach((kw) => {
      expect(screen.getByText(kw.icon)).toBeInTheDocument();
      expect(screen.getByText(kw.title)).toBeInTheDocument();
      expect(screen.getByText(kw.desc)).toBeInTheDocument();
    });
  });
});
