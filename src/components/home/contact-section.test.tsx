import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactSection from "./ContactSection";

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
    p: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement> & Record<string, unknown>) => {
      const { initial, whileInView, viewport, transition, ...rest } =
        props as Record<string, unknown>;
      void initial; void whileInView; void viewport; void transition;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => typeof v !== "object" || v === null)
      );
      return <p {...htmlProps}>{children}</p>;
    },
  },
}));

describe("ContactSection", () => {
  it("id='contact'를 가진다", () => {
    render(<ContactSection />);

    expect(document.getElementById("contact")).toBeInTheDocument();
  });

  it("섹션 헤더를 렌더링한다", () => {
    render(<ContactSection />);

    const header = document.getElementById("contact");
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("안내 문구를 표시한다", () => {
    render(<ContactSection />);

    expect(screen.getByText(/커피챗.*토론.*환영합니다/)).toBeInTheDocument();
  });

  it("3개의 연락처 카드를 렌더링한다", () => {
    render(<ContactSection />);

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });
});
