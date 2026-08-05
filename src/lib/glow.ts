import type { Theme } from "./theme";

// Neon glow only applies in dark mode — both return undefined in light mode
// so they can be spread straight into a style object with no branching at
// the call site.
export function glowBox(color: string, theme: Theme): string | undefined {
  if (theme !== "dark") return undefined;
  return `0 0 16px ${color}, 0 0 36px ${color}99`;
}

export function glowText(color: string, theme: Theme): string | undefined {
  if (theme !== "dark") return undefined;
  return `0 0 10px ${color}, 0 0 26px ${color}aa`;
}
