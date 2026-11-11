import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import tokens from "../tokens/tokens.json";

type Semantic = Record<string, { share?: string; light: string; dark: string; usage: string }>;
const semantic = tokens.semantic as Semantic;

function Swatches() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {Object.entries(semantic).map(([name, t]) => (
        <figure key={name} className="m-0 overflow-hidden rounded-lg border border-border bg-surface-raised">
          <div className="h-16" style={{ background: `var(--${name})` }} />
          <figcaption className="p-3 text-sm">
            <strong className="font-mono">{name}</strong> {t.share ? <span className="text-muted-foreground">· {t.share}</span> : null}
            <p className="mt-1 text-muted-foreground">{t.usage}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

const meta: Meta = { title: "Foundations/Colour tokens (60-20-10-5-5)", component: Swatches, parameters: { layout: "padded" } };
export default meta;
export const All: StoryObj = {};
