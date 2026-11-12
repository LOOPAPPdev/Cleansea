export type Mode = "light" | "dark";
export type Hsl = [number, number, number];
export interface FoundationLayer { usage: string; from: "base" | "accent"; light: [number, number]; dark: [number, number]; alpha?: string }
export interface FoundationScheme { label: string; light: { base: Hsl; accent: Hsl }; dark: { base: Hsl; accent: Hsl } }
export interface Foundation { method: string; default: string; layers: Record<string, FoundationLayer>; schemes: Record<string, FoundationScheme> }
export interface TokensLike { foundation: Foundation; primitives: Record<string, Record<string, string>>; semantic: Record<string, { light: string; dark: string }> }

export function hexToHsl(hex: string): Hsl;
export function hslToHex(hsl: Hsl): string;
export function deriveLayers(foundation: Foundation, scheme?: string, mode?: Mode): Record<string, string>;
export function resolveValue(tokens: TokensLike, value: string, mode?: Mode, scheme?: string): string;
export function semanticFor(tokens: TokensLike, mode?: Mode, scheme?: string): Record<string, string>;
export interface MinimalData { source: { repo: string; commit: string; date: string; license: string }; defaults: Record<string, { value: string; file: string }>; light: Record<string, { value: string; file: string }>; dark: Record<string, { value: string; file: string }> }
export function minimalValue(minimal: MinimalData, name: string): string | null;
export function obsidianCss(minimal: MinimalData, value: string): string;
