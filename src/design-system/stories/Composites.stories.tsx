import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { areas, footerColumns, nav } from "@/content";
import { CardGrid, ComparisonTable, CtaBand, Faq, Footer, Header, Hero, PlanCards, StatTiles } from "../composites";
import { SpecBlock } from "../composites";

const meta: Meta = { title: "Composites", parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj;

export const SiteHeader: S = {
  name: "Header",
  render: () => (
    <>
      <Header groups={nav} cta={{ label: "Fale com vendas", href: "/contato" }} />
      <div className="p-6"><SpecBlock name="Header" /></div>
    </>
  ),
};
export const SiteHeaderMobile: S = { ...SiteHeader, name: "Header (mobile)", globals: { viewport: { value: "mobile1" } } };
export const HeroAndCards: S = {
  name: "Hero + CardGrid",
  render: () => (
    <>
      <Hero title="Lorem ipsum dolor sit amet" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." ctas={[{ label: "Agendar diagnóstico", href: "/contato" }, { label: "Fale com vendas", href: "/contato" }]} />
      <CardGrid id="areas" title="Áreas" items={areas} />
    </>
  ),
};
export const Data: S = {
  name: "StatTiles · Plans · Table · FAQ",
  render: () => (
    <>
      <StatTiles items={[{ value: "3×", label: "Lorem" }, { value: "40%", label: "Dolor" }, { value: "12 sem", label: "Amet" }]} />
      <PlanCards plans={[{ name: "Diagnóstico", price: "R$ [A DEFINIR]", body: "Lorem ipsum.", features: ["A", "B"] }, { name: "Projeto", price: "R$ [A DEFINIR]", body: "Lorem ipsum.", features: ["A", "B"], highlight: true }]} />
      <ComparisonTable caption="Comparativo" columns={["Diagnóstico", "Projeto"]} rows={[{ label: "Lorem", values: ["Sim", "Sim"] }]} />
      <Faq items={[{ q: "Lorem ipsum?", a: "Dolor sit amet." }, { q: "Consectetur?", a: "Adipiscing elit." }]} />
    </>
  ),
};
export const ClosingAndFooter: S = {
  name: "CtaBand + Footer",
  render: () => (
    <>
      <CtaBand title="Lorem ipsum dolor sit amet" cta={{ label: "Fale com vendas", href: "/contato" }} />
      <Footer columns={footerColumns} />
    </>
  ),
};
