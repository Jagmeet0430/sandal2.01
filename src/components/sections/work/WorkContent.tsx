import type { SelectedWork } from "@/data/selected-work";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkBadge } from "@/components/sections/work/WorkBadge";
import { WorkMetric } from "@/components/sections/work/WorkMetric";

type WorkContentProps = {
  work: SelectedWork;
};

export function WorkContent({ work }: WorkContentProps) {
  return (
    <div className="relative z-20 max-w-[610px]">
      <div data-work-reveal>
        <SectionLabel>{work.eyebrow}</SectionLabel>
      </div>

      <h2 data-work-reveal className="ds-h1 mt-6 max-w-[570px]">
        {work.heading}
      </h2>

      <div data-work-reveal className="mt-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--purple)]">FEATURED PROJECT</p>
        <h3 className="ds-h2 mt-3 max-w-[540px]">
          {work.title}
        </h3>
      </div>

      <p data-work-reveal className="ds-body mt-5 max-w-[570px]">
        {work.description}
      </p>

      <div data-work-reveal className="mt-7 grid gap-5">
        <CaseStudyCopy label="CHALLENGE">{work.challenge}</CaseStudyCopy>
        <CaseStudyCopy label="SOLUTION">{work.solution}</CaseStudyCopy>
      </div>

      <div data-work-reveal className="mt-8 grid gap-4 sm:grid-cols-3">
        {work.metrics.map((metric) => (
          <WorkMetric key={metric.value} metric={metric} />
        ))}
      </div>

      <div data-work-reveal className="mt-7 flex flex-wrap gap-2.5">
        {work.badges.map((badge) => (
          <WorkBadge key={badge}>{badge}</WorkBadge>
        ))}
      </div>

      <div data-work-reveal className="mt-8 flex flex-wrap gap-3">
        {work.ctas.map((cta) => (
          <a
            key={cta.href}
            href={cta.href}
            className={[
              "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300",
              cta.variant === "primary"
                ? "bg-gradient-to-b from-[#8B3DFF] to-[#5B16C9] text-white shadow-[0_18px_48px_rgba(139,61,255,0.28)] hover:-translate-y-0.5 hover:from-[#A855F7] hover:to-[#7453FF]"
                : "border border-white/14 bg-white/[0.045] text-white/82 hover:border-purple-200/30 hover:bg-white/[0.075] hover:text-white",
            ].join(" ")}
          >
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function CaseStudyCopy({ label, children }: { label: string; children: string }) {
  return (
    <section>
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">{label}</h4>
      <p className="ds-body mt-2 max-w-[585px]">{children}</p>
    </section>
  );
}
