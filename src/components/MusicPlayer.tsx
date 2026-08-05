import { useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { useTheme } from "../lib/theme";

const SONG_SRC = "/song/Jaane-Kyun-Dostana-John-Abraham-Hindi-Song.mp3";

export function MusicPlayer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      // Play can reject (autoplay-policy edge cases); this is always a user
      // gesture, but fail quietly rather than throwing an unhandled rejection.
      audio.play().catch(() => {});
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={SONG_SRC}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isPlaying}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur transition-colors duration-300 dark:bg-white/10 dark:shadow-[0_0_16px_#00f0ff99]"
        style={{ color: isDark ? "#00F0FF" : "#D97706" }}
      >
        {isPlaying ? <Pause size={18} weight="bold" /> : <Play size={18} weight="bold" />}
      </button>
    </>
  );
}
