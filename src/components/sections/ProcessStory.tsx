"use client";

import { useLayoutEffect, useRef } from "react";
import { ProcessProgress } from "@/components/sections/process/ProcessProgress";
import { ProcessStage } from "@/components/sections/process/ProcessStage";
import { ProcessTimeline } from "@/components/sections/process/ProcessTimeline";
import { ProcessVisual } from "@/components/sections/process/ProcessVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { processStages } from "@/data/process";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setWebGLActiveScene, setWebGLProgress } from "@/store/webgl-state";

const labelPositions = [0, 1.1, 2.2, 3.3, 4.4];

export function ProcessStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLElement[]>([]);
  const processProgress = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;
    const panels = panelRefs.current.filter(Boolean);

    if (!section || !stage || panels.length !== processStages.length) {
      return undefined;
    }

    ScrollTrigger.getById("apexmind-process-master")?.kill();

    const ctx = gsap.context(() => {
      const visual = section.querySelector("[data-process-visual]");
      const rings = gsap.utils.toArray<SVGElement>("[data-process-orbit-ring]");
      const web = gsap.utils.toArray<SVGElement>("[data-process-connector-web]");
      const core = section.querySelector("[data-process-core]");
      const orbitNodes = gsap.utils.toArray<HTMLElement>("[data-process-orbit-node]");
      const nodeGlows = gsap.utils.toArray<HTMLElement>("[data-process-node-glow]");
      const visualLabels = gsap.utils.toArray<HTMLElement>("[data-process-visual-label]");
      const visualChips = gsap.utils.toArray<HTMLElement>("[data-process-visual-chip]");
      const timelineItems = gsap.utils.toArray<HTMLElement>("[data-process-timeline-item]");
      const timelineNodes = gsap.utils.toArray<HTMLElement>("[data-process-timeline-node]");
      const timelineLabels = gsap.utils.toArray<HTMLElement>("[data-process-timeline-label]");
      const timelineLines = gsap.utils.toArray<HTMLElement>("[data-process-timeline-line]");
      const progressNumbers = gsap.utils.toArray<HTMLElement>("[data-process-progress-number]");
      const progressLines = gsap.utils.toArray<HTMLElement>("[data-process-progress-line]");

      panels.forEach((panel, index) => {
        const children = panel.querySelectorAll("[data-process-child]");

        gsap.set(panel, {
          autoAlpha: index === 0 ? 1 : 0,
          pointerEvents: index === 0 ? "auto" : "none",
          zIndex: 30 - index,
          y: 0,
          scale: 1,
        });

        gsap.set(children, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 34,
        });
      });

      gsap.set(visual, {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
      });

      gsap.set(rings, {
        transformOrigin: "center center",
        scale: 1,
        rotate: 0,
      });

      gsap.set(web, {
        transformOrigin: "center center",
        autoAlpha: 0.55,
        scale: 0.94,
      });

      gsap.set(core, {
        transformOrigin: "center center",
        scale: 0.92,
        rotate: -8,
      });

      gsap.set(visualChips, {
        autoAlpha: 0.42,
        y: 0,
      });

      gsap.set(timelineItems, {
        autoAlpha: 0.45,
      });

      gsap.set(orbitNodes, {
        autoAlpha: 0.45,
      });

      gsap.set(progressNumbers, {
        autoAlpha: 0.45,
      });

      const rootStyle = getComputedStyle(document.documentElement);
      const processText = rootStyle.getPropertyValue("--text").trim();
      const processSecondary = rootStyle.getPropertyValue("--text-secondary").trim();
      const processMuted = rootStyle.getPropertyValue("--text-muted").trim();
      const processBorder = rootStyle.getPropertyValue("--border-strong").trim();
      const processBorderSoft = rootStyle.getPropertyValue("--border").trim();
      const processSurface = rootStyle.getPropertyValue("--surface-elevated").trim();
      const processPurple = rootStyle.getPropertyValue("--purple").trim();

      gsap.set([timelineNodes, orbitNodes], {
        borderColor: processBorder,
        backgroundColor: processSurface,
        color: processMuted,
        boxShadow: `0 0 0 1px ${processBorderSoft}`,
      });

      gsap.set(timelineLabels, {
        color: processMuted,
      });

      gsap.set(timelineLines, {
        scaleY: 0,
      });

      gsap.set(progressLines, {
        scaleX: 0.16,
      });

      gsap.set(visualLabels, {
        autoAlpha: 0,
        y: 8,
      });

      gsap.set([timelineItems[0], orbitNodes[0], progressNumbers[0]], {
        autoAlpha: 1,
      });

      gsap.set([timelineNodes[0], orbitNodes[0]], {
        borderColor: processPurple,
        backgroundColor: "rgba(139,61,255,0.18)",
        color: processText,
        boxShadow: "0 0 26px rgba(139,61,255,0.46), 0 0 0 1px rgba(216,180,254,0.18)",
      });

      gsap.set(timelineLabels[0], {
        color: processText,
      });

      gsap.set(nodeGlows[0], {
        backgroundColor: "rgba(139,61,255,0.42)",
      });

      gsap.set([visualLabels[0]], {
        autoAlpha: 1,
        y: 0,
      });

      gsap.set([progressLines[0]], {
        scaleX: 1,
      });

      function setActive(index: number, at: number) {
        timeline
          .to(timelineItems, {
            autoAlpha: (itemIndex) => (itemIndex === index ? 1 : 0.42),
            duration: 0.18,
          }, at)
          .to(orbitNodes, {
            autoAlpha: (itemIndex) => (itemIndex === index ? 1 : 0.42),
            duration: 0.18,
          }, at)
          .to(progressNumbers, {
            autoAlpha: (itemIndex) => (itemIndex === index ? 1 : 0.42),
            duration: 0.18,
          }, at)
          .to(timelineNodes, {
            borderColor: (itemIndex) => (itemIndex === index ? processPurple : processBorder),
            backgroundColor: (itemIndex) => (itemIndex === index ? "rgba(139,61,255,0.18)" : "rgba(255,255,255,0.035)"),
            color: (itemIndex) => (itemIndex === index ? processText : processMuted),
            boxShadow: (itemIndex) => (
              itemIndex === index
                ? "0 0 26px rgba(139,61,255,0.46), 0 0 0 1px rgba(216,180,254,0.18)"
                : `0 0 0 1px ${processBorderSoft}`
            ),
            duration: 0.22,
          }, at)
          .to(orbitNodes, {
            borderColor: (itemIndex) => (itemIndex === index ? processPurple : processBorder),
            backgroundColor: (itemIndex) => (itemIndex === index ? "rgba(139,61,255,0.18)" : "rgba(255,255,255,0.035)"),
            color: (itemIndex) => (itemIndex === index ? processText : processMuted),
            boxShadow: (itemIndex) => (
              itemIndex === index
                ? "0 0 26px rgba(139,61,255,0.46), 0 0 0 1px rgba(216,180,254,0.18)"
                : `0 0 0 1px ${processBorderSoft}`
            ),
            duration: 0.22,
          }, at)
          .to(timelineLabels, {
            color: (itemIndex) => (itemIndex === index ? processText : processSecondary),
            duration: 0.18,
          }, at)
          .to(nodeGlows, {
            backgroundColor: (itemIndex) => (itemIndex === index ? "rgba(139,61,255,0.42)" : "rgba(139,61,255,0)"),
            duration: 0.2,
          }, at)
          .to(progressLines, {
            scaleX: (itemIndex) => (itemIndex <= index ? 1 : 0.16),
            duration: 0.24,
          }, at)
          .to(timelineLines, {
            scaleY: (itemIndex) => (itemIndex < index ? 1 : 0),
            duration: 0.24,
          }, at)
          .to(visualLabels, {
            autoAlpha: (itemIndex) => (itemIndex === index ? 1 : 0),
            y: (itemIndex) => (itemIndex === index ? 0 : 8),
            duration: 0.2,
          }, at)
          .to(visualChips, {
            autoAlpha: (itemIndex) => (itemIndex === index ? 0.8 : 0.36),
            y: (itemIndex) => (itemIndex === index ? -6 : 0),
            duration: 0.22,
          }, at);
      }

      function transitionStage(fromIndex: number, toIndex: number, at: number) {
        const fromPanel = panels[fromIndex];
        const toPanel = panels[toIndex];
        const toChildren = gsap.utils.toArray<HTMLElement>(toPanel.querySelectorAll("[data-process-child]"));

        timeline
          .set(toPanel, {
            autoAlpha: 1,
            pointerEvents: "auto",
            y: 45,
            scale: 0.985,
          }, at)
          .set(toChildren, {
            autoAlpha: 0,
            y: 28,
          }, at)
          .to(fromPanel, {
            autoAlpha: 0,
            y: -30,
            scale: 0.985,
            pointerEvents: "none",
            duration: 0.3,
            ease: "power1.inOut",
          }, at)
          .to(toPanel, {
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
          }, at + 0.1);

        setActive(toIndex, at + 0.1);
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          id: "apexmind-process-master",
          trigger: section,
          start: "top top",
          end: () => (window.innerWidth < 768 ? "+=360%" : "+=500%"),
          scrub: 1,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          onEnter: () => setWebGLActiveScene("process"),
          onEnterBack: () => setWebGLActiveScene("process"),
          onLeave: () => setWebGLActiveScene("none"),
          onLeaveBack: () => {
            setWebGLProgress("processProgress", 0);
            setWebGLActiveScene("none");
          },
          onUpdate: (self) => {
            processProgress.current = self.progress;
            section.style.setProperty("--process-progress", self.progress.toFixed(4));
            setWebGLProgress("processProgress", self.progress);
          },
        },
      });

      timeline
        .addLabel("discover", labelPositions[0])
        .addLabel("define", labelPositions[1])
        .addLabel("build", labelPositions[2])
        .addLabel("validate", labelPositions[3])
        .addLabel("scale", labelPositions[4]);

      setActive(0, 0);

      timeline
        .to(core, {
          scale: 0.98,
          rotate: -2,
          duration: 0.85,
        }, 0)
        .to(rings, {
          rotate: (index) => [4, -5, 7][index] ?? 0,
          duration: 0.85,
        }, 0);

      transitionStage(0, 1, 0.8);
      timeline
        .to(core, {
          scale: 1.02,
          rotate: 4,
          duration: 0.75,
        }, 1.1)
        .to(web, {
          autoAlpha: 0.72,
          scale: 1,
          duration: 0.75,
        }, 1.1)
        .to(rings, {
          scale: (index) => [0.98, 0.96, 1.02][index] ?? 1,
          duration: 0.75,
        }, 1.1);

      transitionStage(1, 2, 1.9);
      timeline
        .to(core, {
          scale: 1.08,
          rotate: 12,
          duration: 0.75,
        }, 2.2)
        .to(web, {
          autoAlpha: 0.9,
          scale: 1.04,
          duration: 0.75,
        }, 2.2);

      transitionStage(2, 3, 3.0);
      timeline
        .to(rings, {
          scale: 0.9,
          duration: 0.75,
        }, 3.3)
        .to(core, {
          scale: 1,
          rotate: 18,
          duration: 0.75,
        }, 3.3)
        .to(visualChips, {
          borderColor: "rgba(216,180,254,0.22)",
          duration: 0.4,
        }, 3.35);

      transitionStage(3, 4, 4.1);
      timeline
        .to(rings, {
          scale: 1.08,
          rotate: (index) => [10, -12, 14][index] ?? 0,
          duration: 0.8,
        }, 4.4)
        .to(core, {
          scale: 1.12,
          rotate: 26,
          duration: 0.8,
        }, 4.4)
        .to(web, {
          autoAlpha: 1,
          scale: 1.08,
          duration: 0.8,
        }, 4.4)
        .to(panels[4], {
          autoAlpha: 1,
          duration: 0.8,
        }, 4.4);

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
      <section id="process" className="section-padding relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]">
        <div className="mx-auto grid max-w-[1420px] gap-12">
          <div className="max-w-[800px]">
            <SectionLabel>OUR PROCESS</SectionLabel>
            <h2 className="ds-display mt-5">
              A focused process from first idea to long-term growth
            </h2>
            <p className="ds-body mt-6 max-w-[680px]">
              Alyvora combines product strategy, engineering, validation, and continuous improvement to turn complex ideas into reliable systems.
            </p>
          </div>
          <ProcessVisual />
          <div className="grid gap-8 md:grid-cols-2">
            {processStages.map((stage) => (
              <article key={stage.id} className="border-t border-[var(--border)] pt-6">
                <p className="text-sm font-semibold tracking-[0.24em] text-purple-200/70">{stage.number}</p>
                <h3 className="ds-h2 mt-3">{stage.title}</h3>
                <p className="ds-body mt-4">{stage.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="process" className="relative bg-[var(--background)] text-[var(--foreground)]">
      <div ref={stageRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(124,58,237,0.065),transparent_27%),radial-gradient(circle_at_18%_84%,rgba(139,92,246,0.035),transparent_24%)] dark:bg-[radial-gradient(circle_at_72%_48%,rgba(139,61,255,0.16),transparent_32%),radial-gradient(circle_at_18%_84%,rgba(116,83,255,0.08),transparent_27%)]" />
        <div className="hero-stage-grid absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200/20 to-transparent" />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1420px] items-start gap-5 px-5 pt-32 pb-8 sm:gap-7 sm:pt-32 sm:pb-14 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10 lg:pt-32 lg:pb-20 xl:gap-12">
          <div className="relative z-20 flex min-h-0 flex-col">
            <div>
              <SectionLabel>OUR PROCESS</SectionLabel>
              <h2 className="ds-h1 mt-3 max-w-[660px] sm:mt-4">
                A focused process from first idea to long-term growth
              </h2>
              <p className="ds-body mt-4 max-w-[580px]">
                Alyvora combines product strategy, engineering, validation, and continuous improvement to turn complex ideas into reliable systems.
              </p>
            </div>

            <ProcessTimeline />

            <div className="relative mt-4 min-h-[215px] sm:mt-5 sm:min-h-[220px] lg:mt-7 lg:min-h-[240px]">
              {processStages.map((stage, index) => (
                <ProcessStage
                  key={stage.id}
                  stage={stage}
                  index={index}
                  ref={(node: HTMLElement | null) => {
                    if (node) {
                      panelRefs.current[index] = node;
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 flex min-h-[210px] items-center justify-center sm:min-h-[280px] lg:min-h-[calc(100vh-13rem)]">
            <ProcessVisual />
          </div>
        </div>

        <ProcessProgress />
      </div>
    </section>
  );
}
