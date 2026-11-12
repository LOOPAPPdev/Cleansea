import { z } from "zod";

/** Zod schema for tokens.json — the single source of truth for design tokens. */
const hex = z.string().regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "hex #RRGGBB or #RRGGBBAA");
const ref = z.string().regex(/^\{[a-z]+\.[0-9]+\}$/, "reference {family.step}");
const layerRef = z.string().regex(/^\{layer\.[a-z0-9]+\}$/, "reference {layer.name}");
const themeRole = z.union([hex, ref]);
const value = z.union([hex, ref, layerRef]);
const hsl = z.tuple([z.number().min(0).max(360), z.number().min(0).max(100), z.number().min(0).max(100)]);
const offset = z.tuple([z.number(), z.number()]);

export const tokensSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  version: z.string(),
  rule: z.string(),
  primitives: z.record(z.string(), z.record(z.string(), hex)),
  /** Foundation (Minimal method): base + accent HSL per scheme and mode → layers by [Δs, Δl] offsets. */
  foundation: z.object({
    method: z.string(),
    default: z.string(),
    layers: z.record(z.string().regex(/^[a-z]+[0-9]?$/), z.object({
      usage: z.string().min(1), from: z.enum(["base", "accent"]), light: offset, dark: offset,
      alpha: z.string().regex(/^[0-9A-F]{2}$/).optional(),
    })),
    schemes: z.record(z.string().regex(/^[a-z]+$/), z.object({
      label: z.string(),
      light: z.object({ base: hsl, accent: hsl }),
      dark: z.object({ base: hsl, accent: hsl }),
    })),
  }),
  /** Obsidian vocabulary (vendored Minimal): var name → {layer.x} | {semantic.x} | {minimal.--x} | {type.N} | {scale.g.k} | CSS value. */
  obsidian: z.object({
    method: z.string(),
    scope: z.string().startsWith("."),
    vars: z.record(z.string().regex(/^--[a-z0-9-]+$/), z.string().min(1)),
  }),
  semantic: z.record(
    z.string().regex(/^[a-z][a-z0-9-]*$/),
    z.object({ share: z.string().optional(), light: value, dark: value, usage: z.string().min(1) }),
  ),
  contrast: z.array(z.tuple([z.string(), z.string(), z.number()])),
  scale: z.record(z.string(), z.record(z.string(), z.string())),
  /** Themes light / mid / dark per family: ground, text (≥ 4.5:1), accent (≥ 3:1). */
  themes: z.record(z.string().regex(/^[a-z]+-(light|mid|dark)$/), z.object({ ground: themeRole, text: themeRole, accent: themeRole })),
  /** Modular type scale: size doubles every 5 steps. */
  typography: z.object({
    family: z.string(),
    /** Three roles: display (titles), text (body/UI), mono (tags, IDs, code). */
    families: z.object({ display: z.object({ name: z.string(), weight: z.union([z.number(), z.string()]), case: z.string(), tracking: z.string(), use: z.string(), source: z.string() }) })
      .catchall(z.object({ name: z.string(), weight: z.union([z.number(), z.string()]), case: z.string(), tracking: z.string(), use: z.string(), source: z.string() })),
    base: z.string(), ratio: z.string(),
    weights: z.record(z.string(), z.number()),
    steps: z.record(z.string().regex(/^(m[12]|[0-9]|10)$/), z.object({ size: z.string(), px: z.number(), lineHeight: z.string(), tracking: z.string() })),
  }),
});

export type Tokens = z.infer<typeof tokensSchema>;
