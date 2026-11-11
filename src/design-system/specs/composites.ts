/* Component specs — composites. Edit here when a component changes; bump its version. */
import { defineSpec } from "../spec.schema";

export const compositesSpecs = [
  defineSpec({
    "id": "LOOP-CMP-001",
    "name": "Header",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Responsive site header: NavigationMenu ≥1100px, Sheet below.",
    "tokens": [
      "background",
      "border",
      "foreground",
      "primary",
      "primary-strong",
      "surface",
      "ring"
    ],
    "variants": {},
    "props": [
      {
        "name": "groups",
        "type": "NavGroup[]",
        "required": true,
        "description": "Navigation from site-map.json"
      },
      {
        "name": "cta",
        "type": "{label, href}",
        "required": true,
        "description": "Primary call to action"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible",
      "open",
      "current"
    ],
    "responsive": [
      "<1100px: Menu button + Sheet",
      "≥1100px: inline groups with dropdowns",
      "≤359px: compact brand and button"
    ],
    "a11y": [
      "Base UI NavigationMenu and Dialog (Sheet)",
      "Esc closes and returns focus",
      "Focus trapped in the mobile sheet",
      "aria-current only on exact paths",
      "Labels never wrap"
    ],
    "tests": [
      "e2e/header.spec.ts",
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "ButtonLink"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-002",
    "name": "Footer",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Link columns from site-map.json plus legal line.",
    "tokens": [
      "surface",
      "border",
      "muted-foreground",
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "columns",
        "type": "{title, links}[]",
        "required": true,
        "description": "Footer groups"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Each column is a labelled <nav>",
      "Links ≥ 44px tall"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-003",
    "name": "Hero",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Page opener with title, subtitle and CTAs.",
    "tokens": [
      "foreground",
      "muted-foreground",
      "primary"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "h1 text"
      },
      {
        "name": "subtitle",
        "type": "string",
        "required": false,
        "description": "Lead"
      },
      {
        "name": "ctas",
        "type": "Cta[]",
        "required": false,
        "description": "First = primary"
      },
      {
        "name": "align",
        "type": "center | start",
        "required": false,
        "description": "Hub or inner page"
      },
      {
        "name": "eyebrow",
        "type": "string",
        "required": false,
        "description": "Kicker"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "≤480px: CTAs stack full width"
    ],
    "a11y": [
      "Renders the page's only <h1>",
      "CTAs are links"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "ButtonLink",
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-004",
    "name": "IllustratedCard",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Linked card with a tinted illustration; label repeats the title.",
    "tokens": [
      "primary",
      "primary-strong",
      "success",
      "success-strong",
      "foreground",
      "surface",
      "surface-raised",
      "background"
    ],
    "variants": {},
    "props": [
      {
        "name": "item",
        "type": "CardItem",
        "required": true,
        "description": "title, desc, tone, href"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Illustration has role=img + label",
      "Tone never the only cue"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-005",
    "name": "CardGrid",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Section with heading and IllustratedCard grid 4 → 2 → 1.",
    "tokens": [
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Anchor id"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Section heading"
      },
      {
        "name": "items",
        "type": "CardItem[]",
        "required": true,
        "description": "Cards"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "Track min 240px: columns reflow automatically"
    ],
    "a11y": [
      "Section labelled by its heading"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "IllustratedCard",
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-006",
    "name": "MediaCardRow",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Three large media cards with a floating UI mock.",
    "tokens": [
      "surface",
      "primary",
      "primary-strong",
      "surface-raised",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Anchor id"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "items",
        "type": "CardItem[]",
        "required": true,
        "description": "Cards"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible"
    ],
    "responsive": [
      "Track min 300px"
    ],
    "a11y": [
      "Media has role=img + label"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-007",
    "name": "FeatureCards",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Numbered capability cards.",
    "tokens": [
      "surface",
      "border",
      "primary",
      "primary-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "items",
        "type": "{title, body}[]",
        "required": true,
        "description": "Cards"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Numbers are decorative (IconTile)"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Card",
      "IconTile"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-008",
    "name": "LinkCards",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Grid of linked cards for partners, guides, jobs, news.",
    "tokens": [
      "border",
      "surface",
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "items",
        "type": "{title, body, href, tag}[]",
        "required": true,
        "description": "Cards"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "List semantics (<ul>)",
      "Whole card is one link"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-009",
    "name": "SectionIntro",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Centred statement block.",
    "tokens": [
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "subtitle",
        "type": "string",
        "required": true,
        "description": "Lead"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "h2 heading"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-010",
    "name": "FeatureMedia",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Wide media, heading, body and optional CTA.",
    "tokens": [
      "surface",
      "primary",
      "success",
      "surface-raised",
      "border"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "body",
        "type": "string",
        "required": true,
        "description": "Text"
      },
      {
        "name": "media",
        "type": "integrations | badges | data",
        "required": false,
        "description": "Illustration"
      },
      {
        "name": "cta",
        "type": "Cta",
        "required": false,
        "description": "Optional link"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Media has role=img + label"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "ButtonLink",
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-011",
    "name": "CtaBand",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Closing call to action on a surface panel.",
    "tokens": [
      "surface",
      "border",
      "primary"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "cta",
        "type": "Cta",
        "required": true,
        "description": "Link"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "CTA is a link with an action label"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "ButtonLink"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-012",
    "name": "Quote",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Customer quote.",
    "tokens": [
      "surface",
      "border",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "text",
        "type": "string",
        "required": true,
        "description": "Quote"
      },
      {
        "name": "author",
        "type": "string",
        "required": true,
        "description": "Attribution"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "<figure>/<blockquote>/<figcaption>"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-013",
    "name": "StatTiles",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Row of key numbers.",
    "tokens": [
      "surface",
      "border",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "items",
        "type": "{value, label}[]",
        "required": true,
        "description": "Numbers"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "auto-fit, min 160px"
    ],
    "a11y": [
      "<dl> semantics; tabular numbers"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-014",
    "name": "Faq",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Questions and answers on Base UI Accordion.",
    "tokens": [
      "border",
      "muted-foreground",
      "ring"
    ],
    "variants": {},
    "props": [
      {
        "name": "items",
        "type": "{q, a}[]",
        "required": true,
        "description": "Entries"
      }
    ],
    "states": [
      "default",
      "focus-visible",
      "open"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "aria-expanded on triggers",
      "Keyboard operable",
      "Trigger ≥ 56px"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-015",
    "name": "Breadcrumb",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Trail of parent pages.",
    "tokens": [
      "muted-foreground",
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "items",
        "type": "{label, href}[]",
        "required": true,
        "description": "Trail"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible",
      "current"
    ],
    "responsive": [
      "Wraps on narrow screens"
    ],
    "a11y": [
      "<nav aria-label>",
      "<ol>",
      "Last item aria-current=page"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-016",
    "name": "Steps",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Ordered process.",
    "tokens": [
      "surface",
      "border",
      "primary-strong",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "items",
        "type": "{title, body}[]",
        "required": true,
        "description": "Steps"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Native <ol>; numbers are CSS counters"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-017",
    "name": "PlanCards",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Pricing cards; highlight uses the primary tint and border.",
    "tokens": [
      "border",
      "primary",
      "primary-strong"
    ],
    "variants": {},
    "props": [
      {
        "name": "plans",
        "type": "Plan[]",
        "required": true,
        "description": "Plans"
      }
    ],
    "states": [
      "default",
      "selected"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Highlight also stated as text (badge)"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Badge",
      "ButtonLink"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-018",
    "name": "ComparisonTable",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Feature comparison table that scrolls inside its own region.",
    "tokens": [
      "border",
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "caption",
        "type": "string",
        "required": true,
        "description": "Heading/label"
      },
      {
        "name": "columns",
        "type": "string[]",
        "required": true,
        "description": "Column heads"
      },
      {
        "name": "rows",
        "type": "{label, values}[]",
        "required": true,
        "description": "Rows"
      }
    ],
    "states": [
      "default",
      "focus-visible"
    ],
    "responsive": [
      "Min width 560px inside an overflow-x region; page never scrolls sideways"
    ],
    "a11y": [
      "th scope=col/row",
      "Scroll region is focusable and labelled"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-019",
    "name": "OrgGrid",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Leadership cards; tone colours the border.",
    "tokens": [
      "border",
      "primary-strong",
      "success-strong",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "people",
        "type": "Person[]",
        "required": true,
        "description": "Cards"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Role text always present; colour is secondary"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-020",
    "name": "Prose",
    "level": "composite",
    "version": "2.0.0",
    "summary": "Long-form text blocks at reading measure.",
    "tokens": [
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "blocks",
        "type": "{h, p[]}[]",
        "required": true,
        "description": "Sections"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "720px measure"
    ],
    "a11y": [
      "h2 per block"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Container"
    ]
  }),
];
