import { render, screen } from "@testing-library/react";
import { Search } from "lucide-react";
import { describe, expect, it } from "vitest";
import { Heading, Icon, Logo, LOGO_MIN_WIDTH, strokeFor, Text, ThemeSurface } from ".";

describe("Logo (LOOP-PRM-011)", () => {
  it("is an image named after the brand", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: "Loop Consultoria" })).toBeInTheDocument();
  });
  it("keeps the lockup at or above its minimum width", () => {
    render(<Logo variant="lockup" height={4} />);
    expect(screen.getByRole("img").style.minWidth).toBe(`${LOGO_MIN_WIDTH.lockup}px`);
  });
  it("clamps a tiny logomark to the minimum size", () => {
    const { container } = render(<Logo variant="logomark" height={4} />);
    expect(container.querySelector("svg")?.getAttribute("width")).toBe(String(LOGO_MIN_WIDTH.logomark));
  });
  it("adds clearance of half the mark height", () => {
    render(<Logo height={24} clearance />);
    expect(screen.getByRole("img").style.padding).toBe("12px");
  });
  it("uses only black or white", () => {
    const { rerender } = render(<Logo />);
    expect(screen.getByRole("img").className).toContain("text-foreground");
    rerender(<Logo tone="inverse" />);
    expect(screen.getByRole("img").className).toContain("text-background");
  });
});

describe("Icon (LOOP-PRM-010)", () => {
  it("follows the stroke rule", () => {
    expect(strokeFor(16)).toBe(1.5);
    expect(strokeFor(20)).toBe(1.5);
    expect(strokeFor(24)).toBe(2);
  });
  it("is decorative unless labelled", () => {
    const { container, rerender } = render(<Icon icon={Search} size={24} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toHaveAttribute("stroke-width", "2");
    rerender(<Icon icon={Search} label="Buscar" />);
    expect(screen.getByRole("img", { name: "Buscar" })).toBeInTheDocument();
  });
});

describe("Heading / Text (LOOP-PRM-008/009)", () => {
  it("keeps semantics separate from size", () => {
    render(<Heading level={1} step="3">Título</Heading>);
    const h = screen.getByRole("heading", { level: 1, name: "Título" });
    expect(h.className).toContain("text-step-3");
  });
  it("text defaults to step 0", () => {
    render(<Text>Corpo</Text>);
    expect(screen.getByText("Corpo").className).toContain("text-step-0");
  });
});

describe("ThemeSurface (LOOP-PRM-012)", () => {
  it("applies the theme class and theme colours", () => {
    render(<ThemeSurface theme="sage-dark">x</ThemeSurface>);
    expect(screen.getByText("x").className).toMatch(/theme-sage-dark.*bg-theme-ground.*text-theme-text/);
  });
});

describe("cn (regression: type-scale classes survive a colour class)", () => {
  it("keeps text-step-* next to text-foreground", async () => {
    const { cn } = await import("@/lib/utils");
    expect(cn("text-step-3", "text-foreground")).toBe("text-step-3 text-foreground");
    expect(cn("text-step-3", "text-step-5")).toBe("text-step-5");
  });
});

describe("Type families (display · text · mono)", () => {
  it("Heading display uses the display face in capitals, one weight", async () => {
    const { Heading } = await import("./Typography");
    const { render, screen } = await import("@testing-library/react");
    render(<Heading level={1} display>Vendas virtuais</Heading>);
    const h = screen.getByRole("heading", { level: 1 });
    expect(h).toHaveClass("font-display", "uppercase", "font-normal");
    expect(h).not.toHaveClass("font-medium");
  });
  it("Hero titles use the display face and only scale steps", async () => {
    const { Hero } = await import("../composites/Hero");
    const { render, screen } = await import("@testing-library/react");
    render(<Hero title="Título" />);
    const h = screen.getByRole("heading", { level: 1 });
    expect(h).toHaveClass("font-display", "text-step-8");
    expect(h.className).not.toMatch(/text-\[/);
  });
  it("TypeFamilies lists Anton, Inter and monospace from tokens", async () => {
    const tokens = (await import("../tokens/tokens.json")).default;
    const { TypeFamilies } = await import("../composites/BrandDocs");
    const { render, screen } = await import("@testing-library/react");
    expect(tokens.typography.families.display.name).toBe("Anton");
    expect(tokens.scale.family.display).toMatch(/^var\(--font-anton\)/);
    render(<TypeFamilies />);
    for (const n of ["Anton", "Inter", "System monospace"]) expect(screen.getByText(n)).toBeInTheDocument();
  });
  it("badges (tags) use the monospace family", async () => {
    const { Badge } = await import("./Badge");
    const { render, screen } = await import("@testing-library/react");
    render(<Badge>Proposta</Badge>);
    expect(screen.getByText("Proposta")).toHaveClass("font-mono");
  });
});
