import { cn } from "@/lib/cn";

type TechnologyLabelProps = {
  children: string;
  group: string;
  className?: string;
};

export function TechnologyLabel({ children, group, className }: TechnologyLabelProps) {
  return (
    <span
      data-technology-label
      data-technology-group={group}
      className={cn(
        "absolute rounded-full border border-white/10 bg-[#090811]/82 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/54 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  );
}
