"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WireframeGlobe = dynamic(
  () => import("@/components/three/WireframeGlobe").then((module) => module.WireframeGlobe),
  {
    ssr: false,
    loading: () => <div className="min-h-[500px] rounded-full bg-purple-900/10 blur-2xl" />,
  },
);

const technologies = [
  {
    name: "OpenAI",
    position: "left-[8%] top-[18%]",
    delay: 0,
  },
  {
    name: "Python",
    position: "right-[8%] top-[17%]",
    delay: 0.08,
  },
  {
    name: "React",
    position: "left-[2%] top-[47%]",
    delay: 0.16,
  },
  {
    name: "Next.js",
    position: "right-[1%] top-[45%]",
    delay: 0.24,
  },
  {
    name: "AWS",
    position: "bottom-[15%] left-[10%]",
    delay: 0.32,
  },
  {
    name: "PostgreSQL",
    position: "bottom-[14%] right-[8%]",
    delay: 0.4,
  },
  {
    name: "Node.js",
    position: "bottom-[2%] left-1/2 -translate-x-1/2",
    delay: 0.48,
  },
];

const capabilities = [
  {
    number: "01",
    title: "Artificial Intelligence",
    description: "Generative AI, intelligent agents, retrieval systems, and machine-learning applications.",
  },
  {
    number: "02",
    title: "Modern Applications",
    description: "Fast and scalable products built with modern frontend and backend technologies.",
  },
  {
    number: "03",
    title: "Cloud Infrastructure",
    description: "Reliable architecture, deployment automation, monitoring, and secure cloud operations.",
  },
];

export function CinematicTechnology() {
  const sectionRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const labels = gsap.utils.toArray<HTMLElement>("[data-technology-label]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-technology-card]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=190%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        timeline
          .from("[data-technology-kicker]", {
            opacity: 0,
            y: 30,
            duration: 0.12,
          })
          .from(
            "[data-technology-heading]",
            {
              opacity: 0,
              y: 80,
              rotateX: -24,
              duration: 0.28,
              transformOrigin: "50% 100%",
            },
            0.04,
          )
          .from(
            globeRef.current,
            {
              opacity: 0,
              scale: 0.55,
              rotate: -15,
              duration: 0.42,
              ease: "power3.out",
            },
            0.08,
          )
          .from(
            labels,
            {
              opacity: 0,
              scale: 0.6,
              y: 40,
              stagger: 0.04,
              duration: 0.25,
            },
            0.32,
          )
          .from(
            cards,
            {
              opacity: 0,
              y: 65,
              stagger: 0.06,
              duration: 0.3,
            },
            0.48,
          )
          .to(
            globeRef.current,
            {
              scale: 1.14,
              rotate: 8,
              duration: 0.35,
            },
            0.62,
          )
          .to(
            glowRef.current,
            {
              opacity: 0.9,
              scale: 1.55,
              duration: 0.35,
            },
            0.62,
          )
          .to(
            contentRef.current,
            {
              opacity: 0,
              y: -90,
              duration: 0.2,
            },
            0.88,
          )
          .to(
            globeRef.current,
            {
              opacity: 0,
              scale: 1.4,
              duration: 0.2,
            },
            0.88,
          );
      });

      media.add("(max-width: 767px)", () => {
        gsap.from("[data-technology-mobile]", {
          opacity: 0,
          y: 50,
          stagger: 0.12,
          duration: 0.7,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        });
      });

      return () => {
        media.revert();
      };
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="technology" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-transparent text-[#12101a] dark:text-white">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(124,44,255,0.20),transparent_36%)]" />

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-purple-700/20 opacity-60 blur-[130px]"
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto hidden min-h-screen max-w-[1380px] grid-cols-[0.75fr_1.25fr] items-center gap-10 px-8 md:grid lg:px-10"
      >
        <div>
          <p data-technology-kicker className="text-xs font-semibold uppercase tracking-[0.26em] text-purple-300">
            Technology ecosystem
          </p>

          <h2
            data-technology-heading
            className="mt-7 max-w-[570px] text-5xl font-medium leading-[1.02] tracking-[-0.05em] lg:text-[76px]"
          >
            Technology chosen for{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              real-world reliability
            </span>
          </h2>

          <p className="mt-7 max-w-[540px] text-base leading-8 text-[#625d6f] dark:text-white/45 lg:text-lg">
            We select tools according to product requirements, security, performance, integrations, and long-term
            scalability.
          </p>

          <a href="#contact" className="mt-9 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple-200">
            Discuss your technology needs
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="relative min-h-[690px]">
          <div ref={globeRef} className="absolute inset-[4%]">
            <WireframeGlobe />
          </div>

          <div className="absolute left-1/2 top-1/2 z-20 flex size-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-black/10 bg-white/65 text-center shadow-[0_0_90px_rgba(124,44,255,0.18)] backdrop-blur-xl dark:border-white/15 dark:bg-black/45 dark:shadow-[0_0_90px_rgba(124,44,255,0.3)]">
            <p className="text-lg font-medium">ApexMind</p>

            <p className="mt-2 max-w-[110px] text-[10px] uppercase leading-5 tracking-[0.14em] text-[#625d6f] dark:text-white/35">
              Intelligence and engineering
            </p>
          </div>

          {technologies.map((technology) => (
            <div
              key={technology.name}
              data-technology-label
              className={[
                "absolute z-30 rounded-full border border-black/10 dark:border-white/12",
                "bg-white/65 px-4 py-2 backdrop-blur-xl dark:bg-black/45",
                "text-[10px] font-semibold uppercase tracking-[0.16em]",
                "text-[#625d6f] shadow-[0_18px_45px_rgba(47,28,73,0.12)] dark:text-white/65 dark:shadow-[0_18px_45px_rgba(0,0,0,0.4)]",
                technology.position,
              ].join(" ")}
              style={{
                transitionDelay: `${technology.delay}s`,
              }}
            >
              {technology.name}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 hidden px-8 pb-16 md:block lg:px-10">
        <div className="mx-auto grid max-w-[1380px] gap-4 md:grid-cols-3">
          {capabilities.map((capability) => (
            <article key={capability.number} data-technology-card className="border-t border-black/10 pt-5 dark:border-white/15">
              <p className="text-xs text-purple-300">{capability.number}</p>

              <h3 className="mt-4 text-xl font-medium">{capability.title}</h3>

              <p className="mt-3 max-w-[370px] text-sm leading-7 text-[#625d6f] dark:text-white/40">{capability.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-5 py-24 md:hidden">
        <div data-technology-mobile>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300">Technology ecosystem</p>

          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.045em]">
            Technology chosen for <span className="text-purple-300">real-world reliability</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-[#625d6f] dark:text-white/45">
            We use modern technology according to your product, security, performance, and scalability requirements.
          </p>
        </div>

        <div data-technology-mobile className="relative mt-12 min-h-[430px]">
          <WireframeGlobe />

          <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/65 text-sm font-medium backdrop-blur-xl dark:border-white/15 dark:bg-black/50">
            ApexMind
          </div>
        </div>

        <div className="mt-14 space-y-10">
          {capabilities.map((capability) => (
            <article key={capability.number} data-technology-mobile className="border-t border-black/10 pt-5 dark:border-white/15">
              <p className="text-xs text-purple-300">{capability.number}</p>

              <h3 className="mt-3 text-2xl font-medium">{capability.title}</h3>

              <p className="mt-3 text-sm leading-7 text-[#625d6f] dark:text-white/45">{capability.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
