"use client";
import { useState } from "react";
import { LOREM } from "@/content";
import { Badge, Container } from "@/design-system/primitives";
import { Breadcrumb, Hero, LinkCards } from "@/design-system/composites";
import { ToggleGroup, ToggleGroupItem } from "@/design-system/ui/toggle-group";

const AREAS = ["Todas", "Consultoria", "Engenharia", "Design", "Dados"] as const;
type Area = (typeof AREAS)[number];
const JOBS = Array.from({ length: 8 }, (_, i) => ({ area: AREAS[1 + (i % 4)], title: `Vaga lorem ${i + 1}`, href: `/carreiras/vaga-${i + 1}` }));

/**
 * Job search. Filters are a Base UI ToggleGroup (single choice, arrow-key navigation, aria-pressed).
 * WHEN the visitor picks an area, THEN the list filters AND the result count is announced (role=status).
 */
export function JobSearchTemplate() {
  const [area, setArea] = useState<Area>("Todas");
  const shown = JOBS.filter((j) => area === "Todas" || j.area === area);
  return (
    <>
      <Breadcrumb items={[{ label: "Carreiras", href: "/carreiras" }, { label: "Vagas", href: "/carreiras/busca" }]} />
      <Hero align="start" title="Vagas" subtitle={LOREM} />
      <Container>
        <ToggleGroup
          aria-label="Filtrar por área"
          value={[area]}
          onValueChange={(v) => v[0] && setArea(v[0] as Area)}
          className="flex flex-wrap gap-2"
          spacing={2}
        >
          {AREAS.map((a) => (
            <ToggleGroupItem key={a} value={a}>{a}</ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p role="status" className="mt-4 text-sm text-muted-foreground">{shown.length} vagas</p>
      </Container>
      <LinkCards title="Resultados" items={shown.map((j) => ({ title: j.title, body: LOREM, href: j.href, tag: <Badge tone="accent">{j.area}</Badge> }))} />
    </>
  );
}
