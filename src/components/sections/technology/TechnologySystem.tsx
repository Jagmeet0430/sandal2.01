const globeLabels = [
  { text: "OPENAI", className: "left-[20%] top-[7%]" },
  { text: "REACT", className: "right-[16%] top-[16%]" },
  { text: "NODE", className: "left-[7%] top-[52%]" },
  { text: "CLOUD", className: "right-[8%] top-[55%]" },
  { text: "DATA", className: "left-[31%] bottom-[10%]" },
];

export function TechnologySystem() {
  return (
    <div
      data-technology-system
      className="relative z-20 mx-auto aspect-square w-[min(82vw,640px)] max-w-full lg:ml-auto lg:w-[min(41vw,650px)] lg:translate-x-8 xl:translate-x-12"
    >
      <div className="absolute inset-[18%] rounded-full bg-purple-700/12 blur-[64px] dark:bg-purple-700/16" />
      <div className="absolute inset-[11%] rounded-full border border-[#7C3AED]/20 dark:border-purple-200/14" />
      <div className="absolute inset-[18%] rounded-full border border-[#14111B]/12 dark:border-white/10" />
      <div className="absolute inset-[8%] rotate-[-18deg] rounded-[50%] border border-[#8B5CF6]/26 dark:border-purple-300/18" />
      <div className="absolute inset-[18%] rotate-[22deg] rounded-[50%] border border-[#8B5CF6]/20 dark:border-purple-300/14" />
      <div className="absolute left-1/2 top-1/2 h-[78%] w-px -translate-x-1/2 -translate-y-1/2 rotate-[12deg] bg-[#7C3AED]/16 dark:bg-purple-200/8" />

      <svg className="absolute inset-0 h-full w-full opacity-46 dark:opacity-34" viewBox="0 0 720 720" fill="none" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, index) => (
          <ellipse
            key={`lat-${index}`}
            cx="360"
            cy="360"
            rx={250}
            ry={34 + index * 22}
            stroke={index === 3 ? "rgba(124,58,237,0.36)" : "rgba(139,92,246,0.26)"}
            strokeWidth="1"
            transform={`rotate(${index * 13} 360 360)`}
          />
        ))}
        {Array.from({ length: 6 }).map((_, index) => (
          <ellipse
            key={`long-${index}`}
            cx="360"
            cy="360"
            rx={62 + index * 26}
            ry={250}
            stroke="rgba(124,58,237,0.20)"
            strokeWidth="1"
            transform={`rotate(${index * 18} 360 360)`}
          />
        ))}
      </svg>

      <div
        data-technology-core
        className="absolute left-1/2 top-[42%] z-30 w-[154px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-[#14111B]/10 bg-white/82 px-6 py-5 text-center shadow-[0_0_72px_rgba(139,61,255,0.22),0_22px_70px_rgba(36,24,54,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-black/38 dark:shadow-[0_0_80px_rgba(139,61,255,0.26)]"
      >
        <p className="text-lg font-bold text-[#14111B] dark:text-white/70">ApexMind</p>
        <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7C3AED]/70 dark:text-purple-200/48">
          Intelligence Hub
        </p>
        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#6F6879] dark:text-purple-200/38">
          Engineering
        </p>
      </div>

      {globeLabels.map((label) => (
        <span
          key={label.text}
          data-technology-label
          className={`absolute z-30 hidden rounded-full border border-[#14111B]/10 bg-white/76 px-3.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#5F576B] shadow-[0_14px_40px_rgba(36,24,54,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-black/28 dark:text-white/46 sm:block ${label.className}`}
        >
          {label.text}
        </span>
      ))}

      <span data-technology-status className="absolute left-[42%] top-[14%] z-30 h-2 w-2 rounded-full bg-purple-300/80 shadow-[0_0_18px_rgba(168,85,247,0.72)]" />
      <span data-technology-status className="absolute right-[22%] top-[38%] z-30 h-2 w-2 rounded-full bg-purple-300/70 shadow-[0_0_18px_rgba(168,85,247,0.66)]" />
      <span data-technology-status className="absolute bottom-[25%] left-[24%] z-30 h-1.5 w-1.5 rounded-full bg-purple-300/60 shadow-[0_0_16px_rgba(168,85,247,0.6)]" />
    </div>
  );
}
