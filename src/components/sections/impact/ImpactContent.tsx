import { impactContent } from "@/data/impact";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ImpactContent() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 mx-auto flex max-w-[1140px] -translate-y-1/2 flex-col items-center px-5 text-center">
      <div data-impact-content="eyebrow">
        <SectionLabel>{impactContent.eyebrow}</SectionLabel>
      </div>

      <h2
        data-impact-statement="primary"
        className="ds-display mt-6 max-w-[980px]"
      >
        {impactContent.primary}
      </h2>

      <p
        data-impact-content="copy"
        className="ds-body mt-7 max-w-[780px] font-semibold"
      >
        {impactContent.paragraph}
      </p>

      <div
        data-impact-content="benefits"
        className="mt-8 grid w-full max-w-[1040px] gap-3 md:grid-cols-3"
      >
        {impactContent.benefits.map((benefit) => (
          <article
            key={benefit.title}
            data-impact-benefit
            className="ds-card rounded-[18px] bg-[var(--surface)]/76 px-5 py-4 text-left backdrop-blur-sm dark:bg-black/28"
          >
            <h3 className="text-sm font-semibold text-[var(--text)]">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{benefit.description}</p>
          </article>
        ))}
      </div>

      <div data-impact-content="ctas" className="mt-7 flex flex-wrap justify-center gap-3">
        {impactContent.ctas.map((cta, index) => (
          <a
            key={cta.href}
            data-impact-cta
            href={cta.href}
            className={[
              "pointer-events-auto inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B3DFF]",
              index === 0
                ? "bg-gradient-to-b from-[#8B3DFF] to-[#5B16C9] text-white shadow-[0_18px_50px_rgba(139,61,255,0.34)] hover:-translate-y-0.5 hover:from-[#A855F7] hover:to-[#6D28D9]"
                : "border border-[var(--border-strong)] bg-[var(--surface)]/70 text-[var(--text)] hover:border-purple-400/35 hover:bg-[var(--surface-elevated)]",
            ].join(" ")}
          >
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}
