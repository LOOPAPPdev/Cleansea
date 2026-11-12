/**
 * Foundation: derive every neutral and accent layer from two HSL colours (base + accent).
 * Method adopted from the Minimal theme for Obsidian by Steph Ango (MIT, github.com/kepano/obsidian-minimal):
 * one base colour drives backgrounds, borders and text; one accent colour drives links and focus.
 * Values are Loop's own (tokens.json › foundation). Shared by scripts/tokens.mjs and the TypeScript code.
 */

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/** "#RRGGBB" → [h 0-360, s 0-100, l 0-100] */
export function hexToHsl(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s * 100, l * 100];
}

/** [h, s, l] → "#RRGGBB" (s and l are clamped to 0-100). */
export function hslToHex([h, s, l]) {
  const S = clamp(s, 0, 100) / 100, L = clamp(l, 0, 100) / 100;
  const k = (n) => (n + h / 30) % 12, a = S * Math.min(L, 1 - L);
  const f = (n) => L - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return "#" + [0, 8, 4].map((n) => Math.round(f(n) * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}

/**
 * Layers for one scheme and mode: { bg1: "#FCFCFC", tx1: "#000000", … }.
 * Each layer = source colour (base or accent) + [Δsaturation, Δlightness]; hue stays the source hue.
 */
export function deriveLayers(foundation, scheme = foundation.default, mode = "light") {
  const s = foundation.schemes[scheme];
  if (!s) throw new Error(`Unknown scheme ${scheme}`);
  const src = s[mode];
  return Object.fromEntries(
    Object.entries(foundation.layers).map(([name, layer]) => {
      const [h, sat, l] = src[layer.from];
      const [ds, dl] = layer[mode];
      const hex = hslToHex([h, sat + ds, l + dl]);
      return [name, layer.alpha ? hex + layer.alpha : hex];
    }),
  );
}

/** Resolve a token value: "#hex", "{family.step}" (primitive) or "{layer.name}" (foundation, mode- and scheme-dependent). */
export function resolveValue(tokens, value, mode = "light", scheme = tokens.foundation.default) {
  const m = /^\{([a-z]+)\.([a-z0-9]+)\}$/.exec(value);
  if (!m) return value;
  if (m[1] === "layer") {
    const out = deriveLayers(tokens.foundation, scheme, mode)[m[2]];
    if (!out) throw new Error(`Unknown layer ${value}`);
    return out;
  }
  const out = tokens.primitives[m[1]]?.[m[2]];
  if (!out) throw new Error(`Unknown token reference ${value}`);
  return out;
}

/** All semantic colours for one mode and scheme. */
export function semanticFor(tokens, mode = "light", scheme = tokens.foundation.default) {
  return Object.fromEntries(Object.entries(tokens.semantic).map(([k, v]) => [k, resolveValue(tokens, v[mode], mode, scheme)]));
}
