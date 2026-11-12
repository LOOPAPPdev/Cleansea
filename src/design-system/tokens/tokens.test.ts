import { describe, expect, it } from "vitest";
import tokens from "./tokens.json";
import { tokensSchema } from "./schema";
import { contrastRatio, resolveToken } from "./contrast";
import { deriveLayers, hexToHsl, hslToHex, semanticFor, type TokensLike } from "./foundation.mjs";

const T = tokens as unknown as TokensLike;

describe("tokens.json", () => {
  it("matches the schema", () => {
    expect(() => tokensSchema.parse(tokens)).not.toThrow();
  });
  it("matches the approved neutral-first reference colours", () => {
    const sem = tokens.semantic as Record<string, { light: string }>;
    const resolve = (v: string) => resolveToken(v, "light");
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

describe("foundation (Minimal method: base + accent → layers)", () => {
  it("hsl ↔ hex round-trips", () => {
    for (const h of ["#FCFCFC", "#7055F6", "#5A44C5", "#0F0F10", "#E3E7E8"]) expect(hslToHex(hexToHsl(h))).toBe(h);
  });
  it("the neutral scheme reproduces the approved v4 colours exactly (no visual change)", () => {
    expect(deriveLayers(T.foundation, "neutral", "light")).toMatchObject({
      raised: "#FFFFFF", bg1: "#FCFCFC", bg2: "#F2F2F2", bg3: "#EEEEEE", ui1: "#E8E8E8", ui2: "#B9B9B9", ui3: "#8A8A8A",
      tx1: "#000000", tx2: "#505050", tx3: "#6B6B6B", tx4: "#333333", ax1: "#5A44C5", ax3: "#7055F6",
    });
    expect(deriveLayers(T.foundation, "neutral", "dark")).toMatchObject({
      raised: "#222224", bg1: "#0F0F10", bg2: "#1A1A1B", bg3: "#2A2A2C", ui3: "#6E6E73",
      tx1: "#F5F5F5", tx2: "#A3A3A3", tx4: "#D4D4D4", ax1: "#A797FF", ax3: "#8B76FF",
    });
  });
  it("bg2 and ax3 are the base and accent colours themselves", () => {
    for (const [name, s] of Object.entries(T.foundation.schemes)) {
      for (const mode of ["light", "dark"] as const) {
        const l = deriveLayers(T.foundation, name, mode);
        expect(l.bg2).toBe(hslToHex(s[mode].base));
        expect(l.ax3).toBe(hslToHex(s[mode].accent));
      }
    }
  });
  it.each(Object.keys(T.foundation.schemes))("scheme %s passes every contrast pair in light and dark", (scheme) => {
    for (const mode of ["light", "dark"] as const) {
      const sem = semanticFor(T, mode, scheme);
      for (const [fg, bg, min] of tokens.contrast as [string, string, number][]) {
        expect(contrastRatio(sem[fg], sem[bg]), `${scheme} ${mode} ${fg}/${bg}`).toBeGreaterThanOrEqual(min);
      }
    }
  });
  it("background layers are ordered: raised ≥ bg1 ≥ bg2 ≥ bg3 in light, text gets darker tx3 → tx1", () => {
    const L = (h: string) => hexToHsl(h)[2];
    const l = deriveLayers(T.foundation, "neutral", "light");
    expect(L(l.raised)).toBeGreaterThanOrEqual(L(l.bg1));
    expect(L(l.bg1)).toBeGreaterThan(L(l.bg2));
    expect(L(l.bg2)).toBeGreaterThan(L(l.bg3));
    expect(L(l.tx3)).toBeGreaterThan(L(l.tx2));
    expect(L(l.tx2)).toBeGreaterThan(L(l.tx1));
  });
});
