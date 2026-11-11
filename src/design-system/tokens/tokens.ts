/** Layer 1 — tokens that JavaScript needs. Colours live in tokens.json → tokens.css. */
export const breakpoints = { sm: 640, md: 900, lg: 1100 } as const;

/** Card tones of the neutral-first identity: lavender and sage tints, gray, white. Rotation used by grids. */
export type Tone = "lavender" | "sage" | "neutral" | "white";
export const toneRotation: Tone[] = ["lavender", "sage", "neutral", "white"];
