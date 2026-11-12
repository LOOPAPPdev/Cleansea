/* Component specs — primitives. Edit here when a component changes; bump its version. */
import { defineSpec } from "../spec.schema";

export const primitivesSpecs = [
  defineSpec({
    "id": "LOOP-PRM-001",
    "name": "Button",
    "level": "primitive",
    "version": "2.1.0",
    "summary": "Action button with Loop variants and a loading state.",
    "tokens": ["primary", "primary-hover", "primary-foreground", "foreground", "surface", "surface-sunken", "ring"],
    "variants": {
      "variant": [
        "primary",
        "ink",
        "secondary",
        "outline",
        "ghost",
        "link"
      ],
      "size": [
        "md",
        "lg"
      ]
    },
    "props": [
      {
        "name": "variant",
        "type": "primary | ink | secondary | outline | ghost | link",
        "required": false,
        "description": "Visual style"
      },
      {
        "name": "size",
        "type": "md | lg",
        "required": false,
        "description": "Height 44 or 52px"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": "Disables and shows a spinner; sets aria-busy"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible",
      "active",
      "disabled",
      "loading"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Native <button> (Base UI)",
      "Height ≥ 44px",
      "aria-busy while loading",
      "Visible focus ring ≥ 3:1"
    ],
    "tests": [
      "src/design-system/primitives/Button.test.tsx"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-002",
    "name": "ButtonLink",
    "level": "primitive",
    "version": "2.0.0",
    "summary": "Navigation link styled as a button (Next.js Link).",
    "tokens": [
      "primary",
      "primary-foreground",
      "surface",
      "ring"
    ],
    "variants": {
      "variant": [
        "primary",
        "ink",
        "secondary",
        "outline",
        "ghost",
        "link"
      ]
    },
    "props": [
      {
        "name": "href",
        "type": "string",
        "required": true,
        "description": "Destination"
      },
      {
        "name": "variant",
        "type": "ButtonVariant",
        "required": false,
        "description": "Visual style"
      },
      {
        "name": "size",
        "type": "md | lg",
        "required": false,
        "description": "Height"
      }
    ],
    "states": [
      "default",
      "hover",
      "focus-visible",
      "active"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "Native <a href>",
      "Height ≥ 44px",
      "Label states the destination or action"
    ],
    "tests": [
      "src/design-system/primitives/Button.test.tsx",
      "e2e/layout.spec.ts"
    ],
    "dependsOn": [
      "Button"
    ]
  }),
  defineSpec({
    "id": "LOOP-PRM-003",
    "name": "Badge",
    "level": "primitive",
    "version": "2.1.0",
    "summary": "Short status or category label.",
    "tokens": ["surface-sunken", "foreground", "tint-lavender", "primary", "success", "success-foreground", "warning", "warning-foreground"],
    "variants": {
      "tone": [
        "neutral",
        "accent",
        "primary",
        "success",
        "warn",
        "outline"
      ]
    },
    "props": [
      {
        "name": "tone",
        "type": "neutral | accent | primary | success | warn | outline",
        "required": false,
        "description": "Colour role"
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
      "Text ≥ 4.5:1 on its fill",
      "Never colour-only: the label carries the meaning"
    ],
    "tests": [
      "src/design-system/specs.test.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-004",
    "name": "Card",
    "level": "primitive",
    "version": "2.0.0",
    "summary": "Surface container with a visible edge.",
    "tokens": [
      "surface",
      "surface-raised",
      "border"
    ],
    "variants": {
      "variant": [
        "filled",
        "outline",
        "raised"
      ]
    },
    "props": [
      {
        "name": "variant",
        "type": "filled | outline | raised",
        "required": false,
        "description": "Surface style"
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
      "Border keeps the edge visible (surface vs background 1.05:1)"
    ],
    "tests": [
      "src/design-system/specs.test.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-005",
    "name": "Field",
    "level": "primitive",
    "version": "2.0.0",
    "summary": "Label + input/textarea + hint or error text.",
    "tokens": [
      "border-strong",
      "foreground",
      "muted-foreground",
      "destructive",
      "ring",
      "background"
    ],
    "variants": {},
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Visible label"
      },
      {
        "name": "hint",
        "type": "string",
        "required": false,
        "description": "Helper text"
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "description": "Error text; sets aria-invalid"
      },
      {
        "name": "multiline",
        "type": "boolean",
        "required": false,
        "description": "Textarea instead of input"
      }
    ],
    "states": [
      "default",
      "focus-visible",
      "disabled",
      "error"
    ],
    "responsive": [
      "320px: no horizontal overflow",
      "390px / 820px / 1440px: layout reflows without overlap"
    ],
    "a11y": [
      "<label for> linked to the control",
      "Error is text, linked with aria-describedby",
      "aria-invalid when error",
      "Control border ≥ 3:1"
    ],
    "tests": [
      "src/design-system/primitives/Field.test.tsx",
      "e2e/forms.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-006",
    "name": "IconTile",
    "level": "primitive",
    "version": "2.1.0",
    "summary": "44px square for an icon or step index.",
    "tokens": ["primary", "primary-foreground", "success", "success-foreground", "surface-sunken"],
    "variants": {},
    "props": [
      {
        "name": "tone",
        "type": "neutral | primary | success",
        "required": false,
        "description": "Fill"
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
      "Decorative: aria-hidden"
    ],
    "tests": [
      "src/design-system/specs.test.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-007",
    "name": "Container",
    "level": "primitive",
    "version": "2.0.0",
    "summary": "Centred content width with responsive gutter and safe-area insets; Section adds vertical rhythm.",
    "tokens": [
      "background"
    ],
    "variants": {},
    "props": [
      {
        "name": "narrow",
        "type": "boolean",
        "required": false,
        "description": "720px reading measure"
      },
      {
        "name": "as",
        "type": "ElementType",
        "required": false,
        "description": "Rendered element"
      }
    ],
    "states": [
      "default"
    ],
    "responsive": [
      "Gutter max(16px, 4vw) plus safe-area insets",
      "Max width 1280px (720px narrow)"
    ],
    "a11y": [
      "Does not change semantics unless `as` is set"
    ],
    "tests": [
      "e2e/layout.spec.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-008",
    "name": "Heading",
    "level": "primitive",
    "version": "1.0.0",
    "summary": "Heading with semantic level and a type-scale step for size.",
    "tokens": [
      "foreground",
      "muted-foreground",
      "subtle-foreground"
    ],
    "variants": {
      "weight": [
        "regular",
        "medium",
        "semibold"
      ],
      "tone": [
        "default",
        "muted",
        "subtle"
      ]
    },
    "props": [
      {
        "name": "level",
        "type": "1 | 2 | 3 | 4",
        "required": false,
        "description": "HTML heading level"
      },
      {
        "name": "step",
        "type": "TypeStep",
        "required": false,
        "description": "Size on the modular scale"
      },
      {
        "name": "weight",
        "type": "regular | medium | semibold",
        "required": false,
        "description": "Weight"
      },
      {
        "name": "tone",
        "type": "default | muted | subtle",
        "required": false,
        "description": "Colour"
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
      "Level follows document outline; size does not change semantics"
    ],
    "tests": [
      "src/design-system/primitives/Brand.test.tsx"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-009",
    "name": "Text",
    "level": "primitive",
    "version": "1.0.0",
    "summary": "Body text on the modular type scale (default 16 px).",
    "tokens": [
      "foreground",
      "muted-foreground",
      "subtle-foreground"
    ],
    "variants": {},
    "props": [
      {
        "name": "as",
        "type": "ElementType",
        "required": false,
        "description": "Rendered element"
      },
      {
        "name": "step",
        "type": "TypeStep",
        "required": false,
        "description": "Size"
      },
      {
        "name": "tone",
        "type": "default | muted | subtle",
        "required": false,
        "description": "Colour"
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
      "Muted/subtle tones stay ≥ 4.5:1 on background and surface"
    ],
    "tests": [
      "src/design-system/primitives/Brand.test.tsx",
      "src/design-system/tokens/tokens.test.ts"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-010",
    "name": "Icon",
    "level": "primitive",
    "version": "1.0.0",
    "summary": "Lucide icon on the 16 px grid; stroke 1.5 at 16/20 px, 2 at 24 px.",
    "tokens": [
      "foreground",
      "muted-foreground"
    ],
    "variants": {
      "size": [
        "16",
        "20",
        "24"
      ]
    },
    "props": [
      {
        "name": "icon",
        "type": "LucideIcon",
        "required": true,
        "description": "Glyph"
      },
      {
        "name": "size",
        "type": "16 | 20 | 24",
        "required": false,
        "description": "Size"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Accessible name when the icon stands alone"
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
      "Decorative by default (aria-hidden)",
      "With label: role=img + aria-label"
    ],
    "tests": [
      "src/design-system/primitives/Brand.test.tsx"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-011",
    "name": "Logo",
    "level": "primitive",
    "version": "1.0.0",
    "summary": "Loop logo: logomark, logotype, lockup or avatar; black or white only; min size and clearance enforced.",
    "tokens": [
      "foreground",
      "background",
      "border"
    ],
    "variants": {
      "variant": [
        "lockup",
        "logomark",
        "logotype",
        "avatar"
      ],
      "tone": [
        "default",
        "inverse"
      ]
    },
    "props": [
      {
        "name": "variant",
        "type": "lockup | logomark | logotype | avatar",
        "required": false,
        "description": "Form"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "description": "Mark height (clamped to minimum)"
      },
      {
        "name": "tone",
        "type": "default | inverse",
        "required": false,
        "description": "Black on light or white on dark"
      },
      {
        "name": "clearance",
        "type": "boolean",
        "required": false,
        "description": "Adds the clearance area (half the mark height)"
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
      "role=img with the brand name",
      "Never below the minimum size"
    ],
    "tests": [
      "src/design-system/primitives/Brand.test.tsx"
    ],
    "dependsOn": []
  }),
  defineSpec({
    "id": "LOOP-PRM-012",
    "name": "ThemeSurface",
    "level": "primitive",
    "version": "1.0.0",
    "summary": "Applies a light / mid / dark theme (neutral, sage, lavender, warm) to a region.",
    "tokens": [
      "background"
    ],
    "variants": {
      "theme": [
        "neutral-light",
        "neutral-mid",
        "neutral-dark",
        "sage-light",
        "sage-mid",
        "sage-dark",
        "lavender-light",
        "lavender-mid",
        "lavender-dark",
        "warm-light",
        "warm-mid",
        "warm-dark"
      ]
    },
    "props": [
      {
        "name": "theme",
        "type": "ThemeName",
        "required": true,
        "description": "One of 12 themes"
      },
      {
        "name": "as",
        "type": "ElementType",
        "required": false,
        "description": "Rendered element"
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
      "Theme text ≥ 4.5:1 and accent ≥ 3:1 on ground (npm run contrast)"
    ],
    "tests": [
      "src/design-system/primitives/Brand.test.tsx",
      "src/design-system/tokens/tokens.test.ts"
    ],
    "dependsOn": []
  }),
];
