/* Component specs — composites. Edit here when a component changes; bump its version. */
import { defineSpec } from "../spec.schema";

export const compositesSpecs = [
  defineSpec({
    "id": "LOOP-CMP-001",
    "name": "Header",
    "level": "composite",
    "version": "2.2.0",
    "summary": "Responsive site header: NavigationMenu ≥1100px, Sheet below.",
    "tokens": ["background", "border", "foreground", "surface", "surface-sunken", "ring"],
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
    "dependsOn": ["ButtonLink", "Logo"]
  }),
  defineSpec({
    "id": "LOOP-CMP-002",
    "name": "Footer",
    "level": "composite",
    "version": "2.1.0",
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
    "dependsOn": ["Container", "Logo"]
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
    "version": "3.0.0",
    "summary": "Linked card with a flat tinted illustration (lavender, sage, neutral, white); label repeats the title.",
    "tokens": ["tint-lavender", "tint-lavender-border", "tint-sage", "tint-sage-border", "surface", "surface-raised", "surface-sunken", "border", "foreground"],
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
    "version": "2.1.0",
    "summary": "Three large media cards with a floating UI mock.",
    "tokens": ["tint-lavender", "tint-lavender-border", "surface-raised", "border", "muted-foreground", "foreground"],
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
    "version": "2.1.0",
    "summary": "Numbered capability cards.",
    "tokens": ["surface", "border", "surface-sunken", "foreground"],
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
    "version": "2.1.0",
    "summary": "Wide media, heading, body and optional CTA.",
    "tokens": ["tint-sage", "tint-sage-border", "tint-lavender", "tint-lavender-border", "surface", "surface-raised", "border"],
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
    "version": "2.1.0",
    "summary": "Ordered process.",
    "tokens": ["surface", "border", "muted-foreground"],
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
    "version": "2.1.0",
    "summary": "Pricing cards; highlight uses the primary tint and border.",
    "tokens": ["border", "surface-raised", "tint-lavender", "tint-lavender-border"],
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
    "version": "3.0.0",
    "summary": "Leadership cards; tone = lavender or sage tint with its border.",
    "tokens": ["border", "tint-lavender", "tint-lavender-border", "tint-sage", "tint-sage-border", "muted-foreground"],
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
    "version": "3.0.0",
    "summary": "Long-form reading view (foundation reading rules from the Minimal method): 40rem width, 1.6 line height, paragraph spacing, quiet headings, lists, quote.",
    "tokens": [
      "foreground",
      "muted-foreground",
      "subtle-foreground",
      "border-strong",
      "primary-strong",
      "primary-strong-hover"
    ],
    "variants": {},
    "props": [
      {
        "name": "blocks",
        "type": "{h, p[], list?, quote?}[]",
        "required": true,
        "description": "Sections"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "40rem reading width (scale.reading.width)",
      "320px: no horizontal overflow"
    ],
    "a11y": [
      "Each block is a section labelled by its h2",
      "Lists are real <ul>; quote is <blockquote>"
    ],
    "tests": [
      "src/design-system/composites/Foundation.test.tsx",
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Container"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-021",
    "name": "SegmentedTabs",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Equal-width pill tabs (reference style) on Base UI Tabs.",
    "tokens": [
      "surface-sunken",
      "foreground",
      "subtle-foreground",
      "ring"
    ],
    "variants": {},
    "props": [
      {
        "name": "tabs",
        "type": "{label, content}[]",
        "required": true,
        "description": "Tabs"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Accessible name of the tab list"
      },
      {
        "name": "defaultIndex",
        "type": "number",
        "required": false,
        "description": "Initially selected tab"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible",
      "selected"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "role=tablist/tab/tabpanel from Base UI",
      "Arrow keys move between tabs",
      "Targets 44 px"
    ],
    "tests": [
      "e2e/components.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-022",
    "name": "TierDiagram",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Architecture diagram: actor → sage group → lavender group → integrations, as the approved reference (nodes in 2 columns from 640 px).",
    "tokens": [
      "surface",
      "surface-raised",
      "border",
      "tint-sage",
      "tint-sage-border",
      "tint-lavender",
      "tint-lavender-border",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "data",
        "type": "TierDiagramData",
        "required": true,
        "description": "Layers from brand.json"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Figure name"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "<figure> + ordered list: reads top to bottom without the picture",
      "Icons decorative"
    ],
    "tests": [
      "e2e/layout.spec.ts",
      "e2e/components.spec.ts"
    ],
    "dependsOn": [
      "Icon"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-023",
    "name": "ModulePanel",
    "level": "composite",
    "version": "1.0.0",
    "summary": "White panel with eyebrow, title and status badge (reference frame).",
    "tokens": [
      "background",
      "border",
      "muted-foreground",
      "warning",
      "warning-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "eyebrow",
        "type": "string",
        "required": false,
        "description": "Kicker"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Heading"
      },
      {
        "name": "status",
        "type": "string",
        "required": false,
        "description": "Status badge text"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Section labelled by its title"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Badge"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-024",
    "name": "BarChart",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Horizontal bars with direct value labels (one series).",
    "tokens": [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-grid",
      "chart-axis",
      "surface-raised",
      "border",
      "foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Chart title"
      },
      {
        "name": "items",
        "type": "ChartItem[]",
        "required": true,
        "description": "Data"
      },
      {
        "name": "unit",
        "type": "string",
        "required": false,
        "description": "Unit"
      },
      {
        "name": "source",
        "type": "string",
        "required": false,
        "description": "Data source"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Data table for screen readers",
      "Zero-based axis"
    ],
    "tests": [
      "src/design-system/composites/Charts.test.tsx"
    ],
    "dependsOn": [
      "ChartFrame"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-025",
    "name": "ColumnChart",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Grouped columns, ≤ 6 series, gap = half bar width.",
    "tokens": [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-grid",
      "chart-axis",
      "surface-raised",
      "border"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Chart title"
      },
      {
        "name": "labels",
        "type": "string[]",
        "required": true,
        "description": "Categories"
      },
      {
        "name": "series",
        "type": "ChartSeries[]",
        "required": true,
        "description": "Series (≤ 6)"
      },
      {
        "name": "unit",
        "type": "string",
        "required": false,
        "description": "Unit"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Data table for screen readers",
      "Zero-based axis",
      "Legend + fixed colour order"
    ],
    "tests": [
      "src/design-system/composites/Charts.test.tsx"
    ],
    "dependsOn": [
      "ChartFrame"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-026",
    "name": "LineChart",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Lines with optional markers or area fill, ≤ 6 series.",
    "tokens": [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-grid",
      "chart-axis",
      "surface-raised",
      "border"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Chart title"
      },
      {
        "name": "labels",
        "type": "string[]",
        "required": true,
        "description": "Points"
      },
      {
        "name": "series",
        "type": "ChartSeries[]",
        "required": true,
        "description": "Series (≤ 6)"
      },
      {
        "name": "markers",
        "type": "boolean",
        "required": false,
        "description": "Show points"
      },
      {
        "name": "area",
        "type": "boolean",
        "required": false,
        "description": "Fill under lines"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Data table for screen readers"
    ],
    "tests": [
      "src/design-system/composites/Charts.test.tsx"
    ],
    "dependsOn": [
      "ChartFrame"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-027",
    "name": "AreaChart",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Line chart with filled areas.",
    "tokens": [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-grid",
      "chart-axis",
      "surface-raised",
      "border"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Chart title"
      },
      {
        "name": "labels",
        "type": "string[]",
        "required": true,
        "description": "Points"
      },
      {
        "name": "series",
        "type": "ChartSeries[]",
        "required": true,
        "description": "Series (≤ 6)"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Data table for screen readers"
    ],
    "tests": [
      "src/design-system/composites/Charts.test.tsx"
    ],
    "dependsOn": [
      "LineChart"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-028",
    "name": "DonutChart",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Parts of one whole, ≤ 6 slices, legend with values.",
    "tokens": [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-grid",
      "chart-axis",
      "surface-raised",
      "border"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Chart title"
      },
      {
        "name": "items",
        "type": "ChartItem[]",
        "required": true,
        "description": "Slices (≤ 6)"
      },
      {
        "name": "unit",
        "type": "string",
        "required": false,
        "description": "Unit"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Data table for screen readers",
      "Values in legend, not colour only"
    ],
    "tests": [
      "src/design-system/composites/Charts.test.tsx"
    ],
    "dependsOn": [
      "ChartFrame"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-029",
    "name": "ChartFrame",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Chart wrapper: title, legend, drawing, source and accessible data table.",
    "tokens": [
      "surface-raised",
      "border",
      "muted-foreground",
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6"
    ],
    "variants": {},
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Caption"
      },
      {
        "name": "table",
        "type": "{columns, rows}",
        "required": true,
        "description": "Accessible data"
      },
      {
        "name": "legend",
        "type": "string[]",
        "required": false,
        "description": "Series names"
      },
      {
        "name": "source",
        "type": "string",
        "required": false,
        "description": "Source"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "figure labelled by figcaption",
      "sr-only table with th scope"
    ],
    "tests": [
      "src/design-system/composites/Charts.test.tsx"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-030",
    "name": "SpecBlock",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Renders a component spec (Storybook and /design-system).",
    "tokens": [
      "border",
      "muted-foreground",
      "destructive"
    ],
    "variants": {},
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Component name"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Table with row headers; scrolls in its own box"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-031",
    "name": "ColorScale",
    "level": "composite",
    "version": "1.0.0",
    "summary": "10-step colour scale with hex and AA text colour per step.",
    "tokens": [
      "border"
    ],
    "variants": {},
    "props": [
      {
        "name": "family",
        "type": "neutral | sage | lavender | warm",
        "required": true,
        "description": "Scale"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Heading"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Text on each swatch chosen for best contrast"
    ],
    "tests": [
      "e2e/layout.spec.ts",
      "src/design-system/tokens/tokens.test.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-032",
    "name": "ThemeGrid",
    "level": "composite",
    "version": "1.0.0",
    "summary": "The 12 light / mid / dark themes with measured contrast.",
    "tokens": [
      "border"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Each tile shows its contrast ratios as text"
    ],
    "tests": [
      "e2e/layout.spec.ts",
      "src/design-system/tokens/tokens.test.ts"
    ],
    "dependsOn": [
      "ThemeSurface"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-033",
    "name": "ContrastTable",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Every checked contrast pair, light and dark.",
    "tokens": [
      "border",
      "surface"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default",
      "focus-visible"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Scroll region focusable and labelled",
      "th scope"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-034",
    "name": "TypeScale",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Specimen of the modular type scale (13 steps).",
    "tokens": [
      "border",
      "muted-foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Sizes as text next to the sample"
    ],
    "tests": [
      "e2e/layout.spec.ts",
      "src/design-system/tokens/tokens.test.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-035",
    "name": "IconGrid",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Icon sizes and strokes on the 16 px grid.",
    "tokens": [
      "border",
      "surface",
      "surface-raised",
      "chart-grid"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Icons labelled"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Icon"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-036",
    "name": "LogoUsage",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Logo variants, minimum sizes, clearance and negative version.",
    "tokens": [
      "border",
      "surface",
      "surface-raised",
      "foreground",
      "background"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Logo has role=img and name"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Logo"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-037",
    "name": "DoDont",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Do / avoid lists for guideline rules.",
    "tokens": [
      "border",
      "surface-raised",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "doItems",
        "type": "string[]",
        "required": false,
        "description": "Recommended"
      },
      {
        "name": "avoid",
        "type": "string[]",
        "required": false,
        "description": "To avoid"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Each list is a labelled section; icons decorative"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Icon"
    ]
  }),
  defineSpec({
    "id": "LOOP-CMP-038",
    "name": "BrandValues",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Brand values: name, meaning and three descriptors.",
    "tokens": [
      "border",
      "surface-raised",
      "muted-foreground",
      "subtle-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "values",
        "type": "{name, meaning, descriptors}[]",
        "required": true,
        "description": "Values"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "h3 per value"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-039",
    "name": "FoundationLayers",
    "level": "composite",
    "version": "1.0.0",
    "summary": "Foundation layers of one scheme (Minimal method): base and accent HSL, each layer's offset, light and dark value, usage.",
    "tokens": [
      "border",
      "surface",
      "muted-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "scheme",
        "type": "string",
        "required": false,
        "description": "Scheme name from tokens.json › foundation.schemes (default: neutral)"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "320px: table scrolls inside a focusable region; no page overflow",
      "390px / 820px / 1440px: reflows without overlap"
    ],
    "a11y": [
      "Table with caption, column and row headers",
      "Scroll region is focusable and labelled",
      "Hex value always shown as text next to the swatch"
    ],
    "tests": [
      "src/design-system/composites/Foundation.test.tsx",
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-CMP-040",
    "name": "SchemePreview",
    "level": "composite",
    "version": "1.0.0",
    "summary": "The same interface rendered in every foundation scheme; each card applies .scheme-* so semantic utilities switch layers.",
    "tokens": [
      "surface",
      "surface-raised",
      "surface-sunken",
      "foreground",
      "muted-foreground",
      "subtle-foreground",
      "primary",
      "primary-foreground",
      "primary-strong",
      "primary-strong-hover",
      "border"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default",
      "hover"
    ],
    "responsive": [
      "320px / 390px: one column",
      "820px+: three columns"
    ],
    "a11y": [
      "Every scheme passes all contrast pairs (npm run contrast)",
      "Link target ≥ 44px",
      "h3 per scheme"
    ],
    "tests": [
      "src/design-system/composites/Foundation.test.tsx",
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
];
