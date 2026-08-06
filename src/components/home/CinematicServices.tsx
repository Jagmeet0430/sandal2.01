"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const services = [
  { number: "01", label: "AI Products", title: "Intelligent applications built around real workflows", className: "lg:-rotate-[8deg] lg:translate-y-16" },
  { number: "02", label: "Automation", title: "Connected systems that remove repetitive work", className: "lg:relative lg:z-20 lg:-translate-y-3" },
  { number: "03", label: "Digital Platforms", title: "Scalable cloud products designed for long-term growth", className: "lg:rotate-[8deg] lg:translate-y-16" },
];

export function CinematicServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, cardsRef.current], { opacity: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(headingRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.75 })
        .fromTo("[data-service-card]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 }, "-=0.3");
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="services-scene" ref={sectionRef} className="cinematic-section cinematic-section-secondary relative min-h-screen py-24 md:h-screen md:min-h-[760px] md:py-0">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(124,44,255,0.20),transparent_35%)]" />
      <div className="pointer-events-none absolute -right-28 -top-36 h-[520px] w-[520px] rounded-full border border-theme opacity-40" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col items-center justify-center px-5">
        <div ref={headingRef} className="mx-auto max-w-[800px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-accent">What we create</p>
          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-6xl">
            Intelligent technology for <span className="text-theme-accent">complex business challenges</span>
          </h2>
        </div>

        <div ref={cardsRef} className="mt-16 grid w-full max-w-[1120px] gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.number} data-service-card className={["group relative min-h-[320px] overflow-hidden rounded-[26px] md:min-h-[360px]", "border border-theme cinematic-surface-strong backdrop-blur-xl", "shadow-[0_40px_100px_var(--shadow-color)]", service.className].join(" ")}>
              <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-7">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-700/35 opacity-75" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full border border-theme px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-theme-secondary">{service.label}</span>
                  <span className="text-xs font-medium text-theme-muted">{service.number}</span>
                </div>
                <div className="relative z-10">
                  <h3 className="max-w-[300px] text-2xl font-medium leading-tight tracking-[-0.025em]">{service.title}</h3>
                  <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-purple-700 dark:text-purple-200">
                    Explore
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
                <div className="absolute -bottom-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-purple-600/25 blur-[50px]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
