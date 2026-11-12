import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import tokens from "./tokens/tokens.json";
import { componentSpec } from "./spec.schema";
import { allSpecs } from "./specs";
import * as primitives from "./primitives";
import * as composites from "./composites";
import * as templates from "@/templates";

const parsed = allSpecs.map((s) => componentSpec.parse(s));
const names = new Set(parsed.map((s) => s.name));
const exported = (mod: object) => Object.entries(mod).filter(([, v]) => typeof v === "function").map(([k]) => k);

describe("component specs (governance)", () => {
  it.each(allSpecs.map((s) => [s.id, s] as const))("%s matches the schema", (_, s) => {
    expect(() => componentSpec.parse(s)).not.toThrow();
  });

  it("ids and names are unique", () => {
    expect(new Set(parsed.map((s) => s.id)).size).toBe(parsed.length);
    expect(names.size).toBe(parsed.length);
  });

  it("every token a spec uses exists in tokens.json", () => {
    const known = new Set(Object.keys(tokens.semantic));
    const missing = parsed.flatMap((s) => s.tokens.filter((t) => !known.has(t)).map((t) => `${s.name}: ${t}`));
    expect(missing).toEqual([]);
  });

  it("every dependency is itself a specified component", () => {
    const missing = parsed.flatMap((s) => s.dependsOn.filter((d) => !names.has(d)).map((d) => `${s.name} → ${d}`));
    expect(missing).toEqual([]);
  });

  it("every test file a spec lists exists", () => {
    const missing = parsed.flatMap((s) => s.tests.filter((f) => !existsSync(join(process.cwd(), f))).map((f) => `${s.name}: ${f}`));
    expect(missing).toEqual([]);
  });

  it("every exported component has a spec (no unspecified components)", () => {
    const helpers = new Set(["Section", "SectionHeading", "strokeFor", "niceMax"]); // documented inside Container / CardGrid specs
    const all = [...exported(primitives), ...exported(composites), ...exported(templates)].filter((n) => !helpers.has(n));
    expect(all.filter((n) => !names.has(n))).toEqual([]);
  });
});
