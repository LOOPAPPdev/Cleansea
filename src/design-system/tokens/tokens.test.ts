import { describe, expect, it } from "vitest";
import tokens from "./tokens.json";
import { tokensSchema } from "./schema";

describe("tokens.json", () => {
  it("matches the schema", () => {
    expect(() => tokensSchema.parse(tokens)).not.toThrow();
  });
  it("keeps the 60-20-10-5-5 base colours", () => {
    expect(tokens.primitives.white["100"]).toBe("#F3F3F7");
    expect(tokens.primitives.gray["100"]).toBe("#EEECF9");
    expect(tokens.primitives.black["900"]).toBe("#2C293D");
    expect(tokens.primitives.purple["500"]).toBe("#7055F6");
    expect(tokens.primitives.green["300"]).toBe("#BEFBB6");
  });
  it("every contrast pair names real semantic tokens", () => {
    const keys = Object.keys(tokens.semantic);
    for (const [fg, bg] of tokens.contrast) {
      expect(keys).toContain(fg);
      expect(keys).toContain(bg);
    }
  });
});
