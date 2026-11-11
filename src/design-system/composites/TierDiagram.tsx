import { ArrowDown, ArrowUpDown, Cloud, Database, GitBranch, Monitor, Server, Users, type LucideIcon } from "lucide-react";
import type { ArchitectureGroup } from "@/content";
import { Badge, Icon } from "../primitives";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = { users: Users, monitor: Monitor, server: Server, "git-branch": GitBranch, cloud: Cloud, database: Database };
export type TierGroup = ArchitectureGroup;
export type TierDiagramData = {
  actor: { title: string; subtitle: string };
  groups: TierGroup[];
  integrations: { title: string; icon?: string }[];
};

const GROUP_TONE = { sage: "border-tint-sage-border bg-tint-sage", lavender: "border-tint-lavender-border bg-tint-lavender" } as const;
const Arrow = ({ both }: { both?: boolean }) => (
  <span className="flex justify-center py-2 text-subtle-foreground" aria-hidden="true">
    <Icon icon={both ? ArrowUpDown : ArrowDown} size={20} />
  </span>
);

/**
 * Architecture diagram (LOOP-CMP-022), drawn exactly like the approved reference:
 * gray ground → white actor card → sage group → lavender group → white integration cards.
 * Semantics: a <figure> with an ordered list of layers, so the flow reads top to bottom without the picture.
 */
export function TierDiagram({ data, label }: { data: TierDiagramData; label: string }) {
  return (
    <figure aria-label={label} className="m-0 rounded-xl bg-surface p-4 sm:p-6">
      <ol className="flex flex-col">
        <li className="rounded-lg border border-border bg-surface-raised px-4 py-6 text-center">
          <span className="flex justify-center text-muted-foreground"><Icon icon={Users} size={24} /></span>
          <strong className="mt-2 block text-step-2 font-medium">{data.actor.title}</strong>
          <span className="mt-1 block text-muted-foreground">{data.actor.subtitle}</span>
        </li>
        {data.groups.map((g, gi) => (
          <li key={g.title}>
            <Arrow both={gi > 0} />
            <section aria-label={g.title} className={cn("rounded-lg border p-4 sm:p-5", GROUP_TONE[g.tone])}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-step-2 font-medium">{g.title}</h3>
                {g.icon && ICONS[g.icon] ? <span className="text-muted-foreground"><Icon icon={ICONS[g.icon]} size={20} /></span> : null}
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {g.nodes.map((n) => (
                  <li key={n} className="flex min-h-11 items-center justify-center rounded-md bg-surface-raised px-3 py-2 text-center">{n}</li>
                ))}
              </ul>
            </section>
          </li>
        ))}
        <li>
          <Arrow both />
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] gap-3">
            {data.integrations.map((it) => (
              <li key={it.title} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-5 font-medium">
                {it.icon && ICONS[it.icon] ? <span className="text-muted-foreground"><Icon icon={ICONS[it.icon]} size={20} /></span> : null}
                {it.title}
              </li>
            ))}
          </ul>
        </li>
      </ol>
    </figure>
  );
}

/** White panel with eyebrow, title, status badge and content, as the reference frame (LOOP-CMP-023). */
export function ModulePanel({ eyebrow, title, status, children }: { eyebrow?: string; title: string; status?: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="rounded-xl border border-border bg-background p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          {eyebrow ? <p className="text-step-m1 font-medium tracking-[0.06em] uppercase text-muted-foreground">{eyebrow}</p> : null}
          <h2 className="mt-1 text-step-4 font-medium">{title}</h2>
        </div>
        {status ? <Badge tone="warn">{status}</Badge> : null}
      </div>
      {children}
    </section>
  );
}
