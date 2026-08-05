import type { CSSVarStyle } from "../lib/css-vars";
import { useTheme } from "../lib/theme";
import { ACCENTS_DARK } from "../data/accents";

interface AmbientBackgroundProps {
  accent?: string;
}

export function AmbientBackground({ accent = "#D97706" }: AmbientBackgroundProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const particles = Array.from({ length: 10 });
  const secondary = isDark ? ACCENTS_DARK.rose : "#E11D48";
  const tertiary = isDark ? ACCENTS_DARK.gold : "#CA8A04";
  const blobOpacity = isDark ? { a: 0.3, b: 0.22, c: 0.24 } : { a: 0.18, b: 0.1, c: 0.12 };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl dark:blur-[100px]"
        style={{ backgroundColor: accent, opacity: blobOpacity.a }}
      />
      <div
        className="absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-3xl dark:blur-[100px]"
        style={{ backgroundColor: secondary, opacity: blobOpacity.b }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full blur-3xl dark:blur-[100px]"
        style={{ backgroundColor: tertiary, opacity: blobOpacity.c }}
      />
      {particles.map((_, i) => {
        const style: CSSVarStyle = {
          left: `${(i + 1) * 8.5}%`,
          backgroundColor: i % 2 === 0 ? accent : secondary,
          opacity: isDark ? 0.8 : 0.45,
          animationDelay: `${i * 1.4}s`,
          "--drift-x": `${(i % 3 === 0 ? -1 : 1) * (20 + i * 6)}px`,
          boxShadow: isDark ? `0 0 8px ${i % 2 === 0 ? accent : secondary}` : undefined,
        };
        return (
          <span
            key={i}
            className="animate-drift absolute bottom-0 block h-1.5 w-1.5 rounded-full"
            style={style}
          />
        );
      })}
    </div>
  );
}
