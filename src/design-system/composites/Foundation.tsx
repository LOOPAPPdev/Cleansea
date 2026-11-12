import tokens from "../tokens/tokens.json";
import { deriveLayers, hslToHex, type TokensLike } from "../tokens/foundation.mjs";
import { cn } from "@/lib/utils";

const F = (tokens as unknown as TokensLike).foundation;
const fmt = ([h, s, l]: number[]) => `${Math.round(h)}° ${Math.round(s)}% ${l.toFixed(1)}%`;
const off = ([ds, dl]: number[]) => `${ds >= 0 ? "+" : ""}${ds} / ${dl >= 0 ? "+" : ""}${dl}`;

/** Names of the foundation schemes, default first. */
export const schemeNames = [F.default, ...Object.keys(F.schemes).filter((k) => k !== F.default)];

function Swatch({ hex }: { hex: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono">
      <span aria-hidden="true" className="size-5 shrink-0 rounded-sm border border-border" style={{ background: hex }} />
      <span>{hex}</span>
    </span>
  );
}

/**
 * Foundation layers (LOOP-CMP-039): every neutral and accent layer derived from the base and accent colours
 * of one scheme (Minimal method), with its offset, light and dark value, and usage.
 */
export function FoundationLayers({ scheme = F.default }: { scheme?: string }) {
  const s = F.schemes[scheme];
  const light = deriveLayers(F, scheme, "light");
  const dark = deriveLayers(F, scheme, "dark");
  return (
    <div className="grid gap-4">
      <dl className="grid gap-3 text-step-m1 sm:grid-cols-2">
        {(["light", "dark"] as const).map((m) => (
          <div key={m} className="rounded-lg border border-border bg-surface p-4">
            <dt className="font-medium">{m === "light" ? "Claro" : "Escuro"}</dt>
            <dd className="mt-2 grid gap-1 text-muted-foreground">
              <span className="flex flex-wrap items-center gap-2">Base <Swatch hex={hslToHex(s[m].base)} /> <span className="font-mono">{fmt(s[m].base)}</span></span>
              <span className="flex flex-wrap items-center gap-2">Destaque <Swatch hex={hslToHex(s[m].accent)} /> <span className="font-mono">{fmt(s[m].accent)}</span></span>
            </dd>
          </div>
        ))}
      </dl>
      <div role="region" aria-label={`Camadas do esquema ${s.label}`} tabIndex={0} className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-step-m1">
          <caption className="sr-only">Camadas derivadas: nome, origem, deslocamento de saturação e luminosidade, valor claro, valor escuro e uso.</caption>
          <thead className="bg-surface text-left">
            <tr>
              <th scope="col" className="p-3">Camada</th>
              <th scope="col" className="p-3">Origem · Δs / Δl (claro)</th>
              <th scope="col" className="p-3">Claro</th>
              <th scope="col" className="p-3">Escuro</th>
              <th scope="col" className="p-3">Uso</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(F.layers).map(([name, layer]) => (
              <tr key={name} className="border-t border-border align-top">
                <th scope="row" className="p-3 text-left font-mono font-normal">{name}</th>
                <td className="p-3 font-mono text-muted-foreground">{layer.from === "base" ? "base" : "destaque"} · {off(layer.light)}</td>
                <td className="p-3"><Swatch hex={light[name]} /></td>
                <td className="p-3"><Swatch hex={dark[name]} /></td>
                <td className="p-3 text-muted-foreground">{layer.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Scheme preview (LOOP-CMP-040): the same interface rendered in every scheme. Each card applies `.scheme-*`,
 * so all semantic utilities inside it switch to that scheme's layers (light and dark follow the page mode).
 */
export function SchemePreview() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {schemeNames.map((k) => (
        <li key={k} className={cn(k !== F.default && `scheme-${k}`, "min-w-0 rounded-xl border border-border bg-surface p-4 text-foreground")}>
          <p className="text-step-m1 text-subtle-foreground">Esquema</p>
          <h3 className="text-step-2 font-semibold">{F.schemes[k].label}</h3>
          <div className="mt-3 rounded-lg bg-surface-raised p-4">
            <p className="font-medium">Diagnóstico operacional</p>
            <p className="mt-1 text-step-m1 text-muted-foreground">Texto secundário sobre a camada elevada.</p>
            <a href="#fundacao" className="mt-2 inline-flex min-h-11 items-center text-primary-strong underline underline-offset-2 hover:text-primary-strong-hover">Link de exemplo</a>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-11 items-center rounded-pill bg-primary px-4 text-step-m1 font-medium text-primary-foreground">Botão primário</span>
            <span className="inline-flex min-h-11 items-center rounded-pill bg-surface-sunken px-4 text-step-m1">Selecionado</span>
          </div>
          <p className="mt-3 font-mono text-step-m2 text-subtle-foreground">.{k === F.default ? "(padrão)" : `scheme-${k}`}</p>
        </li>
      ))}
    </ul>
  );
}
