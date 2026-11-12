import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import tokens from "../tokens/tokens.json";
import minimal from "../tokens/minimal.json";
import { minimalValue, obsidianCss, type MinimalData } from "../tokens/foundation.mjs";
import { vault } from "@/content";
import { MarkdownView } from "./MarkdownView";
import { MinimalSource, ObsidianVars } from "./Obsidian";

const M = minimal as unknown as MinimalData;
const resolve = (t: string) => (t === "existe" ? "/guias/existe" : undefined);

describe("MarkdownView (Obsidian reading view)", () => {
  it("offsets headings so the page keeps one h1", () => {
    render(<MarkdownView markdown={"# Um\n\n## Dois"} />);
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Um" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Dois" })).toBeInTheDocument();
  });
  it("renders callouts as notes with a title, type and default title", () => {
    render(<MarkdownView markdown={"> [!tip] Dica boa\n> Corpo da dica\n\n> [!warning]\n> Cuidado"} />);
    const tip = screen.getByRole("note", { name: "Dica boa" });
    expect(tip).toHaveAttribute("data-callout", "tip");
    expect(within(tip).getByText("Corpo da dica")).toBeInTheDocument();
    expect(screen.getByRole("note", { name: "Warning" })).toHaveAttribute("data-callout", "warning");
  });
  it("keeps a plain blockquote a blockquote", () => {
    const { container } = render(<MarkdownView markdown={"> só uma citação"} />);
    expect(container.querySelector("blockquote")?.textContent).toContain("só uma citação");
    expect(screen.queryByRole("note")).toBeNull();
  });
  it("renders ==highlight==, #tags and wikilinks (resolved and unresolved), not inside code", () => {
    const { container } = render(<MarkdownView markdown={"Texto ==marcado== com #tag-um, [[existe|alias]] e [[falta]]. `==nao== #nao [[nao]]`"} resolveLink={resolve} />);
    expect(container.querySelector("mark")?.textContent).toBe("marcado");
    expect(container.querySelector(".tag")?.textContent).toBe("#tag-um");
    expect(screen.getByRole("link", { name: "alias" })).toHaveAttribute("href", "/guias/existe");
    expect(container.querySelector(".is-unresolved")?.textContent).toBe("falta");
    expect(container.querySelector("code")?.textContent).toBe("==nao== #nao [[nao]]");
  });
  it("does not treat numbers or URL fragments as tags", () => {
    const { container } = render(<MarkdownView markdown={"Item #1 e a#b"} />);
    expect(container.querySelector(".tag")).toBeNull();
  });
  it("removes %%comments%% and renders task lists as labelled, disabled checkboxes", () => {
    const { container } = render(<MarkdownView markdown={"Visível %%oculto%%\n\n- [x] feito\n- [ ] pendente"} />);
    expect(container.textContent).not.toContain("oculto");
    const boxes = screen.getAllByRole("checkbox");
    expect(boxes).toHaveLength(2);
    expect(boxes[0]).toBeChecked();
    expect(boxes[0]).toBeDisabled();
    expect(boxes[0]).toHaveAccessibleName("Concluída");
  });
  it("wraps tables and code blocks in focusable scroll regions", () => {
    const { container } = render(<MarkdownView markdown={"| a | b |\n|---|---|\n| 1 | 2 |\n\n```\ncode\n```"} />);
    expect(screen.getByRole("region", { name: "Tabela" })).toHaveAttribute("tabindex", "0");
    expect(container.querySelector("pre")).toHaveAttribute("tabindex", "0");
  });
  it("uses the .markdown-rendered scope that tokens.css fills with the Obsidian vocabulary", () => {
    const { container } = render(<MarkdownView markdown="x" />);
    expect(container.firstElementChild).toHaveClass(tokens.obsidian.scope.slice(1));
  });
  it("renders every vault note", () => {
    for (const n of Object.values(vault)) {
      const { unmount } = render(<MarkdownView markdown={n.markdown} />);
      expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
      unmount();
    }
  });
});

describe("vendored Minimal theme → data", () => {
  it("minimal.json is in sync with vendor/obsidian-minimal (npm run minimal)", () => {
    expect(() => execFileSync("node", ["scripts/minimal-extract.mjs", "--check"], { stdio: "pipe" })).not.toThrow();
  });
  it("vault.generated.ts is in sync with src/content/vault (npm run vault)", () => {
    expect(() => execFileSync("node", ["scripts/vault.mjs", "--check"], { stdio: "pipe" })).not.toThrow();
  });
  it("records the vendored commit and keeps the MIT licence", () => {
    const meta = JSON.parse(readFileSync("vendor/obsidian-minimal/VENDOR.json", "utf8"));
    expect(M.source.commit).toBe(meta.commit);
    expect(readFileSync("vendor/obsidian-minimal/LICENSE", "utf8")).toMatch(/MIT License[\s\S]*Steph Ango/);
  });
  it("takes reading measures from Minimal", () => {
    expect(minimalValue(M, "--line-width")).toBe("40rem");
    expect(minimalValue(M, "--table-border-width")).toBe("1px"); // follows var(--border-width)
    expect(obsidianCss(M, tokens.scale.reading.width)).toBe("40rem");
  });
  it("every {minimal.*} mapping exists in Minimal and colours map to layers only", () => {
    for (const [k, v] of Object.entries(tokens.obsidian.vars as Record<string, string>)) {
      expect(() => obsidianCss(M, v), k).not.toThrow();
      expect(v, `${k} must not be a raw colour`).not.toMatch(/^#|rgb|hsl/);
    }
  });
  it("does not pull third-party colour schemes", () => {
    expect(Object.values(M.defaults).some((d) => d.file.includes("color-schemes/"))).toBe(false);
  });
});

describe("Obsidian docs blocks", () => {
  it("MinimalSource shows the pinned commit; ObsidianVars lists every mapped variable", () => {
    render(<><MinimalSource /><ObsidianVars /></>);
    expect(screen.getByText(new RegExp(M.source.commit.slice(0, 7)))).toBeInTheDocument();
    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(Object.keys(tokens.obsidian.vars).length + 1);
  });
});
