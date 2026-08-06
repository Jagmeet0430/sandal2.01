"use client";

import {
  Atom,
  Bot,
  Boxes,
  Braces,
  Cloud,
  Code2,
  Database,
  ServerCog,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { LabelChip } from "@/components/common/LabelChip";

const technologies = [
  {
    name: "OpenAI",
    icon: Bot,
    position:
      "left-[4%] top-[13%] sm:left-[8%] sm:top-[11%] lg:left-[7%] lg:top-[14%]",
    delay: 0,
  },
  {
    name: "Next.js",
    icon: Code2,
    position:
      "right-[3%] top-[12%] sm:right-[8%] sm:top-[11%] lg:right-[7%] lg:top-[14%]",
    delay: 0.4,
  },
  {
    name: "React",
    icon: Atom,
    position:
      "left-[1%] top-[43%] sm:left-[4%] lg:left-[2%] lg:top-[45%]",
    delay: 0.8,
    hideOnMobile: true,
  },
  {
    name: "Python",
    icon: Braces,
    position:
      "right-[1%] top-[43%] sm:right-[4%] lg:right-[2%] lg:top-[45%]",
    delay: 1.2,
    hideOnMobile: true,
  },
  {
    name: "AWS",
    icon: Cloud,
    position:
      "bottom-[12%] left-[7%] sm:bottom-[10%] sm:left-[10%] lg:left-[8%]",
    delay: 1.6,
  },
  {
    name: "PostgreSQL",
    icon: Database,
    position:
      "bottom-[12%] right-[5%] sm:bottom-[10%] sm:right-[10%] lg:right-[8%]",
    delay: 2,
  },
  {
    name: "Node.js",
    icon: ServerCog,
    position:
      "bottom-[2%] left-1/2 -translate-x-1/2 sm:bottom-[3%]",
    delay: 2.4,
  },
];

const technologyGroups = [
  {
    title: "Artificial Intelligence",
    description:
      "Generative AI, intelligent agents, machine learning, and workflow automation.",
    icon: Sparkles,
  },
  {
    title: "Modern Applications",
    description:
      "Fast, accessible, and scalable applications built with current web technologies.",
    icon: Boxes,
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Secure hosting, deployment automation, monitoring, and reliable cloud architecture.",
    icon: Cloud,
  },
];

export function TechnologyOrbit() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="technology"
      aria-labelledby="technology-title"
      className="relative isolate overflow-hidden bg-[#061842] py-16 text-white sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.24),transparent_42%),linear-gradient(135deg,#041231_0%,#061842_52%,#08245d_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:58px_58px]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-40 top-20 -z-10 size-[420px] rounded-full bg-blue-500/15 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 -z-10 size-[460px] rounded-full bg-cyan-400/10 blur-[140px]"
      />

      <Container>
        <div className="mx-auto max-w-[850px] text-center">
          <LabelChip className="border-white/15 bg-white/10 text-blue-200">
            Technology Ecosystem
          </LabelChip>

          <h2
            id="technology-title"
            className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-[-0.035em] text-white sm:text-5xl lg:text-[56px]"
          >
            The right technologies for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              reliable digital products
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[720px] text-base leading-8 text-white/65 sm:text-lg">
            We select technologies according to your product requirements,
            scalability goals, security needs, and existing systems.
          </p>
        </div>

        <div className="relative mx-auto mt-14 min-h-[590px] max-w-[920px] sm:min-h-[680px] lg:mt-16">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[82%] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:w-[76%]" />

          <div className="absolute left-1/2 top-1/2 aspect-square w-[60%] max-w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/15" />

          <div className="absolute left-1/2 top-1/2 aspect-square w-[38%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15" />

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
            }}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[82%] max-w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            <span className="absolute left-1/2 top-[-5px] size-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,1)]" />

            <span className="absolute bottom-[8%] right-[12%] size-2.5 rounded-full bg-blue-300 shadow-[0_0_18px_rgba(147,197,253,1)]" />
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.85,
                  }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.8,
            }}
            className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[42%] max-w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-white/[0.08] p-6 text-center shadow-[0_0_100px_rgba(37,99,235,0.25)] backdrop-blur-xl"
          >
            <div className="grid size-16 place-items-center rounded-2xl bg-blue-600 shadow-[0_18px_50px_rgba(37,99,235,0.38)]">
              <Sparkles className="size-7" />
            </div>

            <p className="mt-5 text-xl font-extrabold sm:text-2xl">
              ApexMind
            </p>

            <p className="mt-2 hidden max-w-[200px] text-sm leading-6 text-white/55 sm:block">
              Strategy, design, engineering, cloud, and AI.
            </p>
          </motion.div>

          {technologies.map((technology) => {
            const Icon = technology.icon;

            return (
              <motion.div
                key={technology.name}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.8,
                        y: 18,
                      }
                }
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={{
                  opacity: {
                    duration: 0.5,
                    delay: technology.delay / 5,
                  },
                  scale: {
                    duration: 0.5,
                    delay: technology.delay / 5,
                  },
                  y: {
                    duration: 4.5 + technology.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={[
                  "absolute z-20 min-w-[112px] items-center gap-3",
                  technology.hideOnMobile ? "hidden sm:flex" : "flex",
                  "rounded-2xl border border-white/15 bg-white/10",
                  "px-4 py-3 shadow-2xl backdrop-blur-xl",
                  technology.position,
                ].join(" ")}
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-500/20 text-blue-200">
                  <Icon className="size-5" />
                </div>

                <span className="text-sm font-extrabold text-white">
                  {technology.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14">
          {technologyGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article
                key={group.title}
                className="rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:border-blue-300/30 hover:bg-white/[0.09]"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-blue-500/15 text-blue-300">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-5 text-xl font-extrabold">
                  {group.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {group.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/contact" size="lg">
            Discuss your technology needs
          </Button>
        </div>
      </Container>
    </section>
  );
}
