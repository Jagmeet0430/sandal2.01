"use client";

import { useLayoutEffect, useRef } from "react";
import { AutomationContent } from "@/components/sections/automation/AutomationContent";
import { AutomationVisual } from "@/components/sections/automation/AutomationVisual";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function AutomationSection() {
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

    ScrollTrigger.getById("apexmind-automation")?.kill();

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-automation-content='eyebrow']");
      const number = section.querySelector("[data-automation-content='number']");
      const heading = section.querySelector("[data-automation-content='heading']");
      const copy = section.querySelector("[data-automation-content='copy']");
      const bullets = gsap.utils.toArray<HTMLElement>("[data-automation-bullet]");
      const cta = section.querySelector("[data-automation-content='cta']");
      const progress = section.querySelector("[data-automation-content='progress']");
      const visual = section.querySelector("[data-automation-visual]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-automation-node]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-automation-label]");
      const connectors = gsap.utils.toArray<SVGPathElement>("[data-automation-connector]");
      const core = section.querySelector("[data-automation-core]");
      const status = section.querySelector("[data-automation-status]");

      gsap.set(eyebrow, { autoAlpha: 0, y: 25 });
      gsap.set(number, { autoAlpha: 0, y: 12 });
      gsap.set(heading, { autoAlpha: 0, y: 45 });
      gsap.set(copy, { autoAlpha: 0, y: 30 });
      gsap.set(bullets, { autoAlpha: 0, y: 18 });
      gsap.set([cta, progress], { autoAlpha: 0, y: 20 });
      gsap.set(visual, { autoAlpha: 0, x: 65, scale: 0.97 });
      gsap.set(nodes, { autoAlpha: 0, y: 22, scale: 0.94 });
      gsap.set(labels, { autoAlpha: 0, y: 10 });
      gsap.set([core, status], { autoAlpha: 0, scale: 0.95 });

      connectors.forEach((connector) => {
        const length = connector.getTotalLength();
        gsap.set(connector, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          id: "apexmind-automation",
          trigger: section,
          start: "top 75%",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      timeline
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.25 }, 0)
        .to(number, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.04)
        .to(heading, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.1)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.2)
        .to(bullets, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.045 }, 0.32)
        .to(cta, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.56)
        .to(progress, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.64)
        .to(visual, { autoAlpha: 1, x: 0, scale: 1, duration: 0.52 }, 0.12)
        .to(core, { autoAlpha: 1, scale: 1, duration: 0.32 }, 0.28)
        .to(nodes, { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, stagger: 0.09 }, 0.36)
        .to(connectors, {
          strokeDashoffset: 0,
          duration: 0.62,
          stagger: 0.09,
          ease: "power1.inOut",
        }, 0.48)
        .to(labels, { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.04 }, 0.68)
        .to(status, { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.78)
        .to(nodes, {
          boxShadow: (index) => (
            index === 3
              ? "0 0 50px rgba(139,61,255,0.34), 0 24px 70px rgba(0,0,0,0.34)"
              : "0 24px 70px rgba(0,0,0,0.34)"
          ),
          borderColor: (index) => (index === 3 ? "rgba(216,180,254,0.56)" : "rgba(255,255,255,0.14)"),
          duration: 0.32,
        }, 0.9);

      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="automation"
      className="section-padding relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_50%,rgba(124,58,237,0.10),transparent_33%),radial-gradient(circle_at_22%_82%,rgba(139,92,246,0.055),transparent_27%)] dark:bg-[radial-gradient(circle_at_73%_50%,rgba(139,61,255,0.18),transparent_35%),radial-gradient(circle_at_22%_82%,rgba(116,83,255,0.10),transparent_30%)]" />
      <div className="hero-stage-grid absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200/18 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1300px] items-center gap-12 lg:grid-cols-[minmax(0,0.43fr)_minmax(620px,0.57fr)] lg:gap-12 xl:gap-16">
        <AutomationContent />
        <AutomationVisual />
      </div>
    </section>
  );
}
