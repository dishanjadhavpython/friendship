import confetti from "canvas-confetti";
import { ACCENTS, ACCENTS_DARK, brandAccent } from "../data/accents";
import type { Theme } from "./theme";

const PALETTE_LIGHT = [ACCENTS.terracotta, ACCENTS.rose, ACCENTS.gold, ACCENTS.sage, ACCENTS.sunset, brandAccent("light")];
const PALETTE_DARK = [
  ACCENTS_DARK.rose,
  ACCENTS_DARK.teal,
  ACCENTS_DARK.gold,
  ACCENTS_DARK.sage,
  ACCENTS_DARK.plum,
  brandAccent("dark"),
];

export function celebrate(theme: Theme = "light") {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const defaults = { colors: theme === "dark" ? PALETTE_DARK : PALETTE_LIGHT, disableForReducedMotion: true };

  confetti({ ...defaults, particleCount: 60, spread: 70, startVelocity: 45, origin: { x: 0.5, y: 0.7 } });
  confetti({ ...defaults, particleCount: 40, angle: 60, spread: 55, origin: { x: 0, y: 0.75 } });
  confetti({ ...defaults, particleCount: 40, angle: 120, spread: 55, origin: { x: 1, y: 0.75 } });
}
