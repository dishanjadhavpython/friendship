import { useCallback, useEffect, useRef, useState } from "react";

// Drives the full-screen "story": native CSS scroll-snap handles wheel,
// trackpad and touch swipe for free. This hook adds keyboard support, an
// `activeIndex` for progress dots / GSAP triggers, and a `goTo` for the
// explicit prev/next controls and dot clicks.
export function useStoryNavigation(sectionCount: number) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    [],
  );

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(sectionCount - 1, index));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sectionRefs.current[clamped]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [sectionCount]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce<IntersectionObserverEntry | null>(
          (best, entry) =>
            !best || entry.intersectionRatio > best.intersectionRatio ? entry : best,
          null,
        );
        if (mostVisible && mostVisible.intersectionRatio > 0.5) {
          const index = sectionRefs.current.findIndex((el) => el === mostVisible.target);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: container, threshold: [0.5, 0.75, 1] },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sectionCount]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }
      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          next();
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          prev();
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(sectionCount - 1);
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, goTo, sectionCount]);

  return { containerRef, setSectionRef, activeIndex, goTo, next, prev };
}
