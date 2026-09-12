"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { AIProductsVisual } from "@/components/sections/capabilities/AIProductsVisual";
import { AutomationVisual } from "@/components/sections/capabilities/AutomationVisual";
import { CapabilityPanel } from "@/components/sections/capabilities/CapabilityPanel";
import { CapabilityProgress } from "@/components/sections/capabilities/CapabilityProgress";
import { CloudPlatformsVisual } from "@/components/sections/capabilities/CloudPlatformsVisual";
import { DigitalIntelligenceVisual } from "@/components/sections/capabilities/DigitalIntelligenceVisual";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { capabilities, type CapabilityId } from "@/data/capabilities";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setWebGLActiveScene, setWebGLProgress } from "@/store/webgl-state";

const visualMap: Record<CapabilityId, React.ComponentType> = {
  "ai-products": AIProductsVisual,
  "custom-software": CloudPlatformsVisual,
  automation: AutomationVisual,
  "web-mobile": DigitalIntelligenceVisual,
};

const labelPositions = [0, 1.1, 2.2, 3.3];

export function CapabilitiesStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const capabilitiesProgress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleCapabilitySelect = useCallback((index: number) => {
    setActiveIndex(index);

    const trigger = ScrollTrigger.getById("apexmind-capabilities-master");

    if (!trigger) {
      document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const maxLabelPosition = labelPositions[labelPositions.length - 1];
    const targetProgress = maxLabelPosition > 0 ? labelPositions[index] / maxLabelPosition : 0;
    const targetScroll = trigger.start + (trigger.end - trigger.start) * targetProgress;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;
    const layers = layerRefs.current.filter(Boolean);

    if (!section || !stage || layers.length !== capabilities.length) {
      return undefined;
    }

    ScrollTrigger.getById("apexmind-capabilities-master")?.kill();

    const ctx = gsap.context(() => {
      const progressItems = gsap.utils.toArray<HTMLElement>("[data-capability-progress-item]");
      const progressLines = gsap.utils.toArray<HTMLElement>("[data-capability-progress-line]");
      const progressNumbers = gsap.utils.toArray<HTMLElement>("[data-capability-progress-number]");
      const connectorLengths = new WeakMap<SVGGeometryElement, number>();

      const prepareConnectors = (layer: HTMLElement, isActive: boolean) => {
        const connectors = gsap.utils.toArray<SVGGeometryElement>(layer.querySelectorAll("[data-capability-connector]"));

        connectors.forEach((connector) => {
          const length = connector.getTotalLength();
          connectorLengths.set(connector, length);

          gsap.set(connector, {
            strokeDasharray: length,
            strokeDashoffset: isActive ? 0 : length,
          });
        });
      };

      const resetConnectors = (connectors: SVGGeometryElement[]) => {
        connectors.forEach((connector) => {
          const length = connectorLengths.get(connector) ?? connector.getTotalLength();

          gsap.set(connector, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });
      };

      layers.forEach((layer, index) => {
        const children = layer.querySelectorAll("[data-capability-child]");
        const visual = layer.querySelector("[data-capability-visual]");
        const technicalLabels = layer.querySelectorAll("[data-capability-badge]");

        prepareConnectors(layer, index === 0);

        gsap.set(layer, {
          autoAlpha: index === 0 ? 1 : 0,
          pointerEvents: index === 0 ? "auto" : "none",
          zIndex: 30 - index,
          y: 0,
          scale: 1,
        });

        gsap.set(children, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 40,
        });

        gsap.set(visual, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 34,
          scale: index === 0 ? 1 : 0.98,
        });

        gsap.set(technicalLabels, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 10,
        });
      });

      gsap.set(progressItems, {
        autoAlpha: (itemIndex) => (itemIndex % capabilities.length === 0 ? 1 : 0.45),
      });

      const progressInactiveColor = getComputedStyle(document.documentElement).getPropertyValue("--text-muted").trim();
      const progressActiveColor = getComputedStyle(document.documentElement).getPropertyValue("--purple").trim();

      gsap.set(progressNumbers, {
        color: (itemIndex) => (itemIndex % capabilities.length === 0 ? progressActiveColor : progressInactiveColor),
      });

      gsap.set(progressLines, {
        scaleX: (itemIndex) => (itemIndex % capabilities.length === 0 ? 1 : 0.18),
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          id: "apexmind-capabilities-master",
          trigger: section,
          start: "top top",
          end: () => (window.innerWidth < 768 ? "+=320%" : "+=420%"),
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          onEnter: () => setWebGLActiveScene("capabilities"),
          onEnterBack: () => setWebGLActiveScene("capabilities"),
          onLeave: () => setWebGLActiveScene("none"),
          onLeaveBack: () => {
            setWebGLProgress("capabilitiesProgress", 0);
            setWebGLActiveScene("none");
          },
          onUpdate: (self) => {
            capabilitiesProgress.current = self.progress;
            section.style.setProperty("--capabilities-progress", self.progress.toFixed(4));
            setActiveIndex(Math.min(capabilities.length - 1, Math.max(0, Math.round(self.progress * (capabilities.length - 1)))));
            setWebGLProgress("capabilitiesProgress", self.progress);
          },
        },
      });

      timeline
        .addLabel("ai-products", labelPositions[0])
        .addLabel("custom-software", labelPositions[1])
        .addLabel("automation", labelPositions[2])
        .addLabel("web-mobile", labelPositions[3]);

      function activateProgress(index: number, at: number) {
        timeline
          .to(progressItems, {
            autoAlpha: (itemIndex) => (itemIndex % capabilities.length === index ? 1 : 0.45),
            duration: 0.18,
          }, at)
          .to(progressNumbers, {
            color: (itemIndex) => (itemIndex % capabilities.length === index ? progressActiveColor : progressInactiveColor),
            duration: 0.18,
          }, at)
          .to(progressLines, {
            scaleX: (itemIndex) => (itemIndex % capabilities.length === index ? 1 : 0.18),
            duration: 0.22,
          }, at);
      }

      function transitionCapability(fromIndex: number, toIndex: number, at: number) {
        const fromLayer = layers[fromIndex];
        const toLayer = layers[toIndex];
        const toChildren = gsap.utils.toArray<HTMLElement>(toLayer.querySelectorAll("[data-capability-child]"));
        const toVisual = toLayer.querySelector("[data-capability-visual]");
        const toLabels = gsap.utils.toArray<HTMLElement>(toLayer.querySelectorAll("[data-capability-badge]"));
        const toConnectors = gsap.utils.toArray<SVGGeometryElement>(toLayer.querySelectorAll("[data-capability-connector]"));
        const fromConnectors = gsap.utils.toArray<SVGGeometryElement>(fromLayer.querySelectorAll("[data-capability-connector]"));

        timeline
          .call(() => setActiveIndex(toIndex), undefined, at)
          .set(toLayer, {
            autoAlpha: 1,
            pointerEvents: "auto",
            y: 54,
            scale: 0.98,
          }, at)
          .set(toChildren, {
            autoAlpha: 0,
            y: 34,
          }, at)
          .set(toVisual, {
            autoAlpha: 0,
            y: 30,
            scale: 0.98,
          }, at)
          .set(toLabels, {
            autoAlpha: 0,
            y: 10,
          }, at)
          .call(() => {
            resetConnectors(toConnectors);
          }, undefined, at)
          .to(fromLayer, {
            autoAlpha: 0,
            y: -38,
            scale: 0.985,
            pointerEvents: "none",
            duration: 0.32,
            ease: "power1.inOut",
          }, at)
          .to(toLayer, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.34,
          }, at + 0.05)
          .to(toChildren, {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.055,
          }, at + 0.1)
          .to(toVisual, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.34,
          }, at + 0.16)
          .to(toLabels, {
            autoAlpha: 1,
            y: 0,
            duration: 0.22,
            stagger: 0.045,
          }, at + 0.25);

        if (fromConnectors.length > 0) {
          timeline.to(fromConnectors, {
            strokeDashoffset: (connectorIndex, connector) => connectorLengths.get(connector as SVGGeometryElement) ?? 0,
            duration: 0.22,
            ease: "power1.inOut",
          }, at);
        }

        if (toConnectors.length > 0) {
          timeline.to(toConnectors, {
            strokeDashoffset: 0,
            duration: 0.58,
            stagger: 0.055,
            ease: "power1.inOut",
          }, at + 0.22);
        }

        activateProgress(toIndex, at + 0.12);
      }

      transitionCapability(0, 1, 0.8);
      transitionCapability(1, 2, 1.9);
      transitionCapability(2, 3, 3.0);

      timeline.to(layers[3], {
        autoAlpha: 1,
        duration: 0.9,
      }, 3.3);

      let isMounted = true;

      document.fonts?.ready.then(() => {
        if (isMounted) {
          ScrollTrigger.refresh();
        }
      });

      return () => {
        isMounted = false;
      };
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section id="capabilities" className="section-padding relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]">
        <div className="mx-auto grid max-w-[1420px] gap-10">
          {capabilities.map((capability) => {
            const Visual = visualMap[capability.id];

            return (
              <article key={capability.id} className="grid gap-8 border-t border-[var(--border)] pt-12 lg:grid-cols-[0.42fr_0.58fr]">
                <CapabilityPanel capability={capability} />
                <div data-capability-visual>
                  <Visual />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="capabilities" className="relative bg-[var(--background)] text-[var(--foreground)]">
      <div ref={stageRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_69%_52%,rgba(124,58,237,0.07),transparent_28%),radial-gradient(circle_at_20%_78%,rgba(139,92,246,0.04),transparent_24%)] dark:bg-[radial-gradient(circle_at_70%_52%,rgba(139,61,255,0.18),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(116,83,255,0.09),transparent_28%)]" />
        <div className="hero-stage-grid absolute inset-0" />

        <div className="absolute inset-0">
          {capabilities.map((capability, index) => {
            const Visual = visualMap[capability.id];

            return (
              <div
                key={capability.id}
                ref={(node) => {
                  if (node) {
                    layerRefs.current[index] = node;
                  }
                }}
                data-capability-layer
                className="absolute inset-0 px-5 pt-24 sm:pt-28"
              >
                <div className="mx-auto grid h-full w-full max-w-[1420px] items-center gap-8 pb-20 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10 xl:gap-12">
                  <CapabilityPanel capability={capability} />
                  <div data-capability-visual className="relative z-10 min-h-[320px] lg:-ml-4 lg:min-h-[560px] xl:-ml-8">
                    <Visual />
                  </div>
                </div>
              </div>
            );
          })}

          <CapabilityProgress capabilities={capabilities} activeIndex={activeIndex} onSelect={handleCapabilitySelect} />
        </div>
      </div>
    </section>
  );
}
