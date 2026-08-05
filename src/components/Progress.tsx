import { useTheme } from "../lib/theme";
import { glowBox } from "../lib/glow";

interface ProgressProps {
  labels: string[];
  accents: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

/** Desktop: a vertical dot rail pinned to the right edge. */
export function ProgressRail({ labels, accents, activeIndex, onSelect }: ProgressProps) {
  const { theme } = useTheme();

  return (
    <nav
      aria-label="Story chapters"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    >
      {labels.map((label, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={label + index}
            type="button"
            aria-label={`Go to ${label}`}
            aria-current={active || undefined}
            onClick={() => onSelect(index)}
            className="flex h-6 w-6 cursor-pointer items-center justify-center"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                backgroundColor: active ? accents[index] : "transparent",
                border: `2px solid ${accents[index]}`,
                width: active ? 12 : 8,
                height: active ? 12 : 8,
                opacity: active ? 1 : 0.45,
                boxShadow: active ? glowBox(accents[index], theme) : undefined,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

/** Mobile: an Instagram-Stories-style segmented bar across the top. */
export function ProgressBar({ labels, accents, activeIndex, onSelect }: ProgressProps) {
  return (
    <nav aria-label="Story chapters" className="fixed inset-x-0 top-0 z-40 flex gap-1.5 p-3 md:hidden">
      {labels.map((label, index) => (
        <button
          key={label + index}
          type="button"
          aria-label={`Go to ${label}`}
          aria-current={index === activeIndex || undefined}
          onClick={() => onSelect(index)}
          className="bg-espresso/10 h-1 flex-1 cursor-pointer overflow-hidden rounded-full"
        >
          <span
            className="block h-full rounded-full transition-all duration-500"
            style={{
              width: index <= activeIndex ? "100%" : "0%",
              backgroundColor: accents[index],
            }}
          />
        </button>
      ))}
    </nav>
  );
}
