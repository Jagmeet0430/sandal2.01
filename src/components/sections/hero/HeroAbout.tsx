"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { HomePageContent } from "@/lib/cms/types";
import { defaultHomeContent } from "@/lib/cms/default-home";

type HeroAboutProps = {
  content?: HomePageContent["about"];
};

export function HeroAbout({ content = defaultHomeContent.about }: HeroAboutProps) {
  const pillars = [...content.pillars].sort((a, b) => a.order - b.order);
  const prefersReducedMotion = useReducedMotion();
  const revealDistance = prefersReducedMotion ? 0 : 22;

  return (
    <div data-hero-state="about-content" className="relative flex h-full items-start px-5 pt-[calc(var(--header-height)+2.75rem)] md:items-center md:pt-32">
      <div className="absolute right-[-12%] top-[20%] h-[460px] w-[460px] rounded-full bg-[var(--purple)]/[0.10] blur-[130px] dark:bg-[var(--purple)]/14" />

      <div className="relative mx-auto grid w-full max-w-[1420px] items-center gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: revealDistance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div data-about-eyebrow>
            <SectionLabel>{content.eyebrow}</SectionLabel>
          </div>
          <p data-about-copy className="ds-body mt-8 max-w-[560px] font-semibold">
            {content.paragraph}
          </p>
        </motion.div>

        <div>
          <h2 data-about-heading className="ds-h1 tracking-[-0.045em]">
            {content.heading}
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-3 md:mt-12">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.number}
                data-about-column
                className="group relative border-t border-[var(--border-color)] pt-5"
                initial={{ opacity: 0, y: revealDistance }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.46, delay: prefersReducedMotion ? 0 : index * 0.1, ease: "easeOut" }}
              >
                <p className="text-small font-bold text-[var(--text-secondary)] transition-colors duration-200 ease-out group-hover:text-[var(--ds-primary)] dark:text-purple-300">
                  {pillar.number}
                </p>
                <h3 className="ds-h2 mt-3 transition-colors duration-200 ease-out group-hover:text-[var(--ds-primary)]">
                  {pillar.title}
                </h3>
                <p className="ds-body mt-3 max-w-[260px] text-[var(--text-secondary)]">
                  {pillar.description}
                </p>
                <span className="absolute inset-x-0 bottom-[-10px] h-px origin-left scale-x-0 bg-[var(--ds-primary)] transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </motion.article>
            ))}
          </div>
        </div>

        <div data-about-label className="absolute bottom-[-64px] right-[4%] hidden rounded-full border border-[var(--border-color)] bg-[var(--surface-strong)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] backdrop-blur-xl lg:block">
          STRATEGY / ENGINEERING / INTELLIGENCE
        </div>
      </div>
    </div>
  );
}
