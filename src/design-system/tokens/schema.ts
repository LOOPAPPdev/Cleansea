import { z } from "zod";

/** Zod schema for tokens.json — the single source of truth for design tokens. */
const hex = z.string().regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "hex #RRGGBB or #RRGGBBAA");
const ref = z.string().regex(/^\{[a-z]+\.[0-9]+\}$/, "reference {family.step}");
const value = z.union([hex, ref]);

export const tokensSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  version: z.string(),
  rule: z.string(),
  primitives: z.record(z.string(), z.record(z.string(), hex)),
  semantic: z.record(
    z.string().regex(/^[a-z][a-z-]*$/),
    z.object({ share: z.string().optional(), light: value, dark: value, usage: z.string().min(1) }),
  ),
  contrast: z.array(z.tuple([z.string(), z.string(), z.number()])),
  scale: z.record(z.string(), z.record(z.string(), z.string())),
});

export type Tokens = z.infer<typeof tokensSchema>;
