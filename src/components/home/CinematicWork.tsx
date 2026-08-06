"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "AI Operations Platform",
    description:
      "A unified operations and analytics platform combining live dashboards, automated workflows, and predictive insights.",
    results: ["42% faster workflows", "3.1x operational efficiency"],
    accent: "from-purple-400 to-cyan-300",
  },
  {
    number: "02",
    title: "Intelligent Restaurant System",
    description:
      "A connected restaurant platform for inventory, counter sales, kitchen operations, ordering, and AI-assisted customer support.",
    results: ["faster counter billing", "real-time inventory visibility"],
    accent: "from-violet-300 to-purple-500",
  },
  {
    number: "03",
    title: "Enterprise Knowledge Assistant",
    description:
      "A secure retrieval-augmented AI assistant that helps teams search internal knowledge and receive grounded answers with citations.",
    results: ["faster knowledge retrieval", "cited answers", "secure internal access"],
    accent: "from-indigo-300 to-violet-500",
  },
];

export function CinematicWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(min-width: 768px)", () => {
        const screens = gsap.utils.toArray<HTMLElement>("[data-work-screen]");

        gsap.set(screens, {
          opacity: 0,
          y: 220,
          rotateX: 18,
          rotateY: -18,
          scale: 0.82,
          transformPerspective: 1200,
        });

        gsap.set(screens[0], { opacity: 1, y: 0, rotateX: 7, rotateY: -10, scale: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=260%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const nextIndex = Math.min(projects.length - 1, Math.floor(self.progress * projects.length));
              setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
            },
          },
        });

        timeline
          .from("[data-work-heading]", { opacity: 0, y: 70, duration: 0.16 })
          .to(screens[0], { x: -230, y: 30, zIndex: 1, scale: 0.78, rotateY: 18, opacity: 0.45, duration: 0.24 }, 0.28)
          .to(screens[1], { opacity: 1, y: -10, scale: 1, rotateX: 6, rotateY: -7, zIndex: 3, duration: 0.28 }, 0.32)
          .to(screens[1], { x: 220, y: 28, zIndex: 1, scale: 0.78, rotateY: -18, opacity: 0.45, duration: 0.24 }, 0.58)
          .to(screens[2], { opacity: 1, y: -20, scale: 1.02, rotateX: 5, rotateY: 0, zIndex: 4, duration: 0.28 }, 0.62)
          .to(screens, { y: -170, opacity: 0, scale: 0.72, stagger: 0.03, duration: 0.18 }, 0.9)
          .to(stageRef.current, { opacity: 0, y: -80, duration: 0.16 }, 0.9);
      });

      media.add("(max-width: 767px)", () => {
        gsap.from("[data-work-mobile]", {
          opacity: 0,
          y: 50,
          stagger: 0.12,
          duration: 0.65,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        });
      });
    }, section);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  const activeProject = projects[activeIndex];

  return (
    <section id="work" ref={sectionRef} className="cinematic-section cinematic-section-secondary relative min-h-screen">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_55%,rgba(124,44,255,0.18),transparent_36%)]" />

      <div ref={stageRef} className="relative z-10 mx-auto hidden min-h-screen max-w-[1380px] grid-cols-[0.72fr_1.28fr] items-center gap-10 px-8 md:grid lg:px-10">
        <div data-work-heading>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-theme-accent">Selected work</p>
          <h2 className="mt-7 max-w-[620px] text-5xl font-medium leading-[1.02] tracking-[-0.05em] lg:text-[74px]">
            Selected systems built for{" "}
            <span className="theme-gradient-text">
              measurable impact
            </span>
          </h2>

          <div className="mt-10">
            <p className="text-sm text-theme-muted">{activeProject.number}</p>
            <h3 className="mt-3 text-3xl font-medium tracking-[-0.035em]">{activeProject.title}</h3>
            <p className="mt-5 max-w-[540px] text-base leading-8 text-theme-secondary">{activeProject.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {activeProject.results.map((result) => (
                <span key={result} className="rounded-full border border-theme cinematic-surface px-4 py-2 text-xs font-semibold text-theme-secondary backdrop-blur-xl">
                  {result}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[690px] [perspective:1200px]">
          {projects.map((project, index) => (
            <DashboardMockup key={project.number} project={project} index={index} />
          ))}
          <div className="pointer-events-none absolute inset-x-[18%] bottom-[10%] h-24 rounded-[50%] bg-purple-600/25 blur-[60px]" />
        </div>
      </div>

      <div className="relative z-10 px-5 py-24 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-accent">Selected work</p>
        <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.045em]">
          Selected systems built for <span className="text-theme-accent">measurable impact</span>
        </h2>

        <div className="mt-12 space-y-10">
          {projects.map((project, index) => (
            <article key={project.number} data-work-mobile className="overflow-hidden rounded-[26px] border border-theme cinematic-surface-strong p-4 backdrop-blur-xl">
              <DashboardSurface accent={project.accent} compact={index !== 0} />
              <p className="mt-6 text-xs text-theme-accent">{project.number}</p>
              <h3 className="mt-3 text-2xl font-medium">{project.title}</h3>
              <p className="mt-4 text-sm leading-7 text-theme-secondary">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.results.map((result) => (
                  <span key={result} className="rounded-full border border-theme px-3 py-1.5 text-[11px] text-theme-secondary">
                    {result}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function DashboardMockup({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-work-screen
      className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] border border-theme cinematic-surface-strong p-4 shadow-[0_45px_120px_var(--shadow-color)] backdrop-blur-2xl"
      style={{ zIndex: projects.length - index }}
    >
      <div className="mb-4 flex items-center justify-between border-b border-theme pb-4">
        <div className="flex gap-2">
          <span className="size-2.5 rounded-full bg-red-300/60" />
          <span className="size-2.5 rounded-full bg-yellow-300/60" />
          <span className="size-2.5 rounded-full bg-green-300/60" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-theme-muted">{project.title}</span>
      </div>
      <DashboardSurface accent={project.accent} compact={false} />
    </article>
  );
}

function DashboardSurface({ accent, compact }: { accent: string; compact: boolean }) {
  return (
    <div className="grid min-h-[300px] gap-4 sm:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[20px] border border-theme cinematic-surface p-5">
        <div className={["h-28 rounded-2xl bg-gradient-to-br opacity-80", accent].join(" ")} />
        <div className="mt-5 grid gap-3">
          <span className="h-3 w-3/4 rounded-full bg-[color:var(--border-strong)]" />
          <span className="h-3 w-1/2 rounded-full bg-[color:var(--border-color)]" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-16 rounded-2xl border border-theme cinematic-surface" />
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-2xl border border-theme cinematic-surface p-4">
            <span className="block h-2 w-16 rounded-full bg-purple-300/40" />
            <span className="mt-4 block h-8 rounded-xl bg-[color:var(--border-color)]" />
            {!compact ? <span className="mt-3 block h-2 w-2/3 rounded-full bg-[color:var(--border-strong)]" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
