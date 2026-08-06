"use client";

import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "03",
    label: "Smart capabilities",
    tag: "Cloud platforms",
    title: "Cloud Platforms",
    description:
      "We design scalable cloud products with secure infrastructure, reliable deployment pipelines, and clear observability.",
    features: ["Cloud architecture", "CI/CD and DevOps", "Monitoring and optimization"],
  },
  {
    number: "02",
    label: "Smart capabilities",
    tag: "Automation",
    title: "Automation",
    description:
      "We connect systems and automate repetitive processes to improve speed, reliability, and operational visibility.",
    features: ["Workflow automation", "System integrations", "Operational dashboards"],
  },
  {
    number: "01",
    label: "Smart capabilities",
    tag: "AI products",
    title: "AI Products",
    description:
      "We create intelligent applications, copilots, AI agents, and knowledge systems designed around real workflows.",
    features: ["Generative AI applications", "AI agents and copilots", "RAG and enterprise knowledge systems"],
  },
  {
    number: "04",
    label: "Smart capabilities",
    tag: "Experience design",
    title: "Experience Design",
    description:
      "We design product experiences that preserve power while making everyday work easier to understand, scan, and act on.",
    features: ["Product strategy", "UI and UX design", "Interactive prototypes"],
  },
];

const technologies = ["OpenAI", "Python", "React", "Next.js", "AWS", "PostgreSQL", "Node.js", "Docker"];

const processStages = [
  { number: "01", title: "Discover", description: "Understand the business problem, users, constraints, and existing systems." },
  { number: "02", title: "Define", description: "Shape the product direction, technical architecture, scope, and delivery plan." },
  { number: "03", title: "Build", description: "Design and engineer the product through clear, testable development cycles." },
  { number: "04", title: "Validate", description: "Test usability, reliability, performance, security, and real operational workflows." },
  { number: "05", title: "Scale", description: "Launch, monitor, improve, and expand the system as the business grows." },
];

