import type { ReactNode } from "react";
import type { ChartItem, ChartSeries } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Data visualisation (LOOP-CMP-024 … 029). Pure SVG, server-rendered, no chart library.
 * Rules (docs/brand-guidelines.md §7): zero-based axes for bars/columns, ≤ 6 series in fixed colour
 * order, light horizontal grid only, direct labels where possible, title + source + data table on every chart.
 */
const FILL = ["fill-chart-1", "fill-chart-2", "fill-chart-3", "fill-chart-4", "fill-chart-5", "fill-chart-6"];
const STROKE = ["stroke-chart-1", "stroke-chart-2", "stroke-chart-3", "stroke-chart-4", "stroke-chart-5", "stroke-chart-6"];
const BG = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-chart-6"];
export const MAX_SERIES = 6;

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const fmt = (n: number, unit = "") => `${Number.isInteger(n) ? n : n.toFixed(1)}${unit}`;
/** Round the axis maximum up to a readable value (1, 2, 2.5, 5 × 10^n). */
export function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p;
  return 10 * p;
}
function assertSeries(n: number) {
  if (n > MAX_SERIES) throw new Error(`Charts accept at most ${MAX_SERIES} series (got ${n}).`);
}

type FrameProps = { title: string; source?: string; legend?: string[]; table: { columns: string[]; rows: (string | number)[][] }; children: ReactNode };

/** Chart frame: title, legend, the drawing, source and an accessible data table. */
export function ChartFrame({ title, source, legend, table, children }: FrameProps) {
  const id = `chart-${slug(title)}`;
  return (
    <figure aria-labelledby={`${id}-t`} className="relative m-0 min-w-0 rounded-lg border border-border bg-surface-raised p-4 sm:p-6">
      <figcaption id={`${id}-t`} className="text-step-1 font-medium">{title}</figcaption>
      {legend && legend.length > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-step-m1 text-muted-foreground" aria-hidden="true">
          {legend.map((l, i) => (
            <li key={l} className="flex items-center gap-2"><span className={cn("size-3 rounded-sm", BG[i])} />{l}</li>
          ))}
        </ul>
      ) : null}
      <div className="mt-4">{children}</div>
      {source ? <p className="mt-3 text-step-m1 text-muted-foreground">Fonte: {source}</p> : null}
      {/* sr-only on a <table> does not shrink it (tables ignore width:1px); wrap it instead. */}
      <div className="sr-only">
      <table>
        <caption>{title}</caption>
        <thead><tr>{table.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody>{table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody>
      </table>
      </div>
    </figure>
  );
}

const W = 600, H = 300, PAD = { t: 12, r: 12, b: 32, l: 44 };
const innerW = W - PAD.l - PAD.r, innerH = H - PAD.t - PAD.b;

function YGrid({ max, unit }: { max: number; unit?: string }) {
  return (
    <g aria-hidden="true">
      {[0, 0.25, 0.5, 0.75, 1].map((f) => {
        const y = PAD.t + innerH * (1 - f);
        return (
          <g key={f}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} className="stroke-chart-grid" strokeWidth={1} />
            <text x={PAD.l - 8} y={y + 4} textAnchor="end" className="fill-chart-axis text-[12px]">{fmt(max * f, unit)}</text>
          </g>
        );
      })}
    </g>
  );
}

