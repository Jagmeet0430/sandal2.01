import { cn } from "@/lib/cn";

type ImpactNodeProps = {
  label: string;
  className?: string;
  active?: boolean;
};

export function ImpactNode({ label, className, active = false }: ImpactNodeProps) {
  return (
    <span
      data-impact-node
      className={cn(
        "absolute z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/[0.035] text-[9px] font-semibold text-white/44 backdrop-blur-sm",
        active && "border-purple-200/60 bg-purple-500/18 text-white shadow-[0_0_28px_rgba(168,85,247,0.48)]",
        className,
      )}
    >
      {label}
    </span>
  );
}
