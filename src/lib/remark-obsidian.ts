/**
 * remark plugin: Obsidian-flavoured Markdown on top of GFM.
 *   > [!note] Title     → callout (div role="note", data-callout="note")
 *   ==text==            → <mark>
 *   #tag                → <a class="tag"> (or <span> without a tag base URL)
 *   [[Note]] [[Note|x]] → link through resolveLink, or <span class="is-unresolved">
 *   ![[Note]]           → treated as a wikilink (embeds are not rendered)
 *   %% comment %%       → removed
 * Code and existing links are never transformed.
 */
import type { Blockquote, Paragraph, PhrasingContent, Root, RootContent, Text } from "mdast";
import { visit, SKIP } from "unist-util-visit";

export type ObsidianOptions = {
  /** Return the href of a note, or undefined when the note does not exist. */
  resolveLink?: (target: string) => string | undefined;
  /** Base URL for tag links (e.g. "/aprender?tag="). Tags are plain text when absent. */
  tagHref?: (tag: string) => string | undefined;
};

export const CALLOUT_RE = /^\[!([a-zA-Z-]+)\]([+-]?)[ \t]*(.*)$/;
const INLINE_RE = /(==([^=\n]+?)==)|(!?\[\[([^\]|\n]+?)(?:\|([^\]\n]+?))?\]\])|((?:^|(?<=\s))#([\p{L}\p{N}_/-]*[\p{L}_/-][\p{L}\p{N}_/-]*))/gu;

type Data = { hName?: string; hProperties?: Record<string, unknown> };
const withData = <T extends object>(node: T, data: Data): T => Object.assign(node, { data: { ...((node as { data?: object }).data ?? {}), ...data } });

function splitText(value: string, opts: ObsidianOptions): PhrasingContent[] {
  const out: PhrasingContent[] = [];
  let last = 0;
  for (const m of value.matchAll(INLINE_RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ type: "text", value: value.slice(last, i) });
    if (m[1]) {
      out.push(withData<PhrasingContent>({ type: "emphasis", children: [{ type: "text", value: m[2] }] }, { hName: "mark" }));
    } else if (m[3]) {
      const target = m[4].trim(), label = (m[5] ?? m[4]).trim();
      const href = opts.resolveLink?.(target);
      out.push(
        href
          ? withData<PhrasingContent>({ type: "link", url: href, children: [{ type: "text", value: label }] }, { hProperties: { className: ["internal-link"], "data-href": target } })
          : withData<PhrasingContent>({ type: "emphasis", children: [{ type: "text", value: label }] }, { hName: "span", hProperties: { className: ["internal-link", "is-unresolved"], "data-href": target } }),
      );
    } else if (m[6]) {
      const tag = m[7], href = opts.tagHref?.(tag);
      const children: PhrasingContent[] = [{ type: "text", value: `#${tag}` }];
      out.push(
        href
          ? withData<PhrasingContent>({ type: "link", url: href, children }, { hProperties: { className: ["tag"] } })
          : withData<PhrasingContent>({ type: "emphasis", children }, { hName: "span", hProperties: { className: ["tag"] } }),
      );
    }
    last = i + m[0].length;
  }
  if (last < value.length) out.push({ type: "text", value: value.slice(last) });
  return out;
}

export default function remarkObsidian(opts: ObsidianOptions = {}) {
  return (tree: Root) => {
    // 1. Comments %% … %% (inline and block).
    visit(tree, "text", (node: Text) => {
      node.value = node.value.replace(/%%[\s\S]*?%%/g, "");
    });
    visit(tree, "paragraph", (node: Paragraph, index, parent) => {
      if (parent && index !== undefined && node.children.every((c) => c.type === "text" && !c.value.trim())) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    });

    // 2. Callouts: a blockquote whose first line is [!type] Title.
    visit(tree, "blockquote", (node: Blockquote) => {
      const first = node.children[0];
      if (first?.type !== "paragraph" || first.children[0]?.type !== "text") return;
      const head = first.children[0] as Text;
      const [line, ...rest] = head.value.split("\n");
      const m = CALLOUT_RE.exec(line);
      if (!m) return;
      const type = m[1].toLowerCase();
      const title = m[3] || type.charAt(0).toUpperCase() + type.slice(1);
      head.value = rest.join("\n");
      if (!head.value) first.children.shift();
      if ((first.children[0] as PhrasingContent | undefined)?.type === "break") first.children.shift();
      if (!first.children.length) node.children.shift();
      const titleNode = withData({ type: "paragraph", children: [{ type: "text", value: title }] } as Paragraph, {
        hName: "div", hProperties: { className: ["callout-title"] },
      });
      const content = withData({ type: "blockquote", children: node.children } as Blockquote, { hName: "div", hProperties: { className: ["callout-content"] } });
      node.children = [titleNode, ...(content.children.length ? [content] : [])] as Blockquote["children"];
      withData(node, { hName: "div", hProperties: { className: ["callout"], role: "note", "aria-label": title, "data-callout": type } });
    });

    // 3. Inline syntax in text (not inside code, links or headings' ids).
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined || parent.type === "link" || parent.type === "linkReference") return;
      INLINE_RE.lastIndex = 0;
      if (!INLINE_RE.test(node.value)) return;
      INLINE_RE.lastIndex = 0;
      const parts = splitText(node.value, opts);
      (parent.children as RootContent[]).splice(index, 1, ...(parts as RootContent[]));
      return [SKIP, index + parts.length];
    });
  };
}