/** Grouped column chart (LOOP-CMP-025). Gap between bars = half the bar width. */
export function ColumnChart({ title, source, labels, series, unit = "" }: { title: string; source?: string; labels: string[]; series: ChartSeries[]; unit?: string }) {
  assertSeries(series.length);
  const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
  const groupW = innerW / labels.length;
  const barW = (groupW * 0.8) / (series.length + (series.length - 1) * 0.5);
  return (
    <ChartFrame title={title} source={source} legend={series.map((s) => s.name)}
      table={{ columns: ["Período", ...series.map((s) => s.name)], rows: labels.map((l, i) => [l, ...series.map((s) => fmt(s.values[i], unit))]) }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
        <YGrid max={max} unit={unit} />
        {labels.map((l, i) => {
          const gx = PAD.l + groupW * i + groupW * 0.1;
          return (
            <g key={l}>
              {series.map((s, si) => {
                const h = (s.values[i] / max) * innerH;
                return <rect key={s.name} x={gx + si * barW * 1.5} y={PAD.t + innerH - h} width={barW} height={h} rx={2} className={FILL[si]} />;
              })}
              <text x={PAD.l + groupW * i + groupW / 2} y={H - 10} textAnchor="middle" className="fill-chart-axis text-[12px]">{l}</text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

/** Horizontal bar chart with direct value labels (LOOP-CMP-024). One series. */
export function BarChart({ title, source, items, unit = "" }: { title: string; source?: string; items: ChartItem[]; unit?: string }) {
  const max = niceMax(Math.max(...items.map((i) => i.value)));
  const rowH = 36, h = items.length * rowH, labelW = 110, valueW = 48;
  return (
    <ChartFrame title={title} source={source} table={{ columns: ["Item", "Valor"], rows: items.map((i) => [i.name, fmt(i.value, unit)]) }}>
      <svg viewBox={`0 0 ${W} ${h}`} className="h-auto w-full" aria-hidden="true">
        {items.map((it, i) => {
          const w = (it.value / max) * (W - labelW - valueW);
          const y = i * rowH;
          return (
            <g key={it.name}>
              <text x={0} y={y + rowH / 2 + 4} className="fill-foreground text-[13px]">{it.name}</text>
              <rect x={labelW} y={y + 8} width={w} height={rowH - 16} rx={2} className={FILL[0]} />
              <text x={labelW + w + 8} y={y + rowH / 2 + 4} className="fill-chart-axis text-[12px]">{fmt(it.value, unit)}</text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

/** Line chart (LOOP-CMP-026); `area` fills under each line (AreaChart), `markers` shows points. */
export function LineChart({ title, source, labels, series, unit = "", area = false, markers = true }: { title: string; source?: string; labels: string[]; series: ChartSeries[]; unit?: string; area?: boolean; markers?: boolean }) {
  assertSeries(series.length);
  const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
  const x = (i: number) => PAD.l + (innerW * i) / Math.max(1, labels.length - 1);
  const y = (v: number) => PAD.t + innerH * (1 - v / max);
  return (
    <ChartFrame title={title} source={source} legend={series.map((s) => s.name)}
      table={{ columns: ["Período", ...series.map((s) => s.name)], rows: labels.map((l, i) => [l, ...series.map((s) => fmt(s.values[i], unit))]) }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
        <YGrid max={max} unit={unit} />
        {series.map((s, si) => {
          const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
          return (
            <g key={s.name}>
              {area ? <polygon points={`${x(0)},${y(0)} ${pts} ${x(s.values.length - 1)},${y(0)}`} className={FILL[si]} fillOpacity={0.18} /> : null}
              <polyline points={pts} fill="none" className={STROKE[si]} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
              {markers ? s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={3.5} className={cn(FILL[si], "stroke-surface-raised")} strokeWidth={1.5} />) : null}
            </g>
          );
        })}
        {labels.map((l, i) => <text key={l} x={x(i)} y={H - 10} textAnchor="middle" className="fill-chart-axis text-[12px]">{l}</text>)}
      </svg>
    </ChartFrame>
  );
}

/** Area chart (LOOP-CMP-027): LineChart with filled areas. */
export function AreaChart(props: Omit<Parameters<typeof LineChart>[0], "area">) {
  return <LineChart {...props} area markers={false} />;
}

/** Donut chart (LOOP-CMP-028). Parts of one whole; ≤ 6 slices in fixed colour order; legend lists values. */
export function DonutChart({ title, source, items, unit = "" }: { title: string; source?: string; items: ChartItem[]; unit?: string }) {
  assertSeries(items.length);
  const total = items.reduce((a, b) => a + b.value, 0);
  const R = 80, r = 50, C = 100;
  // Cumulative start/end of each slice, computed up front (no mutation during render).
  const slices = items.map((it, i) => {
    const start = items.slice(0, i).reduce((a, b) => a + b.value, 0) / total;
    return { it, start, end: start + it.value / total };
  });
  const arc = (start: number, end: number) => {
    const a0 = 2 * Math.PI * start - Math.PI / 2, a1 = 2 * Math.PI * end - Math.PI / 2;
    const large = end - start > 0.5 ? 1 : 0;
    const p = (rad: number, a: number) => `${C + rad * Math.cos(a)} ${C + rad * Math.sin(a)}`;
    return `M ${p(R, a0)} A ${R} ${R} 0 ${large} 1 ${p(R, a1)} L ${p(r, a1)} A ${r} ${r} 0 ${large} 0 ${p(r, a0)} Z`;
  };
  return (
    <ChartFrame title={title} source={source} table={{ columns: ["Parte", "Valor"], rows: items.map((i) => [i.name, fmt(i.value, unit)]) }}>
      <div className="flex flex-wrap items-center gap-6">
        <svg viewBox="0 0 200 200" className="h-auto w-40 shrink-0" aria-hidden="true">
          {slices.map(({ it, start, end }, i) => (
            <path key={it.name} d={arc(start, end)} className={cn(FILL[i], "stroke-surface-raised")} strokeWidth={2} />
          ))}
        </svg>
        <ul className="grid gap-2 text-step-m1" aria-hidden="true">
          {items.map((it, i) => (
            <li key={it.name} className="flex items-center gap-2"><span className={cn("size-3 rounded-sm", BG[i])} /><span>{it.name}</span><span className="text-muted-foreground tabular-nums">{fmt(it.value, unit)}</span></li>
          ))}
        </ul>
      </div>
    </ChartFrame>
  );
}
