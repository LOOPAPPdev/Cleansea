import { z } from "zod";

/** Zod schema for tokens.json — the single source of truth for design tokens. */
const hex = z.string().regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "hex #RRGGBB or #RRGGBBAA");
const ref = z.string().regex(/^\{[a-z]+\.[0-9]+\}$/, "reference {family.step}");
const themeRole = z.union([hex, ref]);
const value = z.union([hex, ref]);

export const tokensSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  version: z.string(),
  rule: z.string(),
  primitives: z.record(z.string(), z.record(z.string(), hex)),
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
    family: z.string(), base: z.string(), ratio: z.string(),
    weights: z.record(z.string(), z.number()),
    steps: z.record(z.string().regex(/^(m[12]|[0-9]|10)$/), z.object({ size: z.string(), px: z.number(), lineHeight: z.string(), tracking: z.string() })),
  }),
});

export type Tokens = z.infer<typeof tokensSchema>;
