import { CheckCircle2 } from "lucide-react";
import { processStages } from "@/data/process";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function DeliveryProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
          <div>
            <SectionLabel>Delivery Process</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.35rem,4vw,4.5rem)] font-semibold leading-[1.04] tracking-normal text-[var(--text)]">
              A clear path from first call to launch
            </h2>
          </div>
          <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            A professional website or platform should not drift forever. Alyvora works in practical
            phases with visible outputs, checkpoints, testing, and launch readiness.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          {processStages.map((stage) => (
            <article key={stage.id} className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">Stage {stage.number}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-normal text-[var(--text)]">{stage.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{stage.description}</p>
              <div className="mt-5 grid gap-2">
                {stage.points.map((point) => (
                  <span key={point} className="flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
                    <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-cyan-200" />
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
