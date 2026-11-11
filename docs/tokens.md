# Colour tokens — neutral-first identity (v3)

**Source of truth:** `src/design-system/tokens/tokens.json` → `npm run tokens` → `tokens.css`.
**Checked:** `npm run contrast` (WCAG 2.1, 22 pairs × light and dark).
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
