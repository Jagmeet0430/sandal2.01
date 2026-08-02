"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const trustItems = ["Secure by design", "Cloud-native delivery", "Built for scale"];

const nodePositions = [
  "left-[14%] top-[22%]",
  "right-[17%] top-[18%]",
  "left-[22%] bottom-[19%]",
  "right-[12%] bottom-[24%]",
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-background py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(0,102,255,0.14),transparent_30%),radial-gradient(circle_at_84%_26%,rgba(125,211,252,0.24),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,250,255,0.98))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex max-w-full items-start gap-2 rounded-full border border-brand-border bg-white/80 px-3 py-1.5 text-sm font-medium leading-6 text-brand-muted shadow-sm sm:items-center">
            <Sparkles aria-hidden="true" className="size-4 text-brand-primary" />
            <span>Enterprise systems with product-grade polish</span>
          </div>

          <h1
            id="hero-title"
            className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-brand-navy sm:text-6xl lg:text-7xl"
          >
            Build the technology layer that moves your company{" "}
            <span className="text-brand-primary">faster.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted sm:text-xl">
            We design and engineer secure digital platforms, intelligent workflows, and resilient cloud systems for
            ambitious teams ready to modernize with clarity.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/#demo" size="lg" icon={ArrowRight}>
              Start a project
            </Button>
            <Button href="/#platform" variant="secondary" size="lg">
              Explore platform
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-brand-border pt-6 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="text-sm font-semibold text-brand-navy">Trusted foundation for modern teams</p>
            <div className="flex flex-wrap gap-3">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-brand-muted shadow-sm ring-1 ring-brand-border"
                >
                  <CheckCircle2 aria-hidden="true" className="size-4 text-brand-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : 0.12, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl lg:mr-0"
          aria-hidden="true"
        >
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-soft">
            <div className="absolute inset-6 rounded-[1.5rem] border border-brand-border bg-[linear-gradient(135deg,rgba(224,242,255,0.75),rgba(255,255,255,0.95))]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/25 bg-brand-primary/10 shadow-[0_0_80px_rgba(0,102,255,0.18)] sm:size-52" />
            <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-soft ring-1 ring-brand-border sm:size-32">
              <div className="grid size-full place-items-center rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.16),transparent_64%)]">
                <ShieldCheck className="size-10 text-brand-primary sm:size-12" />
              </div>
            </div>

            <div className="absolute left-[21%] right-[21%] top-1/2 h-px bg-brand-primary/25" />
            <div className="absolute bottom-[21%] left-1/2 top-[21%] w-px bg-brand-primary/25" />
            <div className="absolute left-[25%] top-[27%] h-px w-1/2 rotate-45 bg-brand-primary/20" />
            <div className="absolute bottom-[28%] left-[24%] h-px w-1/2 -rotate-45 bg-brand-primary/20" />

            {nodePositions.map((position) => (
              <div
                key={position}
                className={`absolute grid size-16 place-items-center rounded-2xl border border-brand-border bg-white/90 shadow-sm ${position}`}
              >
                <div className="size-5 rounded-full bg-brand-primary shadow-[0_0_26px_rgba(0,102,255,0.48)]" />
              </div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-brand-border bg-white/90 p-4 shadow-soft backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">Signal quality</p>
                  <p className="mt-1 text-2xl font-semibold text-brand-navy">99.98%</p>
                </div>
                <div className="flex h-12 items-end gap-1.5">
                  <span className="h-5 w-2 rounded-full bg-brand-sky" />
                  <span className="h-8 w-2 rounded-full bg-brand-primary/40" />
                  <span className="h-10 w-2 rounded-full bg-brand-primary/70" />
                  <span className="h-12 w-2 rounded-full bg-brand-primary" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
