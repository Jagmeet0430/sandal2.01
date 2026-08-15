function Tag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span data-capability-badge className={`capability-badge-float absolute rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--purple)] shadow-card-shadow backdrop-blur-xl transition-shadow duration-200 hover:shadow-card-glow dark:text-purple-200 ${className}`}>
      {children}
    </span>
  );
}

function Node({ className = "" }: { className?: string }) {
  return <span className={`absolute size-16 rounded-2xl border border-purple-400/28 bg-purple-500/10 shadow-[0_0_34px_rgba(139,61,255,0.16)] dark:border-purple-300/18 ${className}`} />;
}

export function AutomationVisual() {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-[24px] border border-[#14111B]/10 bg-white/60 shadow-[0_30px_90px_rgba(36,24,54,0.08)] dark:border-white/10 dark:bg-[#090811]/42 dark:shadow-none">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 520" aria-hidden="true">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(168,85,247,0.6)" />
          </marker>
        </defs>
        <g fill="none" stroke="rgba(124,58,237,0.52)" strokeWidth="1.45" markerEnd="url(#arrow)">
          <path data-capability-connector d="M150 180 C235 150 245 270 310 255" />
          <path data-capability-connector d="M310 255 C390 230 410 150 485 190" />
          <path data-capability-connector d="M310 255 C370 305 420 350 500 330" />
          <path data-capability-connector d="M150 340 C220 375 260 315 310 255" />
        </g>
        <g fill="rgb(216,180,254)">
          <circle cx="150" cy="180" r="5" />
          <circle cx="150" cy="340" r="5" />
          <circle cx="310" cy="255" r="7" />
          <circle cx="485" cy="190" r="5" />
          <circle cx="500" cy="330" r="5" />
        </g>
      </svg>
      <Node className="left-[18%] top-[28%]" />
      <Node className="left-[18%] bottom-[25%]" />
      <Node className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Node className="right-[17%] top-[30%]" />
      <Node className="right-[15%] bottom-[25%]" />
      <Tag className="left-[10%] top-[14%]">TRIGGER</Tag>
      <Tag className="left-[42%] top-[16%]">LOGIC</Tag>
      <Tag className="right-[10%] top-[16%]">ACTION</Tag>
      <Tag className="bottom-[15%] right-[14%]">OUTPUT</Tag>
    </div>
  );
}
