import { Database, LockKeyhole, ServerCog, Sparkles } from "lucide-react";
import { technologyContent } from "@/data/technology";
import { SectionLabel } from "@/components/ui/SectionLabel";

const foundations = [
  { label: "Frontend", value: "Next.js, React, TypeScript, Tailwind CSS", icon: Sparkles },
  { label: "Backend", value: "Node.js, FastAPI, APIs, Prisma, PostgreSQL", icon: ServerCog },
  { label: "AI", value: "OpenAI, Anthropic, RAG, vector databases, AI agents", icon: Database },
  { label: "Cloud", value: "Vercel, AWS, Docker, CI/CD, monitoring, CDN security", icon: LockKeyhole },
];

export function TechnologyOverviewSection() {
  return (
    <section id="technology" className="relative overflow-hidden bg-[var(--background)] px-5 py-14 text-[var(--foreground)] sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(124,58,237,0.08),transparent_28%),radial-gradient(circle_at_40%_90%,rgba(37,99,235,0.055),transparent_24%)]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
          <div>
            <SectionLabel>{technologyContent.eyebrow}</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.35rem,4vw,4.5rem)] font-semibold leading-[1.04] tracking-normal text-[var(--text)]">
              {technologyContent.heading}
            </h2>
          </div>
          <p className="text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            {technologyContent.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {foundations.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.label} className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_18px_58px_var(--shadow-color)] sm:p-5">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[14px] border border-purple-300/20 bg-purple-500/10 text-[var(--purple)] sm:size-11">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="min-w-0 text-lg font-semibold tracking-normal text-[var(--text)] sm:text-xl">{item.label}</h3>
                </div>
                <p className="mt-3 text-xs leading-6 text-[var(--text-secondary)] sm:text-sm sm:leading-7">{item.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
