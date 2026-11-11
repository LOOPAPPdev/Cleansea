import { allSpecs } from "./specs";

/** Renders a component's governance spec inside Storybook docs. */
export function SpecBlock({ name }: { name: string }) {
  const s = allSpecs.find((x) => x.name === name);
  if (!s) return <p className="text-destructive">No spec for {name}.</p>;
  const row = (k: string, v: string | string[]) => (
    <tr key={k} className="border-b border-border align-top">
      <th scope="row" className="py-2 pr-4 text-left font-medium whitespace-nowrap">{k}</th>
      <td className="py-2">{Array.isArray(v) ? v.join(" · ") : v}</td>
    </tr>
  );
  return (
    <table className="mt-6 w-full text-sm">
      <caption className="mb-2 text-left font-mono text-xs text-muted-foreground">{s.id} · v{s.version} · {s.level}</caption>
      <tbody>
        {row("Summary", s.summary)}
        {row("Tokens", s.tokens)}
        {Object.entries(s.variants ?? {}).map(([k, v]) => row(`Variant: ${k}`, v))}
        {row("States", s.states)}
        {row("Responsive", s.responsive)}
        {row("Accessibility", s.a11y)}
        {row("Tests", s.tests)}
        {s.dependsOn?.length ? row("Depends on", s.dependsOn) : null}
      </tbody>
    </table>
  );
}
