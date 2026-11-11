import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconSize = 16 | 20 | 24;
/** Stroke rule: 1.5 at 16 and 20 px, 2 at 24 px. */
export const strokeFor = (size: IconSize) => (size === 24 ? 2 : 1.5);

/**
 * Icon (LOOP-PRM-010). Lucide only, on the 16 px grid.
 * Decorative by default (aria-hidden). Pass `label` when the icon stands alone and carries meaning.
 */
export function Icon({ icon: Glyph, size = 20, label, className }: { icon: LucideIcon; size?: IconSize; label?: string; className?: string }) {
  return (
    <Glyph
      width={size}
      height={size}
      strokeWidth={strokeFor(size)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
      className={cn("shrink-0", className)}
    />
  );
}
