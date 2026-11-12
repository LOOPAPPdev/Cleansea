import type { Cta } from "@/content";
import { ButtonLink, Container, DISPLAY } from "../primitives";
import { cn } from "@/lib/utils";
import { eyebrow } from "./styles";

/** Page opener (LOOP-CMP-003). align="center" for hubs, "start" for inner pages. Title in the display face (Anton, capitals); first CTA = primary (black). */
export function Hero({ eyebrow: kicker, title, subtitle, ctas = [], align = "center" }: { eyebrow?: string; title: string; subtitle?: string; ctas?: Cta[]; align?: "center" | "start" }) {
  const start = align === "start";
  return (
    <Container as="section" className={cn(start ? "pt-[clamp(48px,7vw,96px)] pb-8 text-left" : "pt-[clamp(72px,11vw,150px)] pb-[clamp(48px,6vw,80px)] text-center")}>
      {kicker ? <p className={eyebrow}>{kicker}</p> : null}
      <h1 className={cn("max-w-[18ch] text-step-8 sm:text-step-9 lg:text-step-10", DISPLAY, !start && "mx-auto")}>{title}</h1>
      {subtitle ? <p className={cn("mt-6 max-w-[46ch] text-[clamp(1.125rem,1.6vw,1.3125rem)]", !start && "mx-auto")}>{subtitle}</p> : null}
      {ctas.length ? (
        <div className={cn("mt-8 flex flex-wrap gap-3 max-[480px]:*:flex-[1_1_100%]", start ? "justify-start" : "justify-center")}>
          {ctas.map((c, i) => (
            <ButtonLink key={c.label} href={c.href} variant={c.variant ?? (i === 0 ? "primary" : "secondary")} size="lg">
              {c.label}
            </ButtonLink>
          ))}
        </div>
      ) : null}
    </Container>
  );
}
