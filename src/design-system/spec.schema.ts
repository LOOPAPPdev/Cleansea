import { z } from "zod";

/**
 * Component specification. Every component in the design system MUST export a spec
 * that passes this schema (enforced by src/design-system/specs.test.ts).
 */
export const LEVELS = ["primitive", "composite", "template", "product"] as const;
const PREFIX = { primitive: "PRM", composite: "CMP", template: "TPL", product: "PRD" } as const;

export const componentSpec = z
  .object({
    id: z.string().regex(/^LOOP-(PRM|CMP|TPL|PRD)-\d{3}$/),
    name: z.string().regex(/^[A-Z][A-Za-z]+$/),
    level: z.enum(LEVELS),
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    summary: z.string().min(10),
    /** Semantic token names from tokens.json (e.g. "primary", "surface"). */
    tokens: z.array(z.string()).min(1),
    variants: z.record(z.string(), z.array(z.string())).default({}),
    props: z.array(z.object({ name: z.string(), type: z.string(), required: z.boolean().default(false), description: z.string() })),
    states: z.array(z.enum(["default", "hover", "focus-visible", "active", "disabled", "loading", "error", "selected", "open", "current"])).min(1),
    responsive: z.array(z.string()).min(1),
    a11y: z.array(z.string()).min(1),
    tests: z.array(z.string()).min(1),
    dependsOn: z.array(z.string()).default([]),
  })
  .refine((s) => s.id.includes(`-${PREFIX[s.level]}-`), { message: "id prefix must match level", path: ["id"] });

export type ComponentSpec = z.input<typeof componentSpec>;
export const defineSpec = (s: ComponentSpec) => s;
