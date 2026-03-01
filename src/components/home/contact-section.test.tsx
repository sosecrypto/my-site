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
  },
}));

describe("ContactSection", () => {
  it("id='contact'를 가진다", () => {
    render(<ContactSection />);

    expect(document.getElementById("contact")).toBeInTheDocument();
  });

  it("안내 문구를 표시한다", () => {
    render(<ContactSection />);

    expect(screen.getByText(/편하게 연락 주세요/)).toBeInTheDocument();
  });

  it("Telegram과 LinkedIn 버튼을 표시한다", () => {
    render(<ContactSection />);

    expect(screen.getByLabelText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("@sose_crypto")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });
});
