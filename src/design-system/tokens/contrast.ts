/** WCAG 2.1 contrast helpers shared by docs components and tests (mirrors scripts/tokens.mjs). */
import tokens from "./tokens.json";
import { resolveValue, type Mode, type TokensLike } from "./foundation.mjs";

/** Resolve "#hex", "{family.step}" or "{layer.name}" (layers depend on mode and scheme). */
export function resolveToken(v: string, mode: Mode = "light", scheme?: string): string {
  return resolveValue(tokens as unknown as TokensLike, v, mode, scheme);
}
const lum = (hex: string) =>
  [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
export function contrastRatio(a: string, b: string) {
  const [x, y] = [lum(a.slice(0, 7)), lum(b.slice(0, 7))].sort((p, q) => p - q);
  return (y + 0.05) / (x + 0.05);
}
/** Best text colour (black or white) for a ground, with its ratio. */
export function bestText(ground: string) {
  const black = contrastRatio("#000000", ground), white = contrastRatio("#FFFFFF", ground);
  return black >= white ? { color: "#000000", ratio: black } : { color: "#FFFFFF", ratio: white };
}
