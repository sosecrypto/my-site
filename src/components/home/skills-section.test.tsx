import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SkillsSection from "./SkillsSection";
import { CAPABILITIES } from "@/lib/constants";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
      const { variants, initial, animate, whileInView, whileHover, viewport, transition, ...rest } =
        props as Record<string, unknown>;
      void variants; void initial; void animate; void whileInView; void whileHover; void viewport; void transition;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => typeof v !== "object" || v === null)
      );
      return <div {...htmlProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("SkillsSection", () => {
  it("id='skills'를 가진다", () => {
    render(<SkillsSection />);

    expect(document.getElementById("skills")).toBeInTheDocument();
  });

  it("전체 CAPABILITIES를 렌더링한다", () => {
    render(<SkillsSection />);

    CAPABILITIES.forEach((cap) => {
      expect(screen.getByText(cap.title)).toBeInTheDocument();
      expect(screen.getByText(cap.description)).toBeInTheDocument();
    });
  });

  it("카테고리 필터 버튼들을 렌더링한다", () => {
    render(<SkillsSection />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Analysis")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("Analysis 필터 클릭 시 analysis 카테고리만 표시한다", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByText("Analysis"));

    const analysisCaps = CAPABILITIES.filter((c) => c.category === "analysis");
    const nonAnalysisCaps = CAPABILITIES.filter((c) => c.category !== "analysis");

    analysisCaps.forEach((cap) => {
      expect(screen.getByText(cap.title)).toBeInTheDocument();
    });

    nonAnalysisCaps.forEach((cap) => {
      expect(screen.queryByText(cap.title)).not.toBeInTheDocument();
    });
  });

  it("도구 태그를 표시한다", () => {
    render(<SkillsSection />);

    CAPABILITIES.forEach((cap) => {
      cap.tools.forEach((tool) => {
        expect(screen.getByText(tool)).toBeInTheDocument();
      });
    });
  });
});
