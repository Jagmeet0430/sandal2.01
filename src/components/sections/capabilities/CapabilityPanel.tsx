import type { Capability } from "@/data/capabilities";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

type CapabilityPanelProps = {
  capability: Capability;
};

export function CapabilityPanel({ capability }: CapabilityPanelProps) {
  return (
    <div className="relative z-20 flex h-full flex-col justify-center">
      <div data-capability-child>
        <SectionLabel>Service Capabilities</SectionLabel>
      </div>

      <p data-capability-child className="mt-8 text-sm font-semibold tracking-[0.22em] text-[var(--purple)] dark:text-purple-300">
        {capability.number}
      </p>

      <h2
        data-capability-child
        className="ds-h1 mt-5 max-w-[620px] tracking-[-0.045em]"
      >
        {capability.title}
      </h2>

      <p data-capability-child className="ds-body mt-7 max-w-[540px] font-semibold">
        {capability.description}
      </p>

      <ul data-capability-child className="mt-8 grid gap-4">
        {capability.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-sm font-semibold leading-6 text-[var(--text-secondary)]">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-purple-300 shadow-[0_0_16px_rgba(168,85,247,0.9)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div data-capability-child className="mt-9">
        <PrimaryButton href={capability.ctaHref}>{capability.cta}</PrimaryButton>
      </div>
    </div>
  );
}
