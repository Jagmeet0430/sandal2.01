"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollStory() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("main > section");

      sections.slice(1).forEach((section) => {
        gsap.fromTo(
          section,
          {
            autoAlpha: 0.72,
            y: 72,
            filter: "blur(10px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              end: "top 44%",
              scrub: 0.8,
            },
          },
        );
      });

      gsap.to("body", {
        "--scene-glow-x": "72%",
        "--scene-glow-y": "38%",
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
