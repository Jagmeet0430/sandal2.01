import { cn } from "@/lib/cn";

type ImpactLabelProps = {
  children: string;
  className?: string;
};

export function ImpactLabel({ children, className }: ImpactLabelProps) {
  return (
    <span
      data-impact-label
      className={cn(
        "absolute rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/42 backdrop-blur-md",
        "border-white/[0.07] bg-black/20 text-[8px] text-white/32",
        className,
      )}
    >
      {children}
    </span>
  );
}
