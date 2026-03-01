import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JsonLd from "./JsonLd";

describe("JsonLd", () => {
  it("Person + WebSite JSON-LD 스크립트를 렌더링한다", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts).toHaveLength(2);

    const personData = JSON.parse(scripts[0].textContent!);
    expect(personData["@type"]).toBe("Person");
    expect(personData.name).toBe("엄상현");
    expect(personData.alternateName).toBe("Sanghyun Eom");
    expect(personData.url).toBe("https://shmksumsun.xyz");

    const websiteData = JSON.parse(scripts[1].textContent!);
    expect(websiteData["@type"]).toBe("WebSite");
    expect(websiteData.name).toBe("Terminal Odyssey");
    expect(websiteData.inLanguage).toBe("ko");
  });

  it("sameAs에 GitHub, LinkedIn URL을 포함한다", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const personData = JSON.parse(scripts[0].textContent!);

    expect(personData.sameAs).toContain("https://github.com/sumsun-dev");
    expect(personData.sameAs).toEqual(
      expect.arrayContaining([expect.stringContaining("linkedin")])
    );
  });
});
