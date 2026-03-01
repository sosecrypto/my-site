import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TerminalWindow from "./TerminalWindow";

describe("TerminalWindow", () => {
  it("children을 렌더링한다", () => {
    render(<TerminalWindow>터미널 내용</TerminalWindow>);

    expect(screen.getByText("터미널 내용")).toBeInTheDocument();
  });

  it("기본 title을 표시한다", () => {
    render(<TerminalWindow>내용</TerminalWindow>);

    expect(screen.getByText("visitor@shmksumsun.xyz")).toBeInTheDocument();
  });

  it("커스텀 title을 표시한다", () => {
    render(<TerminalWindow title="custom-title">내용</TerminalWindow>);

    expect(screen.getByText("custom-title")).toBeInTheDocument();
  });

  it("macOS dots 3개를 렌더링한다", () => {
    const { container } = render(<TerminalWindow>내용</TerminalWindow>);
    const dots = container.querySelectorAll(".rounded-full");

    expect(dots).toHaveLength(3);
  });

  it("CRT scanlines 오버레이를 포함한다", () => {
    const { container } = render(<TerminalWindow>내용</TerminalWindow>);
    const scanlines = container.querySelector(".pointer-events-none.z-10");

    expect(scanlines).toBeInTheDocument();
  });
});
