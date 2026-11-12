import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

/** Steps of the modular type scale (size doubles every 5 steps). */
export type TypeStep = "m2" | "m1" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

// Full class names so Tailwind can see them at build time.
const STEP: Record<TypeStep, string> = {
  m2: "text-step-m2", m1: "text-step-m1", "0": "text-step-0", "1": "text-step-1", "2": "text-step-2", "3": "text-step-3",
  "4": "text-step-4", "5": "text-step-5", "6": "text-step-6", "7": "text-step-7", "8": "text-step-8", "9": "text-step-9", "10": "text-step-10",
};
const WEIGHT = { regular: "font-normal", medium: "font-medium", semibold: "font-semibold" } as const;
const TONE = { default: "text-foreground", muted: "text-muted-foreground", subtle: "text-subtle-foreground" } as const;

type Common = { step?: TypeStep; weight?: keyof typeof WEIGHT; tone?: keyof typeof TONE; className?: string };

/** Display face (Anton): condensed capitals, one weight. Titles only. */
export const DISPLAY = "font-display font-normal uppercase tracking-[0.01em] hyphens-auto";

/**
 * Heading (LOOP-PRM-008). `level` sets the HTML tag (semantics); `step` sets the size (visual).
 * `display` switches to the display face (Anton, capitals) for page and campaign titles.
 */
export function Heading({ level = 2, step, weight = "medium", tone = "default", display = false, className, ...rest }: Common & { level?: 1 | 2 | 3 | 4; display?: boolean } & ComponentProps<"h2">) {
  const Tag = `h${level}` as ElementType;
  const fallback: Record<number, TypeStep> = { 1: "9", 2: "6", 3: "3", 4: "1" };
  return <Tag className={cn(STEP[step ?? fallback[level]], display ? DISPLAY : WEIGHT[weight], TONE[tone], "text-balance", className)} {...rest} />;
}

/** Body text (LOOP-PRM-009). Defaults to step 0 (16 px) with the scale's line height. */
export function Text({ as: Tag = "p", step = "0", weight = "regular", tone = "default", className, ...rest }: Common & { as?: ElementType } & ComponentProps<"p">) {
  return <Tag className={cn(STEP[step], WEIGHT[weight], TONE[tone], className)} {...rest} />;
}

export const typeSteps = Object.keys(STEP) as TypeStep[];
