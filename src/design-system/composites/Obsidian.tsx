import tokens from "../tokens/tokens.json";
import minimal from "../tokens/minimal.json";
import { obsidianCss, type MinimalData } from "../tokens/foundation.mjs";

const M = minimal as unknown as MinimalData;
const vars = tokens.obsidian.vars as Record<string, string>;

const origin = (v: string) =>
  v.startsWith("{layer.") ? "Camada da fundação"
  : v.startsWith("{semantic.") ? "Token semântico"
  : v.startsWith("{minimal.") ? "Minimal"
  : v.startsWith("{type.") ? "Escala tipográfica"
  : v.startsWith("{scale.") ? "Escala Loop"
  : "Loop (base do Obsidian)";

/** Vendored source of the Minimal theme: repository, pinned commit, licence and extracted counts (LOOP-CMP-043). */
export function MinimalSource() {
  const s = M.source;
  const items: [string, string][] = [
    ["Repositório", s.repo.replace("https://", "")],
    ["Commit fixado", `${s.commit.slice(0, 7)} · ${s.date}`],
    ["Licença", `${s.license} (vendor/obsidian-minimal/LICENSE)`],
    ["Variáveis extraídas", `${Object.keys(M.defaults).length} padrões · ${Object.keys(M.light).length} claro · ${Object.keys(M.dark).length} escuro`],
    ["Mapeadas para a Loop", `${Object.keys(vars).length} variáveis do Obsidian em ${tokens.obsidian.scope}`],
  ];
  return (
    <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border text-step-m1 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="min-w-0 bg-background p-4">
          <dt className="text-subtle-foreground">{k}</dt>
          <dd className="mt-1 font-mono [overflow-wrap:anywhere]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Obsidian variable vocabulary → Loop value, with its origin (LOOP-CMP-042). */
export function ObsidianVars() {
  return (
    <div role="region" aria-label="Variáveis do Obsidian" tabIndex={0} className="max-h-[32rem] overflow-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] text-step-m1">
        <caption className="sr-only">Variáveis do Obsidian usadas pelo MarkdownView: nome, origem do valor e valor CSS.</caption>
        <thead className="sticky top-0 bg-surface text-left">
          <tr>
            <th scope="col" className="p-3">Variável</th>
            <th scope="col" className="p-3">Origem</th>
            <th scope="col" className="p-3">Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(vars).map(([k, v]) => (
            <tr key={k} className="border-t border-border">
              <th scope="row" className="p-3 text-left font-mono font-normal">{k}</th>
              <td className="p-3 text-muted-foreground">{origin(v)}</td>
              <td className="p-3 font-mono">{obsidianCss(M, v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
