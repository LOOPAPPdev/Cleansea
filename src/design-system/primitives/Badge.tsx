import type { ReactNode } from "react";
import { Badge as UIBadge } from "../ui/badge";

export type BadgeTone = "neutral" | "accent" | "primary" | "success" | "warn" | "outline";
/** Short status/category label. success = green fill with dark ink; warn = Protótipo/Proposta. */
export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return <UIBadge variant={tone}>{children}</UIBadge>;
}
