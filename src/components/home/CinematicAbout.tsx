"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WireframeGlobe = dynamic(
  () => import("@/components/three/WireframeGlobe").then((module) => module.WireframeGlobe),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[420px] rounded-full bg-purple-900/10 blur-2xl" />,
  },
);

const capabilities = [
  {
    number: "01",
    title: "Strategy",
    description: "We identify the right product direction before writing code.",
  },
  {
    number: "02",
    title: "Engineering",
    description: "We build secure, scalable systems designed for real operations.",
  },
  {
    number: "03",
    title: "Intelligence",
    description: "We add AI where it creates measurable business value.",
  },
];

export function CinematicAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=170%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline
          .from("[data-about-label]", {
            opacity: 0,
            y: 40,
            duration: 0.15,
          })
          .from(
            "[data-about-line]",
            {
              opacity: 0,
              y: 90,
              rotateX: -25,
              stagger: 0.08,
              duration: 0.35,
              transformOrigin: "50% 100%",
            },
            0.05,
          )
          .from(
            globeRef.current,
            {
              opacity: 0,
              x: 180,
              scale: 0.75,
              duration: 0.45,
            },
            0.08,
          )
          .from(
            "[data-capability]",
            {
              opacity: 0,
              y: 55,
              stagger: 0.08,
              duration: 0.3,
            },
            0.4,
          )
          .to(
            globeRef.current,
            {
              x: -40,
              scale: 1.12,
              rotate: 7,
              duration: 0.45,
            },
            0.5,
          )
          .to(
            glowRef.current,
            {
              scale: 1.6,
              opacity: 0.8,
              duration: 0.4,
            },
            0.5,
          )
          .to(
            textRef.current,
            {
              opacity: 0,
              y: -100,
              duration: 0.22,
            },
            0.82,
          )
          .to(
            globeRef.current,
            {
              opacity: 0,
              scale: 1.35,
              duration: 0.22,
            },
            0.82,
          );
      });

      media.add("(max-width: 767px)", () => {
        gsap.from("[data-about-line]", {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.75,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        });

        gsap.from("[data-capability]", {
          opacity: 0,
          y: 35,
          stagger: 0.12,
          duration: 0.6,
          scrollTrigger: {
            trigger: "[data-capabilities]",
            start: "top 80%",
          },
        });
      });

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#050508] text-white">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,rgba(124,44,255,0.18),transparent_32%)]" />

      <div
        ref={glowRef}
        className="pointer-events-none absolute right-[-180px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-purple-700/20 blur-[130px]"
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1380px] items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10">
        <div ref={textRef}>
          <p data-about-label className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
            About ApexMind
          </p>

          <h2 className="mt-7 max-w-[760px] text-4xl font-medium leading-[1.06] tracking-[-0.05em] sm:text-6xl lg:text-[76px]">
            <span data-about-line className="block">
              We turn emerging
            </span>
            <span data-about-line className="block">
              technology into
            </span>
            <span data-about-line className="block bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              practical systems.
            </span>
          </h2>

          <p className="mt-8 max-w-[640px] text-base leading-8 text-white/48 sm:text-lg">
            ApexMind combines strategy, engineering, and artificial intelligence to build products that solve
            operational problems, improve customer experiences, and support long-term growth.
          </p>

          <div data-capabilities className="mt-12 grid gap-4 sm:grid-cols-3">
            {capabilities.map((capability) => (
              <article key={capability.number} data-capability className="group border-t border-white/15 pt-5">
                <p className="text-xs font-semibold text-purple-300">{capability.number}</p>
                <h3 className="mt-4 text-xl font-medium">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/40 transition group-hover:text-white/60">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div ref={globeRef} className="relative min-h-[430px] lg:min-h-[620px]">
          <WireframeGlobe />
          <div className="pointer-events-none absolute inset-x-[20%] bottom-[8%] h-20 rounded-[50%] bg-purple-600/25 blur-[55px]" />
          <div className="absolute bottom-[13%] left-[8%] rounded-full border border-black/10 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#625d6f] backdrop-blur-xl dark:border-white/10 dark:bg-black/35 dark:text-white/45">
            Strategy / Engineering / Intelligence
          </div>
        </div>
      </div>
    </section>
  );
}
