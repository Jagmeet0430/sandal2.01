"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CinematicTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([glowRef.current, contentRef.current], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        glowRef.current,
        { opacity: 0.25, scale: 0.92 },
        { opacity: 0.85, scale: 1, duration: 1.2, ease: "power3.out" },
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.18 },
      );
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-y border-theme/60 px-5 py-16 md:min-h-[320px]">
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,44,255,0.16),transparent_60%)]" />
      <div ref={glowRef} className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/22 blur-[90px]" />
      <div ref={contentRef} className="relative z-10 max-w-[780px] text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-theme-muted">Quietly accelerating the future</p>
        <div className="mx-auto mt-5 h-px w-full max-w-[220px] bg-gradient-to-r from-transparent via-purple-400/70 to-transparent" />
        <p className="mt-6 text-sm leading-7 text-theme-secondary sm:text-base">
          Designed for clarity, momentum, and calm technical confidence.
        </p>
      </div>
    </section>
  );
}
