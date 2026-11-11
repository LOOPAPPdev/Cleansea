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
});
