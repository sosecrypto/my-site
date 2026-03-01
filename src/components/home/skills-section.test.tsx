import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SkillsSection from "./SkillsSection";
import { SKILLS } from "@/lib/constants";

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

  it("전체 SKILLS를 렌더링한다", () => {
    render(<SkillsSection />);

    SKILLS.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it("카테고리 필터 버튼들을 렌더링한다", () => {
    render(<SkillsSection />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Frameworks")).toBeInTheDocument();
    expect(screen.getByText("Tools")).toBeInTheDocument();
    expect(screen.getByText("Blockchain")).toBeInTheDocument();
  });

  it("Languages 필터 클릭 시 language 카테고리만 표시한다", async () => {
    const user = userEvent.setup();
    render(<SkillsSection />);

    await user.click(screen.getByText("Languages"));

    const languageSkills = SKILLS.filter((s) => s.category === "language");
    const nonLanguageSkills = SKILLS.filter((s) => s.category !== "language");

    languageSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });

    nonLanguageSkills.forEach((skill) => {
      expect(screen.queryByText(skill.name)).not.toBeInTheDocument();
    });
  });

  it("스킬 레벨 퍼센트를 표시한다", () => {
    render(<SkillsSection />);

    const uniqueLevels = [...new Set(SKILLS.map((s) => s.level))];
    uniqueLevels.forEach((level) => {
      expect(screen.getAllByText(`${level}%`).length).toBeGreaterThan(0);
    });
  });
});
