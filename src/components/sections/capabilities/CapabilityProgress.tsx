import type { Capability } from "@/data/capabilities";

type CapabilityProgressProps = {
  capabilities: Capability[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CapabilityProgress({ capabilities, activeIndex, onSelect }: CapabilityProgressProps) {
  const fillPercent = capabilities.length > 1 ? (activeIndex / (capabilities.length - 1)) * 100 : 0;

  return (
    <>
      <nav
        aria-label="Capability selector"
        className="absolute left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-8"
      >
        <div className="relative grid gap-5 pl-9">
          <span className="absolute left-4 top-4 h-[calc(100%-2rem)] w-px rounded-full bg-[var(--border-color)]" />
          <span
            className="absolute left-4 top-4 w-px rounded-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.82)] transition-[height] duration-300 ease-out"
            style={{ height: `calc((100% - 2rem) * ${fillPercent / 100})` }}
          />

          {capabilities.map((capability, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={capability.id}
                type="button"
                data-capability-progress-item
                aria-current={isActive ? "step" : undefined}
                onClick={() => onSelect(index)}
                className="group relative flex min-w-[188px] items-center gap-3 rounded-2xl px-3 py-2 text-left transition-all duration-200 ease-out hover:bg-[var(--surface)] hover:shadow-card-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
              >
                <span
                  data-capability-progress-number
                  className="absolute -left-[2.25rem] grid size-8 place-items-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-[11px] font-bold tracking-[0.14em] text-[var(--text-muted)] shadow-card-shadow transition-colors duration-200"
                >
                  {capability.number}
                </span>
                <span className="grid gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--purple)]">
                    {capability.label}
                  </span>
                  <span className="relative h-px w-28 overflow-hidden rounded-full bg-[var(--border-color)]">
                    <span
                      data-capability-progress-line
                      className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.9)]"
                    />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="pointer-events-auto absolute inset-x-5 bottom-6 z-40 mx-auto flex max-w-[1240px] items-center gap-3 sm:bottom-8 lg:hidden">
        {capabilities.map((capability, index) => (
          <button
            key={capability.id}
            type="button"
            data-capability-progress-item
            aria-label={`Show ${capability.label}`}
            aria-current={index === activeIndex ? "step" : undefined}
            onClick={() => onSelect(index)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-xl py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
          >
            <span data-capability-progress-number className="text-[11px] font-bold tracking-[0.16em] text-[var(--text-muted)]">
              {capability.number}
            </span>
            <span className="relative h-px min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--border-color)]">
              <span
                data-capability-progress-line
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.9)]"
              />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
