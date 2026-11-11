import Link from "next/link";
import { Badge, ButtonLink, Container, Section } from "../primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import { eyebrow, grid3, h2 } from "./styles";

/** Key numbers (LOOP-CMP-013). */
export function StatTiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <Section>
      <Container>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-3">
          {items.map((it) => (
            <div key={it.label} className="flex flex-col-reverse items-center rounded-lg border border-border bg-surface px-4 py-6 text-center">
              <dt className="mt-1 text-sm text-muted-foreground">{it.label}</dt>
              <dd className="m-0 text-[2rem] leading-[1.1] font-semibold tabular-nums">{it.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/** FAQ on Base UI Accordion (LOOP-CMP-014): keyboard + aria-expanded built in. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Section>
      <Container narrow>
        <h2 className={h2}>Perguntas frequentes</h2>
        <Accordion>
          {items.map((it) => (
            <AccordionItem key={it.q} value={it.q} className="border-b border-border">
              <AccordionTrigger>{it.q}</AccordionTrigger>
              <AccordionContent>{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}

/** Breadcrumb trail (LOOP-CMP-015). */
export function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <Container as="nav" aria-label="Você está aqui" className="pt-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={it.href + it.label} className="flex items-center gap-2 [&+li]:before:content-['/']">
            {i < items.length - 1 ? (
              <Link href={it.href} className="inline-flex min-h-8 items-center hover:text-foreground hover:underline">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-foreground">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </Container>
  );
}

/** Ordered process (LOOP-CMP-016). */
export function Steps({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <Section>
      <Container narrow>
        <h2 className={h2}>{title}</h2>
        <ol className="grid gap-3 [counter-reset:s]">
          {items.map((it) => (
            <li key={it.title} className="grid grid-cols-[auto_1fr] gap-x-4 rounded-lg border border-border bg-surface p-6 [counter-increment:s] before:row-span-2 before:font-mono before:text-[0.9375rem] before:font-semibold before:text-muted-foreground before:content-[counter(s,decimal-leading-zero)]">
              <strong>{it.title}</strong>
              <span className="text-muted-foreground">{it.body}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export type Plan = { name: string; price: string; body: string; features: string[]; highlight?: boolean };
/** Pricing cards (LOOP-CMP-017). Highlight uses the primary tint + border. */
export function PlanCards({ plans }: { plans: Plan[] }) {
  return (
    <Section>
      <Container>
        <div className={grid3}>
          {plans.map((p) => (
            <article key={p.name} className={cn("flex flex-col gap-3 rounded-xl border p-8", p.highlight ? "border-tint-lavender-border bg-tint-lavender" : "border-border bg-surface-raised")}>
              <h2 className="text-xl font-semibold">{p.name}</h2>
              {p.highlight ? <Badge tone="outline">Mais escolhido</Badge> : null}
              <p className="text-4xl leading-[1.1] font-semibold tabular-nums">{p.price}</p>
              <p className="text-foreground">{p.body}</p>
              <ul className="mb-4 flex-1 list-disc pl-5">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <ButtonLink href="/contato" variant={p.highlight ? "primary" : "secondary"}>Fale com vendas</ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Comparison table on ui/table; scrolls inside its own region (LOOP-CMP-018). */
export function ComparisonTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: { label: string; values: string[] }[] }) {
  return (
    <Section>
      <Container>
        <h2 className={h2}>{caption}</h2>
        <Table label={caption} containerClassName="rounded-lg border border-border" className="min-w-[560px] text-[0.9375rem]">
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="h-12 px-4">Recurso</TableHead>
                {columns.map((c) => <TableHead key={c} scope="col" className="h-12 px-4">{c}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.label}>
                  <TableHead scope="row" className="px-4 font-medium">{r.label}</TableHead>
                  {r.values.map((v, i) => <TableCell key={i} className="px-4 py-3.5">{v}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Container>
    </Section>
  );
}

/** Leadership / org cards (LOOP-CMP-019). Tone = border colour, always paired with the role text. */
export function OrgGrid({ title, people }: { title: string; people: { role: string; name: string; focus: string; areas: string; tone?: "lavender" | "sage" }[] }) {
  return (
    <Section>
      <Container>
        <h2 className={h2}>{title}</h2>
        <div className={grid3}>
          {people.map((p) => (
            <article key={p.name} className={cn("rounded-lg border-[1.5px] p-6", p.tone === "lavender" ? "border-tint-lavender-border bg-tint-lavender" : p.tone === "sage" ? "border-tint-sage-border bg-tint-sage" : "border-border")}>
              <p className={eyebrow}>{p.role}</p>
              <h3 className="mb-1 text-2xl font-semibold">{p.name}</h3>
              <p className="font-medium">{p.focus}</p>
              <p className="mt-4 border-t border-border pt-3 text-muted-foreground">{p.areas}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Long-form text blocks (LOOP-CMP-020). */
export function Prose({ blocks }: { blocks: { h: string; p: string[] }[] }) {
  return (
    <Section>
      <Container narrow>
        {blocks.map((b, i) => (
          <div key={b.h}>
            <h2 className={cn("mb-4 text-[1.75rem] leading-[1.2] font-medium", i > 0 && "mt-12")}>{b.h}</h2>
            {b.p.map((t, j) => <p key={j} className="mb-4">{t}</p>)}
          </div>
        ))}
      </Container>
    </Section>
  );
}
