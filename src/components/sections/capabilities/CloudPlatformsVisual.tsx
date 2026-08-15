function Tag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span data-capability-badge className={`capability-badge-float absolute rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--purple)] shadow-card-shadow backdrop-blur-xl transition-shadow duration-200 hover:shadow-card-glow dark:text-purple-200 ${className}`}>
      {children}
    </span>
  );
}

export function CloudPlatformsVisual() {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-[24px] border border-[#14111B]/10 bg-white/60 shadow-[0_30px_90px_rgba(36,24,54,0.08)] dark:border-white/10 dark:bg-[#090811]/42 dark:shadow-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.055)_1px,transparent_1px)] [background-size:44px_44px] dark:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 520" aria-hidden="true">
        <g fill="none" stroke="rgba(124,58,237,0.48)" strokeWidth="1.25">
          <path data-capability-connector d="M310 126 L430 194 L310 262 L190 194 Z" />
          <path data-capability-connector d="M190 194 L190 322 L310 394 L310 262" />
          <path data-capability-connector d="M430 194 L430 322 L310 394" />
          <path data-capability-connector d="M220 240 L310 292 L400 240" opacity=".55" />
          <ellipse data-capability-connector cx="310" cy="260" rx="220" ry="95" transform="rotate(-12 310 260)" />
          <ellipse data-capability-connector cx="310" cy="260" rx="160" ry="70" transform="rotate(18 310 260)" />
        </g>
        <g fill="rgb(103,232,249)">
          <circle cx="190" cy="194" r="4" />
          <circle cx="430" cy="194" r="4" />
          <circle cx="310" cy="394" r="4" />
        </g>
      </svg>
      <div className="absolute left-1/2 top-1/2 h-32 w-44 -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] rounded-[26px] border border-purple-300/18 bg-purple-500/10 shadow-[0_0_70px_rgba(139,61,255,0.28)]" />
      <Tag className="left-[10%] top-[16%]">CLOUD</Tag>
      <Tag className="right-[13%] top-[18%]">API</Tag>
      <Tag className="bottom-[18%] left-[14%]">SCALE</Tag>
      <Tag className="bottom-[15%] right-[10%]">SECURITY</Tag>
    </div>
  );
}
