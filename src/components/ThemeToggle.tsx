import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "../lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to punk neon dark mode"}
      aria-pressed={isDark}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur transition-colors duration-300 dark:bg-white/10 dark:shadow-[0_0_16px_#ff2e9f99]"
      style={{ color: isDark ? "#FF2E9F" : "#D97706" }}
    >
      {isDark ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
    </button>
  );
}
