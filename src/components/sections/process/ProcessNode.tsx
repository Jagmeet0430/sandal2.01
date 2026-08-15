import { cn } from "@/lib/cn";
import type { ProcessStage } from "@/data/process";

type ProcessNodeProps = {
  stage: ProcessStage;
  index: number;
  className?: string;
};

const nodePositions = [
  "left-[48%] top-[8%]",
  "left-[80%] top-[30%]",
  "left-[68%] top-[76%]",
  "left-[24%] top-[72%]",
  "left-[14%] top-[28%]",
];

export function ProcessNode({ stage, index, className }: ProcessNodeProps) {
  return (
    <div
      data-process-orbit-node
      data-process-node-index={index}
      className={cn(
        "absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/[0.035] text-[10px] font-semibold tracking-[0.16em] text-white/45 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md",
        nodePositions[index],
        className,
      )}
    >
      <span className="relative z-10">{stage.number}</span>
      <span
        data-process-node-glow
        className="absolute inset-[-5px] rounded-full bg-purple-500/0 blur-md"
      />
    </div>
  );
}
