"use client";

import { useLayoutEffect, useRef } from "react";
import { selectedWork } from "@/data/selected-work";
import { WorkContent } from "@/components/sections/work/WorkContent";
import { WorkMockup } from "@/components/sections/work/WorkMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    ScrollTrigger.getById("apexmind-selected-work")?.kill();

    const ctx = gsap.context(() => {
      const contentItems = gsap.utils.toArray<HTMLElement>("[data-work-reveal]");
      const mockup = section.querySelector("[data-work-mockup]");
      const layers = gsap.utils.toArray<HTMLElement>("[data-work-layer]");
      const innerItems = gsap.utils.toArray<HTMLElement>("[data-work-inner]");
      const glow = section.querySelector("[data-work-glow]");
      const workLayer = (name: string) => section.querySelector(`[data-work-layer='${name}']`);

      gsap.set(contentItems, {
        autoAlpha: 0,
        y: 50,
      });

      gsap.set(mockup, {
        autoAlpha: 0,
        x: 70,
        rotateY: -3,
        scale: 0.96,
        transformPerspective: 1000,
        transformOrigin: "center center",
      });

      gsap.set(layers, {
        autoAlpha: 0,
      });

      gsap.set(innerItems, {
        autoAlpha: 0,
        y: 14,
      });

      gsap.set(workLayer("main"), {
        x: 44,
        y: 28,
        rotation: -4,
        scale: 0.94,
      });

      gsap.set(workLayer("insight"), {
        x: 28,
        y: 26,
        rotation: 0,
        scale: 0.98,
      });

      gsap.set(workLayer("activity"), {
        x: 24,
        y: 30,
        rotation: 0,
        scale: 0.98,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          id: "apexmind-selected-work",
          trigger: section,
          start: "top 72%",
          end: "bottom 35%",
          scrub: 0.8,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      timeline
        .to(contentItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
        }, 0)
        .to(mockup, {
          autoAlpha: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.65,
        }, 0.08)
        .to(workLayer("main"), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.7,
        }, 0.14)
        .to(innerItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          stagger: 0.045,
        }, 0.28)
        .to(workLayer("insight"), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 2,
          scale: 1,
          duration: 0.56,
        }, 0.38)
        .to(workLayer("activity"), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: -1,
          scale: 1,
          duration: 0.56,
        }, 0.46)
        .to("[data-work-layer='main']", {
          y: -10,
          rotation: 0,
          duration: 1,
          ease: "none",
        }, 0.62)
        .to("[data-work-layer='insight']", {
          x: 12,
          y: -14,
          rotation: 2,
          duration: 1,
          ease: "none",
        }, 0.62)
        .to("[data-work-layer='activity']", {
          x: -10,
          y: 14,
          rotation: -1,
          duration: 1,
          ease: "none",
        }, 0.62)
        .to(glow, {
          x: 24,
          y: -18,
          duration: 1,
          ease: "none",
        }, 0.62);

      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_47%,rgba(124,58,237,0.075),transparent_26%),radial-gradient(circle_at_19%_86%,rgba(139,92,246,0.035),transparent_24%)] dark:bg-[radial-gradient(circle_at_75%_47%,rgba(139,61,255,0.11),transparent_28%),radial-gradient(circle_at_19%_86%,rgba(116,83,255,0.045),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1420px] items-center gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20 xl:gap-24">
        <WorkContent work={selectedWork} />
        <WorkMockup />
      </div>
    </section>
  );
}
