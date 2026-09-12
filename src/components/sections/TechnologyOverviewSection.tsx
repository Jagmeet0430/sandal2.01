import { Database, LockKeyhole, ServerCog, Sparkles } from "lucide-react";
import { technologyCategories, technologyContent, technologyLabels } from "@/data/technology";
import { SectionLabel } from "@/components/ui/SectionLabel";

const foundations = [
  { label: "Frontend", value: "Next.js, React, TypeScript, Tailwind CSS", icon: Sparkles },
  { label: "Backend", value: "Node.js, FastAPI, APIs, Prisma, PostgreSQL", icon: ServerCog },
  { label: "AI", value: "OpenAI, Anthropic, RAG, vector databases, AI agents", icon: Database },
  { label: "Cloud", value: "Vercel, AWS, Docker, CI/CD, monitoring, CDN security", icon: LockKeyhole },
];

export function TechnologyOverviewSection() {
  return (
    <section id="technology" className="relative overflow-hidden bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:py-20 lg:py-24">
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

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {foundations.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.label} className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_58px_var(--shadow-color)]">
                <Icon aria-hidden="true" className="size-5 text-[var(--purple)]" />
                <h3 className="mt-4 text-xl font-semibold tracking-normal text-[var(--text)]">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.value}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {technologyLabels.map((item) => (
            <span key={item.name} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-bold text-[var(--text-secondary)]">
              {item.name}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {technologyCategories.map((category) => (
            <article key={category.title} className="border-t border-[var(--border)] pt-5">
              <h3 className="text-xl font-semibold tracking-normal text-[var(--text)]">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{category.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
