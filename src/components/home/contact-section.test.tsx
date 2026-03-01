import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactSection from "./ContactSection";
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

  it("이메일 CTA 링크를 표시한다", () => {
    render(<ContactSection />);

    const emailLink = screen.getByText(PROFILE.email);
    expect(emailLink.closest("a")).toHaveAttribute("href", `mailto:${PROFILE.email}`);
  });

  it("소셜 아이콘 3개를 렌더링한다", () => {
    render(<ContactSection />);

    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("Telegram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });
});
