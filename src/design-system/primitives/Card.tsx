import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "filled" | "outline" | "raised";
const styles: Record<CardVariant, string> = {
  filled: "bg-surface border border-border",
  outline: "border border-border",
  raised: "bg-surface-raised border border-border shadow-sm",
};
/** Surface container. filled = surface (20%) with a visible edge; raised = white on surface. */
export function Card({ variant = "filled", className, ...rest }: { variant?: CardVariant } & ComponentProps<"div">) {
  return <div className={cn("rounded-lg p-6", styles[variant], className)} {...rest} />;
}
