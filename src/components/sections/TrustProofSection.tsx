import { Award, Bot, Code2, Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const logoPlaceholders = ["Client One", "Partner Two", "Studio Three", "Venture Four", "Clinic Five"];

const caseStudies = Array.from({ length: 3 }, (_, index) => ({
  id: `case-study-${index + 1}`,
  projectName: "{{project_name}}",
  challenge: "{{challenge}}",
  solution: "{{solution}}",
  metrics: ["{{metric_1}}", "{{metric_2}}", "{{metric_3}}"],
}));

const credibilityBadges = [
  { label: "Years of experience", icon: Award },
  { label: "AI + software systems", icon: Cpu },
  { label: "Cloud-ready builds", icon: ShieldCheck },
];

export function TrustProofSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(124,58,237,0.08),transparent_26%),radial-gradient(circle_at_16%_76%,rgba(37,99,235,0.055),transparent_24%)]" />

      <div className="relative mx-auto max-w-[1240px]">
        <TrustStrip />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
          <div>
            <SectionLabel>Trust & Proof</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.35rem,4vw,4.5rem)] font-semibold leading-[1.04] tracking-normal text-[var(--text)]">
              Evidence clients can understand before they commit
            </h2>
          </div>
          <p className="max-w-[660px] text-base leading-8 text-[var(--text-secondary)] sm:text-lg lg:ml-auto">
            Use this section to show who Alyvora works with, what problems were solved, and the
            credibility behind the team building the system.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>

        <FounderBlock />
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_18px_58px_var(--shadow-color)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">
          Trusted By
        </p>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {logoPlaceholders.map((logo) => (
            <div
              key={logo}
              className="group inline-flex min-h-12 items-center justify-center rounded-[14px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--text-muted)] grayscale transition-[border-color,color,filter,transform] duration-200 hover:-translate-y-0.5 hover:border-purple-300/35 hover:text-[var(--purple)] hover:grayscale-0"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: {
    projectName: string;
    challenge: string;
    solution: string;
    metrics: string[];
  };
  index: number;
}) {
  return (
    <article className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)] transition hover:-translate-y-0.5 hover:border-purple-300/30">
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-10 place-items-center rounded-[14px] border border-purple-300/20 bg-purple-500/10 text-purple-200">
          {index === 0 ? <Bot aria-hidden="true" className="size-5" /> : null}
          {index === 1 ? <Code2 aria-hidden="true" className="size-5" /> : null}
          {index === 2 ? <Sparkles aria-hidden="true" className="size-5" /> : null}
        </div>
        <span className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--purple)]">
          Featured Project
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-normal text-[var(--text)]">
        {study.projectName}
      </h3>

      <div className="mt-5 grid gap-4">
        <CaseStudyCopy label="Challenge">{study.challenge}</CaseStudyCopy>
        <CaseStudyCopy label="Solution">{study.solution}</CaseStudyCopy>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {study.metrics.map((metric) => (
          <span
            key={metric}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2 text-xs font-bold text-[var(--text)]"
          >
            {metric}
          </span>
        ))}
      </div>
    </article>
  );
}

function CaseStudyCopy({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}

function FounderBlock() {
  return (
    <div className="mt-4 grid gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)] md:grid-cols-[auto_1fr] md:items-center md:p-6">
      <div className="grid size-24 place-items-center rounded-full border border-purple-300/25 bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] text-3xl font-extrabold text-white shadow-button sm:size-28">
        AV
      </div>

      <div>
        <SectionLabel className="text-[var(--purple)]">Founder Credibility</SectionLabel>
        <h3 className="mt-3 text-2xl font-semibold tracking-normal text-[var(--text)] sm:text-3xl">
          {"{{founder_name}}"}
        </h3>
        <p className="mt-1 text-sm font-bold text-[var(--purple)]">{"{{founder_title}}"}</p>
        <p className="mt-4 max-w-[780px] text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
          {"{{founder_bio_sentence_1}} {{founder_bio_sentence_2}} {{founder_bio_sentence_3}}"}
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {credibilityBadges.map((badge) => {
            const Icon = badge.icon;

            return (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--purple)] dark:bg-white/[0.045]"
              >
                <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
