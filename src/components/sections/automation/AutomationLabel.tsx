import { cn } from "@/lib/cn";

type AutomationLabelProps = {
  children: string;
  className?: string;
};

export function AutomationLabel({ children, className }: AutomationLabelProps) {
  return (
    <span
      data-automation-label
      className={cn(
        "absolute rounded-full border border-white/10 bg-black/32 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/42 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  );
}
