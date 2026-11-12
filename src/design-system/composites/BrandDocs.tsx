import { Check, Cloud, Database, GitBranch, Monitor, Search, Server, Users, X, type LucideIcon } from "lucide-react";
import tokens from "../tokens/tokens.json";
import { bestText, contrastRatio, resolveToken } from "../tokens/contrast";
import { DISPLAY, Icon, Logo, LOGO_MIN_WIDTH, ThemeSurface, themeNames, type ThemeName } from "../primitives";
import { cn } from "@/lib/utils";

const prims = tokens.primitives as Record<string, Record<string, string>>;
const STEPS = ["050", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

/** 10-step colour scale with hex and the AA-safe text colour per step (LOOP-CMP-031). */
export function ColorScale({ family, label }: { family: "neutral" | "sage" | "lavender" | "warm"; label: string }) {
  return (
    <section aria-label={label} className="min-w-0">
      <h3 className="mb-3 text-step-1 font-medium">{label}</h3>
      <ol className="grid grid-cols-5 overflow-hidden rounded-lg border border-border sm:grid-cols-10">
        {STEPS.map((s) => {
          const hex = prims[family][s];
          const t = bestText(hex);
          return (
            <li key={s} className="flex min-h-24 min-w-0 flex-col justify-between p-1.5 text-step-m2 [overflow-wrap:anywhere] sm:p-2" style={{ background: hex, color: t.color }}>
              <span className="font-semibold">{s}</span>
              <span className="font-mono">{hex}</span>
              <span>Aa {t.ratio.toFixed(1)}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Grid of the 12 light / mid / dark themes with their text and accent (LOOP-CMP-032). */
export function ThemeGrid() {
  const themes = tokens.themes as Record<string, { ground: string; text: string; accent: string }>;
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,180px),1fr))] gap-3">
      {themeNames.map((n: ThemeName) => {
        const th = themes[n];
        const g = resolveToken(th.ground), tx = resolveToken(th.text), ac = resolveToken(th.accent);
        return (
          <li key={n}>
            <ThemeSurface theme={n} className="flex min-h-32 flex-col justify-between rounded-lg border border-border p-4">
              <span className="text-step-4 font-medium">Aa</span>
              <span className="flex items-center gap-2 text-step-m1">
                <span className="size-3 rounded-full bg-theme-accent" aria-hidden="true" />
                {n}
              </span>
              <span className="text-step-m2 opacity-90">texto {contrastRatio(tx, g).toFixed(1)} · acento {contrastRatio(ac, g).toFixed(1)}</span>
            </ThemeSurface>
          </li>
        );
      })}
    </ul>
  );
}

/** Every checked contrast pair from tokens.json, in light and dark (LOOP-CMP-033). */
export function ContrastTable() {
  const sem = tokens.semantic as Record<string, { light: string; dark: string }>;
  const rows = (tokens.contrast as [string, string, number][]).map(([fg, bg, min]) => {
    const l = contrastRatio(resolveToken(sem[fg].light, "light"), resolveToken(sem[bg].light, "light"));
    const d = contrastRatio(resolveToken(sem[fg].dark, "dark"), resolveToken(sem[bg].dark, "dark"));
    return { fg, bg, min, l, d };
  });
  return (
    <div role="region" aria-label="Tabela de contraste" tabIndex={0} className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] text-step-m1">
        <thead className="bg-surface text-left">
          <tr><th scope="col" className="p-3">Texto / elemento</th><th scope="col" className="p-3">Fundo</th><th scope="col" className="p-3">Mínimo</th><th scope="col" className="p-3">Claro</th><th scope="col" className="p-3">Escuro</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.fg + r.bg} className="border-t border-border">
              <th scope="row" className="p-3 text-left font-mono font-normal">{r.fg}</th>
              <td className="p-3 font-mono">{r.bg}</td>
              <td className="p-3 tabular-nums">{r.min}:1</td>
              <td className="p-3 tabular-nums">{r.l.toFixed(2)} {r.l >= r.min ? "✓" : "✗"}</td>
              <td className="p-3 tabular-nums">{r.d.toFixed(2)} {r.d >= r.min ? "✓" : "✗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TYPE_CLASS: Record<string, string> = {
  m2: "text-step-m2", m1: "text-step-m1", "0": "text-step-0", "1": "text-step-1", "2": "text-step-2", "3": "text-step-3", "4": "text-step-4",
  "5": "text-step-5", "6": "text-step-6", "7": "text-step-7", "8": "text-step-8", "9": "text-step-9", "10": "text-step-10",
};
/** Modular type scale specimen (LOOP-CMP-034). */
export function TypeScale() {
  const steps = tokens.typography.steps as Record<string, { px: number; lineHeight: string; tracking: string }>;
  const order = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "m1", "m2"];
  return (
    <ol className="divide-y divide-border rounded-lg border border-border">
      {order.map((k) => (
        <li key={k} className="grid grid-cols-[88px_1fr] items-baseline gap-4 overflow-hidden p-3 sm:grid-cols-[140px_1fr]">
          <span className="font-mono text-step-m2 text-muted-foreground">step {k.replace("m", "−")}<br />{steps[k].px}px / {steps[k].lineHeight}</span>
          <span className={cn(TYPE_CLASS[k], "truncate font-medium")}>Arquitetura operacional</span>
        </li>
      ))}
    </ol>
  );
}

const SAMPLE_ICONS: [string, LucideIcon][] = [["users", Users], ["monitor", Monitor], ["server", Server], ["git-branch", GitBranch], ["cloud", Cloud], ["database", Database], ["search", Search], ["check", Check]];
/** Icon sizes and strokes on the 16 px grid (LOOP-CMP-035). */
export function IconGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {([16, 20, 24] as const).map((size) => (
        <figure key={size} className="m-0 rounded-lg border border-border bg-surface-raised p-4">
          <figcaption className="mb-3 text-step-m1 text-muted-foreground">{size} px · traço {size === 24 ? 2 : 1.5}</figcaption>
          <ul className="flex flex-wrap gap-3">
            {SAMPLE_ICONS.map(([n, I]) => (
              <li key={n} className="grid size-11 place-items-center rounded-md bg-surface bg-[length:8px_8px] bg-[linear-gradient(to_right,var(--chart-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--chart-grid)_1px,transparent_1px)]">
                <Icon icon={I} size={size} label={n} />
              </li>
            ))}
          </ul>
        </figure>
      ))}
    </div>
  );
}

