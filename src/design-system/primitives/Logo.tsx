import { cn } from "@/lib/utils";

export type LogoVariant = "lockup" | "logomark" | "logotype" | "avatar";
/** Minimum rendered widths (px). Below these the logo loses legibility. */
export const LOGO_MIN_WIDTH: Record<LogoVariant, number> = { lockup: 120, logomark: 16, logotype: 96, avatar: 24 };

/**
 * Loop logo (LOOP-PRM-011): logomark (ring), logotype (name), lockup (both) or avatar.
 * Colour is black or white only (`currentColor` from `tone`). Clearance = half the mark height,
 * applied as padding when `clearance` is true. Sizes below the minimum are clamped.
 */
export function Logo({ variant = "lockup", height = 24, tone = "default", clearance = false, className, label = "Loop Consultoria" }: {
  variant?: LogoVariant; height?: number; tone?: "default" | "inverse"; clearance?: boolean; className?: string; label?: string;
}) {
  const h = Math.max(height, variant === "logomark" ? LOGO_MIN_WIDTH.logomark : 16);
  const ring = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="shrink-0">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
  const pad = clearance ? { padding: h / 2 } : undefined;
  const color = tone === "inverse" ? "text-background" : "text-foreground";

  if (variant === "avatar") {
    const size = Math.max(h, LOGO_MIN_WIDTH.avatar);
    return (
      <span role="img" aria-label={label} className={cn("inline-grid place-items-center rounded-md", tone === "inverse" ? "bg-foreground text-background" : "bg-background text-foreground ring-1 ring-border", className)} style={{ width: size, height: size }}>
        {ring(Math.round(size * 0.6))}
      </span>
    );
  }
  return (
    <span role="img" aria-label={label} className={cn("inline-flex items-center whitespace-nowrap font-semibold tracking-tight", color, className)} style={{ gap: h * 0.4, fontSize: h * 0.8, lineHeight: 1, minWidth: variant === "logomark" ? undefined : LOGO_MIN_WIDTH[variant], ...pad }}>
      {variant !== "logotype" ? ring(h) : null}
      {variant !== "logomark" ? <span aria-hidden="true">Loop Consultoria</span> : null}
    </span>
  );
}
