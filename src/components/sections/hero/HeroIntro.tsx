"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/ui/GradientHeading";
import type { HomePageContent } from "@/lib/cms/types";
import { defaultHomeContent } from "@/lib/cms/default-home";

const HeroThreeCenterpiece = lazy(() => import("@/components/sections/hero/HeroThreeCenterpiece"));

type HeroIntroProps = {
  content?: HomePageContent["hero"];
};

const heroReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

function HeroFallbackCenterpiece() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full border border-purple-300/18 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.16),transparent_58%)] shadow-card-glow"
    >
      <div className="absolute inset-[13%] rounded-full border border-purple-300/16" />
      <div className="absolute inset-[24%] rotate-[-18deg] rounded-[50%] border border-purple-300/20" />
      <div className="absolute inset-[31%] rotate-[22deg] rounded-[50%] border border-purple-300/16" />
      <span className="absolute left-[26%] top-[28%] size-1.5 rounded-full bg-purple-200" />
      <span className="absolute bottom-[30%] right-[25%] size-1.5 rounded-full bg-cyan-200" />
    </div>
  );
}

export function HeroIntro({ content = defaultHomeContent.hero }: HeroIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [useStaticVisual, setUseStaticVisual] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setUseStaticVisual(true);
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateVisualMode = () => {
      setUseStaticVisual(mediaQuery.matches);
    };

    updateVisualMode();
    mediaQuery.addEventListener("change", updateVisualMode);

    return () => mediaQuery.removeEventListener("change", updateVisualMode);
  }, [prefersReducedMotion]);

  return (
    <div data-hero-state="intro-content" className="relative flex h-full items-center px-5 pt-24">
      <div className="hero-intro-glow hero-orb-drift absolute left-1/2 top-[73%] h-[360px] w-[860px] -translate-x-1/2 rounded-[50%] blur-[112px]" />
      <div data-intro-centerpiece className="hero-centerpiece-float pointer-events-auto absolute left-1/2 top-[55%] z-0 h-[min(55vw,520px)] w-[min(55vw,520px)] -translate-x-1/2 -translate-y-1/2 opacity-70 md:top-[56%]">
        {useStaticVisual ? (
          <HeroFallbackCenterpiece />
        ) : (
          <Suspense fallback={<HeroFallbackCenterpiece />}>
            <HeroThreeCenterpiece />
          </Suspense>
        )}
      </div>
      <div data-intro-decoration className="hero-decoration-float absolute right-[5.5%] top-[34%] hidden h-8 w-28 rotate-[10deg] lg:block">
        <span className="absolute left-0 top-2 h-5 w-8 -rotate-[3deg] border border-purple-300/20 bg-purple-500/16" />
        <span className="absolute left-8 top-1 h-7 w-9 rotate-[4deg] rounded-[6px] border border-white/18 bg-white/[0.025]" />
        <span className="absolute left-16 top-3 h-5 w-8 rotate-[5deg] border border-purple-300/22 bg-purple-500/18" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1180px] text-center"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.08, delayChildren: prefersReducedMotion ? 0 : 0.08 }}
      >
        <motion.div data-intro-eyebrow variants={heroReveal} transition={{ duration: 0.45, ease: "easeOut" }}>
          <SectionLabel>{content.eyebrow}</SectionLabel>
        </motion.div>

        <motion.h1 data-intro-heading variants={heroReveal} transition={{ duration: 0.52, ease: "easeOut" }} className="ds-display mx-auto mt-8 max-w-[1030px] tracking-[-0.045em]">
          {content.heading} <br />
          <GradientHeading>{content.highlightedHeading}</GradientHeading>
        </motion.h1>

        <motion.p data-intro-copy variants={heroReveal} transition={{ duration: 0.5, ease: "easeOut" }} className="ds-body mx-auto mt-6 max-w-[720px] font-semibold">
          {content.paragraph}
        </motion.p>

        <motion.div data-intro-cta variants={heroReveal} transition={{ duration: 0.48, ease: "easeOut" }} className="absolute left-1/2 top-[calc(50vh+275px)] hidden -translate-x-1/2 text-center lg:block">
          <Link
            href={content.ctaLink}
            className="inline-flex h-11 origin-center items-center justify-center rounded-[14px] border border-purple-300/25 bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] px-5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-button transition-[transform,box-shadow,background-color] duration-200 ease-out hover:scale-[1.03] hover:shadow-card-glow hover:from-[var(--ds-primary-hover)] hover:to-[var(--ds-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            {content.ctaLabel}
          </Link>
          <span className="mx-auto mt-4 block h-11 w-px bg-gradient-to-b from-purple-200/30 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}
