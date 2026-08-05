import type { Theme } from "../lib/theme";

// Each chapter (friend) is assigned one accent color, cycling through this
// list in order. Override per-friend with the optional `accent` field in
// friends.ts if you want to hand-pick one instead.
//
// Two palettes share the same keys: ACCENTS (warm, light mode) and
// ACCENTS_DARK (punk neon, dark mode). A friend's accent *slot* stays fixed
// between themes — only which hex that slot resolves to changes.
export const ACCENTS = {
  terracotta: "#C2410C",
  rose: "#E11D48",
  sage: "#059669",
  teal: "#0E7490",
  plum: "#A21CAF",
  sunset: "#DB2777",
  gold: "#CA8A04",
} as const;

export const ACCENTS_DARK = {
  terracotta: "#FF6B00",
  rose: "#FF10F0",
  sage: "#39FF14",
  teal: "#00F0FF",
  plum: "#B026FF",
  sunset: "#FF0059",
  gold: "#FFE800",
} as const satisfies Record<AccentKey, string>;

export type AccentKey = keyof typeof ACCENTS;

export const ACCENT_ORDER = Object.keys(ACCENTS) as AccentKey[];

export function accentFor(key: AccentKey | undefined, index: number, theme: Theme = "light"): string {
  const resolved = key ?? ACCENT_ORDER[index % ACCENT_ORDER.length];
  return theme === "dark" ? ACCENTS_DARK[resolved] : ACCENTS[resolved];
}

// Matches --color-amber in index.css — kept in sync there for the Tailwind
// utility classes (bg-amber etc.) and here for components that need the
// literal hex (AmbientBackground, ScrollHint) rather than a class.
export function brandAccent(theme: Theme): string {
  return theme === "dark" ? "#FF2E9F" : "#D97706";
}
