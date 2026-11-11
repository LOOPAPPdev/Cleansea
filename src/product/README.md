# Product UI (level 4)

Complete, Loop-specific screens for the SaaS product (dashboards, workspaces, reports).

Rules:
- Built only from `src/templates`, `src/design-system/composites` and `src/design-system/primitives`.
- Each screen exports a spec with level `"product"` and id `LOOP-PRD-###` (see `src/design-system/spec.schema.ts`) and adds it to `src/design-system/specs`.
- Data access goes through TanStack Query hooks; validation through Zod schemas in `src/content` or a domain folder.

Empty for now: the first dashboard will live here.
