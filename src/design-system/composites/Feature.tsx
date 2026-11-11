import type { Cta } from "@/content";
import { ButtonLink, Container, Section } from "../primitives";
import { cn } from "@/lib/utils";
import { h2 } from "./styles";

/** Centred statement (LOOP-CMP-009). */
export function SectionIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Section>
      <Container className="text-center">
        <h2 className="mb-6 text-[clamp(2.125rem,4.6vw,3.75rem)] leading-[1.08] font-medium tracking-[-0.03em]">{title}</h2>
        <p className="mx-auto max-w-[44ch] text-[clamp(1.125rem,1.6vw,1.3125rem)]">{subtitle}</p>
      </Container>
    </Section>
  );
}

type Media = "integrations" | "badges" | "data";
const MEDIA: Record<Media, { ground: string; dots: string[]; big: number; alt: string }> = {
  integrations: { ground: "bg-tint-sage border-tint-sage-border", dots: ["CRM", "ERP", "Loop", "BI", "Docs"], big: 2, alt: "Ferramentas conectadas à Loop" },
  badges: { ground: "bg-tint-lavender border-tint-lavender-border", dots: ["ISO", "LGPD", "SOC"], big: -1, alt: "Selos de conformidade" },
  data: { ground: "bg-surface border-border", dots: ["Dados", "Fonte", "Citação"], big: 1, alt: "Respostas com fonte citada" },
};

/** Wide media + heading + body + optional CTA (LOOP-CMP-010). */
export function FeatureMedia({ title, body, media = "data", cta }: { title: string; body: string; media?: Media; cta?: Cta }) {
  const m = MEDIA[media];
  return (
    <Section>
      <Container className="max-w-[1088px]">
        <div role="img" aria-label={m.alt} className={cn("flex aspect-[16/10] items-center justify-center gap-[clamp(8px,3vw,40px)] overflow-hidden rounded-xl border", m.ground)}>
          {m.dots.map((d, i) => (
            <span key={d} aria-hidden="true" className={cn("grid aspect-square place-items-center rounded-full border border-border bg-surface-raised text-[clamp(0.75rem,1.6vw,1.25rem)] font-semibold", i === m.big ? "w-[clamp(84px,18vw,240px)]" : "w-[clamp(56px,11vw,150px)]")}>
              {d}
            </span>
          ))}
        </div>
        <h3 className="mt-8 mb-3 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.02em]">{title}</h3>
        <p className="mb-6 max-w-[60ch]">{body}</p>
        {cta ? <ButtonLink href={cta.href}>{cta.label}</ButtonLink> : null}
      </Container>
    </Section>
  );
}

/** Closing call to action (LOOP-CMP-011). */
export function CtaBand({ title, cta }: { title: string; cta: Cta }) {
  return (
    <Section>
      <Container>
        <div className="rounded-xl border border-border bg-surface px-6 py-[clamp(56px,9vw,120px)] text-center">
          <h2 className={cn(h2, "mx-auto max-w-[20ch] text-[clamp(2rem,4.4vw,3.5rem)]")}>{title}</h2>
          <ButtonLink href={cta.href} size="lg">{cta.label}</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

/** Customer quote (LOOP-CMP-012). */
export function Quote({ text, author }: { text: string; author: string }) {
  return (
    <Section>
      <Container>
        <figure className="m-0 rounded-xl border border-border bg-surface p-[clamp(32px,6vw,72px)]">
          <blockquote className="m-0 max-w-[30ch] text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.3] font-medium">“{text}”</blockquote>
          <figcaption className="mt-6 text-muted-foreground">{author}</figcaption>
        </figure>
      </Container>
    </Section>
  );
}
