"use client";

import { useLayoutEffect, useRef } from "react";
import { ImpactContent } from "@/components/sections/impact/ImpactContent";
import { ImpactOrbit } from "@/components/sections/impact/ImpactOrbit";
import { ImpactSphereFallback } from "@/components/sections/impact/ImpactSphereFallback";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setWebGLActiveScene, setWebGLProgress } from "@/store/webgl-state";

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const impactProgress = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) {
      return undefined;
    }

    ScrollTrigger.getById("apexmind-impact-master")?.kill();

    const ctx = gsap.context(() => {
      const sphere = section.querySelector("[data-impact-sphere]");
      const wireframe = section.querySelector("[data-impact-wireframe]");
      const orbitLines = gsap.utils.toArray<SVGElement>("[data-impact-orbit-line]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-impact-node]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-impact-label]");
      const eyebrow = section.querySelector("[data-impact-content='eyebrow']");
      const copy = section.querySelector("[data-impact-content='copy']");
      const benefits = gsap.utils.toArray<HTMLElement>("[data-impact-benefit]");
      const ctas = gsap.utils.toArray<HTMLElement>("[data-impact-cta]");
      const primary = section.querySelector("[data-impact-statement='primary']");

      gsap.set(sphere, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -50,
        scale: 0.9,
        y: 18,
      });
      gsap.set(wireframe, { autoAlpha: 0.32 });
      gsap.set(orbitLines, {
        autoAlpha: 0.28,
        transformOrigin: "center center",
        scale: 0.96,
        rotate: 0,
      });
      gsap.set(nodes, {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -50,
        scale: 0.88,
      });
      gsap.set(labels, { autoAlpha: 0, y: 12 });
      gsap.set(eyebrow, { autoAlpha: 1, y: 0 });
      gsap.set(copy, { autoAlpha: 0, y: 18 });
      gsap.set([benefits, ctas], { autoAlpha: 0, y: 18 });
      gsap.set(primary, { autoAlpha: 1, y: 0, scale: 1 });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          id: "apexmind-impact-master",
          trigger: section,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          onEnter: () => setWebGLActiveScene("impact"),
          onEnterBack: () => setWebGLActiveScene("impact"),
          onLeave: () => setWebGLActiveScene("none"),
          onLeaveBack: () => {
            setWebGLProgress("impactProgress", 0);
            setWebGLActiveScene("none");
          },
          onUpdate: (self) => {
            impactProgress.current = self.progress;
            section.style.setProperty("--impact-progress", self.progress.toFixed(4));
            setWebGLProgress("impactProgress", self.progress);
          },
        },
      });

      timeline
        .to(sphere, { autoAlpha: 1, scale: 1, y: 0, duration: 0.26 }, 0)
        .to(orbitLines, { autoAlpha: 0.72, scale: 1, duration: 0.22, stagger: 0.035 }, 0.04)
        .to(wireframe, { autoAlpha: 0.58, duration: 0.24 }, 0.1)
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.15)
        .to(primary, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 }, 0.2)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.24 }, 0.3)
        .to(sphere, { scale: 1.025, y: -10, duration: 0.35 }, 0.35)
        .to(wireframe, { autoAlpha: 0.66, duration: 0.24 }, 0.38)
        .to(orbitLines, {
          rotate: (index) => [5, -7, 9, -4][index] ?? 0,
          duration: 0.38,
          ease: "none",
        }, 0.38)
        .to(nodes, { autoAlpha: 0.78, scale: 1, duration: 0.24, stagger: 0.045 }, 0.42)
        .to(benefits, { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.045 }, 0.45)
        .to(labels, { autoAlpha: 0.72, y: 0, duration: 0.22, stagger: 0.04 }, 0.5)
        .to(ctas, { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.04 }, 0.56)
        .to(sphere, { scale: 1.035, y: -12, duration: 0.3, ease: "none" }, 0.78)
        .to([primary, copy, benefits, ctas], { autoAlpha: 1, duration: 0.15 }, 0.9);

      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section id="impact" className="section-padding relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]">
        <div className="relative min-h-[760px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_49%,rgba(124,58,237,0.09),transparent_39%)] dark:bg-[radial-gradient(circle_at_50%_49%,rgba(139,61,255,0.18),transparent_41%)]" />
          <ImpactSphereFallback />
          <ImpactOrbit />
          <ImpactContent />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="impact" className="relative bg-[var(--background)] text-[var(--foreground)]">
      <div ref={stageRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.06),transparent_32%),radial-gradient(circle_at_24%_82%,rgba(139,92,246,0.025),transparent_24%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(139,61,255,0.16),transparent_36%),radial-gradient(circle_at_24%_82%,rgba(116,83,255,0.06),transparent_27%)]" />
        <div className="hero-stage-grid absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200/18 to-transparent" />

        <ImpactSphereFallback />
        <ImpactOrbit />
        <div className="absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/82 to-transparent" />
        <ImpactContent />
      </div>
    </section>
  );
}
