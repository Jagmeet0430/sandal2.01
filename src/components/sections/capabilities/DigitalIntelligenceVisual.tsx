function Tag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span data-capability-badge className={`capability-badge-float absolute rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--purple)] shadow-card-shadow backdrop-blur-xl transition-shadow duration-200 hover:shadow-card-glow dark:text-purple-200 ${className}`}>
      {children}
    </span>
  );
}

export function DigitalIntelligenceVisual() {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-[24px] border border-[#14111B]/10 bg-white/60 shadow-[0_30px_90px_rgba(36,24,54,0.08)] dark:border-white/10 dark:bg-[#090811]/42 dark:shadow-none">
      <div className="absolute left-1/2 top-1/2 h-[64%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-[#14111B]/10 bg-white/42 p-6 shadow-[0_22px_70px_rgba(36,24,54,0.08)] dark:border-white/10 dark:bg-black/18 dark:shadow-none">
        <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-5">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-purple-400/22 bg-purple-500/10 dark:border-purple-300/14" />
            <div className="rounded-2xl border border-purple-400/18 bg-purple-500/8 dark:border-purple-300/14" />
          </div>
          <div className="relative rounded-2xl border border-purple-400/18 bg-purple-500/8 dark:border-purple-300/14">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 260" aria-hidden="true">
              <g fill="none" stroke="rgba(168,85,247,0.52)" strokeWidth="2">
                <path data-capability-connector d="M36 205 C76 165 102 180 138 132 C174 84 214 122 248 70 C272 36 294 48 315 34" />
                <path data-capability-connector d="M36 224 L315 224 M36 32 L36 224" opacity=".25" />
              </g>
              <g fill="rgb(103,232,249)">
                <circle cx="138" cy="132" r="4" />
                <circle cx="248" cy="70" r="4" />
                <circle cx="315" cy="34" r="4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <Tag className="left-[10%] top-[15%]">DATA</Tag>
      <Tag className="right-[11%] top-[16%]">INSIGHT</Tag>
      <Tag className="bottom-[17%] left-[12%]">FORECAST</Tag>
      <Tag className="bottom-[15%] right-[12%]">DECISION</Tag>
    </div>
  );
}
