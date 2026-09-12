import type { SelectedWork } from "@/data/selected-work";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkBadge } from "@/components/sections/work/WorkBadge";
import { WorkMetric } from "@/components/sections/work/WorkMetric";
import { ArrowUpRight, CalendarDays } from "lucide-react";

type WorkContentProps = {
  work: SelectedWork;
};

export function WorkContent({ work }: WorkContentProps) {
  return (
    <div className="relative z-20 max-w-[620px]">
      <div data-work-reveal>
        <SectionLabel>{work.eyebrow}</SectionLabel>
      </div>

      <h2
        data-work-reveal
        className="mt-5 max-w-[610px] text-[clamp(2.25rem,3.4vw,3.875rem)] font-semibold leading-[1.04] tracking-normal text-[var(--text)]"
      >
        {work.heading}
      </h2>

      <p data-work-reveal className="mt-5 max-w-[590px] text-base leading-7 text-[var(--text-secondary)]">
        {work.description}
      </p>

      <div data-work-reveal className="mt-6 flex flex-wrap gap-2.5">
        {work.badges.map((badge) => (
          <WorkBadge key={badge}>{badge}</WorkBadge>
        ))}
      </div>

      <div data-work-reveal className="mt-7 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_20px_64px_var(--shadow-color)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--purple)]">FEATURED PROJECT</p>
        <h3 className="mt-3 max-w-[520px] text-[clamp(1.75rem,2.4vw,2.25rem)] font-semibold leading-[1.12] tracking-normal text-[var(--text)]">
          {work.title}
        </h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <CaseStudyCopy label="CHALLENGE">{work.challenge}</CaseStudyCopy>
          <CaseStudyCopy label="SOLUTION">{work.solution}</CaseStudyCopy>
        </div>
      </div>

      <div data-work-reveal className="mt-4 grid gap-3 sm:grid-cols-3">
        {work.metrics.map((metric) => (
          <WorkMetric key={metric.value} metric={metric} />
        ))}
      </div>

      <div data-work-reveal className="mt-6 flex flex-wrap gap-3">
        {work.ctas.map((cta) => (
          <Link
            key={cta.href}
            href={cta.href}
            className={[
              "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300",
              cta.variant === "primary"
                ? "bg-gradient-to-b from-[#8B3DFF] to-[#5B16C9] text-white shadow-[0_18px_48px_rgba(139,61,255,0.28)] hover:-translate-y-0.5 hover:from-[#A855F7] hover:to-[#7453FF]"
                : "border border-white/14 bg-white/[0.045] text-white/82 hover:border-purple-200/30 hover:bg-white/[0.075] hover:text-white",
            ].join(" ")}
          >
            <span>{cta.label}</span>
            {cta.variant === "primary" ? (
              <ArrowUpRight aria-hidden="true" className="ml-2 size-4 shrink-0" />
            ) : (
              <CalendarDays aria-hidden="true" className="ml-2 size-4 shrink-0" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function CaseStudyCopy({ label, children }: { label: string; children: string }) {
  return (
    <section>
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">{label}</h4>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{children}</p>
    </section>
  );
}
