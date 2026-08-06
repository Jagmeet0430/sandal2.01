"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Brush, Code2, FlaskConical, Search } from "lucide-react";

const steps = [
  {
    title: "Strategy",
    icon: Search,
    image: "/images/apexmind-process-strategy.svg",
    imageAlt: "ApexMind strategy workshop interface",
    description:
      "We clarify the business problem, product goals, user needs, constraints, and technical opportunities before a build begins.",
    points: [
      "Stakeholder interviews and workflow mapping",
      "Business, user, and technical requirements",
      "Opportunity sizing and product direction",
      "Clear delivery roadmap with priorities",
    ],
  },
  {
    title: "Design",
    icon: Brush,
    image: "/images/apexmind-process-design.svg",
    imageAlt: "ApexMind product design system workspace",
    description:
      "We turn strategy into a practical experience architecture, interface system, and implementation-ready product blueprint.",
    points: [
      "Information architecture and user flows",
      "Interface concepts for key workflows",
      "Design systems and reusable patterns",
      "Prototype validation before engineering",
    ],
  },
  {
    title: "Development",
    icon: Code2,
    image: "/images/apexmind-process-development.svg",
    imageAlt: "ApexMind engineering and automation dashboard",
    description:
      "We engineer reliable software in focused cycles, keeping product decisions visible and the implementation measurable.",
    points: [
      "Frontend, backend, and integration builds",
      "AI, automation, and cloud implementation",
      "Reusable components and clean architecture",
      "Continuous review with working releases",
    ],
  },
  {
    title: "Testing",
    icon: FlaskConical,
    image: "/images/apexmind-process-testing.svg",
    imageAlt: "ApexMind quality assurance and launch validation",
    description:
      "We validate quality, performance, usability, security, and launch readiness before the product reaches real users.",
    points: [
      "Functional and regression testing",
      "Performance and accessibility checks",
      "Security and integration validation",
      "Launch support with improvement planning",
    ],
  },
];

export function ProcessTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const selectedStep = steps[activeTab];
  const tabIds = useMemo(() => steps.map((step) => `process-tab-${step.title.toLowerCase()}`), []);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? steps.length - 1
          : event.key === "ArrowRight"
            ? (index + 1) % steps.length
            : (index - 1 + steps.length) % steps.length;

    setActiveTab(nextIndex);
    document.getElementById(tabIds[nextIndex])?.focus();
  }

  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-[#f7faff] shadow-[0_30px_90px_rgba(7,24,56,0.09)] dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
      <div
        role="tablist"
        aria-label="Development process"
        className="grid border-b border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/[0.04]"
      >
        {steps.map((step, index) => {
          const isActive = activeTab === index;
          const Icon = step.icon;

          return (
            <button
              id={tabIds[index]}
              key={step.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="process-tab-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={[
                "group relative flex min-h-[92px] items-center gap-4 px-5 py-5 text-left transition",
                "border-b border-slate-200 sm:border-r dark:border-white/10",
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:bg-transparent dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white",
              ].join(" ")}
            >
              <div
                className={[
                  "grid size-11 shrink-0 place-items-center rounded-xl transition",
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-blue-50 text-blue-600 group-hover:bg-white dark:bg-white/5 dark:text-purple-200 dark:group-hover:bg-white/10",
                ].join(" ")}
              >
                <Icon className="size-5" />
              </div>

              <div>
                <p
                  className={[
                    "text-xs font-bold uppercase tracking-[0.14em]",
                    isActive ? "text-blue-100" : "text-slate-400 dark:text-white/35",
                  ].join(" ")}
                >
                  Step {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-1 text-base font-extrabold">{step.title}</p>
              </div>

              {isActive ? <span className="absolute inset-x-0 bottom-0 h-1 bg-cyan-300" /> : null}
            </button>
          );
        })}
      </div>

      <div id="process-tab-panel" role="tabpanel" aria-labelledby={tabIds[activeTab]} className="grid items-stretch lg:grid-cols-[0.95fr_1.05fr]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center p-7 sm:p-10 lg:p-14"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600 dark:text-purple-300">
              Our methodology
            </p>

            <h3 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[#071838] sm:text-4xl dark:text-white">
              {selectedStep.title}
            </h3>

            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-white/55">
              {selectedStep.description}
            </p>

            <ul className="mt-8 space-y-4">
              {selectedStep.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-600 dark:text-white/60">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-blue-600 dark:bg-purple-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="mt-9 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-blue-600 transition hover:gap-3 dark:text-purple-300"
            >
              Discuss your project
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </AnimatePresence>

        <div className="relative min-h-[340px] overflow-hidden bg-[#071e52] sm:min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStep.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={selectedStep.image}
                alt={selectedStep.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071838]/65 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-[330px]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
              Current stage
            </p>

            <p className="mt-2 text-xl font-extrabold">{selectedStep.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
