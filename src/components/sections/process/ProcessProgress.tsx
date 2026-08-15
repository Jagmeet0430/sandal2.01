import { processStages } from "@/data/process";

export function ProcessProgress() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-5 left-1/2 z-30 hidden w-[min(86vw,980px)] -translate-x-1/2 items-center gap-3 lg:flex"
    >
      {processStages.map((stage) => (
        <div key={stage.id} className="flex flex-1 items-center gap-3">
          <span
            data-process-progress-number
            className="text-[10px] font-semibold tracking-[0.18em] text-[var(--text-muted)]"
          >
            {stage.number}
          </span>
          <span className="h-px flex-1 overflow-hidden bg-[var(--border-color)]">
            <span
              data-process-progress-line
              className="block h-full w-full origin-left scale-x-[0.16] bg-purple-200/70"
            />
          </span>
        </div>
      ))}
    </div>
  );
}
