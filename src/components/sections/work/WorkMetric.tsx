import type { SelectedWorkMetric } from "@/data/selected-work";

type WorkMetricProps = {
  metric: SelectedWorkMetric;
};

export function WorkMetric({ metric }: WorkMetricProps) {
  return (
    <article
      data-work-metric
      className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-[0_14px_42px_var(--shadow-color)]"
    >
      <p className="text-2xl font-semibold tracking-normal text-[var(--text)]">{metric.value}</p>
      <p className="mt-1.5 text-xs leading-5 text-[var(--text-secondary)]">{metric.label}</p>
    </article>
  );
}
