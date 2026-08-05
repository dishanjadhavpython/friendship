import { Hero } from "./components/Hero";
import { ChapterSlide } from "./components/ChapterSlide";
import { ClosingSlide } from "./components/ClosingSlide";
import { ProgressRail, ProgressBar } from "./components/Progress";
import { ThemeToggle } from "./components/ThemeToggle";
import { MusicPlayer } from "./components/MusicPlayer";
import { useStoryNavigation } from "./hooks/useStoryNavigation";
import { friends } from "./data/friends";
import { accentFor, brandAccent } from "./data/accents";
import { useTheme } from "./lib/theme";

function App() {
  const { theme } = useTheme();
  const sectionCount = friends.length + 2;
  const { containerRef, setSectionRef, activeIndex, goTo, next } = useStoryNavigation(sectionCount);

  const friendAccents = friends.map((friend, i) => accentFor(friend.accent, i, theme));
  const heroAccent = brandAccent(theme);
  const closingAccent = accentFor("sunset", 0, theme);
  const sectionAccents = [heroAccent, ...friendAccents, closingAccent];
  const sectionLabels = ["Welcome", ...friends.map((friend) => friend.name), "Thank you"];

  return (
    <>
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2 sm:top-6 sm:left-6">
        <ThemeToggle />
        <MusicPlayer />
      </div>

      <ProgressBar labels={sectionLabels} accents={sectionAccents} activeIndex={activeIndex} onSelect={goTo} />
      <ProgressRail labels={sectionLabels} accents={sectionAccents} activeIndex={activeIndex} onSelect={goTo} />

      <main ref={containerRef} className="story">
        <Hero sectionRef={setSectionRef(0)} onBegin={next} friendCount={friends.length} accent={heroAccent} />

        {friends.map((friend, i) => (
          <ChapterSlide
            key={`${friend.name}-${i}`}
            friend={friend}
            index={i}
            total={friends.length}
            accent={friendAccents[i]}
            isActive={activeIndex === i + 1}
            sectionRef={setSectionRef(i + 1)}
            onNext={next}
          />
        ))}

        <ClosingSlide
          sectionRef={setSectionRef(sectionCount - 1)}
          isActive={activeIndex === sectionCount - 1}
          accents={friendAccents}
          accent={closingAccent}
          onRestart={() => goTo(0)}
        />
      </main>
    </>
  );
}

export default App;
