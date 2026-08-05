import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AmbientBackground } from "./AmbientBackground";
import { ScrollHint } from "./ScrollHint";
import { celebrate } from "../lib/confetti";
import { site } from "../data/site";
import { useTheme } from "../lib/theme";
import { glowText, glowBox } from "../lib/glow";

interface HeroProps {
  sectionRef: (el: HTMLElement | null) => void;
  onBegin: () => void;
  friendCount: number;
  accent: string;
}

export function Hero({ sectionRef, onBegin, friendCount, accent }: HeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
          .from(".hero-title-word", { opacity: 0, y: 44, stagger: 0.14, duration: 0.9 }, "-=0.3")
          .from(".hero-subtitle", { opacity: 0, y: 16, duration: 0.6 }, "-=0.5")
          .from(".hero-cta", { opacity: 0, y: 16, scale: 0.94, duration: 0.5 }, "-=0.3");
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  function handleBegin() {
    celebrate(theme);
    onBegin();
  }

  return (
    <section
      ref={(el) => {
        rootRef.current = el;
        sectionRef(el);
      }}
      aria-labelledby="hero-title"
      className="bg-cream relative flex h-full w-full items-center justify-center overflow-hidden px-6"
    >
      <AmbientBackground accent={accent} />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <p className="hero-eyebrow text-espresso-soft font-sans text-sm font-medium tracking-[0.2em] uppercase">
          {site.heroEyebrow}
        </p>

        <h1 id="hero-title" className="mt-4 leading-none">
          <span
            className="hero-title-word font-display text-amber block text-6xl sm:text-7xl md:text-8xl"
            style={{ textShadow: glowText(accent, theme) }}
          >
            {site.heroTitleScript}
          </span>
          <span className="hero-title-word text-espresso mt-2 block font-sans text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {site.heroTitleBold}
          </span>
        </h1>

        <p className="hero-subtitle text-espresso-soft mt-6 max-w-xl font-sans text-lg sm:text-xl">
          {site.heroSubtitle}
        </p>

        <button
          type="button"
          onClick={handleBegin}
          className="hero-cta bg-amber hover:bg-amber-dark mt-10 cursor-pointer rounded-full px-8 py-4 font-sans text-base font-semibold text-white shadow-lg shadow-amber-600/30 transition-[background-color,box-shadow] duration-300 hover:shadow-xl"
          style={{ boxShadow: glowBox(accent, theme) }}
        >
          {site.ctaLabel} ({friendCount})
        </button>
      </div>

      <ScrollHint onClick={onBegin} accent={accent} label={site.scrollHint} />
    </section>
  );
}
