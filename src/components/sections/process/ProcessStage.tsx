import { forwardRef } from "react";
import type { ProcessStage as ProcessStageData } from "@/data/process";

type ProcessStageProps = {
  stage: ProcessStageData;
  index: number;
};

export const ProcessStage = forwardRef<HTMLElement, ProcessStageProps>(function ProcessStage(
  { stage, index },
  ref,
) {
  return (
    <article
      ref={ref}
      data-process-panel
      data-process-panel-index={index}
      className="absolute inset-0 flex flex-col justify-start pb-4 sm:pb-6 lg:pb-0"
      aria-label={`${stage.number} ${stage.title}`}
    >
      <div className="max-w-[560px]">
        <p
          data-process-child
          className="text-[10px] font-semibold tracking-[0.28em] text-purple-200/70 sm:text-[11px] sm:tracking-[0.34em]"
        >
          STAGE {stage.number}
        </p>
        <h3
          data-process-child
          className="ds-h1 mt-2 sm:mt-3"
        >
          {stage.title}
        </h3>
        <p
          data-process-child
          className="ds-body mt-3 max-w-[520px] sm:mt-4"
        >
          {stage.description}
        </p>
        <ul data-process-child className="mt-4 grid gap-2.5 text-sm text-[var(--text-secondary)] sm:mt-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {stage.points.map((point) => (
            <li key={point} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(196,125,255,0.75)]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
});
