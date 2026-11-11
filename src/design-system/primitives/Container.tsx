import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

/** Centres content at the site container width with the responsive gutter and safe-area insets. */
export function Container({ as: Tag = "div", narrow, className, ...rest }: { as?: ElementType; narrow?: boolean } & ComponentProps<"div">) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[max(var(--space-gutter),env(safe-area-inset-left,0px))]",
        narrow ? "max-w-[calc(var(--space-measure)+2*var(--space-gutter))]" : "max-w-site",
        className,
      )}
      {...rest}
    />
  );
}

/** Vertical rhythm between page sections. */
export function Section({ className, ...rest }: ComponentProps<"section">) {
  return <section className={cn("py-(--space-section)", className)} {...rest} />;
}
