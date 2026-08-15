import type { SelectedWorkMetric } from "@/data/selected-work";

type WorkMetricProps = {
  metric: SelectedWorkMetric;
};

export function WorkMetric({ metric }: WorkMetricProps) {
  return (
    <article data-work-metric className="border-t border-[var(--border)] pt-4">
      <p className="text-2xl font-semibold tracking-0 text-[var(--text)]">{metric.value}</p>
      <p className="mt-2 max-w-[150px] text-sm leading-6 text-[var(--text-secondary)]">{metric.label}</p>
    </article>
  );
}
