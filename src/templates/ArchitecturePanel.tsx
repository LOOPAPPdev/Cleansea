import { brand } from "@/content";
import { ModulePanel, SegmentedTabs, TierDiagram } from "@/design-system/composites";

/** Reference panel "Arquitetura operacional" with its three views (used by Home and /design-system). */
export function ArchitecturePanel() {
  const a = brand.architecture;
  return (
    <ModulePanel eyebrow={a.eyebrow} title={a.title} status={a.status}>
      <SegmentedTabs
        label="Visualizações da arquitetura"
        tabs={[
          { label: a.tabs[0], content: <TierDiagram data={a} label={a.title} /> },
          {
            label: a.tabs[1],
            content: (
              <ol className="grid gap-2 rounded-xl bg-surface p-4 sm:p-6">
                {a.ssm.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[auto_1fr] items-center gap-x-4 rounded-lg bg-surface-raised p-4">
                    <span className="row-span-2 font-mono text-step-1 text-subtle-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <strong className="font-medium">{s.title}</strong>
                    <span className="text-muted-foreground">{s.text}</span>
                  </li>
                ))}
              </ol>
            ),
          },
          {
            label: a.tabs[2],
            content: (
              <ul className="grid gap-3 rounded-xl bg-surface p-4 sm:grid-cols-2 sm:p-6">
                {a.modules.map((m, i) => (
                  <li key={m.title} className={`rounded-lg border p-5 ${i % 2 ? "border-tint-lavender-border bg-tint-lavender" : "border-tint-sage-border bg-tint-sage"}`}>
                    <strong className="block text-step-2 font-medium">{m.title}</strong>
                    <span className="mt-1 block text-muted-foreground">{m.text}</span>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      />
    </ModulePanel>
  );
}
