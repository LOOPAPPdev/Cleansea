import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge, Button, ButtonLink, Card, Field, IconTile } from "../primitives";
import { SpecBlock } from "../SpecBlock";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Fale com vendas", variant: "primary", size: "md", loading: false, disabled: false },
  argTypes: { variant: { control: "select", options: ["primary", "ink", "secondary", "outline", "ghost", "link"] }, size: { control: "inline-radio", options: ["md", "lg"] } },
};
export default meta;
type S = StoryObj<typeof Button>;

export const Playground: S = {};
export const AllVariants: S = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        {(["primary", "ink", "secondary", "outline", "ghost", "link"] as const).map((v) => <Button key={v} variant={v}>{v}</Button>)}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">Large</Button>
        <Button loading>Enviando…</Button>
        <Button disabled>Desativado</Button>
        <ButtonLink href="/contato" variant="secondary">ButtonLink</ButtonLink>
      </div>
      <SpecBlock name="Button" />
    </div>
  ),
};

export const BadgesCardsTiles: S = {
  name: "Badge · Card · IconTile",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {(["neutral", "accent", "primary", "success", "warn", "outline"] as const).map((t) => <Badge key={t} tone={t}>{t}</Badge>)}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {(["filled", "outline", "raised"] as const).map((v) => (
          <Card key={v} variant={v}><IconTile tone="primary">01</IconTile><p className="mt-4 font-medium">Card {v}</p></Card>
        ))}
      </div>
      <SpecBlock name="Badge" />
    </div>
  ),
};

export const Fields: S = {
  render: () => (
    <div className="grid max-w-md gap-4">
      <Field label="Nome" placeholder="Ana Souza" />
      <Field label="E-mail corporativo" error="Use um e-mail no formato nome@empresa.com." defaultValue="ana@" />
      <Field label="Qual é o desafio?" multiline hint="Opcional" />
      <SpecBlock name="Field" />
    </div>
  ),
};
