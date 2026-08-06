"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceCore = dynamic(
  () => import("@/components/three/ServiceCore").then((module) => module.ServiceCore),
  {
    ssr: false,
    loading: () => <div className="min-h-[420px] rounded-full bg-purple-900/10 blur-2xl" />,
  },
);

const services = [
  {
    number: "01",
    title: "AI Products",
    description:
      "We create intelligent applications, copilots, AI agents, and knowledge systems designed around real workflows.",
    features: [
      "Generative AI applications",
      "AI agents and copilots",
      "RAG and enterprise knowledge systems",
    ],
  },
  {
    number: "02",
    title: "Automation",
    description:
      "We connect systems and automate repetitive processes to improve speed, reliability, and operational visibility.",
    features: ["Workflow automation", "System integrations", "Operational dashboards"],
  },
  {
    number: "03",
    title: "Cloud Platforms",
    description:
      "We design scalable cloud products with secure infrastructure, reliable deployment pipelines, and clear observability.",
    features: ["Cloud architecture", "CI/CD and DevOps", "Monitoring and optimization"],
  },
  {
    number: "04",
    title: "Experience Design",
    description:
      "We design interfaces and product experiences that make complex systems feel simple, useful, and intuitive.",
    features: ["Product strategy", "UI and UX design", "Interactive prototypes"],
  },
];

export function CinematicServiceDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${services.length * 110}%`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const nextIndex = Math.min(services.length - 1, Math.floor(self.progress * services.length));

              setActiveIndex(nextIndex);
            },
          },
        });

        timeline
          .from("[data-service-kicker]", {
            opacity: 0,
            y: 30,
            duration: 0.12,
          })
          .from(
            visualRef.current,
            {
              opacity: 0,
              scale: 0.76,
              rotate: -10,
              duration: 0.3,
            },
            0.05,
          )
          .from(
            contentRef.current,
            {
              opacity: 0,
              x: -100,
              duration: 0.3,
            },
            0.06,
          )
          .to(
            visualRef.current,
            {
              rotate: 8,
              scale: 1.08,
              duration: 0.45,
            },
            0.35,
          )
          .to(
            contentRef.current,
            {
              y: -30,
              duration: 0.25,
            },
            0.58,
          )
          .to(
            visualRef.current,
            {
              scale: 1.18,
              y: -35,
              duration: 0.3,
            },
            0.72,
          )
          .to(
            "[data-service-stage]",
            {
              opacity: 0,
              y: -80,
              duration: 0.18,
            },
            0.88,
          );
      });

      media.add("(max-width: 767px)", () => {
        gsap.from("[data-mobile-service]", {
          opacity: 0,
          y: 50,
          stagger: 0.12,
          duration: 0.65,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        });
      });

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  const activeService = services[activeIndex];

  return (
    <section
      id="service-details"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#07050c] text-white"
    >
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(124,44,255,0.18),transparent_34%)]" />

      <div className="relative z-10 mx-auto hidden min-h-screen max-w-[1380px] items-center gap-12 px-8 md:grid md:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div ref={contentRef} data-service-stage>
          <p data-service-kicker className="text-xs font-semibold uppercase tracking-[0.26em] text-purple-300">
            Service capabilities
          </p>

          <div className="mt-8 flex items-start gap-6">
            <span className="text-sm font-medium text-white/30">{activeService.number}</span>

            <div>
              <h2 className="text-5xl font-medium tracking-[-0.05em] lg:text-[78px]">
                {activeService.title}
              </h2>

              <p className="mt-6 max-w-[610px] text-base leading-8 text-white/48 lg:text-lg">
                {activeService.description}
              </p>

              <ul className="mt-8 space-y-4">
                {activeService.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-4 text-sm font-medium text-white/60"
                  >
                    <span className="size-1.5 rounded-full bg-purple-400 shadow-[0_0_16px_rgba(169,112,255,0.9)]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple-200"
              >
                Discuss this capability
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 flex gap-3">
            {services.map((service, index) => (
              <span
                key={service.number}
                className={[
                  "h-px transition-all duration-300",
                  index === activeIndex ? "w-16 bg-purple-400" : "w-8 bg-white/15",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        <div ref={visualRef} data-service-stage className="relative min-h-[620px]">
          <ServiceCore activeIndex={activeIndex} />

          <div className="pointer-events-none absolute inset-x-[20%] bottom-[14%] h-24 rounded-[50%] bg-purple-600/25 blur-[60px]" />

          <div className="absolute right-[6%] top-[16%] rounded-full border border-black/10 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#625d6f] backdrop-blur-xl dark:border-white/10 dark:bg-black/35 dark:text-white/45">
            {activeService.title}
          </div>
        </div>
      </div>

      <div className="relative z-10 px-5 py-24 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-300">
          Service capabilities
        </p>

        <div className="mt-12 space-y-20">
          {services.map((service, index) => (
            <article key={service.number} data-mobile-service>
              <div className="min-h-[360px]">
                <ServiceCore activeIndex={index} />
              </div>

              <p className="mt-8 text-xs text-white/30">{service.number}</p>

              <h2 className="mt-3 text-4xl font-medium tracking-[-0.045em]">
                {service.title}
              </h2>

              <p className="mt-5 text-base leading-8 text-white/48">{service.description}</p>

              <ul className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="size-1.5 rounded-full bg-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
