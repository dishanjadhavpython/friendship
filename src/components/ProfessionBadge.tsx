import type { Icon } from "@phosphor-icons/react";
import { useTheme } from "../lib/theme";
import { glowBox, glowText } from "../lib/glow";

interface ProfessionBadgeProps {
  label: string;
  icon: Icon;
  accent: string;
}

export function ProfessionBadge({ label, icon: IconComponent, accent }: ProfessionBadgeProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Light mode: solid fill reads fine with white text (accents are deep,
  // saturated 600/700-tier colors). Dark mode's neon accents are much
  // brighter — white-on-neon-yellow/green would fail contrast — so dark mode
  // switches to a glowing outline instead, matching SkillChip's treatment.
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-sm font-semibold"
      style={
        isDark
          ? {
              color: accent,
              backgroundColor: `${accent}1a`,
              border: `1px solid ${accent}88`,
              textShadow: glowText(accent, theme),
              boxShadow: glowBox(accent, theme),
            }
          : { backgroundColor: accent, color: "#FFFFFF" }
      }
    >
      <IconComponent size={16} weight="bold" aria-hidden="true" />
      {label}
    </span>
  );
}
