import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import tokens from "../tokens/tokens.json";
import { FoundationLayers, SchemePreview, schemeNames } from "./Foundation";
import { Prose } from "./Data";

describe("FoundationLayers", () => {
  it("lists every layer with its light and dark value as text", () => {
    render(<FoundationLayers />);
    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(Object.keys(tokens.foundation.layers).length + 1);
    const bg1 = within(table).getByRole("rowheader", { name: "bg1" }).closest("tr")!;
    expect(bg1.textContent).toContain("#FCFCFC");
    expect(bg1.textContent).toContain("#0F0F10");
    expect(screen.getByRole("region", { name: /Camadas do esquema/ })).toHaveAttribute("tabindex", "0");
  });
});

describe("SchemePreview", () => {
  it("renders one card per scheme, default first, and applies .scheme-* to the others", () => {
    const { container } = render(<SchemePreview />);
    expect(schemeNames[0]).toBe(tokens.foundation.default);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(schemeNames.length);
    for (const k of schemeNames.slice(1)) expect(container.querySelector(`.scheme-${k}`)).not.toBeNull();
  });
});

describe("Prose (reading view)", () => {
  it("renders sections labelled by their heading, lists and quotes with native elements", () => {
    render(<Prose blocks={[{ h: "Um", p: ["a"] }, { h: "Dois", p: ["b"], list: ["x", "y"], quote: "q" }]} />);
    expect(screen.getByRole("region", { name: "Dois" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("q").tagName).toBe("BLOCKQUOTE");
  });
});
