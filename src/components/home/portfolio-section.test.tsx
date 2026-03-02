import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PortfolioSection from "./PortfolioSection";
import { CAPABILITIES, PROJECTS } from "@/lib/constants";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => {
      const { variants, initial, animate, whileInView, whileHover, viewport, transition, layout, ...rest } =
        props as Record<string, unknown>;
      void variants; void initial; void animate; void whileInView; void whileHover; void viewport; void transition; void layout;
      const htmlProps = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => typeof v !== "object" || v === null)
      );
      return <div {...htmlProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt as string} {...props} />
  ),
}));

describe("PortfolioSection", () => {
  it("id='portfolio'를 가진다", () => {
    render(<PortfolioSection />);

    expect(document.getElementById("portfolio")).toBeInTheDocument();
  });

  it("전체 CAPABILITIES를 렌더링한다", () => {
    render(<PortfolioSection />);

    CAPABILITIES.forEach((cap) => {
      expect(screen.getByText(cap.title)).toBeInTheDocument();
      expect(screen.getByText(cap.description)).toBeInTheDocument();
    });
  });

  it("카테고리 필터 버튼들을 렌더링한다", () => {
    render(<PortfolioSection />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Analysis")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("Analysis 필터 클릭 시 analysis 카테고리만 표시한다", async () => {
    const user = userEvent.setup();
    render(<PortfolioSection />);

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
    render(<PortfolioSection />);

    CAPABILITIES.forEach((cap) => {
      cap.tools.forEach((tool) => {
        expect(screen.getByText(tool)).toBeInTheDocument();
      });
    });
  });

  it("projectIds가 있는 역량에 '프로젝트 보기' 버튼을 표시한다", () => {
    render(<PortfolioSection />);

    const capsWithProjects = CAPABILITIES.filter((c) => c.projectIds && c.projectIds.length > 0);
    const capsWithoutProjects = CAPABILITIES.filter((c) => !c.projectIds || c.projectIds.length === 0);

    const toggleButtons = screen.getAllByText(/^프로젝트 보기 \(\d+\)$/);
    expect(toggleButtons).toHaveLength(capsWithProjects.length);

    expect(capsWithoutProjects.length).toBeGreaterThan(0);
  });

  it("기본 상태에서 관련 프로젝트가 펼쳐져 있다", () => {
    render(<PortfolioSection />);

    // 프로젝트와 연결된 모든 고유 프로젝트 title 수집
    const linkedTitles = new Set(
      CAPABILITIES.flatMap((c) => c.projectIds ?? []),
    );

    linkedTitles.forEach((title) => {
      const project = PROJECTS.find((p) => p.title === title);
      if (project) {
        expect(screen.getAllByLabelText(`${project.title} GitHub`).length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  it("'프로젝트 보기' 클릭 시 아코디언을 접는다", async () => {
    const user = userEvent.setup();
    render(<PortfolioSection />);

    // Content 카테고리 필터로 유일한 역량만 표시
    await user.click(screen.getByText("Content"));

    const contentCap = CAPABILITIES.find((c) => c.category === "content" && c.projectIds)!;
    const projectTitle = contentCap.projectIds![0];
    const project = PROJECTS.find((p) => p.title === projectTitle)!;

    // 기본 펼쳐진 상태 확인
    expect(screen.getByLabelText(`${project.title} GitHub`)).toBeInTheDocument();

    // 클릭하면 접힘
    await user.click(screen.getByText(/^프로젝트 보기/));
    expect(screen.queryByLabelText(`${project.title} GitHub`)).not.toBeInTheDocument();
  });

  it("프로젝트 미니 카드에 GitHub 링크가 있다", () => {
    render(<PortfolioSection />);

    const linkedTitles = new Set(
      CAPABILITIES.flatMap((c) => c.projectIds ?? []),
    );

    linkedTitles.forEach((title) => {
      const project = PROJECTS.find((p) => p.title === title);
      if (project) {
        const githubLinks = screen.getAllByLabelText(`${project.title} GitHub`);
        githubLinks.forEach((link) => {
          expect(link).toHaveAttribute("href", project.github);
        });
      }
    });
  });
});
