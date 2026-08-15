import { processStages } from "@/data/process";
import { ProcessNode } from "@/components/sections/process/ProcessNode";

const labels = ["Research", "Architecture", "Iterations", "Readiness", "Growth"];

export function ProcessVisual() {
  return (
    <div
      data-process-visual
      className="relative mx-auto aspect-square w-[min(62vw,500px)] max-w-full sm:w-[min(72vw,500px)] lg:w-[min(40vw,600px)]"
    >
      <div
        data-process-visual-glow
        className="absolute inset-[18%] rounded-full bg-purple-600/10 blur-[72px] dark:bg-purple-600/16"
      />

      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          data-process-orbit-ring
          cx="300"
          cy="300"
          rx="244"
          ry="132"
          stroke="rgba(124,58,237,0.22)"
          strokeWidth="1"
          transform="rotate(-22 300 300)"
        />
        <ellipse
          data-process-orbit-ring
          cx="300"
          cy="300"
          rx="232"
          ry="104"
          stroke="rgba(124,58,237,0.28)"
          strokeWidth="1"
          transform="rotate(28 300 300)"
        />
        <ellipse
          data-process-orbit-ring
          cx="300"
          cy="300"
          rx="178"
          ry="218"
          stroke="rgba(148,121,188,0.18)"
          strokeWidth="1"
          transform="rotate(48 300 300)"
        />
        <path
          data-process-connector-web
          d="M300 94 L480 240 L408 456 L144 432 L96 204 Z"
          stroke="rgba(124,58,237,0.24)"
          strokeWidth="1"
        />
        <path
          data-process-connector-web
          d="M300 300 L300 94 M300 300 L480 240 M300 300 L408 456 M300 300 L144 432 M300 300 L96 204"
          stroke="rgba(148,121,188,0.16)"
          strokeWidth="1"
        />
        <g data-process-core>
          <path
            d="M300 210 L378 255 L378 345 L300 390 L222 345 L222 255 Z"
            stroke="rgba(148,121,188,0.22)"
            strokeWidth="1"
            fill="rgba(148,121,188,0.06)"
          />
          <path
            d="M300 245 L348 273 L348 327 L300 355 L252 327 L252 273 Z"
            stroke="rgba(196,125,255,0.42)"
            strokeWidth="1"
            fill="rgba(139,61,255,0.06)"
          />
          <circle cx="300" cy="300" r="12" fill="rgba(216,180,254,0.9)" />
        </g>
      </svg>

      {processStages.map((stage, index) => (
        <ProcessNode key={stage.id} stage={stage} index={index} />
      ))}

      {labels.map((label, index) => (
        <span
          key={label}
          data-process-visual-chip
          className="absolute rounded-full border border-[#14111B]/10 bg-white/72 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#6D6677] shadow-[0_12px_28px_rgba(36,24,54,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-black/28 dark:text-white/44"
          style={{
            left: `${[45, 71, 61, 22, 14][index]}%`,
            top: `${[17, 42, 66, 58, 37][index]}%`,
          }}
        >
          {label}
        </span>
      ))}

      <div className="absolute left-1/2 top-1/2 z-10 flex h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-purple-400/20 bg-white/54 text-center shadow-[0_0_42px_rgba(139,61,255,0.14)] backdrop-blur-md dark:border-purple-200/20 dark:bg-black/24 dark:shadow-[0_0_50px_rgba(139,61,255,0.22)]">
        {processStages.map((stage, index) => (
          <span
            key={stage.id}
            data-process-visual-label
            data-process-visual-label-index={index}
            className="absolute text-[10px] font-bold tracking-[0.24em] text-[#7C3AED] dark:text-purple-100"
          >
            {stage.visualLabel}
          </span>
        ))}
      </div>
    </div>
  );
}
