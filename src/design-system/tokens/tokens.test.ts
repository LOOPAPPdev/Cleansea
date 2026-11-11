import { describe, expect, it } from "vitest";
import tokens from "./tokens.json";
import { tokensSchema } from "./schema";

describe("tokens.json", () => {
  it("matches the schema", () => {
    expect(() => tokensSchema.parse(tokens)).not.toThrow();
  });
  it("matches the approved neutral-first reference colours", () => {
    const sem = tokens.semantic as Record<string, { light: string }>;
    const p = tokens.primitives as Record<string, Record<string, string>>;
    const resolve = (v: string) => { const m = /^\{([a-z]+)\.(\d+)\}$/.exec(v); return m ? p[m[1]][m[2]] : v; };
    expect(resolve(sem.background.light)).toBe("#FCFCFC");
    expect(resolve(sem.surface.light)).toBe("#F2F2F2");
    expect(resolve(sem.foreground.light)).toBe("#000000");
    expect(resolve(sem["tint-sage"].light)).toBe("#E3E7E8");
    expect(resolve(sem["tint-lavender"].light)).toBe("#E6E5EB");
    expect(resolve(sem.brand.light)).toBe("#7055F6");
    expect(resolve(sem.success.light)).toBe("#BEFBB6");
  });
  it("every contrast pair names real semantic tokens", () => {
    const keys = Object.keys(tokens.semantic);
    for (const [fg, bg] of tokens.contrast) {
      expect(keys).toContain(fg);
      expect(keys).toContain(bg);
    }
  });
  it("type scale doubles every 5 steps", () => {
    const st = tokens.typography.steps as Record<string, { px: number }>;
    expect(st["5"].px).toBeCloseTo(st["0"].px * 2, 0);
    expect(st["10"].px).toBeCloseTo(st["5"].px * 2, 0);
    expect(st["0"].px).toBe(16);
  });
  it("has 12 themes (4 families × light/mid/dark)", () => {
    expect(Object.keys(tokens.themes)).toHaveLength(12);
  });
  it("10-step scales get darker step by step", () => {
    const p = tokens.primitives as Record<string, Record<string, string>>;
    const lum = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).reduce((a, b) => a + b, 0);
    for (const f of ["neutral", "sage", "lavender", "warm"]) {
      const v = ["050", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((k) => lum(p[f][k]));
      for (let i = 1; i < v.length; i++) expect(v[i], `${f} step ${i}`).toBeLessThan(v[i - 1]);
    }
  });
});
