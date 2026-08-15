"use client";

import { useLayoutEffect, useRef } from "react";
import { HeroAbout } from "@/components/sections/hero/HeroAbout";
import { HeroCreate } from "@/components/sections/hero/HeroCreate";
import { HeroIntro } from "@/components/sections/hero/HeroIntro";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setWebGLActiveScene, setWebGLProgress } from "@/store/webgl-state";
import type { HomePageContent } from "@/lib/cms/types";
import { defaultHomeContent } from "@/lib/cms/default-home";

type HeroStoryProps = {
  content?: HomePageContent;
};

export function HeroStory({ content = defaultHomeContent }: HeroStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;
    const intro = introRef.current;
    const create = createRef.current;
    const about = aboutRef.current;

    if (!section || !stage || !intro || !create || !about) {
      return undefined;
    }

    ScrollTrigger.getById("apexmind-hero-master")?.kill();

    const ctx = gsap.context(() => {
      const createCards = gsap.utils.toArray<HTMLElement>("[data-create-card]");
      const aboutColumns = gsap.utils.toArray<HTMLElement>("[data-about-column]");

      gsap.set(intro, {
        autoAlpha: 1,
        pointerEvents: "auto",
        zIndex: 30,
      });

      gsap.set(create, {
        autoAlpha: 0,
        pointerEvents: "none",
        zIndex: 20,
      });

      gsap.set(about, {
        autoAlpha: 0,
        pointerEvents: "none",
        zIndex: 10,
      });

      gsap.set("[data-intro-heading]", {
        scale: 1,
      });

      gsap.set("[data-create-eyebrow], [data-create-heading], [data-create-orbit]", {
        autoAlpha: 0,
        y: 50,
      });

      gsap.set(createCards, {
        autoAlpha: 0,
        y: (index) => (index === 1 ? 110 : 90),
        x: (index) => (index === 0 ? -35 : index === 2 ? 35 : 0),
        rotate: (index) => (index === 0 ? -7 : index === 2 ? 7 : 0),
        scale: (index) => (index === 1 ? 0.92 : 0.94),
      });

      gsap.set("[data-about-eyebrow], [data-about-heading], [data-about-copy]", {
        autoAlpha: 0,
        y: 55,
      });

      gsap.set(aboutColumns, {
        autoAlpha: 0,
        y: 40,
      });

      gsap.set("[data-about-label]", {
        autoAlpha: 0,
        y: 12,
        rotate: -4,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          id: "apexmind-hero-master",
          trigger: section,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          onEnter: () => setWebGLActiveScene("hero"),
          onEnterBack: () => setWebGLActiveScene("hero"),
          onLeave: () => setWebGLActiveScene("none"),
          onLeaveBack: () => {
            setWebGLProgress("heroProgress", 0);
            setWebGLActiveScene("none");
          },
          onUpdate: (self) => {
            setWebGLProgress("heroProgress", self.progress);
          },
        },
      });

      timeline
        .addLabel("intro", 0)
        .to("[data-intro-heading]", {
          y: -36,
          scale: 0.98,
          duration: 0.28,
          ease: "power1.inOut",
        }, 0.75)
        .to("[data-intro-copy], [data-intro-cta]", {
          autoAlpha: 0,
          y: -22,
          duration: 0.22,
          ease: "power1.inOut",
        }, 0.78)
        .to("[data-intro-eyebrow]", {
          autoAlpha: 0,
          y: -18,
          duration: 0.2,
        }, 0.83)
        .to("[data-intro-decoration]", {
          autoAlpha: 0,
          y: -14,
          duration: 0.2,
        }, 0.83)
        .addLabel("create", 1.1)
        .set(create, {
          autoAlpha: 1,
          pointerEvents: "auto",
        }, 0.76)
        .to("[data-create-eyebrow], [data-create-heading]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
        }, 0.82)
        .to("[data-create-orbit]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.04,
        }, 0.92)
        .to(createCards, {
          autoAlpha: 1,
          y: 0,
          x: 0,
          rotate: (index) => (index === 0 ? -7 : index === 1 ? 3 : 8),
          scale: 1,
          duration: 0.34,
          stagger: 0.1,
        }, 0.98)
        .to(intro, {
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.18,
        }, 1.03)
        .to("[data-create-heading], [data-create-eyebrow]", {
          autoAlpha: 0,
          y: -28,
          duration: 0.24,
          ease: "power1.inOut",
        }, 1.8)
        .to("[data-create-orbit]", {
          autoAlpha: 0,
          duration: 0.18,
        }, 1.82)
        .to(createCards, {
          autoAlpha: 0,
          y: -42,
          x: (index) => (index === 0 ? -28 : index === 2 ? 28 : 0),
          duration: 0.28,
          stagger: 0.06,
          ease: "power1.inOut",
        }, 1.84)
        .addLabel("about", 2.15)
        .set(about, {
          autoAlpha: 1,
          pointerEvents: "auto",
        }, 1.82)
        .to("[data-about-eyebrow]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.22,
        }, 1.86)
        .to("[data-about-heading]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
        }, 1.92)
        .to("[data-about-copy]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
        }, 2.0)
        .to(aboutColumns, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.08,
        }, 2.05)
        .to("[data-about-label]", {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.24,
        }, 2.12)
        .to(create, {
          autoAlpha: 0,
          pointerEvents: "none",
          duration: 0.18,
        }, 2.1)
        .to(about, {
          autoAlpha: 1,
          duration: 0.85,
        }, 2.15);

      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="hero-reduced-bg absolute inset-0" />
        <div className="relative min-h-screen">
          <HeroIntro content={content.hero} />
        </div>
        <div className="relative min-h-screen">
          <HeroCreate content={content.whatWeCreate} />
        </div>
        <div className="relative min-h-screen">
          <HeroAbout content={content.about} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-[var(--background)] text-[var(--foreground)]">
      <div
        ref={stageRef}
        className="relative h-screen overflow-hidden"
      >
        <div className="hero-stage-bg absolute inset-0" />
        <div className="hero-stage-grid absolute inset-0" />

        <div ref={introRef} className="absolute inset-0">
          <HeroIntro content={content.hero} />
        </div>

        <div ref={createRef} className="absolute inset-0">
          <HeroCreate content={content.whatWeCreate} />
        </div>

        <div ref={aboutRef} className="absolute inset-0">
          <HeroAbout content={content.about} />
        </div>
      </div>
    </section>
  );
}
