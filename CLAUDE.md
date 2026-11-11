# Loop Consultoria — Cleansea (site + design system)

> CORE PRINCIPLE: Minimal instructions. Maximum contextual understanding. Controlled autonomy. Visual clarity. Verified execution.

# Part I — Operating rules (Controlled Language · Agentic Engineering · Visual Communication)

Keywords MUST, SHOULD and MAY follow RFC 2119.

## 1. Mission
- The agent MUST turn natural-language requests into functional, verified, reusable deliverables.
- The agent MUST reduce human effort without lowering quality, safety or accuracy.
- The agent SHOULD prefer simple, modular, autonomous and reproducible solutions.
- The agent MUST infer intent from the repository, this file and the conversation. It SHOULD NOT ask a question that the context answers.

## 2. Controlled language (ASD-STE100)
- Write short sentences: one sentence, one action.
- Use active voice and explicit verbs ("Run", "Add", "Remove").
- Use one term for one concept. Use the glossary terms of the design system: token, component, pattern, preview, ground, tint.
- Do not use jargon when a plain word exists.
- Label each statement: **Fact** (verified), **Assumption** (not verified), **Hypothesis** (to test), **Recommendation** (proposed action).

## 3. Requirements (EARS + RFC 2119)
- The agent MUST convert each request into testable requirements before it builds.
- Each requirement MUST state input, output, constraints and acceptance criteria.
- Use the EARS patterns:
  - Ubiquitous: "The <component> MUST <behaviour>."
  - Event: "WHEN <trigger>, THEN the <component> MUST <response>."
  - State: "WHILE <state>, the <component> MUST <behaviour>."
  - Unwanted: "IF <fault>, THEN the <component> MUST <recovery>."
- The agent MAY ask for clarification ONLY IF the uncertainty changes the result materially. Otherwise it MUST choose a sensible default and record it as an **Assumption**.

Example:
> WHEN the user selects a card, THEN the card MUST show `--loop-blue-tint` and a `--loop-blue` border, AND MUST set `aria-pressed="true"`.

## 4. Architecture (MACRO / MESO / MICRO)
| Level | Question | Output |
|---|---|---|
| MACRO | What is the goal, scope and expected result? | Objective + acceptance criteria |
| MESO | Which workflow, Skills, agents and tools? | Plan with ordered steps |
| MICRO | How to implement, validate and deliver? | Code, preview, test evidence |

- Keep data, business logic, interface and infrastructure in separate layers.
- MUST reuse existing schemas, components and tokens before creating new ones.

## 5. Agent orchestration
- Delegate independent work to specialised subagents (for example: `design:design-system`, `design:accessibility-review`, `design:design-handoff`).
- Run cheap deterministic checks first (lint, contrast script, `node --check`, grep for hard-coded hex). Use model reasoning after that.
- Choose the model by complexity, cost and risk.
- Integrate subagent outputs and validate them independently. The agent that produces MUST NOT be the only agent that approves.
- Record decisions and reusable knowledge (this file, Skills, tests).

## 6. Execution (aviation protocol)
Follow this checklist for each task:
1. **Pre-flight:** Verify prerequisites (files exist, tokens loaded, tools connected).
2. **Authorisation:** Ask before destructive or sensitive actions (delete, overwrite, push, publish to others, spend).
3. **Execute** in small steps with a checkpoint after each step.
4. **Monitor:** Detect failures. Recover context. Correct. Retest.
5. **Report:** State what ran and what did not.
- The agent MUST NEVER report success that it did not verify.

## 7. Verification (Gherkin + FMEA)
- Write acceptance tests as GIVEN–WHEN–THEN:
  ```gherkin
  Scenario: Keyboard user selects an agent card
    GIVEN the agents grid is visible
    WHEN the user presses Tab until a card has focus and presses Enter
    THEN the card shows the blue selected state
    AND the screen reader announces "pressed"
  ```
- Validate function, security, accessibility (WCAG 2.1 AA) and usability.
- For each new component, list failure modes in an FMEA table: failure · effect · cause · severity (1–5) · detection · action. Fix the highest risk first.
- Prefer real use (keyboard, screen reader, 320px, 200% zoom) over benchmark scores.
- Convert each recurring failure into a regression test or a rule in this file.

## Appendix A — Visual-first explanations (highest-priority rule)
- WHEN a concept is complex (architecture, dependencies, flows, cause and effect, states), THEN the agent MUST evaluate whether a diagram, simulation or interactive HTML page communicates better than text.
- IF a visual communicates better, THEN the agent SHOULD produce it: SVG diagram, flowchart, HTML preview or interactive demo (Design canvas or Design System storyboard).
- This rule does NOT require visuals in every answer. Use a visual only when it improves understanding.
- Use progressive disclosure: overview first, details on demand.
- Prefer a working visualisation over a long theoretical explanation.
- Visuals MUST use the design tokens in this file and MUST meet WCAG 2.1 AA.
- A visual MUST NOT replace necessary technical accuracy.

## Appendix B — Short prompts, deep context
- Interpret short requests through project files and these conventions.
- Read the relevant instructions; do not ask the user to repeat them.
- Do not add contradictory or excessive requirements.

## Appendix C — Data-first development
- Structured data and schemas (`tokens.json`, component props, content JSON) are the source of truth.
- Keep core data independent of the interface, so several implementations can use the same validated data.

## Appendix D — Continuous improvement
- Fix recurring problems at the source (token, component, rule), not in each screen.
- Document reusable solutions as Skills, rules or tests.
- Keep work reproducible across projects.

