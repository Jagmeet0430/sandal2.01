import { automationContent } from "@/data/automation";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AutomationContent() {
  return (
    <div className="relative z-10 max-w-[575px]">
      <div data-automation-content="eyebrow">
        <SectionLabel>{automationContent.eyebrow}</SectionLabel>
      </div>
      <div data-automation-content="number" className="mt-7 text-[clamp(4.4rem,10vw,8.25rem)] font-semibold leading-none text-[rgba(20,17,27,0.08)] dark:text-white/[0.07]">
        {automationContent.number}
      </div>
      <h2
        data-automation-content="heading"
        className="ds-display -mt-7 max-w-[560px] tracking-[-0.045em] sm:-mt-9 dark:text-white"
      >
        {automationContent.heading}
      </h2>
      <p
        data-automation-content="copy"
        className="ds-body mt-6 max-w-[535px] dark:text-white/70"
      >
        {automationContent.description}
      </p>

      <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {automationContent.bullets.map((bullet) => (
          <li
            key={bullet}
            data-automation-bullet
            className="flex items-center gap-3 text-sm text-[var(--text-secondary)] dark:text-white/78"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.75)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div data-automation-content="cta" className="mt-9">
        <PrimaryButton href="/contact">{automationContent.cta}</PrimaryButton>
      </div>

      <div
        data-automation-content="progress"
        aria-label="Capability progress"
        className="mt-10 grid max-w-[560px] grid-cols-2 gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] sm:grid-cols-4 dark:text-white/34"
      >
        {automationContent.progress.map((item) => (
          <span
            key={item}
            className={item.startsWith("03") ? "text-[var(--purple)] dark:text-purple-200" : undefined}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
