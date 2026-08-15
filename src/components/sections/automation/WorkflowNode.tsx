import { cn } from "@/lib/cn";
import type { AutomationWorkflowNode } from "@/data/automation";

type WorkflowNodeProps = {
  node: AutomationWorkflowNode;
  className?: string;
  active?: boolean;
};

export function WorkflowNode({ node, className, active = false }: WorkflowNodeProps) {
  return (
    <article
      data-automation-node
      data-node-id={node.id}
      className={cn(
        "absolute w-[136px] rounded-[16px] border border-white/12 bg-[#090811]/82 p-3 text-left shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-md sm:w-[168px] sm:rounded-[18px] sm:p-4",
        active && "border-purple-200/45 shadow-[0_0_46px_rgba(139,61,255,0.32)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-purple-200/72">
          {node.label}
        </span>
        <span className="relative flex h-2.5 w-2.5 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.8)]">
          {active ? <span className="absolute inset-[-5px] rounded-full border border-purple-300/35" /> : null}
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-tight text-white sm:mt-4 sm:text-lg">{node.title}</h3>
      <p className="mt-2 text-xs leading-5 text-white/55 sm:text-sm">{node.detail}</p>
      <div className="mt-3 rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/42 sm:mt-4 sm:text-[9px] sm:tracking-[0.16em]">
        {node.meta}
      </div>
    </article>
  );
}
