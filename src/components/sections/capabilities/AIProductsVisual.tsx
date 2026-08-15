function Tag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span data-capability-badge className={`capability-badge-float absolute rounded-full border border-[var(--border-color)] bg-[var(--surface)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--purple)] shadow-card-shadow backdrop-blur-xl transition-shadow duration-200 hover:shadow-card-glow dark:text-purple-200 ${className}`}>
      {children}
    </span>
  );
}

export function AIProductsVisual() {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-[24px] border border-[#14111B]/10 bg-white/60 shadow-[0_30px_90px_rgba(36,24,54,0.08)] dark:border-white/10 dark:bg-[#090811]/42 dark:shadow-none">
      <div className="absolute left-1/2 top-1/2 size-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/22 dark:border-purple-300/12" />
      <div className="absolute left-1/2 top-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/26 dark:border-purple-300/16" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 520" aria-hidden="true">
        <g stroke="rgba(124,58,237,0.48)" strokeWidth="1.15">
          <path data-capability-connector d="M310 260 L185 160 L120 270 L230 390 Z" fill="none" />
          <path data-capability-connector d="M310 260 L430 135 L505 260 L415 385 Z" fill="none" />
          <path data-capability-connector d="M185 160 L430 135 M120 270 L505 260 M230 390 L415 385" fill="none" />
        </g>
        <g fill="rgb(216,180,254)">
          <circle cx="310" cy="260" r="9" />
          <circle cx="185" cy="160" r="5" />
          <circle cx="430" cy="135" r="5" />
          <circle cx="120" cy="270" r="5" />
          <circle cx="505" cy="260" r="5" />
          <circle cx="230" cy="390" r="5" />
          <circle cx="415" cy="385" r="5" />
        </g>
      </svg>
      <div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[24px] border border-purple-400/24 bg-purple-500/10 shadow-[0_0_60px_rgba(139,61,255,0.22)] backdrop-blur-xl dark:border-purple-300/25 dark:bg-purple-500/12 dark:shadow-[0_0_70px_rgba(139,61,255,0.35)]">
        <div className="size-10 rounded-full border border-purple-200/60 shadow-[inset_0_0_24px_rgba(168,85,247,0.55),0_0_24px_rgba(168,85,247,0.45)]" />
      </div>
      <Tag className="left-[12%] top-[18%]">MODEL</Tag>
      <Tag className="right-[10%] top-[24%]">CONTEXT</Tag>
      <Tag className="bottom-[18%] left-[18%]">RETRIEVAL</Tag>
    </div>
  );
}
