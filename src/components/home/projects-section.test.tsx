import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsSection from "./ProjectsSection";
import { PROJECTS } from "@/lib/constants";

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

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt as string} {...props} />
  ),
}));

describe("ProjectsSection", () => {
  it("id='projects'를 가진다", () => {
    render(<ProjectsSection />);

    expect(document.getElementById("projects")).toBeInTheDocument();
  });

  it("섹션 헤더를 렌더링한다", () => {
    render(<ProjectsSection />);

    const header = document.getElementById("projects");
    expect(header?.querySelector("h2")).toBeInTheDocument();
  });

  it("PROJECTS 개수만큼 카드를 렌더링한다", () => {
    render(<ProjectsSection />);

    PROJECTS.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("각 프로젝트의 태그를 표시한다", () => {
    render(<ProjectsSection />);

    PROJECTS.forEach((project) => {
      project.tags.forEach((tag) => {
        expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("live 링크가 있는 프로젝트만 Live 버튼을 표시한다", () => {
    render(<ProjectsSection />);

    const liveProjects = PROJECTS.filter((p) => p.live);
    const liveButtons = screen.getAllByText("Live");

    expect(liveButtons).toHaveLength(liveProjects.length);
  });
});
