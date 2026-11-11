import Link from "next/link";
import type { ReactNode } from "react";
import type { CardItem } from "@/content";
import type { Tone } from "../tokens/tokens";
import { Card, Container, IconTile, Section } from "../primitives";
import { cn } from "@/lib/utils";
import { cardDesc, cardTitle, grid, grid3, h2 } from "./styles";

/** Tone → classes. Tint ground, pane bars and label ink all come from tokens. */
const TONE: Record<Tone, { ground: string; bar: string; ink: string }> = {
  primary: { ground: "bg-[linear-gradient(160deg,var(--primary),color-mix(in_srgb,var(--primary)_18%,var(--background))_70%)]", bar: "bg-primary/45", ink: "text-primary-strong" },
  success: { ground: "bg-[linear-gradient(160deg,var(--success),color-mix(in_srgb,var(--success)_30%,var(--background))_70%)]", bar: "bg-success-strong/40", ink: "text-success-strong" },
  ink: { ground: "bg-[linear-gradient(160deg,var(--foreground),color-mix(in_srgb,var(--foreground)_25%,var(--background))_70%)]", bar: "bg-foreground/35", ink: "text-foreground" },
  surface: { ground: "bg-[linear-gradient(160deg,var(--surface-sunken),var(--surface)_70%)]", bar: "bg-muted-foreground/35", ink: "text-foreground" },
};

/** Card with a tinted illustration (LOOP-CMP-004). The label repeats the title, so tone is never the only cue. */
export function IllustratedCard({ item }: { item: CardItem }) {
  const t = TONE[item.tone] ?? TONE.surface;
  return (
    <Link href={item.href} className="group block rounded-lg text-inherit no-underline">
      <div role="img" aria-label={`Ilustração: ${item.title}`} className={cn("relative aspect-square overflow-hidden rounded-lg", t.ground)}>
        <div className="absolute top-[21%] right-0 bottom-0 left-[21%] rounded-tl-sm bg-background/75 transition-transform duration-500 ease-standard group-hover:-translate-x-1 group-hover:-translate-y-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("absolute left-[12%] h-[10%] rounded-[3px]", t.bar)} style={{ top: `${14 + i * 18}%`, width: `${40 + ((i * 23) % 50)}%` }} />
          ))}
        </div>
        <span aria-hidden="true" className={cn("absolute bottom-[7%] left-[7%] max-w-[86%] rounded-sm bg-surface-raised px-2 py-1.5 text-[clamp(1.125rem,2.2vw,1.75rem)] leading-none font-medium tracking-tight [overflow-wrap:anywhere]", t.ink)}>
          {item.title}
        </span>
      </div>
      <h3 className={cardTitle}>{item.title}</h3>
      <p className={cardDesc}>{item.desc}</p>
    </Link>
  );
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id} className={h2}>{children}</h2>;
}

/** Responsive grid 4 → 2 → 1 by min track width (LOOP-CMP-005). */
export function CardGrid({ id, title, items }: { id: string; title: string; items: CardItem[] }) {
  return (
    <Section aria-labelledby={`h-${id}`} id={id}>
      <Container>
        <SectionHeading id={`h-${id}`}>{title}</SectionHeading>
        <div className={grid}>{items.map((it) => <IllustratedCard key={it.href} item={it} />)}</div>
      </Container>
    </Section>
  );
}

/** Large media cards with a floating UI mock (LOOP-CMP-006). */
export function MediaCardRow({ id, title, items }: { id: string; title: string; items: CardItem[] }) {
  return (
    <Section aria-labelledby={`h-${id}`} id={id}>
      <Container>
        <SectionHeading id={`h-${id}`}>{title}</SectionHeading>
        <div className={grid3}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="block rounded-lg">
              <div role="img" aria-label={`Exemplo de ${it.title}`} className="grid aspect-square place-items-center rounded-lg bg-[linear-gradient(150deg,var(--surface),color-mix(in_srgb,var(--primary)_55%,var(--background)))] p-[12%]">
                <div className="w-full rounded-[14px] bg-surface-raised p-3.5 text-sm text-muted-foreground shadow-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <span className="mt-3 flex justify-between text-primary-strong"><span>+ Base de conhecimento</span><span aria-hidden="true">↑</span></span>
                </div>
              </div>
              <h3 className={cardTitle}>{it.title}</h3>
              <p className={cardDesc}>{it.desc}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Numbered capability cards (LOOP-CMP-007). */
export function FeatureCards({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <Section>
      <Container>
        <h2 className={h2}>{title}</h2>
        <div className={grid3}>
          {items.map((it, i) => (
            <Card key={it.title}>
              <IconTile tone="primary">{String(i + 1).padStart(2, "0")}</IconTile>
              <h3 className="mt-6 mb-2 text-xl leading-snug font-medium">{it.title}</h3>
              <p className={cardDesc}>{it.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Linked cards for partners, guides, jobs, news (LOOP-CMP-008). */
export function LinkCards({ title, items, id }: { title: string; id?: string; items: { title: string; body: string; href: string; tag?: ReactNode }[] }) {
  return (
    <Section id={id}>
      <Container>
        <h2 className={h2}>{title}</h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-3">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="block h-full rounded-lg border border-border p-6 transition-colors hover:bg-surface">
                {it.tag}
                <h3 className={cardTitle}>{it.title}</h3>
                <p className={cardDesc}>{it.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
