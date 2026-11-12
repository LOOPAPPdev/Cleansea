# Loop Consultoria — Brand guidelines (v4)

**Live page:** `/design-system` (renders every value below from the data files, so it never drifts).
**Sources of truth:** `src/design-system/tokens/tokens.json` (colours, themes, type, icon grid) · `src/content/brand.json` (values, rules, architecture, sample data) · `src/design-system/specs/*` (component registry).
**Method:** the 7-module structure of a professional brand guideline (values → logo → colour → typography → iconography → photography → data visualisation). Only the method was adopted. All values are Loop's own. No colour, typeface, logo, image or text from any other brand is used.

| # | Module | What it defines | Where |
|---|---|---|---|
| 1 | Values | 5 values: name · meaning · three descriptors | `brand.json › values` (texts `[A DEFINIR]`) |
| 2 | Logo | Logomark (ring), logotype, lockup, avatar; min sizes; clearance; colour; placement; what to avoid | `Logo` primitive, `brand.json › logo` |
| 3 | Colour | Neutral-first identity; 10-step scales; 12 themes; contrast table | `tokens.json`, `docs/tokens.md` |
| 4 | Typography | Inter; modular scale (size doubles every 5 steps); line-height and tracking rules; weights | `tokens.json › typography`, `Heading` / `Text` |
| 5 | Iconography | Lucide; 16 px grid; sizes 16/20/24; stroke 1.5/2; alignment with text | `Icon` primitive |
| 6 | Photography | 4 principles + what to avoid; placeholders until photos are approved | `brand.json › photography` |
| 7 | Data visualisation | 6 ordered series; grid, axis; bar, column, line, area, donut; rules | `Charts.tsx`, `brand.json › dataviz` |

## 1. Values
Five values, each with a one-sentence meaning and three guide words. **Status:** placeholders `[A DEFINIR]` until Loop writes them.

## 2. Logo
| Rule | Value |
|---|---|
| Forms | Lockup (default, external use) · logomark (small or familiar contexts) · logotype (only with live text constraints) · avatar (social, ≤ 64 px) |
| Minimum width | Lockup 120 px · logomark 16 px · logotype 96 px · avatar 24 px (the component clamps smaller values) |
| Clearance | Half the mark height on every side (`clearance` prop) |
| Colour | Black on light grounds, white on dark grounds. Nothing else. |
| Placement | Left-aligned, top or bottom. Never centred. |
| Avoid | Two colours; stretching or rotating; outlines, shadows, effects; changing the mark/name relation; busy images behind; below minimum size |

## 3. Colour
- **Distribution:** white 60 % · gray 20 % · black 10 % · sage/lavender tints 10 %. Brand purple `#7055F6` only for focus and links (`#5A44C5`); green `#BEFBB6` only for success.
- **Scales:** neutral, sage, lavender and warm, 10 steps each (050 → 900), generated in OKLCH from the approved colours (which stay exact anchors) and checked to darken step by step.
- **Themes:** light / mid / dark for each family (12). Use them for moments of emphasis (`ThemeSurface`). Text ≥ 4.5:1 and accent ≥ 3:1 on every theme ground (`npm run contrast`).
- **Contrast:** every pair in `tokens.json › contrast`, light and dark, is enforced in CI-style scripts and shown in the `ContrastTable`.

## 4. Typography
- Family: **Inter** (400, 500, 600).
- Scale: base 16 px, ratio 2^(1/5): **the size doubles every 5 steps** (step 0 = 16 px, step 5 = 32 px, step 10 = 64 px). Utilities `text-step-m2 … text-step-10`.
- Line height falls as size grows (1.6 for body → 1.05 at step 10); tracking tightens from step 3 up.
- Avoid: sizes outside the scale; more than two weights in a block; long text in capitals; justified body text.

## 5. Iconography
Lucide only. 16 px grid. Sizes 16 / 20 / 24 px; stroke 1.5 at 16 and 20 px, 2 at 24 px (`Icon` enforces it). Icons beside text match the line height and centre on the text. Decorative icons are hidden from screen readers; standalone icons have a label.

## 6. Photography
Natural light and real work contexts · cool, desaturated tones that sit on the neutral palette · one subject, generous empty space · details of the consulting process (hands, boards, screens, documents). Avoid posed stock, strong filters, text over busy areas, and unreviewed AI-generated images. **Status:** no approved photos yet; tinted placeholders are used.

## 7. Data visualisation
- Never mislead: zero-based axes for bars and columns.
- At most 6 series, always in the order `chart-1 … chart-6`. The order alternates dark and light so neighbours differ in lightness, not only hue. Every series ≥ 3:1 against the background.
- Light horizontal grid only; direct labels where possible; legend only with more than one series.
- Bar spacing: gap = half the bar width.
- Every chart has a title, a source and an accessible data table (`ChartFrame`).
- Components: `BarChart`, `ColumnChart`, `LineChart`, `AreaChart`, `DonutChart` (pure SVG, server-rendered).
