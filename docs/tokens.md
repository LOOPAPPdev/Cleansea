# Colour tokens — rule 60-20-10-5-5

**Source of truth:** `src/design-system/tokens/tokens.json`.
**Generated:** `src/design-system/tokens/tokens.css` (`npm run tokens`). Never edit the CSS by hand.
**Checked:** `npm run contrast` (WCAG 2.1, 15 pairs × light and dark).

## 1. Base palette (Fact: supplied by Loop)

| Share | Role | Token | Hex | Use |
|---|---|---|---|---|
| 60% | Dominant | `background` | `#F3F3F7` | Page ground, large reading areas |
| 20% | Secondary | `surface` | `#EEECF9` | Cards, navigation, panels, containers |
| 10% | Contrast | `foreground` | `#2C293D` | Text, headings, strong borders |
| 5% | Brand accent | `primary` | `#7055F6` | Primary buttons, brand fills |
| 5% | Semantic accent | `success` | `#BEFBB6` | Success fills, positive alerts |

`primary-hover` `#5A44C5` was supplied as the hover tone.

## 2. Contrast findings and derived tokens

| Pair | Ratio | Result | Decision |
|---|---|---|---|
| `#2C293D` on `#F3F3F7` | 12.72 | ✅ | Body text |
| `#2C293D` on `#EEECF9` | 12.07 | ✅ | Text on cards |
| white on `#7055F6` | 4.86 | ✅ | Primary button text is white |
| `#7055F6` text on `#F3F3F7` | 4.39 | ❌ below 4.5 | **`primary-strong` `#5A44C5`** (6.18) for links and purple text |
| `#2C293D` on `#7055F6` | 2.90 | ❌ | Never dark text on purple |
| `#BEFBB6` vs `#F3F3F7` (non-text) | 1.07 | ❌ below 3 | Success is a **fill with dark ink**; icons and borders use **`success-strong` `#1F6B2A`** (5.94) |
| `#EEECF9` vs `#F3F3F7` | 1.05 | ⚠️ | Cards get a `border` (foreground at 12%) so the edge stays visible |

## 3. Semantic tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#F3F3F7` | `#15131F` | Page ground (60%) |
| `surface` | `#EEECF9` | `#1E1B2E` | Cards, nav, panels (20%) |
| `surface-raised` | `#FFFFFF` | `#2A2640` | Menus, popovers, label chips |
| `surface-sunken` | `#E2DFF2` | `#2A2640` | Hover on surface |
| `foreground` | `#2C293D` | `#F3F3F7` | Text (10%) |
| `muted-foreground` | `#5E5A72` | `#A9A5BC` | Secondary text |
| `border` | `#2C293D` @ 12% | `#F3F3F7` @ 12% | Dividers, card edges |
| `border-strong` | `#7A7690` | `#77738E` | Control borders (≥ 3:1) |
| `primary` | `#7055F6` | `#8B76FF` | Primary fill (5%) |
| `primary-hover` | `#5A44C5` | `#A797FF` | Hover of primary fill |
| `primary-foreground` | `#FFFFFF` | `#15131F` | Text on primary |
| `primary-strong` | `#5A44C5` | `#A797FF` | Purple text and links |
| `success` | `#BEFBB6` | `#BEFBB6` | Success fill (5%) |
| `success-foreground` | `#2C293D` | `#15131F` | Text on success |
| `success-strong` | `#1F6B2A` | `#7EE08A` | Success icons, borders, text |
| `warning` / `warning-foreground` | `#FDE8DC` / `#9A4A12` | `#3A2116` / `#FFB38A` | Prototype / proposal status |
| `destructive` | `#C4001A` | `#FF6B6B` | Errors |
| `ring` | `#5A44C5` | `#A797FF` | Focus ring |

**Assumption:** every dark value and every derived light value (`primary-strong`, `success-strong`, `muted-foreground`, `border-strong`, `surface-raised`, `surface-sunken`, warning, destructive) was derived from the base palette and verified for contrast. Loop has not approved them yet. To change one, edit `tokens.json`, then run `npm run tokens` and `npm run contrast`.

In dark mode, white on `#8B76FF` is 3.42:1, so the primary button uses dark text (`#15131F`, 5.36:1).

## 4. Usage in code

Components use Tailwind utilities mapped in `src/app/globals.css` (`@theme inline`):

```tsx
<div className="bg-background text-foreground">               {/* 60% / 10% */}
  <section className="rounded-lg border border-border bg-surface p-6"> {/* 20% */}
    <a className="text-primary-strong hover:underline">Ver mais</a>
    <button className="bg-primary text-primary-foreground hover:bg-primary-hover">Agendar</button> {/* 5% */}
    <span className="rounded-pill bg-success px-3 text-success-foreground">Ativo</span>           {/* 5% */}
  </section>
</div>
```

shadcn names (`card`, `muted`, `accent`, `input`, `ring` …) are aliases of these tokens, so shadcn components follow the Loop palette automatically.
