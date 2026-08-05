import type { Icon } from "@phosphor-icons/react";
import { useTheme } from "../lib/theme";

interface ProfessionPatternProps {
  icon: Icon;
  accent: string;
}

// Fixed scatter layout (not randomized, so it's stable across re-renders) —
// only the icon shape and color change per profession, keeping every
// chapter's rhythm consistent while still reading as visually distinct.
const PLACEMENTS = [
  { x: 5, y: 12, size: 48, rotate: -15, opacity: 0.12 },
  { x: 90, y: 8, size: 64, rotate: 20, opacity: 0.1 },
  { x: 12, y: 78, size: 40, rotate: 10, opacity: 0.14 },
  { x: 85, y: 88, size: 56, rotate: -25, opacity: 0.1 },
  { x: 95, y: 45, size: 36, rotate: 8, opacity: 0.12 },
  { x: 3, y: 45, size: 44, rotate: -8, opacity: 0.1 },
  { x: 70, y: 4, size: 32, rotate: 30, opacity: 0.13 },
  { x: 25, y: 94, size: 28, rotate: -20, opacity: 0.11 },
  { x: 55, y: 96, size: 38, rotate: 15, opacity: 0.09 },
  { x: 8, y: 25, size: 24, rotate: 25, opacity: 0.13 },
  { x: 92, y: 65, size: 30, rotate: -10, opacity: 0.11 },
  { x: 45, y: 2, size: 26, rotate: -30, opacity: 0.1 },
];

export function ProfessionPattern({ icon: IconComponent, accent }: ProfessionPatternProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PLACEMENTS.map((p, i) => (
        <IconComponent
          key={i}
          size={p.size}
          weight={isDark ? "light" : "duotone"}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            color: accent,
            opacity: isDark ? Math.min(p.opacity * 2.2, 0.35) : p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            filter: isDark ? `drop-shadow(0 0 6px ${accent})` : undefined,
          }}
        />
      ))}
    </div>
  );
}
