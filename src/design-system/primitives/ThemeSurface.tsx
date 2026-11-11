import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

export type ThemeFamily = "neutral" | "sage" | "lavender" | "warm";
export type ThemeLevel = "light" | "mid" | "dark";
export type ThemeName = `${ThemeFamily}-${ThemeLevel}`;

const THEMES: Record<ThemeName, string> = {
  "neutral-light": "theme-neutral-light", "neutral-mid": "theme-neutral-mid", "neutral-dark": "theme-neutral-dark",
  "sage-light": "theme-sage-light", "sage-mid": "theme-sage-mid", "sage-dark": "theme-sage-dark",
  "lavender-light": "theme-lavender-light", "lavender-mid": "theme-lavender-mid", "lavender-dark": "theme-lavender-dark",
  "warm-light": "theme-warm-light", "warm-mid": "theme-warm-mid", "warm-dark": "theme-warm-dark",
};
export const themeNames = Object.keys(THEMES) as ThemeName[];

/**
 * ThemeSurface (LOOP-PRM-012): applies a light / mid / dark theme for a moment of emphasis.
 * Ground, text and accent come from tokens.json `themes` (text ≥ 4.5:1, accent ≥ 3:1, checked by npm run contrast).
 */
export function ThemeSurface({ theme, as: Tag = "div", className, ...rest }: { theme: ThemeName; as?: ElementType } & ComponentProps<"div">) {
  return <Tag className={cn(THEMES[theme], "bg-theme-ground text-theme-text", className)} {...rest} />;
}
