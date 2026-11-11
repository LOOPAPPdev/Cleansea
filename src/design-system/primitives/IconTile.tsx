import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 44px square for an icon or index. Decorative: hidden from assistive technology. */
export function IconTile({ tone = "neutral", children }: { tone?: "neutral" | "primary" | "success"; children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-11 flex-none place-items-center rounded-md font-mono text-sm font-semibold",
        tone === "primary" && "bg-primary text-primary-foreground",
        tone === "success" && "bg-success text-success-foreground",
        tone === "neutral" && "bg-surface-sunken text-foreground",
      )}
    >
      {children}
    </span>
  );
}
