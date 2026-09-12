import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bot, Building2, ClipboardList, GraduationCap, HeartPulse, ShoppingBag } from "lucide-react";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { Footer } from "@/components/layout/Footer";
import { WorkBadge } from "@/components/sections/work/WorkBadge";
import { WorkMetric } from "@/components/sections/work/WorkMetric";
import { WorkMockup } from "@/components/sections/work/WorkMockup";
import { selectedWork } from "@/data/selected-work";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies",
  description:
    "A concise Alyvora AI Technologies portfolio preview for AI assistants, automation, custom software, CMS, web, mobile, and cloud systems.",
};

const proofCards = [
  {
    title: "AI Website Assistant",
    description: "Answers questions about services, technology, pricing process, portfolio, and contact details.",
    icon: Bot,
  },
  {
    title: "Project Enquiry System",
    description: "Captures service, budget, timeline, contact information, and project requirements for follow-up.",
    icon: ClipboardList,
  },
  {
    title: "Portfolio CMS",
    description: "Manages projects, screenshots, industries, challenges, solutions, technologies, and results.",
    icon: Building2,
  },
];

const industries = [
  { label: "Education", icon: GraduationCap },
  { label: "Healthcare", icon: HeartPulse },
  { label: "Retail", icon: ShoppingBag },
  { label: "Startups & SMEs", icon: Building2 },
];

export default function WorkPage() {
  return (
    <main id="main-content" className="bg-[var(--background)] text-[var(--foreground)]">
      <FloatingHeader />

      <section className="relative overflow-hidden px-5 pb-14 pt-32 sm:pb-16 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_30%,rgba(124,58,237,0.11),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(37,99,235,0.065),transparent_26%)]" />
        <div className="hero-stage-grid absolute inset-0" />

        <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(430px,0.86fr)] lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C4A7FF]">Portfolio / Case Studies</p>
            <h1 className="mt-5 max-w-[680px] text-[clamp(2.75rem,4.7vw,5rem)] font-semibold leading-[1.02] tracking-normal text-[var(--text)]">
              Practical AI and software systems Alyvora can build
            </h1>
            <p className="mt-6 max-w-[620px] text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              A compact portfolio preview for the products Alyvora is positioned to deliver: AI assistants,
              enquiry systems, portfolio CMS, automation, dashboards, and cloud-ready applications.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {selectedWork.badges.map((badge) => (
                <WorkBadge key={badge}>{badge}</WorkBadge>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {selectedWork.metrics.map((metric) => (
                <WorkMetric key={metric.value} metric={metric} />
              ))}
            </div>
          </div>

          <WorkMockup />
        </div>
      </section>

      <section className="relative px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-4 md:grid-cols-3">
            {proofCards.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)]">
                  <div className="grid size-10 place-items-center rounded-[14px] border border-purple-300/20 bg-purple-500/10 text-purple-200">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-normal text-[var(--text)]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)] lg:grid-cols-[0.8fr_1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">Featured concept</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-[var(--text)]">{selectedWork.title}</h2>
            </div>
            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              {selectedWork.solution}
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-[14px] border border-purple-300/25 bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] px-6 text-sm font-bold text-white shadow-button transition hover:-translate-y-0.5"
            >
              Request Quote
              <ArrowUpRight aria-hidden="true" className="ml-2 size-4 shrink-0" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {industries.map((industry) => {
              const Icon = industry.icon;

              return (
                <span key={industry.label} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text)]">
                  <Icon aria-hidden="true" className="size-4 text-[var(--purple)]" />
                  {industry.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
