# Cleansea — Loop Consultoria

Website and design system for **Loop Consultoria**, built with Next.js 16 (App Router) and deployed to Cloudflare Workers through [OpenNext](https://opennext.js.org/cloudflare). Started from `cloudflare/templates/next-starter-template`.

> Prototype: copy is lorem ipsum. Values marked `[A DEFINIR]` still need real data.

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000 (redirects to `/solucoes`).

## Stack

Next.js 16 + React 19 + TypeScript · shadcn/ui on Base UI + Tailwind CSS v4 · Motion · TanStack Query · Zod · Vitest · Playwright + axe · Storybook 10 · Cloudflare Workers (OpenNext).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (Next.js) |
| `npm run lint` · `npm run typecheck` | ESLint · `tsc --noEmit` |
| `npm run tokens` | Generate `tokens.css` from `tokens.json` |
| `npm run contrast` | WCAG contrast check of all token pairs (light + dark) |
| `npm test` | Vitest: component spec governance, tokens, primitives, schemas |
| `npm run test:e2e` | Playwright: 22 routes × 5 projects, header, forms, axe WCAG 2.1 AA (starts the server itself; run `npm run build` first) |
| `npm run test:workers` | OpenNext build + local cache + every route on the Workers runtime |
| `npm run storybook` · `npm run build-storybook` | Component docs (a11y + light/dark themes) |
| `npm run preview` | OpenNext build in the local Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare (worker `loop-cleansea`) |

First Playwright run on a new machine: `npx playwright install chromium`.

## Structure

```
src/
  design-system/
    tokens/       tokens.json (source) → tokens.css (generated), schema.ts
    ui/           shadcn/ui source on Base UI, adapted to Loop
    primitives/   Level 1 — Button, Badge, Card, Container, Field, IconTile
    composites/   Level 2 — Header, Footer, Hero, CardGrid, FeatureMedia, Faq …
    specs/        component specs (governance), spec.schema.ts
    stories/      Storybook stories
  templates/      Level 3 — Home, Team, Industry, Pricing, About, Contact …
  product/        Level 4 — Loop SaaS screens (empty)
  content/        site-map.json (source of truth), contact.ts (Zod)
  app/            routes (thin page.tsx files), providers.tsx
e2e/              Playwright acceptance tests
docs/             tokens.md, component-quality.md, site-architecture.md
CLAUDE.md         operating rules + repository rules for agents
```

## Routes

`/solucoes` (home) · `/solucoes/areas/[slug]` (+ `/workflows`) · `/solucoes/setores/[slug]` · `/solucoes/casos/[slug]` · `/por-que-loop/[segmento]` · `/planos` · `/parceiros` (+ `/[slug]`) · `/aprender` · `/guias/[slug]` · `/sobre` · `/principios` · `/carreiras` · `/carreiras/busca` · `/carreiras/[slug]` · `/seguranca` · `/residencia` · `/noticias` (+ `/[slug]`) · `/contato` · `/privacidade` · `/termos` · `/cookies` · `/integracoes` · `/design-system`.

Navigation and home sections are driven by `src/content/site-map.json`.

## Design tokens

Foundation: one base and one accent colour (HSL) generate every neutral and accent layer, following the method of the [Minimal theme for Obsidian](https://github.com/kepano/obsidian-minimal) (MIT). Schemes: neutral (default), sage, lavender (`.scheme-*`). Neutral-first identity: white `#FCFCFC` · gray `#F2F2F2` · black `#000000` · sage `#E3E7E8` and lavender `#E6E5EB` tints with thin borders. Brand purple `#7055F6` only for focus and links; green `#BEFBB6` only for success. See `docs/tokens.md` and the brand guideline `docs/brand-guidelines.md` (live at `/design-system`).

## Deploy

Every push to `main` deploys to Cloudflare Workers automatically (Workers Builds: `npm test` → `npm run deploy`). Live: https://loop-cleansea.adm-loop-app.workers.dev
