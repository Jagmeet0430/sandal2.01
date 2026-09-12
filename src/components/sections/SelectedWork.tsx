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
        x: 46,
        rotateY: -2,
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
        x: 28,
        y: 20,
        rotation: -2,
        scale: 0.94,
      });

      gsap.set(workLayer("insight"), {
        x: 18,
        y: 18,
        rotation: 0,
        scale: 0.98,
      });

      gsap.set(workLayer("activity"), {
        x: 14,
        y: 22,
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
          rotation: 0,
          scale: 1,
          duration: 0.56,
        }, 0.38)
        .to(workLayer("activity"), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.56,
        }, 0.46)
        .to("[data-work-layer='main']", {
          y: -8,
          rotation: 0,
          duration: 1,
          ease: "none",
        }, 0.62)
        .to("[data-work-layer='insight']", {
          x: 8,
          y: -10,
          rotation: 0,
          duration: 1,
          ease: "none",
        }, 0.62)
        .to("[data-work-layer='activity']", {
          x: -8,
          y: 10,
          rotation: 0,
          duration: 1,
          ease: "none",
        }, 0.62)
        .to(glow, {
          x: 24,
          y: -18,
          duration: 1,
          ease: "none",
        }, 0.62);

      let isMounted = true;

      document.fonts?.ready.then(() => {
        if (isMounted) {
          ScrollTrigger.refresh();
        }
      });

      return () => {
        isMounted = false;
      };
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(124,58,237,0.08),transparent_30%),radial-gradient(circle_at_20%_82%,rgba(37,99,235,0.045),transparent_24%)] dark:bg-[radial-gradient(circle_at_76%_42%,rgba(139,61,255,0.12),transparent_32%),radial-gradient(circle_at_20%_82%,rgba(37,99,235,0.07),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(460px,0.9fr)] lg:gap-12">
        <WorkContent work={selectedWork} />
        <WorkMockup />
      </div>
    </section>
  );
}
