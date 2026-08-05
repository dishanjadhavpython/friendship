import { useState } from "react";
import { useTheme } from "../lib/theme";

interface AvatarProps {
  name: string;
  image?: string;
  accent: string;
  index: number;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// Two alternating "organic blob" shapes so photos don't read as generic
// rounded-rectangle cards.
const BLOBS = [
  "63% 37% 54% 46% / 43% 47% 53% 57%",
  "41% 59% 63% 37% / 47% 41% 59% 53%",
];

export function Avatar({ name, image, accent, index }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const { theme } = useTheme();
  const showImage = Boolean(image) && !failed;
  const borderRadius = BLOBS[index % BLOBS.length];
  const isDark = theme === "dark";

  return (
    <div
      className="relative aspect-square w-full max-w-sm shadow-2xl"
      style={{
        borderRadius,
        boxShadow: isDark ? `0 0 40px ${accent}99, 0 0 80px ${accent}55` : `0 30px 60px -20px ${accent}55`,
      }}
    >
      <div
        className="absolute inset-0 -z-10 scale-105 opacity-60 blur-xl dark:scale-110 dark:opacity-90 dark:blur-2xl"
        style={{ backgroundColor: accent, borderRadius }}
        aria-hidden="true"
      />
      <div
        className="ring-4 ring-white/80 dark:ring-white/15 h-full w-full overflow-hidden"
        style={{ borderRadius, backgroundColor: `${accent}22` }}
      >
        {showImage ? (
          <img
            src={`/friend-images/${image}`}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-display text-8xl"
            style={{ color: accent, textShadow: isDark ? `0 0 20px ${accent}` : undefined }}
          >
            {initials(name) || "?"}
          </div>
        )}
      </div>
    </div>
  );
}
