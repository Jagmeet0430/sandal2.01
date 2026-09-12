import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";
import type { HomePageContent } from "@/lib/cms/types";
import { defaultHomeContent } from "@/lib/cms/default-home";

const cardMotionClasses = ["lg:rotate-[-8deg] lg:translate-y-5", "lg:translate-y-2", "lg:rotate-[8deg] lg:translate-y-7"];

type HeroCreateProps = {
  content?: HomePageContent["whatWeCreate"];
};

export function HeroCreate({ content = defaultHomeContent.whatWeCreate }: HeroCreateProps) {
  const cards = [...content.cards].sort((a, b) => a.order - b.order);

  return (
    <div data-hero-state="create-content" className="relative h-full max-w-full overflow-hidden px-5 pt-[calc(var(--header-height)+2.5rem)] md:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_73%,rgba(124,58,237,0.11),transparent_31%),radial-gradient(circle_at_82%_26%,rgba(139,92,246,0.07),transparent_26%)] dark:bg-[radial-gradient(circle_at_50%_73%,rgba(139,61,255,0.25),transparent_33%),radial-gradient(circle_at_82%_26%,rgba(139,61,255,0.12),transparent_28%)]" />
      <div data-create-orbit className="pointer-events-none absolute right-[-3%] top-[-8%] hidden h-[360px] w-[470px] rotate-[15deg] rounded-[50%] border border-[var(--border-strong)] lg:block" />
      <div data-create-orbit className="pointer-events-none absolute right-[5%] top-[-2%] hidden h-[270px] w-[370px] rotate-[-10deg] rounded-[50%] border border-[var(--border-color)] lg:block" />
      <div data-create-orbit className="pointer-events-none absolute right-[10%] top-[-6%] hidden h-[440px] w-px rotate-[13deg] bg-[var(--border-color)] lg:block" />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-[1280px] items-center justify-center">
        <div className="w-full">
          <div data-create-eyebrow>
            <SectionLabel className="text-center">{content.eyebrow}</SectionLabel>
          </div>

          <h2 data-create-heading className="ds-h1 mx-auto mt-7 max-w-[900px] text-center tracking-[-0.045em]">
            {content.heading}
            <br />
            <span className="bg-[linear-gradient(90deg,var(--gradient-heading-start),var(--gradient-heading-mid),var(--gradient-heading-end))] bg-clip-text text-transparent">
              {content.highlightedHeading}
            </span>
          </h2>

          <div className="relative mx-auto mt-11 grid max-w-[1210px] gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-9">
            {cards.map((card, index) => (
              <article
                key={card.id}
                data-create-card
                className={cn(
                  "relative flex min-h-[210px] flex-col overflow-hidden rounded-[22px] border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-6",
                  "shadow-[0_24px_70px_rgba(47,28,73,0.13)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#06050a]/78 dark:shadow-[0_34px_100px_rgba(0,0,0,0.44),0_0_70px_rgba(139,61,255,0.14)]",
                  "sm:min-h-[310px] lg:min-h-[360px] lg:p-8",
                  cardMotionClasses[index] ?? "",
                )}
              >
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-500/24 to-transparent dark:from-purple-700/35" />
                <div className="relative flex items-start justify-between">
                  <span className="rounded-full border border-[var(--border-color)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-secondary)] dark:border-white/10 dark:text-white/42">
                    {card.category}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-muted)] dark:text-white/22">{card.number}</span>
                </div>
                <div className="relative mt-auto">
                  <h3 className="ds-h2 max-w-[320px] tracking-[-0.035em] dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] dark:text-white/70">
                    {card.ctaLabel} <span className="ml-1 text-[var(--purple)] dark:text-purple-200">-&gt;</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
