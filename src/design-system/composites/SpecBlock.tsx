import { allSpecs } from "../specs";

/** Renders a component's governance spec (LOOP-CMP-030). Used in Storybook and on /design-system. */
export function SpecBlock({ name }: { name: string }) {
  const s = allSpecs.find((x) => x.name === name);
  if (!s) return <p className="text-destructive">Sem spec para {name}.</p>;
  const row = (k: string, v: string | string[]) => (
    <tr key={k} className="border-b border-border align-top">
      <th scope="row" className="py-2 pr-4 text-left font-medium whitespace-nowrap">{k}</th>
      <td className="py-2 text-muted-foreground">{Array.isArray(v) ? v.join(" · ") : v}</td>
    </tr>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-step-m1">
        <caption className="mb-2 text-left font-mono text-xs text-muted-foreground">{s.id} · v{s.version} · {s.level}</caption>
        <tbody>
          {row("Resumo", s.summary)}
          {row("Tokens", s.tokens)}
          {Object.entries(s.variants ?? {}).map(([k, v]) => row(`Variante: ${k}`, v))}
          {row("Estados", s.states)}
          {row("Responsivo", s.responsive)}
          {row("Acessibilidade", s.a11y)}
          {row("Testes", s.tests)}
          {s.dependsOn?.length ? row("Depende de", s.dependsOn) : null}
        </tbody>
      </table>
    </div>
  );
}
