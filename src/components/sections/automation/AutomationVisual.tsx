import { automationLabels, automationWorkflow } from "@/data/automation";
import { AutomationLabel } from "@/components/sections/automation/AutomationLabel";
import { WorkflowConnector } from "@/components/sections/automation/WorkflowConnector";
import { WorkflowNode } from "@/components/sections/automation/WorkflowNode";

const nodeClasses = [
  "left-[4%] top-[8%] sm:left-[2%] sm:top-[13%]",
  "right-[4%] top-[8%] sm:right-auto sm:left-[36%] sm:top-[4%]",
  "left-[4%] top-auto bottom-[11%] sm:left-[47%] sm:top-[57%] sm:bottom-auto",
  "right-[4%] top-auto bottom-[11%] sm:right-[2%] sm:top-[30%] sm:bottom-auto",
];

const labelClasses = [
  "left-[8%] top-[48%] sm:top-auto sm:bottom-[15%]",
  "hidden sm:block sm:left-[31%] sm:top-[37%]",
  "right-[18%] top-[43%] sm:right-[22%] sm:top-[18%]",
  "right-[9%] bottom-[4%] sm:bottom-[18%]",
  "hidden sm:block sm:left-[42%] sm:bottom-[5%]",
  "hidden sm:block sm:right-[35%] sm:bottom-[34%]",
];

export function AutomationVisual() {
  return (
    <div
      data-automation-visual
      className="relative mx-auto aspect-[0.78] w-[min(92vw,660px)] max-w-full rounded-[28px] border border-white/18 bg-[#090811]/34 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.34)] sm:aspect-[1.08] sm:p-6 lg:ml-auto lg:w-[min(47vw,720px)]"
    >
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_58%_48%,rgba(139,61,255,0.24),transparent_38%),radial-gradient(circle_at_20%_84%,rgba(116,83,255,0.12),transparent_30%)]" />
      <div className="absolute inset-0 rounded-[28px] opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:48px_48px]" />

      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 700 650"
        fill="none"
        aria-hidden="true"
      >
        <WorkflowConnector active path="M148 168 C245 128 280 94 352 110" />
        <WorkflowConnector active path="M438 170 C500 205 520 262 540 328" />
        <WorkflowConnector active path="M424 210 C396 300 408 388 452 438" />
        <WorkflowConnector path="M260 230 C248 332 284 414 380 466" />
        <WorkflowConnector path="M520 390 C470 470 382 516 248 486" />
        <path
          data-automation-route
          d="M110 490 C220 548 388 550 574 448"
          stroke="rgba(34,211,238,0.28)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="5 10"
          fill="none"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-200/12 bg-purple-500/[0.035] blur-[1px]" />
      <div
        data-automation-core
        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-purple-200/24 bg-black/30 text-[9px] font-semibold uppercase tracking-[0.2em] text-purple-100 shadow-[0_0_50px_rgba(139,61,255,0.24)] backdrop-blur-md sm:h-28 sm:w-28 sm:text-[10px] sm:tracking-[0.22em]"
      >
        ROUTE
      </div>

      {automationWorkflow.map((node, index) => (
        <WorkflowNode
          key={node.id}
          node={node}
          active={index === 0}
          className={nodeClasses[index]}
        />
      ))}

      {automationLabels.map((label, index) => (
        <AutomationLabel key={label} className={labelClasses[index]}>
          {label}
        </AutomationLabel>
      ))}

      <div
        data-automation-status
        className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-full border border-white/10 bg-black/28 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/42 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:px-4 sm:text-[10px] sm:tracking-[0.18em]"
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.65)]" />
          Monitoring active
        </span>
        <span className="text-purple-200/70">03 / Automation</span>
      </div>
    </div>
  );
}
