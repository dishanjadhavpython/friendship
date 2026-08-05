import { useTheme } from "../lib/theme";
import { glowBox } from "../lib/glow";

interface SkillChipProps {
  label: string;
  accent: string;
}

export function SkillChip({ label, accent }: SkillChipProps) {
  const { theme } = useTheme();

  return (
    <span
      className="inline-flex items-center rounded-full border px-4 py-1.5 font-sans text-sm font-medium"
      style={{
        borderColor: `${accent}55`,
        color: accent,
        backgroundColor: `${accent}14`,
        boxShadow: glowBox(accent, theme),
      }}
    >
      {label}
    </span>
  );
}
