# Colour tokens — neutral-first identity (v4.1)

**Source of truth:** `src/design-system/tokens/tokens.json` → `npm run tokens` → `tokens.css`.
**Checked:** `npm run contrast` (WCAG 2.1: 31 pairs × light and dark × 3 schemes, plus 12 themes × text and accent).
**Guideline:** `docs/brand-guidelines.md` (7 modules).
**Reference:** the "Arquitetura operacional — LOOP / CLEANSEA" diagram approved by Loop on 11 Nov 2026. Colours were measured from it.

## 1. Distribution

| Share | Role | Token | Light | Use |
|---|---|---|---|---|
| 60% | White | `background` | `#FCFCFC` | Page and panels |
| 20% | Gray | `surface` | `#F2F2F2` | Ground that holds groups, cards, bands, footer |
| 10% | Black | `foreground` | `#000000` | Titles, labels; primary button fill |
| 5% | Sage tint | `tint-sage` / `tint-sage-border` | `#E3E7E8` / `#ABB6B8` | Group ground (interface layer) |
| 5% | Lavender tint | `tint-lavender` / `tint-lavender-border` | `#E6E5EB` / `#AEADBF` | Group ground (backend layer), highlighted plan |

Supporting: `surface-raised` `#FFFFFF` (white nodes on gray or tint), `surface-sunken` `#EEEEEE` (selected pill), `muted-foreground` `#505050`, `subtle-foreground` `#6B6B6B`, `border` black @ 8 %, `warning` `#F9E5DA` / `#673729` (Proposta badge).

## 2. Brand colours (kept, restricted)

| Colour | Where it may appear |
|---|---|
| Purple `#7055F6` (`brand`, `ring`) | Focus ring and brand marks only |
| Purple `#5A44C5` (`primary-strong`) | Inline link text (6.67:1) |
| Green `#BEFBB6` (`success`) | Success status fill only, with black text |

No saturated fills or gradients on cards, buttons or sections.

## 3. Deliberate deviations from the reference
- The reference shows unselected tab text at `#878787` (3.5:1, fails AA). The system uses `subtle-foreground` `#6B6B6B` (5.19:1).
- Group borders (`#ABB6B8`, `#AEADBF`) are 1.7:1 against their tint. They are decorative: every group has a text heading, so colour is never the only cue.

## 4. Dark theme (Assumption: derived, not yet approved)
Neutral dark: `#0F0F10` background, `#1A1A1B` surface, `#F5F5F5` text, sage `#1E2426`/`#4F5D60`, lavender `#221F2A`/`#57546B`, primary button `#F5F5F5` with dark text. All pairs pass AA.

## 5. Usage

```tsx
<section className="rounded-xl border border-border bg-background p-6">       {/* white panel */}
  <div className="rounded-xl bg-surface p-6">                                  {/* gray ground */}
    <div className="rounded-xl border border-tint-sage-border bg-tint-sage p-4"> {/* group */}
      <div className="rounded-md bg-surface-raised p-3">Workspace</div>        {/* white node */}
    </div>
  </div>
  <button className="bg-primary text-primary-foreground">Agendar</button>      {/* black */}
  <span className="rounded-pill bg-warning px-3 text-warning-foreground">Proposta</span>
</section>
```

## 6. Scales, themes, type and data viz (v4)
- **10-step scales** `neutral`, `sage`, `lavender`, `warm` (050 → 900) in `primitives`; approved colours are exact anchors (e.g. sage 100 `#E3E7E8`, 400 `#ABB6B8`).
- **Themes** `tokens.json › themes`: `{family}-{light|mid|dark}` → `ground`, `text`, `accent`; CSS classes `.theme-*`; Tailwind `bg-theme-ground text-theme-text bg-theme-accent` via `ThemeSurface`.
- **Typography** `tokens.json › typography`: 13 steps (`m2`…`10`), size doubles every 5 steps; CSS `--type-size-*`, Tailwind `text-step-*` (line height and tracking included).
- **Data viz** semantic tokens `chart-1 … chart-6`, `chart-grid`, `chart-axis` (light and dark).
- `src/lib/utils.ts` registers `text-step-*` as a font-size group for `cn`, so it is not dropped next to a text colour.

## 7. Foundation (v4.1) — base + accent → layers
**Method:** the Minimal theme for Obsidian by Steph Ango (MIT, github.com/kepano/obsidian-minimal). Only the structure is adopted; the values are Loop's.
**Source:** `tokens.json › foundation` → `src/design-system/tokens/foundation.mjs` (shared by `scripts/tokens.mjs` and the TypeScript code).

```
scheme (light | dark) = { base: [h, s, l], accent: [h, s, l] }
layer                 = source (base | accent) + [Δs, Δl]   (hue stays the source hue)
semantic token        = "{layer.bg1}"                         (resolved per mode and scheme)
```

| Layer | From | Semantic tokens |
|---|---|---|
| `raised` · `bg1` · `bg2` · `bg3` | base | surface-raised · background · surface (= base) · surface-sunken |
| `ui1` · `ui2` · `ui3` | base | chart-grid · (quote/table rule) · border-strong |
| `tx1` · `tx2` · `tx3` · `tx4` | base | foreground, primary · muted-foreground · subtle-foreground, chart-axis · primary-hover |
| `ax1` · `ax2` · `ax3` · `hl1` | accent | primary-strong · primary-strong-hover · brand, ring (= accent) · selection |

- **Neutral** (default) reproduces every approved v4 colour exactly (`tokens.test.ts` asserts it). No visual change.
- **Schemes** `sage`, `lavender`: same offsets on a tinted base. Apply `.scheme-sage` / `.scheme-lavender` to `<html>` or any region; light and dark follow the page mode. Every scheme passes every contrast pair.
- **Deviation from Minimal:** Minimal's faint text (`tx3`) is decorative and fails AA. Loop's `tx3` stays ≥ 4.5:1; text layers drop 6 points of saturation so tinted schemes stay AA.
- **Reading** (`scale.reading`): width 40rem · line height 1.6 · paragraph spacing 1.25rem · heading spacing 2em · list indent 1.5em · 1px rule. Used by `Prose`.
- **To add a scheme:** add it to `foundation.schemes` (light and dark base/accent), run `npm run tokens` and `npm run contrast`.
