/* Component specs — primitives. Edit here when a component changes; bump its version. */
import { defineSpec } from "../spec.schema";

export const primitivesSpecs = [
  defineSpec({
    "id": "LOOP-PRM-001",
    "name": "Button",
    "level": "primitive",
    "version": "2.0.0",
    "summary": "Action button with Loop variants and a loading state.",
    "tokens": [
      "primary",
      "primary-hover",
      "primary-foreground",
      "foreground",
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
    "version": "2.0.0",
    "summary": "Short status or category label.",
    "tokens": [
      "surface-sunken",
      "foreground",
      "primary",
      "primary-strong",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground"
    ],
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
    "version": "2.0.0",
    "summary": "44px square for an icon or step index.",
    "tokens": [
      "primary",
      "primary-foreground",
      "success",
      "success-foreground",
      "surface-sunken"
    ],
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
];
