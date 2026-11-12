import Link from "next/link";
import { brand, vault } from "@/content";
import { Container, Section, Text } from "@/design-system/primitives";
import {
  AreaChart, BarChart, BrandValues, ColorScale, ColumnChart, ContrastTable, DoDont, DonutChart, FoundationLayers, Hero, IconGrid, LineChart, MarkdownView, MinimalSource, ObsidianVars,
  LogoUsage, SchemePreview, SpecBlock, ThemeGrid, TypeFamilies, TypeScale,
} from "@/design-system/composites";
import { allSpecs } from "@/design-system/specs";
import { ArchitecturePanel } from "./ArchitecturePanel";

const SECTIONS = [
  ["valores", "Valores"], ["marca", "Marca"], ["fundacao", "Fundação"], ["cores", "Cores"], ["tipografia", "Tipografia"],
  ["icones", "Ícones"], ["fotografia", "Fotografia"], ["dados", "Dados"], ["componentes", "Componentes"],
] as const;

function Block({ id, n, title, intro, children }: { id: string; n: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <Section id={id} aria-labelledby={`h-${id}`} className="scroll-mt-24 border-t border-border">
      <Container>
        <p className="font-mono text-step-m1 text-muted-foreground">{n}</p>
        <h2 id={`h-${id}`} className="mt-1 mb-3 text-step-6 font-medium tracking-tight">{title}</h2>
        <Text tone="muted" className="mb-8 max-w-[64ch]">{intro}</Text>
        <div className="grid gap-8 *:min-w-0">{children}</div>
      </Container>
    </Section>
  );
}

/**
 * /design-system (LOOP-TPL-019): the living Loop brand guideline + component registry.
 * Every value is read from tokens.json, brand.json and the component specs, so the page never drifts.
 */
