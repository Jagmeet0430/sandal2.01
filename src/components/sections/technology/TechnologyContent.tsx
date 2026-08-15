import { technologyContent } from "@/data/technology";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function TechnologyContent() {
  return (
    <div className="relative z-30 max-w-[560px]">
      <div data-technology-content="eyebrow">
        <SectionLabel>{technologyContent.eyebrow}</SectionLabel>
      </div>
      <h2
        data-technology-content="heading"
        className="ds-display mt-7"
      >
        Technology
        <br />
        chosen for
        <br />
        real-world
        <br />
        <span className="bg-[linear-gradient(90deg,var(--gradient-heading-start),var(--gradient-heading-mid),var(--gradient-heading-end))] bg-clip-text text-transparent">
          reliability
        </span>
      </h2>
      <p
        data-technology-content="copy"
        className="ds-body mt-8 max-w-[530px]"
      >
        We select tools according to product requirements, security, performance, integrations,
        and long-term scalability.
      </p>

      <div data-technology-content="cta" className="mt-9">
        <Link
          href="#contact"
          className="inline-flex text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--text-secondary)] transition hover:text-[var(--purple)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 dark:text-white/58 dark:hover:text-purple-200"
        >
          Discuss your technology needs -&gt;
        </Link>
      </div>

      <p
        data-technology-content="detail"
        className="sr-only"
      >
        {technologyContent.detail}
      </p>
    </div>
  );
}
