"use client";

import { useLayoutEffect, useRef } from "react";
import { ContactCard } from "@/components/sections/contact/ContactCard";
import { ContactContent } from "@/components/sections/contact/ContactContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    ScrollTrigger.getById("apexmind-contact")?.kill();

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-contact-content='eyebrow']");
      const heading = section.querySelector("[data-contact-content='heading']");
      const copy = section.querySelector("[data-contact-content='copy']");
      const email = section.querySelector("[data-contact-content='email']");
      const details = gsap.utils.toArray<HTMLElement>("[data-contact-detail]");
      const card = section.querySelector("[data-contact-card]");
      const cardItems = gsap.utils.toArray<HTMLElement>("[data-contact-card-item]");
      const ctas = gsap.utils.toArray<HTMLElement>("[data-contact-cta]");

      gsap.set(eyebrow, { autoAlpha: 1, y: 0 });
      gsap.set(heading, { autoAlpha: 1, y: 0 });
      gsap.set(copy, { autoAlpha: 1, y: 0 });
      gsap.set(email, { autoAlpha: 1, y: 0 });
      gsap.set(details, { autoAlpha: 1, y: 0 });
      gsap.set(card, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        transformOrigin: "center center",
      });
      gsap.set(cardItems, { autoAlpha: 1, y: 0 });
      gsap.set(ctas, { scale: 1 });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          id: "apexmind-contact",
          trigger: section,
          start: "top 86%",
          end: "bottom 42%",
          scrub: 0.8,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      timeline
        .from(eyebrow, { autoAlpha: 0, y: 20, duration: 0.24 }, 0)
        .from(heading, { autoAlpha: 0, y: 45, duration: 0.42 }, 0.08)
        .from(copy, { autoAlpha: 0, y: 30, duration: 0.32 }, 0.2)
        .from(email, { autoAlpha: 0, y: 20, duration: 0.28 }, 0.34)
        .from(details, { autoAlpha: 0, y: 18, duration: 0.26, stagger: 0.06 }, 0.44)
        .from(card, { autoAlpha: 0, x: 50, scale: 0.98, duration: 0.5 }, 0.16)
        .from(cardItems, { autoAlpha: 0, y: 18, duration: 0.28, stagger: 0.05 }, 0.32)
        .from(ctas, { scale: 0.98, duration: 0.2 }, 0.68);

      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(124,58,237,0.065),transparent_25%),radial-gradient(circle_at_16%_88%,rgba(139,92,246,0.03),transparent_24%)] dark:bg-[radial-gradient(circle_at_74%_42%,rgba(139,61,255,0.16),transparent_28%),radial-gradient(circle_at_16%_88%,rgba(116,83,255,0.06),transparent_27%)]" />
      <div className="hero-stage-grid absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200/18 to-transparent" />

      <div className="relative mx-auto grid max-w-[1420px] items-center gap-12 lg:min-h-[720px] lg:grid-cols-[0.42fr_0.58fr] lg:gap-16 xl:gap-20">
        <ContactContent />
        <ContactCard />
      </div>
    </section>
  );
}
