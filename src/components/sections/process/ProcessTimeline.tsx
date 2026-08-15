import { processStages } from "@/data/process";

export function ProcessTimeline() {
  return (
    <nav aria-label="Process stages" className="mt-6 w-full max-w-[500px] lg:mt-10">
      <ol className="grid grid-cols-5 gap-2 lg:grid-cols-1 lg:gap-0">
        {processStages.map((stage, index) => (
          <li
            key={stage.id}
            data-process-timeline-item
            data-process-timeline-index={index}
            className="relative flex flex-col items-center gap-2 text-center lg:min-h-[60px] lg:flex-row lg:items-start lg:gap-4 lg:text-left"
          >
            <div className="relative flex flex-col items-center">
              <span
                data-process-timeline-node
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[10px] font-semibold text-[var(--text-muted)] sm:h-9 sm:w-9 sm:text-[11px]"
              >
                {stage.number}
              </span>
              {index < processStages.length - 1 ? (
                <span className="absolute left-1/2 top-9 hidden h-[34px] w-px -translate-x-1/2 overflow-hidden bg-[var(--border-color)] lg:block">
                  <span
                    data-process-timeline-line
                    className="block h-full w-full origin-top scale-y-0 bg-gradient-to-b from-purple-200 to-purple-500"
                  />
                </span>
              ) : null}
            </div>
            <span
              data-process-timeline-label
              className="max-w-[72px] text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[10px] lg:max-w-none lg:pt-2.5 lg:text-[11px]"
            >
              {stage.title}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
