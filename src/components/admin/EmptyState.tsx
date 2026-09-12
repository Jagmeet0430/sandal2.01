import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
};

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-black/10 bg-black/[0.025] p-8 text-center dark:border-white/10 dark:bg-white/[0.035]">
      <div className="grid size-16 place-items-center rounded-2xl border border-black/10 bg-white/70 text-[#8b8495] dark:border-white/[0.08] dark:bg-[#111018] dark:text-[#706979]">
        <Icon className="size-7" />
      </div>

      <h3 className="mt-5 text-xl font-black tracking-[-0.025em]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-7 text-[#625c6d] dark:text-[#aaa4b8]">{description}</p>

      <button
        type="button"
        onClick={onAction}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-b from-[#8B3DFF] to-[#5B16C9] px-5 text-sm font-bold text-white shadow-[0_18px_44px_rgba(124,44,255,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(124,44,255,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8B3DFF]"
      >
        <Plus className="size-4" />
        {actionLabel}
      </button>
    </div>
  );
}
