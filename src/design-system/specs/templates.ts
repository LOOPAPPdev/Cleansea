/* Component specs — templates. Edit here when a component changes; bump its version. */
import { defineSpec } from "../spec.schema";

export const templatesSpecs = [
  defineSpec({
    "id": "LOOP-TPL-001",
    "name": "HomeTemplate",
    "level": "template",
    "version": "2.1.0",
    "summary": "Home (/solucoes): renders site-map.json sections in order.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": ["Hero", "CardGrid", "MediaCardRow", "SectionIntro", "FeatureMedia", "CtaBand", "ModulePanel", "SegmentedTabs", "TierDiagram"]
  }),
  defineSpec({
    "id": "LOOP-TPL-002",
    "name": "TeamTemplate",
    "level": "template",
    "version": "2.1.0",
    "summary": "Area page.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": ["Breadcrumb", "Hero", "FeatureCards", "FeatureMedia", "StatTiles", "Quote", "Faq", "CtaBand", "ColumnChart"]
  }),
  defineSpec({
    "id": "LOOP-TPL-003",
    "name": "WorkflowsTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Area workflows page.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Breadcrumb",
      "Hero",
      "FeatureCards",
      "Quote",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-004",
    "name": "IndustryTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Industry page.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Breadcrumb",
      "Hero",
      "FeatureMedia",
      "Quote",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-005",
    "name": "UseCaseTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Use-case page.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Breadcrumb",
      "Hero",
      "FeatureCards",
      "CardGrid",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-006",
    "name": "SegmentTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Por que a Loop segment page.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Hero",
      "FeatureCards",
      "StatTiles",
      "Quote",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-007",
    "name": "PricingTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Plans, comparison and FAQ.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Hero",
      "PlanCards",
      "ComparisonTable",
      "Faq",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-008",
    "name": "DirectoryTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Partner directory.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Hero",
      "LinkCards",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-009",
    "name": "ProfileTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Partner profile.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Breadcrumb",
      "Hero",
      "Prose",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-010",
    "name": "HubTemplate",
    "level": "template",
    "version": "2.1.0",
    "summary": "Learning hub.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Hero",
      "LinkCards",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-011",
    "name": "ArticleTemplate",
    "level": "template",
    "version": "2.1.0",
    "summary": "Generic article / legal page.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "MarkdownView",
      "Breadcrumb",
      "Hero",
      "Prose"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-012",
    "name": "AboutTemplate",
    "level": "template",
    "version": "2.1.0",
    "summary": "About (Saiba mais).",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": ["Hero", "Prose", "LinkCards", "OrgGrid", "CtaBand", "BrandValues"]
  }),
  defineSpec({
    "id": "LOOP-TPL-013",
    "name": "CareersTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Careers landing.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Hero",
      "FeatureCards",
      "LinkCards",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-014",
    "name": "JobSearchTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Job search with Base UI ToggleGroup filter.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default",
      "selected"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/forms.spec.ts"
    ],
    "dependsOn": [
      "Breadcrumb",
      "Hero",
      "LinkCards",
      "Badge"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-015",
    "name": "JobPostTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Single job post with description and apply link.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Breadcrumb",
      "Hero",
      "Prose"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-016",
    "name": "ProgramTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Residency program.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Hero",
      "Steps",
      "CtaBand"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-017",
    "name": "ListingTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "News listing.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Hero",
      "LinkCards"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-018",
    "name": "ContactTemplate",
    "level": "template",
    "version": "2.0.0",
    "summary": "Contact form: react-hook-form + Zod + TanStack Query.",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default",
      "loading",
      "error"
    ],
    "responsive": [
      "Composed of responsive composites; no layout CSS of its own"
    ],
    "a11y": [
      "One <h1> (from Hero)",
      "Landmarks: header, main, footer"
    ],
    "tests": [
      "e2e/forms.spec.ts",
      "src/content/contact.test.ts"
    ],
    "dependsOn": [
      "Hero",
      "Field",
      "Button"
    ]
  }),
  defineSpec({
    "id": "LOOP-TPL-019",
    "name": "DesignSystemTemplate",
    "level": "template",
    "version": "1.2.0",
    "summary": "Living brand guideline and component registry (/design-system).",
    "tokens": [
      "background",
      "foreground"
    ],
    "variants": {},
    "props": [],
    "states": [
      "default"
    ],
    "responsive": [
      "Sticky in-page nav scrolls horizontally on phones",
      "Charts 2 columns ≥ 1100 px, 1 below"
    ],
    "a11y": [
      "One <h1>",
      "In-page nav landmark",
      "Every section labelled"
    ],
    "tests": [
      "e2e/layout.spec.ts",
      "e2e/components.spec.ts"
    ],
    "dependsOn": [
      "MarkdownView", "ObsidianVars", "MinimalSource",
      "Hero",
      "BrandValues",
      "LogoUsage",
      "FoundationLayers",
      "SchemePreview",
      "DoDont",
      "ColorScale",
      "ThemeGrid",
      "ContrastTable",
      "TypeScale",
      "IconGrid",
      "ColumnChart",
      "LineChart",
      "AreaChart",
      "BarChart",
      "DonutChart",
      "SpecBlock",
      "Text"
    ]
  }),
];