export function DesignSystemTemplate() {
  const c = brand.sampleCharts;
  const levels = ["primitive", "composite", "template", "product"] as const;
  return (
    <>
      <Hero align="start" eyebrow="Design system · v4.3" title="Manual da marca Loop" subtitle="Valores, marca, fundação, cores, tipografia, ícones, fotografia, dados e o registro de todos os componentes." />
      <Container as="nav" aria-label="Neste manual" className="sticky top-(--header-height) z-30 -mb-px border-b border-border bg-background/95 backdrop-blur">
        <ul className="flex gap-1 overflow-x-auto py-2">
          {SECTIONS.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="inline-flex min-h-11 items-center rounded-pill px-3 whitespace-nowrap text-subtle-foreground hover:bg-surface hover:text-foreground">{label}</a></li>
          ))}
        </ul>
      </Container>

      <Block id="valores" n="1.0" title="Valores" intro="Os valores orientam decisões de voz, imagem e produto. Cada valor tem um significado e três palavras-guia.">
        <BrandValues values={brand.values} />
      </Block>

      <Block id="marca" n="2.0" title="Marca" intro={`${brand.logo.colors} ${brand.logo.placement}`}>
        <LogoUsage />
        <DoDont doItems={[brand.logo.clearance, brand.logo.avatar]} avoid={brand.logo.avoid} />
      </Block>

      <Block id="fundacao" n="3.0" title="Fundação" intro="Tema Minimal para Obsidian (Steph Ango, licença MIT), incluído como fundação: uma cor base e uma cor de destaque, em HSL, geram todas as camadas de fundo, linha, texto e destaque. Um esquema troca só a base; as camadas mantêm seus deslocamentos. Os valores são da Loop, e o esquema Neutro reproduz exatamente as cores aprovadas.">
        <FoundationLayers />
        <div><h3 className="mb-3 text-step-1 font-medium">Esquemas</h3><SchemePreview /></div>
        <div>
          <h3 className="mb-3 text-step-1 font-medium">Obsidian Minimal (código-fonte incluído)</h3>
          <Text tone="muted" className="mb-4 max-w-[64ch]">O repositório do tema está em vendor/obsidian-minimal, fixado num commit. As variáveis do SCSS viram dados (minimal.json, gerado por npm run minimal). O vocabulário do Obsidian vira tokens: as cores seguem as camadas da fundação, as medidas vêm do Minimal e os títulos usam a escala da Loop.</Text>
          <MinimalSource />
        </div>
        <div>
          <h3 className="mb-3 text-step-1 font-medium">Visualização de leitura (MarkdownView)</h3>
          <Text tone="muted" className="mb-4 max-w-[64ch]">Notas do cofre (src/content/vault) renderizadas com callouts, tarefas, destaques, tags, wikilinks, tabelas e código. A mesma regra vale para o Prose: largura de 40rem, entrelinha 1,5 e espaçamento do Minimal.</Text>
          <div className="rounded-xl border border-border bg-background p-4 sm:p-8">
            <MarkdownView markdown={vault["implantacao-loop"].markdown} headingOffset={3} resolveLink={(t) => (vault[t] ? `/guias/${t}` : undefined)} />
          </div>
          <Link className="mt-2 inline-flex min-h-11 items-center text-primary-strong underline underline-offset-2 hover:text-primary-strong-hover" href="/guias/diagnostico-operacional">Ver a nota completa em um guia</Link>
        </div>
        <div><h3 className="mb-3 text-step-1 font-medium">Variáveis do Obsidian → Loop</h3><ObsidianVars /></div>
      </Block>

      <Block id="cores" n="4.0" title="Cores" intro="Identidade neutra: branco 60 %, cinza 20 %, preto 10 %, tintas sálvia e lavanda 10 %. Escalas de 10 tons, temas claro/médio/escuro e contraste verificado em claro e escuro.">
        <div className="grid gap-6 *:min-w-0">
          <ColorScale family="neutral" label="Neutro" />
          <ColorScale family="sage" label="Sálvia" />
          <ColorScale family="lavender" label="Lavanda" />
          <ColorScale family="warm" label="Terroso (status)" />
        </div>
        <div><h3 className="mb-3 text-step-1 font-medium">Temas para momentos de destaque</h3><ThemeGrid /></div>
        <div><h3 className="mb-3 text-step-1 font-medium">Contraste (WCAG 2.1 AA)</h3><ContrastTable /></div>
      </Block>

      <Block id="tipografia" n="5.0" title="Tipografia" intro="Três famílias com papéis fixos: Anton para títulos de display (caixa-alta, um peso), Inter para texto e interface, monospace para tags e códigos. Escala modular: o tamanho dobra a cada 5 passos (16 → 32 → 64 px).">
        <TypeFamilies />
        <TypeScale />
        <DoDont doItems={brand.typography.rules} avoid={brand.typography.avoid} />
      </Block>

      <Block id="icones" n="6.0" title="Ícones" intro="Lucide, grade de 16 px, três tamanhos e dois traços.">
        <IconGrid />
        <DoDont doItems={brand.iconography.rules} />
      </Block>

      <Block id="fotografia" n="7.0" title="Fotografia" intro={brand.photography.status}>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3">
          {brand.photography.principles.map((p, i) => (
            <li key={p.title} className="flex flex-col gap-3 rounded-lg border border-border bg-surface-raised p-4">
              <div role="img" aria-label={`Espaço para foto: ${p.title}`} className={`aspect-[4/3] rounded-md border ${i % 2 ? "border-tint-lavender-border bg-tint-lavender" : "border-tint-sage-border bg-tint-sage"}`} />
              <strong className="font-medium">{p.title}</strong>
              <span className="text-muted-foreground">{p.text}</span>
            </li>
          ))}
        </ul>
        <DoDont avoid={brand.photography.avoid} />
      </Block>

      <Block id="dados" n="8.0" title="Visualização de dados" intro="Gráficos sem distorção, com título, fonte e tabela acessível. No máximo 6 séries, sempre na mesma ordem de cores.">
        <div className="grid gap-4 *:min-w-0 lg:grid-cols-2">
          <ColumnChart title={c.monthly.title} source={c.monthly.source} labels={c.monthly.labels} series={c.monthly.series} unit={c.monthly.unit} />
          <LineChart title={`${c.monthly.title} — linha`} source={c.monthly.source} labels={c.monthly.labels} series={c.monthly.series} unit={c.monthly.unit} />
          <AreaChart title={`${c.monthly.title} — área`} source={c.monthly.source} labels={c.monthly.labels} series={c.monthly.series} unit={c.monthly.unit} />
          <BarChart title={c.areas.title} source={c.areas.source} items={c.areas.items} unit={c.areas.unit} />
          <DonutChart title={c.share.title} source={c.share.source} items={c.share.items} unit={c.share.unit} />
        </div>
        <DoDont doItems={brand.dataviz.rules} />
      </Block>

      <Block id="componentes" n="9.0" title="Componentes" intro={`${allSpecs.length} componentes registrados em 4 níveis. Cada um tem spec validado por npm test.`}>
        <ArchitecturePanel />
        {levels.map((lvl) => {
          const list = allSpecs.filter((s) => s.level === lvl);
          if (!list.length) return null;
          return (
            <section key={lvl} aria-label={`Nível ${lvl}`}>
              <h3 className="mb-3 text-step-2 font-medium capitalize">{lvl} <span className="text-muted-foreground">· {list.length}</span></h3>
              <ul className="grid gap-2">
                {list.map((s) => (
                  <li key={s.id}>
                    <details className="rounded-lg border border-border bg-surface-raised">
                      <summary className="flex min-h-12 cursor-pointer items-center gap-3 px-4">
                        <span className="font-mono text-step-m2 text-muted-foreground">{s.id}</span>
                        <strong className="font-medium">{s.name}</strong>
                        <span className="ml-auto hidden text-step-m1 text-subtle-foreground sm:inline">v{s.version}</span>
                      </summary>
                      <div className="border-t border-border p-4"><SpecBlock name={s.name} /></div>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Block>
    </>
  );
}
