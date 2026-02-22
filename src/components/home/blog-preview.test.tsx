import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogPreview from "./BlogPreview";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
      const { initial, whileInView, viewport, transition, ...rest } =
        props as Record<string, unknown>;
      void initial; void whileInView; void viewport; void transition;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => typeof v !== "object" || v === null)
      );
      return <div {...htmlProps}>{children}</div>;
    },
    a: ({
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & Record<string, unknown>) => {
      const { variants, initial, whileInView, viewport, custom, ...rest } =
        props as Record<string, unknown>;
      void variants; void initial; void whileInView; void viewport; void custom;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => typeof v !== "object" || v === null)
      );
      return <a {...htmlProps}>{children}</a>;
    },
  },
}));

describe("BlogPreview", () => {
  it("id='blog'를 가진다", () => {
    render(<BlogPreview />);

    expect(document.getElementById("blog")).toBeInTheDocument();
  });

  it("섹션 헤더를 렌더링한다", () => {
    render(<BlogPreview />);

    const header = document.getElementById("blog");
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("블로그 포스트 항목을 렌더링한다", () => {
    render(<BlogPreview />);

    expect(screen.getByText("AI 시대의 개발자 역할 변화")).toBeInTheDocument();
    expect(screen.getByText("Web3와 탈중앙화의 미래")).toBeInTheDocument();
    expect(screen.getByText("DeSpread 팀과 함께한 1년")).toBeInTheDocument();
  });

  it("/blog로 연결되는 전체 보기 링크를 표시한다", () => {
    render(<BlogPreview />);

    const link = screen.getByText(/전체 로그 보기/);
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/blog");
  });
});
