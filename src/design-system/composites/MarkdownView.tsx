import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkObsidian, { type ObsidianOptions } from "@/lib/remark-obsidian";
import { cn } from "@/lib/utils";

/** Callout families mapped to Loop grounds (neutral-first: tints, never saturated fills). */
const CALLOUT: Record<string, string> = {
  note: "lavender", info: "lavender", todo: "lavender", abstract: "lavender", summary: "lavender", tldr: "lavender",
  question: "lavender", help: "lavender", faq: "lavender", example: "lavender", quote: "neutral", cite: "neutral",
  tip: "sage", hint: "sage", important: "sage", success: "sage", check: "sage", done: "sage",
  warning: "warm", caution: "warm", attention: "warm",
  danger: "danger", error: "danger", bug: "danger", failure: "danger", fail: "danger", missing: "danger",
};
const calloutTone: Record<string, string> = {
  lavender: "border-tint-lavender-border bg-tint-lavender",
  sage: "border-tint-sage-border bg-tint-sage",
  warm: "border-warning-foreground/40 bg-warning",
  danger: "border-destructive bg-surface",
  neutral: "border-border bg-surface",
};

export type MarkdownViewProps = ObsidianOptions & {
  /** Markdown source (Obsidian flavour: GFM + callouts, ==highlight==, #tags, [[wikilinks]], %%comments%%). */
  markdown: string;
  /** Rendered heading level = Markdown level + offset (default 1, so the page keeps one <h1>). */
  headingOffset?: number;
  className?: string;
};

const heading = (depth: 1 | 2 | 3 | 4 | 5 | 6, offset: number): Components["h1"] =>
  function H({ node, className, ...p }) {
    const Tag = `h${Math.min(6, depth + offset)}` as "h2";
    return (
      <Tag
        {...p}
        className={cn(
          "mb-2 text-(--text-normal) [font-size:var(--h-size)] [font-weight:var(--h-weight)] [font-variant:var(--h-variant)] [letter-spacing:-0.02em] [text-wrap:balance]",
          "mt-(--heading-spacing) first:mt-0",
          className,
        )}
        style={{ ["--h-size" as string]: `var(--h${depth}-size)`, ["--h-weight" as string]: `var(--h${depth}-weight)`, ["--h-variant" as string]: `var(--h${depth}-variant, normal)` }}
      />
    );
  };

