type WorkBadgeProps = {
  children: string;
};

export function WorkBadge({ children }: WorkBadgeProps) {
  return (
    <span className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--purple)] dark:bg-white/[0.045]">
      {children}
    </span>
  );
}
