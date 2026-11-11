"use client";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Loader2Icon } from "lucide-react";
import { Button as UIButton, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

/** Loop variants map onto ui/button: primary = purple fill (5%), ink = dark fill, secondary = surface. */
export type ButtonVariant = "primary" | "ink" | "secondary" | "outline" | "ghost" | "link";
export type ButtonSize = "md" | "lg";
type Common = { variant?: ButtonVariant; size?: ButtonSize; children: ReactNode; className?: string };
const size = (s: ButtonSize) => (s === "lg" ? "lg" : "default");

/** Navigation styled as a button (e.g. "Fale com vendas"). Renders a Next.js Link. */
export function ButtonLink({ href, variant = "primary", size: s = "md", children, className, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size: size(s) }), className)} {...rest}>
      {children}
    </Link>
  );
}

/** Action button. loading=true disables it, sets aria-busy and shows a spinner. */
export function Button({ variant = "primary", size: s = "md", loading = false, children, className, disabled, type = "button", ...rest }: Common & { loading?: boolean } & Omit<ComponentProps<typeof UIButton>, "variant" | "size">) {
  return (
    <UIButton type={type} variant={variant} size={size(s)} className={className} disabled={disabled || loading} aria-busy={loading || undefined} data-loading={loading || undefined} {...rest}>
      {loading ? <Loader2Icon className="animate-spin" aria-hidden="true" /> : null}
      {children}
    </UIButton>
  );
}
