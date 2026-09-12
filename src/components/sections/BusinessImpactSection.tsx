import { Building2, Globe2, GraduationCap, HeartPulse, ShieldCheck, ShoppingBag, Target, Users } from "lucide-react";
import Link from "next/link";
import { impactContent } from "@/data/impact";
import { SectionLabel } from "@/components/ui/SectionLabel";

const industries = [
  { label: "Startups & SMEs", icon: Building2 },
  { label: "Education & coaching", icon: GraduationCap },
  { label: "Healthcare & clinics", icon: HeartPulse },
  { label: "Retail & e-commerce", icon: ShoppingBag },
  { label: "Professional services", icon: Users },
  { label: "International teams", icon: Globe2 },
];

const trustPoints = [
  "Clear scope before build",
  "Security-minded engineering",
  "Responsive mobile design",
  "Lead capture and admin visibility",
  "SEO and performance foundations",
  "Launch support and maintenance",
];

export function BusinessImpactSection() {
  return (
    <section id="impact" className="relative overflow-hidden bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-start">
          <div>
            <SectionLabel>{impactContent.eyebrow}</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.35rem,4vw,4.5rem)] font-semibold leading-[1.04] tracking-normal text-[var(--text)]">
              {impactContent.primary}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {impactContent.paragraph}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {impactContent.ctas.map((cta, index) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={[
                    "inline-flex min-h-12 items-center justify-center rounded-[14px] px-6 text-sm font-bold transition",
                    index === 0
                      ? "bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] text-white shadow-button hover:-translate-y-0.5"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-purple-300/35",
                  ].join(" ")}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {impactContent.benefits.map((benefit) => (
                <article key={benefit.title} className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)]">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-[13px] border border-purple-300/20 bg-purple-500/10 text-[var(--purple)]">
                      <Target aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="min-w-0 text-lg font-semibold tracking-normal text-[var(--text)]">{benefit.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{benefit.description}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)]">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden="true" className="size-5 text-emerald-300" />
                <h3 className="text-xl font-semibold tracking-normal text-[var(--text)]">What clients should expect</h3>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {trustPoints.map((point) => (
                  <span key={point} className="text-sm font-semibold text-[var(--text-secondary)]">
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
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
        </div>
      </div>
    </section>
  );
}