function components(offset: number): Components {
  return {
    h1: heading(1, offset), h2: heading(2, offset), h3: heading(3, offset), h4: heading(4, offset), h5: heading(5, offset), h6: heading(6, offset),
    p: ({ node, ...p }) => <p {...p} className="mb-(--p-spacing) last:mb-0" />,
    a: ({ node, className, ...p }) => {
      const cls = String(className ?? "");
      if (cls.includes("tag"))
        return <a {...p} className="tag rounded-(--tag-radius) font-(family-name:--font-monospace) border-(length:--tag-border-width) border-(--tag-border-color) px-(--tag-padding-x) py-(--tag-padding-y) align-middle text-(length:--tag-size) text-(--tag-color) no-underline hover:border-(--tag-border-color-hover) hover:text-(--tag-color-hover)" />;
      return <a {...p} className={cn("text-(--text-accent) underline underline-offset-2 hover:text-(--text-accent-hover)", className)} />;
    },
    span: ({ node, className, ...p }) => {
      const cls = String(className ?? "");
      if (cls.includes("tag"))
        return <span {...p} className="tag inline-block rounded-(--tag-radius) font-(family-name:--font-monospace) border-(length:--tag-border-width) border-(--tag-border-color) px-(--tag-padding-x) py-(--tag-padding-y) align-middle text-(length:--tag-size) text-(--tag-color)" />;
      if (cls.includes("is-unresolved")) return <span {...p} title="Nota ainda não publicada" className="internal-link is-unresolved text-(--text-muted) underline decoration-dotted underline-offset-2" />;
      return <span {...p} className={className} />;
    },
    mark: ({ node, ...p }) => <mark {...p} className="rounded-sm bg-(--text-highlight-bg) px-0.5 text-(--text-normal)" />,
    strong: ({ node, ...p }) => <strong {...p} className="font-semibold" />,
    ul: ({ node, className, ...p }) => (
      <ul {...p} className={cn("mb-(--p-spacing) ps-(--list-indent) marker:text-(--list-marker-color) [&_ul]:mb-0 [&_ol]:mb-0", String(className).includes("contains-task-list") ? "list-none ps-1" : "list-disc", className)} />
    ),
    ol: ({ node, ...p }) => <ol {...p} className="mb-(--p-spacing) list-decimal ps-(--list-indent) marker:text-(--list-marker-color) [&_ol]:mb-0 [&_ul]:mb-0" />,
    li: ({ node, className, ...p }) => (
      <li {...p} className={cn("mt-(--list-spacing)", String(className).includes("task-list-item") && "flex items-start gap-2 has-[input:checked]:text-(--checklist-done-color) has-[input:checked]:[text-decoration:var(--checklist-done-decoration)]", className)} />
    ),
    input: ({ node, ...p }) =>
      p.type === "checkbox" ? (
        <input {...p} disabled aria-label={p.checked ? "Concluída" : "Pendente"} className="mt-[0.3em] size-(--checkbox-size) shrink-0 appearance-none rounded-(--checkbox-radius) border border-(--checkbox-border-color) checked:border-(--checkbox-color) checked:bg-(--checkbox-color) checked:shadow-[inset_0_0_0_2px_var(--background-primary)]" />
      ) : <input {...p} />,
    blockquote: ({ node, ...p }) => (
      <blockquote {...p} className="mb-(--p-spacing) border-s-(length:--blockquote-border-thickness) border-(--blockquote-border-color) ps-(--nested-padding) text-(--blockquote-color) [font-style:var(--blockquote-style)]" />
    ),
    div: ({ node, className, ...p }) => {
      const cls = String(className ?? "");
      const type = (p as Record<string, unknown>)["data-callout"] as string | undefined;
      if (type) return <div {...p} className={cn("mb-(--p-spacing) rounded-(--callout-radius) border p-(--callout-padding)", calloutTone[CALLOUT[type] ?? "neutral"])} />;
      if (cls.includes("callout-title")) return <div {...p} className="font-semibold text-foreground" />;
      if (cls.includes("callout-content")) return <div {...p} className="mt-1 text-foreground [&>*:last-child]:mb-0" />;
      return <div {...p} className={className} />;
    },
    code: ({ node, className, ...p }) => (
      <code {...p} className={cn("rounded-(--code-radius) bg-(--code-background) px-1 py-0.5 font-(family-name:--font-monospace) text-[0.9em] text-(--text-code)", className)} />
    ),
    pre: ({ node, ...p }) => (
      <pre {...p} tabIndex={0} className="mb-(--p-spacing) overflow-x-auto rounded-(--code-radius) bg-(--code-background) p-4 text-step-m1 [&>code]:bg-transparent [&>code]:p-0" />
    ),
    hr: ({ node, ...p }) => <hr {...p} className="my-(--heading-spacing) border-0 border-t-(length:--border-width) border-(--hr-color)" />,
    table: ({ node, ...p }) => (
      <div role="region" aria-label="Tabela" tabIndex={0} className="mb-(--p-spacing) overflow-x-auto">
        <table {...p} className="w-full border-collapse text-step-m1" />
      </div>
    ),
    th: ({ node, ...p }) => <th {...p} className="border-b-(length:--table-border-width) border-(--background-modifier-border-hover) px-3 py-2 text-start font-semibold" />,
    td: ({ node, ...p }) => <td {...p} className="border-b-(length:--table-border-width) border-(--table-border-color) px-3 py-2 align-top" />,
    img: ({ node, alt, ...p }) => (
      // eslint-disable-next-line @next/next/no-img-element -- Markdown images have unknown sizes
      <img {...p} alt={alt ?? ""} loading="lazy" className="my-(--p-spacing) h-auto max-w-full rounded-(--image-radius)" />
    ),
  };
}

/**
 * Obsidian reading view (LOOP-CMP-041). Renders an Obsidian note with the vendored Minimal theme's
 * variable vocabulary (tokens.json › obsidian → `.markdown-rendered`), so colours follow the
 * foundation layers, schemes and dark mode.
 */
export function MarkdownView({ markdown, headingOffset = 1, resolveLink, tagHref, className }: MarkdownViewProps) {
  return (
    <div className={cn("markdown-rendered mx-auto max-w-(--line-width) text-step-0 leading-(--line-height) text-(--text-normal) selection:bg-(--text-selection)", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm, [remarkObsidian, { resolveLink, tagHref }]]} components={components(headingOffset)}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
