"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const stages = [
  { number: "01", title: "Discover", description: "Understand the business problem, users, constraints, and existing systems." },
  { number: "02", title: "Define", description: "Shape the product direction, technical architecture, scope, and delivery plan." },
  { number: "03", title: "Build", description: "Design and engineer the product through clear, testable development cycles." },
  { number: "04", title: "Validate", description: "Test usability, reliability, performance, security, and real operational workflows." },
  { number: "05", title: "Scale", description: "Launch, monitor, improve, and expand the system as the business grows." },
];

export function CinematicProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([contentRef.current, visualRef.current], { opacity: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(contentRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9 })
        .fromTo(visualRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.45")
        .fromTo("[data-process-item]", { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.08 }, "-=0.2");
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  const activeStage = stages[activeIndex];

  return (
    <section id="process" ref={sectionRef} className="cinematic-section relative min-h-screen">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_52%,rgba(124,44,255,0.18),transparent_35%)]" />

      <div className="relative z-10 mx-auto hidden min-h-screen max-w-[1380px] grid-cols-[0.92fr_1.08fr] items-center gap-14 px-8 md:grid lg:px-10">
        <div ref={contentRef}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-theme-accent">Process</p>
            <h2 className="mt-7 max-w-[650px] text-5xl font-medium leading-[1.02] tracking-[-0.05em] lg:text-[72px]">
              A focused process from first idea to <span className="theme-gradient-text">long-term growth</span>
            </h2>
          </div>

          <div className="relative mt-12">
            <div className="absolute bottom-0 left-[23px] top-0 w-px bg-[color:var(--border-color)]">
              <span className="absolute left-0 top-0 block w-px bg-purple-300 shadow-[0_0_24px_rgba(169,112,255,0.9)]" />
            </div>

            <div className="space-y-6">
              {stages.map((stage, index) => {
                const isActive = activeIndex === index;
                return (
                  <article key={stage.number} data-process-item className="relative grid grid-cols-[48px_1fr] gap-5" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)}>
                    <div className="relative z-10 grid size-12 place-items-center rounded-full border border-theme cinematic-surface-strong text-xs font-semibold text-theme-secondary">
                      <span className={isActive ? "text-purple-700 dark:text-purple-200" : ""}>{stage.number}</span>
                    </div>
                    <div className={["transition duration-300", isActive ? "opacity-100" : "opacity-[0.42]"].join(" ")}>
                      <h3 className={["text-2xl font-medium transition", isActive ? "text-theme-primary" : "text-theme-secondary"].join(" ")}>{stage.title}</h3>
                      <p className="mt-2 max-w-[480px] text-sm leading-7 text-theme-secondary">{stage.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div ref={visualRef} className="relative min-h-[650px]">
          <div className="absolute left-1/2 top-1/2 size-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/15 shadow-[0_0_100px_rgba(124,44,255,0.22)]" />
          <div className="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[42px] border border-theme cinematic-surface backdrop-blur-xl" />
          <div className="absolute left-1/2 top-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 rounded-[34px] border border-purple-300/30 bg-purple-600/15 shadow-[0_0_70px_rgba(169,112,255,0.35)] backdrop-blur-xl" />
          <div className="absolute left-[28%] top-[26%] size-3 rounded-full bg-purple-300 shadow-[0_0_22px_rgba(169,112,255,1)]" />
          <div className="absolute right-[24%] top-[34%] size-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
          <div className="absolute bottom-[24%] left-[38%] size-2.5 rounded-full bg-purple-200 shadow-[0_0_18px_rgba(196,165,255,1)]" />
          <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 rounded-full border border-theme cinematic-surface-strong px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-theme-secondary backdrop-blur-xl">
            {activeStage.title}
          </div>
        </div>
      </div>

      <div className="relative z-10 px-5 py-24 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-accent">Process</p>
        <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.045em]">
          A focused process from first idea to <span className="text-theme-accent">long-term growth</span>
        </h2>
        <div className="mt-12 space-y-8">
          {stages.map((stage) => (
            <article key={stage.number} className="border-l border-theme pl-5">
              <p className="text-xs text-theme-accent">{stage.number}</p>
              <h3 className="mt-3 text-2xl font-medium">{stage.title}</h3>
              <p className="mt-3 text-sm leading-7 text-theme-secondary">{stage.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
