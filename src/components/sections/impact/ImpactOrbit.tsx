import { impactLabels, impactNodes } from "@/data/impact";
import { ImpactLabel } from "@/components/sections/impact/ImpactLabel";
import { ImpactNode } from "@/components/sections/impact/ImpactNode";

const labelClasses = [
  "left-[13%] top-[43%]",
  "right-[10%] top-[42%]",
  "right-[25%] bottom-[14%]",
  "left-[18%] bottom-[17%]",
  "left-1/2 top-[20%] -translate-x-1/2",
];

export function ImpactOrbit() {
  return (
    <div data-impact-orbits className="absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 1200 760"
        fill="none"
        aria-hidden="true"
      >
        <ellipse
          data-impact-orbit-line
          cx="600"
          cy="390"
          rx="438"
          ry="144"
          stroke="rgba(255,255,255,0.11)"
          strokeWidth="1"
          transform="rotate(-15 600 390)"
        />
        <ellipse
          data-impact-orbit-line
          cx="600"
          cy="390"
          rx="410"
          ry="178"
          stroke="rgba(139,61,255,0.18)"
          strokeWidth="1"
          transform="rotate(23 600 390)"
        />
        <ellipse
          data-impact-orbit-line
          cx="600"
          cy="390"
          rx="310"
          ry="250"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          transform="rotate(58 600 390)"
        />
        <ellipse
          data-impact-orbit-line
          cx="600"
          cy="390"
          rx="500"
          ry="72"
          stroke="rgba(116,83,255,0.15)"
          strokeWidth="1"
          transform="rotate(5 600 390)"
        />
      </svg>

      {impactNodes.map((node, index) => (
        <ImpactNode
          key={node.label}
          label={node.label}
          active={index === 1}
          className={node.className}
        />
      ))}

      {impactLabels.map((label, index) => (
        <ImpactLabel key={label} className={labelClasses[index]}>
          {label}
        </ImpactLabel>
      ))}
    </div>
  );
}