/** Logo variants, minimum sizes and clearance (LOOP-CMP-036). */
export function LogoUsage() {
  const variants = [
    { v: "lockup" as const, name: "Lockup (símbolo + nome)" },
    { v: "logomark" as const, name: "Símbolo" },
    { v: "logotype" as const, name: "Nome" },
    { v: "avatar" as const, name: "Avatar" },
  ];
  return (
    <div className="grid gap-4">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3">
        {variants.map(({ v, name }) => (
          <li key={v} className="flex flex-col gap-4 rounded-lg border border-border bg-surface-raised p-4">
            <div className="flex min-h-20 items-center"><Logo variant={v} height={28} /></div>
            <div className="text-step-m1"><strong className="font-medium">{name}</strong><br /><span className="text-muted-foreground">Mínimo {LOGO_MIN_WIDTH[v]} px</span></div>
          </li>
        ))}
      </ul>
      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="m-0 rounded-lg border border-border bg-surface p-4">
          <figcaption className="mb-3 text-step-m1 text-muted-foreground">Área livre = metade da altura do símbolo</figcaption>
          <div className="inline-block outline-1 outline-dashed outline-border-strong"><Logo variant="lockup" height={28} clearance /></div>
        </figure>
        <figure className="m-0 rounded-lg border border-border bg-foreground p-4">
          <figcaption className="mb-3 text-step-m1 text-background/80">Versão negativa: branco sobre preto</figcaption>
          <Logo variant="lockup" height={28} tone="inverse" />
        </figure>
      </div>
    </div>
  );
}

/** Do / avoid lists (LOOP-CMP-037). */
export function DoDont({ doItems = [], avoid = [] }: { doItems?: string[]; avoid?: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {doItems.length ? (
        <section aria-label="Faça" className="rounded-lg border border-border bg-surface-raised p-4">
          <h4 className="mb-2 flex items-center gap-2 font-medium"><span className="grid size-6 place-items-center rounded-full bg-success text-success-foreground"><Icon icon={Check} size={16} /></span>Faça</h4>
          <ul className="grid gap-2 text-muted-foreground">{doItems.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      ) : null}
      {avoid.length ? (
        <section aria-label="Evite" className="rounded-lg border border-border bg-surface-raised p-4">
          <h4 className="mb-2 flex items-center gap-2 font-medium"><span className="grid size-6 place-items-center rounded-full bg-warning text-warning-foreground"><Icon icon={X} size={16} /></span>Evite</h4>
          <ul className="grid gap-2 text-muted-foreground">{avoid.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      ) : null}
    </div>
  );
}

/** Brand values: name · meaning · three descriptors (LOOP-CMP-038). */
export function BrandValues({ values }: { values: { name: string; meaning: string; descriptors: string[] }[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-3">
      {values.map((v) => (
        <li key={v.name} className="flex flex-col gap-2 rounded-lg border border-border bg-surface-raised p-5">
          <h3 className="text-step-2 font-medium">{v.name}</h3>
          <p className="text-muted-foreground">{v.meaning}</p>
          <p className="mt-auto text-step-m1 text-subtle-foreground">{v.descriptors.join(" · ")}</p>
        </li>
      ))}
    </ul>
  );
}

/** The three type families and their roles: display (Anton), text (Inter), mono (tags) (LOOP-CMP-044). */
export function TypeFamilies() {
  const fam = tokens.typography.families as Record<string, { name: string; weight: number | string; case: string; use: string; source: string }>;
  const sample: Record<string, { cls: string; text: string }> = {
    display: { cls: cn("text-step-7", DISPLAY), text: "Vendas virtuais" },
    text: { cls: "text-step-3 font-medium", text: "Consultoria full stack" },
    mono: { cls: "font-mono text-step-0", text: "#diagnostico · LOOP-CMP-041" },
  };
  const role: Record<string, string> = { display: "Display", text: "Texto", mono: "Tags e códigos" };
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {Object.entries(fam).map(([k, f]) => (
        <li key={k} className="flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-surface p-4">
          <p className="text-step-m1 text-subtle-foreground">{role[k] ?? k}</p>
          <p className={cn(sample[k]?.cls, "[overflow-wrap:anywhere]")}>{sample[k]?.text}</p>
          <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-step-m1">
            <dt className="text-subtle-foreground">Família</dt><dd className="font-medium">{f.name}</dd>
            <dt className="text-subtle-foreground">Peso</dt><dd>{f.weight}</dd>
            <dt className="text-subtle-foreground">Caixa</dt><dd>{f.case}</dd>
            <dt className="text-subtle-foreground">Uso</dt><dd className="text-muted-foreground">{f.use}</dd>
            <dt className="text-subtle-foreground">Fonte</dt><dd className="text-muted-foreground">{f.source}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}
