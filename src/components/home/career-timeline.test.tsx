import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CareerTimeline from "./CareerTimeline";
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

describe("CareerTimeline", () => {
  it("id='career'를 가진다", () => {
    render(<CareerTimeline />);

    expect(document.getElementById("career")).toBeInTheDocument();
  });

  it("섹션 헤더를 렌더링한다", () => {
    render(<CareerTimeline />);

    const header = document.getElementById("career");
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("PROFILE.career 개수만큼 항목을 렌더링한다", () => {
    render(<CareerTimeline />);

    PROFILE.career.forEach((entry) => {
      expect(screen.getByText(entry.hash)).toBeInTheDocument();
    });
  });

  it("각 경력의 org, role, detail을 표시한다", () => {
    render(<CareerTimeline />);

    PROFILE.career.forEach((entry) => {
      expect(screen.getByText(entry.detail)).toBeInTheDocument();
    });
  });

  it("action에 따라 feat/init Badge를 표시한다", () => {
    render(<CareerTimeline />);

    const featCount = PROFILE.career.filter((e) => e.action === "feat").length;
    const initCount = PROFILE.career.filter((e) => e.action === "init").length;

    const allBadges = screen.getAllByText(/^(feat|init)$/);
    const featBadges = allBadges.filter((el) => el.textContent === "feat");
    const initBadges = allBadges.filter((el) => el.textContent === "init");

    expect(featBadges).toHaveLength(featCount);
    expect(initBadges).toHaveLength(initCount);
  });
});
