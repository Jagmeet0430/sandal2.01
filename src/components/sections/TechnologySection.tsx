"use client";

import { useLayoutEffect, useRef } from "react";
import { TechnologyCategories } from "@/components/sections/technology/TechnologyCategories";
import { TechnologyContent } from "@/components/sections/technology/TechnologyContent";
import { TechnologySystem } from "@/components/sections/technology/TechnologySystem";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setWebGLActiveScene, setWebGLProgress } from "@/store/webgl-state";

export function TechnologySection() {
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

    ScrollTrigger.getById("apexmind-technology")?.kill();

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-technology-content='eyebrow']");
      const heading = section.querySelector("[data-technology-content='heading']");
      const copy = section.querySelector("[data-technology-content='copy']");
      const points = gsap.utils.toArray<HTMLElement>("[data-technology-point]");
      const cta = section.querySelector("[data-technology-content='cta']");
      const detail = section.querySelector("[data-technology-content='detail']");
      const system = section.querySelector("[data-technology-system]");
      const core = section.querySelector("[data-technology-core]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-technology-label]");
      const statuses = gsap.utils.toArray<HTMLElement>("[data-technology-status]");
      const categories = gsap.utils.toArray<HTMLElement>("[data-technology-category]");
      const primaryConnectors = gsap.utils.toArray<SVGPathElement>("[data-technology-connector='primary']");
      const secondaryConnectors = gsap.utils.toArray<SVGPathElement>("[data-technology-connector='secondary']");

      gsap.set(eyebrow, { autoAlpha: 0, y: 20 });
      gsap.set(heading, { autoAlpha: 0, y: 45 });
      gsap.set(copy, { autoAlpha: 0, y: 30 });
      gsap.set(points, { autoAlpha: 0, y: 18 });
      gsap.set([cta, detail], { autoAlpha: 0, y: 20 });
      gsap.set(system, { autoAlpha: 0, x: 58, scale: 0.97 });
      gsap.set(core, { autoAlpha: 0, scale: 0.92 });
      gsap.set(labels, { autoAlpha: 0, y: 12, scale: 0.96 });
      gsap.set(statuses, { autoAlpha: 0, scale: 0.9 });
      gsap.set(categories, { autoAlpha: 0, y: 26 });

      [...primaryConnectors, ...secondaryConnectors].forEach((connector) => {
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
          id: "apexmind-technology",
          trigger: section,
          start: "top 72%",
          end: () => (window.innerWidth < 768 ? "+=45%" : "+=70%"),
          scrub: 0.8,
          invalidateOnRefresh: true,
          markers: false,
          onEnter: () => setWebGLActiveScene("technology"),
          onEnterBack: () => setWebGLActiveScene("technology"),
          onLeave: () => setWebGLActiveScene("none"),
          onLeaveBack: () => {
            setWebGLProgress("technologyProgress", 0);
            setWebGLActiveScene("none");
          },
          onUpdate: (self) => {
            setWebGLProgress("technologyProgress", self.progress);
          },
        },
      });

      timeline
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.24 }, 0)
        .to(heading, { autoAlpha: 1, y: 0, duration: 0.44 }, 0.08)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.32 }, 0.2)
        .to(points, { autoAlpha: 1, y: 0, duration: 0.26, stagger: 0.045 }, 0.34)
        .to(cta, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.56)
        .to(detail, { autoAlpha: 1, y: 0, duration: 0.24 }, 0.66)
        .to(system, { autoAlpha: 1, x: 0, scale: 1, duration: 0.5 }, 0.1)
        .to(core, {
          autoAlpha: 1,
          scale: 1,
          boxShadow: "0 0 86px rgba(139,61,255,0.36)",
          duration: 0.34,
        }, 0.22)
        .to(primaryConnectors, {
          strokeDashoffset: 0,
          duration: 0.55,
          stagger: 0.055,
          ease: "power1.inOut",
        }, 0.34)
        .to(labels.slice(0, 5), {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.26,
          stagger: 0.04,
        }, 0.5)
        .to(secondaryConnectors, {
          strokeDashoffset: 0,
          duration: 0.5,
          stagger: 0.045,
          ease: "power1.inOut",
        }, 0.62)
        .to(labels.slice(5), {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.26,
          stagger: 0.04,
        }, 0.76)
        .to(statuses, { autoAlpha: 1, scale: 1, duration: 0.22, stagger: 0.035 }, 0.84)
        .to(categories, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.07 }, 0.94);

      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="section-padding relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_43%,rgba(124,58,237,0.072),transparent_24%),radial-gradient(circle_at_49%_96%,rgba(139,92,246,0.04),transparent_24%)] dark:bg-[radial-gradient(circle_at_69%_43%,rgba(139,61,255,0.15),transparent_30%),radial-gradient(circle_at_49%_96%,rgba(139,61,255,0.10),transparent_26%)]" />
      <div className="hero-stage-grid absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200/18 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1420px] items-center gap-10 px-0 pt-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12 xl:gap-14">
        <TechnologyContent />
        <TechnologySystem />
      </div>

      <div className="relative z-30 mx-auto max-w-[1420px] pb-10">
        <TechnologyCategories />
      </div>
    </section>
  );
}
