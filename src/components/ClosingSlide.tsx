import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AmbientBackground } from "./AmbientBackground";
import { celebrate } from "../lib/confetti";
import { site } from "../data/site";
import { useTheme } from "../lib/theme";
import { glowBox } from "../lib/glow";

interface ClosingSlideProps {
  sectionRef: (el: HTMLElement | null) => void;
  isActive: boolean;
  accents: string[];
  accent: string;
  onRestart: () => void;
}

export function ClosingSlide({ sectionRef, isActive, accents, accent, onRestart }: ClosingSlideProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      if (!isActive) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".closing-eyebrow", { opacity: 0, y: 16, duration: 0.5 })
          .from(".closing-title", { opacity: 0, y: 28, duration: 0.7 }, "-=0.25")
          .from(".closing-message", { opacity: 0, y: 16, duration: 0.5 }, "-=0.4")
          .from(".closing-dot", { opacity: 0, scale: 0, stagger: 0.05, duration: 0.4 }, "-=0.25")
          .from(".closing-restart", { opacity: 0, duration: 0.4 }, "-=0.2");
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [isActive] },
  );

  useEffect(() => {
    if (isActive) celebrate(theme);
  }, [isActive, theme]);

  return (
    <section
      ref={(el) => {
        rootRef.current = el;
        sectionRef(el);
      }}
      aria-labelledby="closing-title"
      className="bg-cream relative flex h-full w-full items-center justify-center overflow-hidden px-6"
    >
      <AmbientBackground accent={accent} />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <p className="closing-eyebrow text-espresso-soft font-sans text-sm font-medium tracking-[0.2em] uppercase">
          {site.closingEyebrow}
        </p>

        <h2 id="closing-title" className="closing-title text-espresso mt-4 font-sans text-4xl font-bold tracking-tight sm:text-5xl">
          {site.closingTitle}
        </h2>

        <p className="closing-message text-espresso-soft mt-6 max-w-xl font-sans text-lg sm:text-xl">
          {site.closingMessage}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
          {accents.map((dotAccent, i) => (
            <span
              key={i}
              className="closing-dot h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: dotAccent, boxShadow: glowBox(dotAccent, theme) }}
            />
          ))}
        </div>

        {site.signature && <p className="font-display text-espresso-soft mt-6 text-2xl">{site.signature}</p>}

        <button
          type="button"
          onClick={onRestart}
          className="closing-restart border-espresso/20 text-espresso-soft hover:border-amber hover:text-amber mt-10 cursor-pointer rounded-full border px-6 py-3 font-sans text-sm font-semibold transition-colors duration-300"
        >
          Back to the top
        </button>
      </div>
    </section>
  );
}