## Appendix E — Delivery protocol
- Deliver functional artifacts and a visual preview when useful.
- Explain WHAT changed, WHY, and HOW it was verified.
- Separate the executive summary from the technical detail.
- Report limitations, risks and outstanding work.

---

# Part II — This repository

## Stack
| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript strict |
| Runtime | Cloudflare Workers via OpenNext (`open-next.config.ts`, static-assets incremental cache) |
| Design system | shadcn/ui (style `base-nova`) on **Base UI** + **Tailwind CSS v4**, owned code in `src/design-system/ui` |
| Tokens | `src/design-system/tokens/tokens.json` → `scripts/tokens.mjs` → `tokens.css` (rule 60-20-10-5-5, light + dark) |
| Interaction | Motion (`motion/react`, reduced motion respected), TanStack Query |
| Validation | Zod (+ react-hook-form for forms) |
| Quality | Vitest + Testing Library, Playwright (+ axe-core), Storybook 10 (+ a11y, themes) |

Use ONE visual library (shadcn/ui on Base UI). Do not add MUI, Mantine or Radix directly.

## Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Local dev |
| `npm run build` / `npm run lint` / `npm run typecheck` | Build and static checks |
| `npm run tokens` | Regenerate `tokens.css` from `tokens.json` (never edit `tokens.css`) |
| `npm run contrast` | WCAG contrast check of every token pair, light and dark |
| `npm test` | Vitest: spec governance, tokens, primitives, schemas |
| `npm run test:e2e` | Playwright: 21 routes × 5 projects (320/390/820/1440 + dark), header, forms, axe WCAG 2.1 AA |
| `npm run test:workers` | Build for Workers, populate cache, request every route on the Workers runtime |
| `npm run storybook` / `npm run build-storybook` | Component docs and visual review |
| `npm run deploy` | Deploy to Cloudflare. **ONLY with explicit approval.** |

## Architecture: 4 levels (a lower level never imports a higher one)
| Level | Path | Contains | May import |
|---|---|---|---|
| Tokens | `src/design-system/tokens/` | `tokens.json` (source), `tokens.css` (generated), `schema.ts`, `tokens.ts` | — |
| shadcn source | `src/design-system/ui/` | Base UI components owned and adapted to Loop (44px targets, tokens) | tokens, `@/lib/utils` |
| 1 Primitive | `src/design-system/primitives/` | Button, ButtonLink, Badge, Card, Container/Section, Field, IconTile | ui, tokens |
| 2 Composite | `src/design-system/composites/` | Header, Footer, Hero, CardGrid, … (20) | primitives, ui, `@/content` types |
| 3 Template | `src/templates/` | 18 page templates | composites, primitives, content |
| 4 Product UI | `src/product/` | Loop SaaS screens (empty) | all of the above |
| Routes | `src/app/` | thin `page.tsx`: params → content → template | templates, content |
| Content | `src/content/` | `site-map.json` (navigation, routes, copy, limits), `contact.ts` (Zod schema) | — |

Rules:
- Pages MUST NOT contain layout CSS or copy. They pass content to a template.
- Components MUST use Tailwind utilities mapped to tokens (`bg-background`, `bg-surface`, `text-primary-strong`, `border-border` …). Raw hex values in components are NOT allowed.
- Colour rule 60-20-10-5-5: background 60 % · surface 20 % · foreground 10 % · primary 5 % · success 5 %.
  - Purple TEXT MUST use `text-primary-strong` (`#7055F6` is only 4.39:1 on the background).
  - Success is a fill (`bg-success text-success-foreground`); icons/borders use `success-strong`.
  - Cards on the background MUST have `border-border` (surface vs background is 1.05:1).
- A new visual value goes into `tokens.json` first (light AND dark), then `npm run tokens`, then `npm run contrast`.
- Change navigation or home sections in `site-map.json`, not in components.
- Prerendered routes need the incremental cache: keep `open-next.config.ts` and run `npm run test:workers` after adding SSG routes.

## Component governance (MUST)
- Every exported component has a spec in `src/design-system/specs/{primitives,composites,templates}.ts` (`defineSpec`, schema `src/design-system/spec.schema.ts`): id `LOOP-PRM|CMP|TPL|PRD-###`, level, version, summary, tokens, variants, props, states, responsive rules, a11y criteria, tests, dependsOn.
- `npm test` fails when a component has no spec, a spec uses an unknown token, a dependency is missing, or a listed test file does not exist.
- Changing a component's API or behaviour: bump its spec `version` (semver).
- New interactive component: add a Storybook story and a Vitest or Playwright test.

## Definition of done for a component (all MUST pass)
1. Responsive at 320, 390, 820 and 1440 px. No horizontal overflow, no overlap, header labels do not wrap.
2. Tokens only (Tailwind token utilities); works in light and dark.
3. States: hover, focus-visible, active, disabled, loading (where it triggers an action), error (where it takes input).
4. Accessibility: Base UI / native elements, visible focus, targets ≥ 44px, correct aria state, Esc closes overlays and returns focus, axe reports no WCAG 2.1 AA violations.
5. Single responsibility; typed props; valid spec.
6. `npm run lint`, `typecheck`, `contrast`, `test`, `build`, `test:e2e` pass (`test:workers` when routes change).
7. Visually consistent with the other components.

Details: `docs/component-quality.md` · tokens: `docs/tokens.md` · site map: `docs/site-architecture.md`.
