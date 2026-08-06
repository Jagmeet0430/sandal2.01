"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(contentRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1 });
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 text-[#12101a] dark:text-white">
      <div ref={contentRef} className="mx-auto w-full max-w-[1380px] text-center">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
            AI-powered digital intelligence
          </p>

          <h1 className="mt-7 text-[48px] font-medium leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[96px]">
            Intelligence built for{" "}
            <span className="bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 bg-clip-text text-transparent dark:from-purple-200 dark:via-purple-500 dark:to-indigo-400">
              what comes next
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-[680px] text-base leading-8 text-[#625d6f] dark:text-white/50 sm:text-lg">
            ApexMind creates intelligent applications, automation systems, and digital platforms for businesses ready to
            move beyond ordinary software.
          </p>
        </div>
      </div>
    </section>
  );
}
