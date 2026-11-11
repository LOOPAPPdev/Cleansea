/** Layer 1 — tokens that JavaScript needs. Colours live in tokens.json → tokens.css. */
export const breakpoints = { sm: 640, md: 900, lg: 1100 } as const;

/** Card tones, mapped to the 60-20-10-5-5 palette. Rotation used by grids. */
export type Tone = "primary" | "success" | "ink" | "surface";
export const toneRotation: Tone[] = ["primary", "success", "ink", "surface"];
