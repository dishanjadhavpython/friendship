import { CaretDown } from "@phosphor-icons/react";
import { useTheme } from "../lib/theme";
import { glowBox } from "../lib/glow";

interface ScrollHintProps {
  onClick: () => void;
  accent: string;
  label?: string;
  /** Renders in normal document flow instead of floating over content —
   *  use inside a layout that reserves its own space, so it can never
   *  overlap long/variable-length content. */
  inline?: boolean;
}

export function ScrollHint({ onClick, accent, label = "Next", inline = false }: ScrollHintProps) {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`animate-float z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/85 backdrop-blur transition-transform duration-300 hover:scale-110 dark:bg-white/10 ${
        inline ? "" : "absolute bottom-8 left-1/2 -translate-x-1/2"
      }`}
      style={{ color: accent, boxShadow: glowBox(accent, theme) ?? `0 10px 28px -10px ${accent}77` }}
    >
      <CaretDown size={20} weight="bold" />
    </button>
  );
}
