import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";

type CaseStudy = {
  category: string;
  title: string;
  outcome: string;
  metrics: string[];
  tags: string[];
  visual: "mesh" | "signal" | "orbit";
};

const caseStudies: CaseStudy[] = [
  {
    category: "Financial Operations",
    title: "Real-time controls platform",
    outcome: "Unified exception handling and approval workflows across a multi-region finance team.",
    metrics: ["42% faster close cycle", "18 systems connected"],
    tags: ["Next.js", "Event APIs", "Postgres"],
    visual: "mesh",
  },
  {
    category: "Industrial Intelligence",
    title: "Predictive service command center",
    outcome: "Turned equipment telemetry into prioritized service actions for distributed field operations.",
    metrics: ["31% fewer escalations", "8 min alert triage"],
    tags: ["AI workflow", "Cloud telemetry", "Dashboards"],
    visual: "signal",
  },
  {
    category: "Enterprise SaaS",
    title: "Secure customer data workspace",
    outcome: "Built a governed collaboration layer for teams handling sensitive customer intelligence.",
    metrics: ["99.99% uptime target", "4x faster search"],
    tags: ["RBAC", "Search", "Audit logs"],
    visual: "orbit",
  },
];

function AbstractVisual({ variant }: { variant: CaseStudy["visual"] }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-xl border border-brand-border bg-[linear-gradient(135deg,rgb(246,250,255),rgb(255,255,255))]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
      {variant === "mesh" ? (
        <>
          <div className="absolute left-8 top-10 size-20 rounded-full border border-brand-primary/25 bg-brand-primary/10" />
          <div className="absolute right-10 top-12 size-14 rounded-full bg-brand-sky shadow-[0_0_48px_rgba(0,102,255,0.22)]" />
          <div className="absolute bottom-10 left-16 right-12 h-px bg-brand-primary/30" />
          <div className="absolute bottom-12 right-12 size-24 rounded-2xl border border-brand-border bg-white/80 shadow-sm" />
        </>
      ) : null}
      {variant === "signal" ? (
        <>
          <div className="absolute bottom-8 left-8 flex h-28 items-end gap-3">
            <span className="h-12 w-5 rounded-full bg-brand-sky" />
            <span className="h-20 w-5 rounded-full bg-brand-primary/35" />
            <span className="h-16 w-5 rounded-full bg-brand-primary/55" />
            <span className="h-28 w-5 rounded-full bg-brand-primary" />
          </div>
          <div className="absolute right-8 top-8 size-28 rounded-full border border-brand-primary/20 bg-white/70 shadow-soft" />
          <div className="absolute right-16 top-16 size-12 rounded-full bg-brand-primary/15" />
        </>
      ) : null}
      {variant === "orbit" ? (
        <>
          <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/25" />
          <div className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-border" />
          <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-brand-primary shadow-[0_0_52px_rgba(0,102,255,0.28)]" />
          <div className="absolute right-16 top-12 size-8 rounded-full bg-white shadow-sm ring-1 ring-brand-border" />
          <div className="absolute bottom-14 left-14 size-6 rounded-full bg-brand-sky ring-1 ring-brand-border" />
        </>
      ) : null}
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="featured-work-title" className="bg-brand-background py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="featured-work-title"
            eyebrow="Featured work"
            title="Selected systems built for measurable business momentum."
            description="A closer look at enterprise technology initiatives shaped around operational clarity, secure data movement, and durable product execution."
          />
          <Button href="/#work" variant="secondary" icon={ArrowUpRight} className="w-full sm:w-fit">
            View all work
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <article
              key={caseStudy.title}
              className="group flex h-full flex-col rounded-2xl border border-brand-border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-soft"
            >
              <AbstractVisual variant={caseStudy.visual} />

              <div className="flex grow flex-col px-2 pb-2 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-primary">
                  {caseStudy.category}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-8 text-brand-navy">{caseStudy.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{caseStudy.outcome}</p>

                <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {caseStudy.metrics.map((metric) => (
                    <div key={metric} className="rounded-brand border border-brand-border bg-brand-elevated p-3">
                      <dt className="sr-only">Result</dt>
                      <dd className="text-sm font-semibold text-brand-navy">{metric}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${caseStudy.title} technologies`}>
                  {caseStudy.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-brand-border bg-white px-3 py-1 text-xs font-medium text-brand-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-1">
                  <Button href="/#work" variant="secondary" size="sm" icon={ArrowUpRight}>
                    View case study
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
