type WorkBadgeProps = {
  children: string;
};

export function WorkBadge({ children }: WorkBadgeProps) {
  return (
    <span className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--purple)] transition hover:border-purple-400/35 hover:bg-purple-400/[0.08] dark:bg-white/[0.045]">
      {children}
    </span>
  );
}
