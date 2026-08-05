import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Friend } from "../data/friends";
import { PROFESSIONS } from "../data/professions";
import { Avatar } from "./Avatar";
import { SkillChip } from "./SkillChip";
import { ScrollHint } from "./ScrollHint";
import { ProfessionBadge } from "./ProfessionBadge";
import { ProfessionPattern } from "./ProfessionPattern";
import { useTheme } from "../lib/theme";
import { glowText } from "../lib/glow";

interface ChapterSlideProps {
  friend: Friend;
  index: number;
  total: number;
  accent: string;
  isActive: boolean;
  sectionRef: (el: HTMLElement | null) => void;
  onNext: () => void;
}

export function ChapterSlide({
  friend,
  index,
  total,
  accent,
  isActive,
  sectionRef,
  onNext,
}: ChapterSlideProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useGSAP(
    () => {
      if (!isActive) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .from(".chapter-eyebrow", { opacity: 0, y: 16, duration: 0.45 })
          .from(".chapter-avatar", { opacity: 0, scale: 0.92, y: 24, duration: 0.55 }, "-=0.25")
          .from(".chapter-name", { opacity: 0, y: 20, duration: 0.5 }, "-=0.35")
          .from(".chapter-title", { opacity: 0, y: 16, duration: 0.45 }, "-=0.3")
          .from(".chapter-badge", { opacity: 0, y: 12, duration: 0.4 }, "-=0.2")
          .from(".chapter-skill", { opacity: 0, y: 12, stagger: 0.06, duration: 0.4 }, "-=0.25")
          .from(".chapter-story", { opacity: 0, y: 16, duration: 0.5 }, "-=0.2")
          .from(".chapter-footer", { opacity: 0, y: 12, duration: 0.4 }, "-=0.3");
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [isActive] },
  );

  const years = friend.sinceYear ? new Date().getFullYear() - friend.sinceYear : null;
  const headingId = `friend-${index}-name`;
  const profession = friend.profession ? PROFESSIONS[friend.profession] : null;

  return (
    <section
      ref={(el) => {
        rootRef.current = el;
        sectionRef(el);
      }}
      aria-labelledby={headingId}
      className="bg-cream relative flex h-full w-full flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? `radial-gradient(circle at 20% 20%, ${accent}33, transparent 60%), radial-gradient(circle at 80% 80%, ${accent}22, transparent 55%)`
            : `radial-gradient(circle at 20% 20%, ${accent}14, transparent 55%), radial-gradient(circle at 80% 80%, ${accent}0d, transparent 50%)`,
        }}
      />
      {profession && <ProfessionPattern icon={profession.icon} accent={accent} />}

      <div className="relative z-10 flex-1 overflow-y-auto px-6">
        <div className="mx-auto grid min-h-full w-full max-w-5xl items-center gap-8 py-10 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16 md:py-16">
          <div className="chapter-avatar mx-auto w-full max-w-[220px] sm:max-w-xs md:max-w-none">
            <Avatar name={friend.name} image={friend.image} accent={accent} index={index} />
          </div>

          <div className="text-center md:text-left">
            <p
              className="chapter-eyebrow font-sans text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: accent }}
            >
              Friend {index + 1} of {total}
            </p>

            <h2
              id={headingId}
              className="chapter-name text-espresso mt-3 font-sans text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {friend.name}
            </h2>

            <p
              className="chapter-title font-display mt-1 text-3xl sm:text-4xl"
              style={{ color: accent, textShadow: glowText(accent, theme) }}
            >
              {friend.title}
            </p>

            {profession && (
              <div className="chapter-badge mt-4 flex justify-center md:justify-start">
                <ProfessionBadge label={profession.label} icon={profession.icon} accent={accent} />
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              {friend.skills.map((skill) => (
                <span className="chapter-skill" key={skill}>
                  <SkillChip label={skill} accent={accent} />
                </span>
              ))}
            </div>

            <div className="chapter-story text-espresso-soft mt-6 max-w-xl font-sans text-lg leading-relaxed whitespace-pre-line">
              {friend.story}
            </div>

            {(friend.funFact || years !== null) && (
              <div className="chapter-footer border-line mt-6 flex flex-col items-center gap-1 border-t pt-4 font-sans text-sm text-espresso-soft/90 md:items-start">
                {friend.funFact && (
                  <p>
                    <span className="font-semibold" style={{ color: accent }}>
                      Fun fact —{" "}
                    </span>
                    {friend.funFact}
                  </p>
                )}
                {years !== null && (
                  <p>
                    <span className="font-semibold" style={{ color: accent }}>
                      {years} {years === 1 ? "year" : "years"}
                    </span>{" "}
                    of friendship
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex shrink-0 justify-center pb-6">
        <ScrollHint onClick={onNext} accent={accent} inline />
      </div>
    </section>
  );
}
