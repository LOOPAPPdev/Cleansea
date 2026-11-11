# Component quality — Loop

React lets you build excellent or poor interfaces. Quality comes from how a component is **architected, styled, organised and adapted to real use**, not from React itself.

## 1. Seven criteria

| Criterion | Good | Poor |
|---|---|---|
| Responsiveness | Adapts to every screen | Breaks on small screens |
| Reuse | Works in different contexts | Depends on specific values |
| Composition | One clear responsibility | Accumulates several jobs |
| Design | Uses tokens and patterns | Improvised CSS |
| Accessibility | Keyboard and screen reader support | Ignores accessibility |
| Behaviour | Predictable states and interactions | Inconsistent interactions |
| Maintenance | Organised, testable code | A change causes side effects |

## 2. Example: the site header

**Poor** — all links forced onto one line. It renders, but it does not define how navigation behaves on a phone, so labels wrap and the bar grows.

```tsx
function Header() {
  return (
    <header>
      <nav>
        <a href="/">Soluções</a>
        <a href="/">Por que a Loop</a>
        <a href="/">Planos</a>
        <a href="/">Parceiros</a>
      </nav>
    </header>
  );
}
```

**Production** — `src/design-system/composites/Header.tsx` (spec `LOOP-CMP-001`), built on Base UI NavigationMenu (desktop) and Sheet/Dialog (mobile):

| Requirement | Implementation |
|---|---|
| WHEN the viewport is < 1100px, THEN the nav MUST collapse behind a "Menu" button | Mobile-first CSS; `.nav` is a full-width panel shown by `data-open` |
| The Menu button MUST expose its state | `aria-expanded`, `aria-controls="site-nav"`; label changes to "Fechar" |
| WHEN a group is activated, THEN its links MUST expand in place (mobile) or in a dropdown (desktop) | One disclosure button per group with `aria-expanded` |
| WHEN the user presses Esc, THEN the open group or panel MUST close AND focus MUST return to its button | Base UI NavigationMenu / Dialog |
| WHILE the mobile panel is open, focus MUST stay inside it AND the page behind MUST NOT scroll | Base UI Dialog (focus trap, scroll lock) |
| WHEN the user clicks outside, THEN everything MUST close | Base UI (outside press) |
| WHEN a link is activated or the route changes, THEN the panel MUST close | `onClick` + state adjusted during render on `usePathname()` |
| Labels MUST NOT wrap | `white-space: nowrap`; compact styles ≤ 359px so the bar fits 320px |
| Section anchors MUST NOT be marked as the current page | `aria-current` only for exact paths without `#` |
| Links come from data | `nav` from `src/content/site-map.json` |

## 3. Levels and governance

```
Tokens          tokens.json → tokens.css (60-20-10-5-5, light + dark)
shadcn source   src/design-system/ui (Base UI, owned and adapted)
1 Primitive     Button, Badge, Card, Container, Field, IconTile
2 Composite     Header, Footer, Hero, CardGrid, FeatureMedia, Faq …
3 Template      Home, Team, Industry, Pricing, About, Contact …
4 Product UI    src/product (Loop SaaS screens)
Routes          src/app/**/page.tsx (thin)
```

Change a token and every component that uses it follows, without editing screens one by one.

### Component spec
Each component has a spec (`src/design-system/specs/*.ts`, schema `spec.schema.ts`):

| Field | Example (Button) |
|---|---|
| `id` · `level` · `version` | `LOOP-PRM-001` · primitive · `2.0.0` |
| `tokens` | primary, primary-hover, primary-foreground, foreground, surface, ring |
| `variants` | variant: primary · ink · secondary · outline · ghost · link; size: md · lg |
| `props` | variant, size, loading |
| `states` | default, hover, focus-visible, active, disabled, loading |
| `responsive` | no overflow at 320 px; reflows at 390/820/1440 |
| `a11y` | native button, ≥ 44 px, aria-busy while loading, focus ring ≥ 3:1 |
| `tests` | `src/design-system/primitives/Button.test.tsx` |
| `dependsOn` | — |

`npm test` enforces: schema valid, ids unique, tokens exist in `tokens.json`, dependencies exist, test files exist, and **no exported component without a spec**. Storybook shows the spec under each story (`SpecBlock`).

## 4. Acceptance (Gherkin) — automated in `e2e/` (Playwright) and `src/**/*.test.ts(x)` (Vitest)

```gherkin
Scenario: No horizontal overflow
  GIVEN any of the 21 routes
  WHEN it loads at 320, 390, 820 or 1440 px
  THEN the page MUST NOT scroll sideways
  AND there MUST be exactly one <h1>
  AND no header label MUST wrap onto two lines

Scenario: Mobile menu
  GIVEN a viewport narrower than 1100px
  WHEN the visitor activates "Menu"
  THEN the navigation panel opens AND the button reports aria-expanded="true"
  WHEN the visitor presses Esc twice
  THEN the panel closes AND focus returns to the Menu button
  WHEN the visitor follows a link in the panel
  THEN the new page loads AND the panel is closed

Scenario: Desktop dropdown
  GIVEN a viewport of 1100px or wider
  WHEN the visitor opens "Empresa" and presses Esc
  THEN the dropdown closes AND focus returns to "Empresa"

Scenario: WCAG 2.1 AA audit (e2e/a11y.spec.ts)
  GIVEN any of the 21 routes at 390 or 1440 px, light or dark
  WHEN axe-core scans the page
  THEN there are no WCAG 2.0/2.1 A or AA violations

Scenario: Workers runtime (scripts/smoke-workers.mjs)
  GIVEN the OpenNext build running in workerd
  WHEN every route and every prerendered page is requested
  THEN each returns 200 AND an unknown route returns 404

Scenario: Contact form errors
  GIVEN the contact form is empty
  WHEN the visitor submits
  THEN "Preencha seu nome." is shown as text
  AND focus moves to the first invalid field
```

## 5. Production-ready checklist
- [ ] Responsive on phone, tablet and desktop.
- [ ] No horizontal overflow or overlapping elements.
- [ ] Uses design tokens only.
- [ ] Interaction states: hover, focus, active, disabled, loading (when applicable).
- [ ] Basic accessibility validated (keyboard, names, roles, states, contrast).
- [ ] Reusable, one responsibility.
- [ ] Valid spec; `npm test` and `npm run test:e2e` pass.
- [ ] Visually consistent with the other components.

**Core point:** a quality component is not the one that looks right on the developer's screen. It keeps working, visually and functionally, across screens, content, states and contexts.