export function ApexMindLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const capabilityRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [activeStage, setActiveStage] = useState(2);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-home-reveal]", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.from("[data-home-reveal]", {
        opacity: 0,
        y: 42,
        scale: 0.985,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      if (capabilityRef.current) {
        ScrollTrigger.create({
          trigger: capabilityRef.current,
          start: "top top",
          end: `+=${capabilities.length * 92}%`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = Math.min(capabilities.length - 1, Math.floor(self.progress * capabilities.length));
            setActiveCapability((current) => (current === next ? current : next));
          },
        });
      }

      if (processRef.current) {
        ScrollTrigger.create({
          trigger: processRef.current,
          start: "top top",
          end: `+=${processStages.length * 62}%`,
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = Math.min(processStages.length - 1, Math.floor(self.progress * processStages.length));
            setActiveStage((current) => (current === next ? current : next));
          },
        });
      }
    }, root);

    return () => context.revert();
  }, [prefersReducedMotion]);

  const capability = capabilities[activeCapability];
  const stage = processStages[activeStage];

  return (
    <div ref={rootRef}>
      <HeroSection />
      <CapabilitiesSection sectionRef={capabilityRef} activeIndex={activeCapability} capability={capability} />
      <TechnologySection />
      <ProcessSection sectionRef={processRef} activeIndex={activeStage} activeTitle={stage.title} />
      <WorkImpactSection />
      <ContactSection />
    </div>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
        const setHeroProgress = (progress: number) => {
          window.dispatchEvent(new CustomEvent("apexmind:hero-progress", { detail: { progress } }));
        };
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        ScrollTrigger.getById("apexmind-hero-master")?.kill();
        setHeroProgress(0);

        gsap.set(introRef.current, { autoAlpha: 1, pointerEvents: "auto", zIndex: 30, x: 0, y: 0 });
        gsap.set(cardsRef.current, { autoAlpha: 0, pointerEvents: "none", zIndex: 20, x: 0, y: 60 });
        gsap.set(aboutRef.current, { autoAlpha: 0, pointerEvents: "none", zIndex: 10, x: 0, y: 50 });
        gsap.set("[data-hero-reveal]", { autoAlpha: 1, y: 0 });
        gsap.set("[data-service-card]", { autoAlpha: 1, y: 0 });
        gsap.set("[data-about-reveal]", { autoAlpha: 1, y: 0 });
        gsap.set(heroGlowRef.current, { autoAlpha: 1, scaleY: 1 });

        if (prefersReducedMotion) {
          gsap.set([introRef.current, cardsRef.current], { autoAlpha: 0, pointerEvents: "none" });
          gsap.set(aboutRef.current, { autoAlpha: 1, pointerEvents: "auto", y: 0 });
          setHeroProgress(1);
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            id: "apexmind-hero-master",
            trigger: section,
            start: "top top",
            end: "+=240%",
            scrub: 1,
            pin: stageRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setHeroProgress(self.progress),
            onLeave: () => setHeroProgress(1),
            onEnterBack: (self) => setHeroProgress(self.progress),
          },
        });

        timeline
          .addLabel("intro", 0)
          .addLabel("cards", 1)
          .addLabel("about", 2)
          .to(heroGlowRef.current, { scaleY: 1.16, duration: 0.7, ease: "power2.out" }, "intro+=0.2")
          .to(introRef.current, { autoAlpha: 0, y: -40, pointerEvents: "none", duration: 0.3 }, "cards-=0.25")
          .fromTo(
            cardsRef.current,
            { autoAlpha: 0, y: 60, pointerEvents: "none", zIndex: 35 },
            { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.35 },
            "cards-=0.12",
          )
          .set(introRef.current, { autoAlpha: 0, pointerEvents: "none", zIndex: 10 }, "cards+=0.05")
          .to(cardsRef.current, { autoAlpha: 0, y: -40, pointerEvents: "none", duration: 0.3 }, "about-=0.25")
          .fromTo(
            aboutRef.current,
            { autoAlpha: 0, y: 50, pointerEvents: "none", zIndex: 30 },
            { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.35 },
            "about-=0.12",
          )
          .set(cardsRef.current, { autoAlpha: 0, pointerEvents: "none", zIndex: 10 }, "about+=0.05")
          .to({}, { duration: 0.8 }, "about+=0.35");
      }, section);

    return () => {
      window.dispatchEvent(new CustomEvent("apexmind:hero-progress", { detail: { progress: 0 } }));
      context.revert();
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="cinematic-section relative min-h-[340vh]">
      <div ref={stageRef} className="relative h-screen overflow-hidden px-5 pb-20 pt-[112px]">
        <div className="cinematic-divider" />
        <div className="cinematic-noise" />
        <div ref={heroGlowRef} className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_50%_92%,rgba(124,44,255,0.34),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="pointer-events-none absolute bottom-[-180px] left-1/2 z-10 h-[430px] w-[920px] -translate-x-1/2 rounded-[50%] bg-purple-700/34 blur-[108px]" />

        <section ref={introRef} data-hero-state="intro" className="absolute inset-0 z-30">
          <div className="absolute inset-x-5 top-1/2 mx-auto w-full max-w-[1380px] -translate-y-[46%] text-center">
            <p data-hero-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">
              AI-powered digital intelligence
            </p>
            <h1 data-hero-reveal className="mx-auto mt-7 max-w-[950px] text-[50px] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[94px]">
              <span className="block">Intelligence built for</span>
              <span className="block theme-gradient-text">what comes next</span>
            </h1>
            <p data-hero-reveal className="mx-auto mt-7 max-w-[680px] text-base leading-8 text-theme-secondary sm:text-lg">
              ApexMind creates intelligent applications, automation systems, and digital platforms
              <span className="hidden sm:inline"> for businesses ready to move beyond ordinary software.</span>
            </p>
          </div>
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-theme-muted">Scroll to explore</p>
            <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-[color:var(--border-strong)]">
              <span className="block h-4 w-px animate-[scrollLine_1.6s_ease-in-out_infinite] bg-purple-300" />
            </div>
          </div>
        </section>

        <section ref={cardsRef} data-hero-state="cards" className="invisible absolute inset-0 z-20">
          <div className="pointer-events-none absolute -right-[8%] top-[-13%] h-[620px] w-[620px] rounded-full border border-purple-200/12">
            <div className="absolute right-[12%] top-[18%] h-[410px] w-[410px] rounded-full border border-purple-200/10" />
            <div className="absolute right-[32%] top-[-8%] h-[520px] w-px rotate-[15deg] bg-purple-100/10" />
          </div>
          <div className="absolute inset-x-5 top-[14%] mx-auto w-full max-w-[1280px] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">What we create</p>
            <h2 className="ml-auto mr-[6%] mt-7 max-w-[740px] text-right text-[42px] font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl lg:text-[62px]">
              Intelligent technology for
              <span className="block theme-gradient-text">complex business challenges</span>
            </h2>

            <div className="relative mx-auto mt-10 grid max-w-[1180px] gap-6 md:grid-cols-3">
              {[
                ["AI Products", "01", "Intelligent applications built around real workflows", "-rotate-[8deg] md:translate-y-8"],
                ["Automation", "02", "Connected systems that remove repetitive work", "md:-translate-y-1"],
                ["Digital Platforms", "03", "Scalable cloud products designed for long-term growth", "rotate-[8deg] md:translate-y-9"],
              ].map(([label, number, title, transform]) => (
                <article
                  key={number}
                  data-service-card
                  className={[
                    "relative min-h-[286px] overflow-hidden rounded-[26px] border border-white/12 bg-black/34 p-8 text-left shadow-[0_45px_110px_rgba(0,0,0,0.42)] backdrop-blur-xl",
                    transform,
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/12 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-theme-muted">
                      {label}
                    </span>
                    <span className="text-xs font-bold text-theme-muted">{number}</span>
                  </div>
                  <h3 className="absolute bottom-[76px] left-8 right-8 text-[23px] font-semibold leading-[1.12] tracking-[-0.025em] text-white">
                    {title}
                  </h3>
                  <span className="absolute bottom-9 left-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-purple-100">
                    Explore
                    <ArrowUpRight className="size-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-purple-700/45 to-transparent" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={aboutRef} data-hero-state="about" className="invisible absolute inset-0 z-10">
          <div className="absolute inset-x-5 top-[24%] mx-auto grid w-full max-w-[1300px] gap-10 md:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p data-about-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">About ApexMind</p>
              <h2 data-about-reveal className="mt-6 max-w-[640px] text-[44px] font-semibold leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-[68px]">
                We turn emerging technology into
                <span className="block theme-gradient-text">practical systems.</span>
              </h2>
              <p data-about-reveal className="mt-5 max-w-[660px] text-base leading-8 text-white/88 lg:text-lg">
                ApexMind combines strategy, engineering, and artificial intelligence to build products that solve
                operational problems, improve customer experiences, and support long-term growth.
              </p>
            </div>
            <div className="relative hidden min-h-[520px] md:block">
              <div className="absolute inset-y-[8%] right-[-8%] w-[88%] rounded-[50%] bg-purple-700/18 blur-[95px]" />
              <div data-about-reveal className="absolute bottom-[22%] left-[28%] rounded-full border border-white/10 bg-black/20 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-theme-muted backdrop-blur-xl">
                Strategy / Engineering / Intelligence
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function CapabilitiesSection({
  sectionRef,
  activeIndex,
  capability,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  activeIndex: number;
  capability: (typeof capabilities)[number];
}) {
  return (
    <section id="capabilities" ref={sectionRef} className="cinematic-section relative min-h-screen px-5 py-28 md:py-0">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_50%,rgba(124,44,255,0.22),transparent_36%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1380px] items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:px-8 lg:px-10">
        <div data-home-reveal className="pl-0 transition duration-500 md:pl-[11%]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">{capability.label}</p>
          <div className="mt-6 flex items-start gap-6">
            <span className="pt-3 text-sm font-medium text-theme-muted">{capability.number}</span>
            <div key={capability.number} className="animate-[fadeLift_.45s_ease_both]">
              <h2 className="max-w-[560px] text-5xl font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[58px]">
                {capability.title}
              </h2>
              <p className="mt-5 max-w-[500px] text-sm leading-7 text-theme-secondary lg:text-base">{capability.description}</p>
              <ul className="mt-6 space-y-3">
                {capability.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-xs font-semibold text-theme-secondary">
                    <Check className="size-3.5 text-purple-200" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-purple-200">
                Discuss this capability
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="mt-10 flex gap-3">
            {capabilities.map((item, index) => (
              <span key={item.number} className={["h-px transition-all duration-300", index === activeIndex ? "w-20 bg-purple-300" : "w-9 bg-white/14"].join(" ")} />
            ))}
          </div>
        </div>

        <div data-home-reveal className="relative min-h-[580px]">
          <div className="absolute right-[12%] top-[23%] rounded-full border border-theme cinematic-surface-strong px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-theme-secondary backdrop-blur-xl">
            {capability.tag}
          </div>
          <div className="absolute left-[12%] top-[50%] rounded-full border border-theme cinematic-surface-strong px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-theme-secondary backdrop-blur-xl">
            Reliable systems
          </div>
          <div className="absolute left-[21%] top-[16%] h-[420px] w-[420px] rounded-full border border-purple-300/10" />
          <div className="absolute left-[29%] top-[22%] h-[310px] w-[310px] rounded-[50%] border border-purple-300/12" />
          <div className="absolute left-[35%] top-[27%] h-[210px] w-[210px] rotate-[7deg] rounded-[18px] border border-purple-300/28 bg-purple-700/55 shadow-[0_0_90px_rgba(124,44,255,0.45)] backdrop-blur-sm" />
          <div className="absolute left-[39%] top-[35%] h-[105px] w-[105px] rotate-45 rounded-[12px] border border-purple-200/35 bg-purple-500/30" />
          <div className="absolute left-[22%] right-[15%] top-[45%] h-px bg-gradient-to-r from-transparent via-purple-200/22 to-transparent" />
          <div className="absolute left-[47%] top-[17%] h-[330px] w-px bg-gradient-to-b from-transparent via-purple-200/22 to-transparent" />
          <div className="absolute inset-x-[22%] bottom-[18%] h-24 rounded-[50%] bg-purple-600/28 blur-[62px]" />
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section id="technology" className="cinematic-section relative min-h-screen px-5 py-28 md:py-0">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_55%,rgba(124,44,255,0.22),transparent_36%)]" />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1380px] items-center gap-10 md:grid-cols-[0.72fr_1.28fr] md:px-8 lg:px-10">
        <div data-home-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">Technology ecosystem</p>
          <h2 className="mt-7 max-w-[570px] text-5xl font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[76px]">
            Technology chosen for <span className="theme-gradient-text">real-world reliability</span>
          </h2>
          <p className="mt-7 max-w-[540px] text-base leading-8 text-theme-secondary lg:text-lg">
            We select tools according to product requirements, security, performance, integrations, and long-term
            scalability.
          </p>
          <a href="#contact" className="mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-purple-200">
            Discuss your technology needs
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div data-home-reveal className="relative min-h-[680px]">
          <div className="absolute left-1/2 top-1/2 z-20 flex size-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-theme cinematic-surface-strong text-center shadow-[0_0_90px_rgba(124,44,255,0.3)] backdrop-blur-xl">
            <p className="text-lg font-semibold">ApexMind</p>
            <p className="mt-2 max-w-[110px] text-[10px] uppercase leading-5 tracking-[0.14em] text-theme-muted">Intelligence and engineering</p>
          </div>
          <div className="absolute left-[16%] right-[16%] top-1/2 z-10 h-px bg-gradient-to-r from-transparent via-purple-200/20 to-transparent" />
          <div className="absolute bottom-[18%] left-1/2 top-[18%] z-10 w-px bg-gradient-to-b from-transparent via-purple-200/20 to-transparent" />
          {technologies.map((name, index) => (
              <span key={name} className="absolute rounded-full border border-theme cinematic-surface-strong px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-theme-secondary backdrop-blur-xl" style={technologyPosition(index)}>
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 mx-auto grid max-w-[1380px] gap-4 px-5 pb-16 md:grid-cols-3 md:px-8 lg:px-10">
        {["Artificial Intelligence", "Modern Applications", "Cloud Infrastructure"].map((title, index) => (
          <article key={title} className="border-t border-theme pt-5">
            <p className="text-xs text-purple-200">0{index + 1}</p>
            <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection({
  sectionRef,
  activeIndex,
  activeTitle,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  activeIndex: number;
  activeTitle: string;
}) {
  return (
    <section id="process" ref={sectionRef} className="cinematic-section relative min-h-screen px-5 py-28 md:py-0">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_52%,rgba(124,44,255,0.22),transparent_35%)]" />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1380px] items-center gap-14 md:grid-cols-[0.92fr_1.08fr] md:px-8 lg:px-10">
        <div data-home-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">Process</p>
          <h2 className="mt-7 max-w-[650px] text-5xl font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[72px]">
            A focused process from first idea to <span className="theme-gradient-text">long-term growth</span>
          </h2>
          <div className="relative mt-12">
            <div className="absolute bottom-0 left-[23px] top-0 w-px bg-white/12">
              <span className="absolute left-0 top-0 block w-px bg-purple-300 shadow-[0_0_24px_rgba(169,112,255,0.9)] transition-all duration-300" style={{ height: `${((activeIndex + 1) / processStages.length) * 100}%` }} />
            </div>
            <div className="space-y-6">
              {processStages.map((item, index) => {
                const active = activeIndex === index;
                return (
                  <article key={item.number} className="relative grid grid-cols-[48px_1fr] gap-5">
                    <div className={["relative z-10 grid size-12 place-items-center rounded-full border cinematic-surface-strong text-xs font-semibold transition", active ? "border-purple-300/45 text-purple-100 shadow-[0_0_32px_rgba(124,44,255,0.22)]" : "border-theme text-theme-muted"].join(" ")}>
                      {item.number}
                    </div>
                    <div className={["transition duration-300", active ? "opacity-100" : "opacity-[0.34]"].join(" ")}>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                      <p className="mt-2 max-w-[500px] text-sm leading-7 text-theme-secondary">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <div data-home-reveal className="relative min-h-[620px]">
          <div className="absolute left-1/2 top-1/2 size-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/15 shadow-[0_0_100px_rgba(124,44,255,0.22)]" />
          <div className="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[42px] border border-theme cinematic-surface backdrop-blur-xl" />
          <div className="absolute left-1/2 top-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 rounded-[34px] border border-purple-300/30 bg-purple-600/15 shadow-[0_0_70px_rgba(169,112,255,0.35)] backdrop-blur-xl" />
          <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 rounded-full border border-theme cinematic-surface-strong px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-theme-secondary backdrop-blur-xl">
            {activeTitle}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkImpactSection() {
  return (
    <section id="work" className="cinematic-section relative flex min-h-screen items-center justify-center px-5 py-28 text-center">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,44,255,0.24),transparent_36%)]" />
      <div data-home-reveal className="relative z-10 mx-auto max-w-[900px]">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">Work and impact</p>
        <h2 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[82px]">
          Systems built to turn intelligence into <span className="theme-gradient-text">measurable impact</span>
        </h2>
        <p className="mx-auto mt-7 max-w-[620px] text-base leading-8 text-theme-secondary lg:text-lg">
          From operational platforms to AI assistants, each build is engineered for reliability, adoption, and growth.
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="cinematic-section relative min-h-screen overflow-hidden px-5 py-28 md:py-0">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-6%,rgba(124,44,255,0.28),transparent_28%),radial-gradient(circle_at_76%_58%,rgba(124,44,255,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-8%] h-[390px] w-[780px] -translate-x-1/2 overflow-hidden rounded-b-[50%] border-b border-purple-200/14">
        <div className="absolute left-1/2 top-[24px] size-[460px] -translate-x-1/2 rounded-full border border-purple-200/18 shadow-[inset_0_0_90px_rgba(124,44,255,0.28)]" />
        <div className="absolute left-[27%] top-[18%] h-[420px] w-[420px] rotate-[24deg] rounded-full border border-purple-200/20" />
        <span className="absolute left-1/2 top-[48%] size-4 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(103,232,249,0.9)]" />
      </div>

      <div className="relative z-20 mx-auto grid min-h-screen max-w-[1380px] items-center gap-14 pt-24 md:grid-cols-[0.82fr_1.18fr] md:px-8 lg:px-10">
        <div data-home-reveal className="max-w-[650px]">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-purple-200">Start the next build</p>
          <h2 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[76px]">
            Your next intelligent product <span className="theme-gradient-text">starts here</span>
          </h2>
          <p className="mt-7 max-w-[560px] text-base leading-8 text-theme-secondary lg:text-lg">
            Tell us what you want to build, improve, or automate. We will help you understand the best next step.
          </p>
          <div className="mt-16 hidden max-w-[520px] rounded-[28px] border border-white/10 bg-black/16 p-7 backdrop-blur-xl md:block">
            <div className="absolute inset-x-[18%] -bottom-20 h-44 rounded-[50%] border border-purple-200/12" />
            <a href="mailto:hello@apexmind.ai" className="relative z-10 inline-flex items-center gap-3 text-sm font-bold text-white/90">
              <Mail className="size-4 text-purple-200" />
              hello@apexmind.ai
            </a>
          </div>
        </div>
        <form data-home-reveal className="rounded-[28px] border border-white/70 bg-black/18 p-7 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm font-bold text-theme-secondary">
              Name
              <input className="mt-3 h-14 w-full rounded-2xl border border-white/70 bg-black/20 px-4 text-sm text-white outline-none focus:border-purple-200" />
            </label>
            <label className="block text-sm font-bold text-theme-secondary">
              Work email
              <input type="email" className="mt-3 h-14 w-full rounded-2xl border border-white/70 bg-black/20 px-4 text-sm text-white outline-none focus:border-purple-200" />
            </label>
            <label className="block text-sm font-bold text-theme-secondary">
              Company
              <input className="mt-3 h-14 w-full rounded-2xl border border-white/70 bg-black/20 px-4 text-sm text-white outline-none focus:border-purple-200" />
            </label>
            <label className="block text-sm font-bold text-theme-secondary">
              Service
              <select className="mt-3 h-14 w-full rounded-2xl border border-white/70 bg-black/20 px-4 text-sm font-bold text-white outline-none focus:border-purple-200" defaultValue="">
                <option value="" disabled>Select a service</option>
                <option>AI Products</option>
                <option>Automation</option>
                <option>Digital Platforms</option>
                <option>Cloud Platforms</option>
              </select>
            </label>
          </div>
          <label className="mt-6 block text-sm font-bold text-theme-secondary">
            Project details
            <textarea className="mt-3 min-h-[230px] w-full resize-none rounded-2xl border border-white/70 bg-black/20 p-5 text-sm text-white outline-none focus:border-purple-200" placeholder="Tell us what you want to build, improve, or automate." />
          </label>
          <button type="button" className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-purple-600 px-8 text-sm font-bold text-white shadow-[0_0_50px_rgba(124,44,255,0.35)] transition hover:-translate-y-1 hover:bg-purple-500">
            Start the conversation
            <ArrowUpRight className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function technologyPosition(index: number) {
  const positions = [
    { left: "8%", top: "18%" },
    { right: "8%", top: "17%" },
    { left: "2%", top: "47%" },
    { right: "1%", top: "45%" },
    { left: "10%", bottom: "15%" },
    { right: "8%", bottom: "14%" },
    { left: "38%", bottom: "5%" },
    { right: "30%", bottom: "4%" },
  ];

  return positions[index];
}
