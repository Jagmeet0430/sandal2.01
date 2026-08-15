export function ImpactSphereFallback() {
  return (
    <div
      data-impact-sphere
      className="absolute left-1/2 top-[53%] h-[min(66vw,680px)] w-[min(66vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-86 sm:h-[min(60vw,700px)] sm:w-[min(60vw,700px)]"
      aria-hidden="true"
    >
      <div className="absolute inset-[-6%] rounded-full bg-purple-600/7 blur-3xl dark:bg-purple-600/11" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_47%,rgba(124,58,237,0.08),rgba(168,85,247,0.11)_16%,rgba(139,61,255,0.12)_36%,rgba(243,240,248,0.34)_68%,rgba(248,247,252,0.10)_100%)] shadow-[inset_0_0_70px_rgba(124,58,237,0.055),0_0_90px_rgba(139,61,255,0.14)] dark:bg-[radial-gradient(circle_at_50%_47%,rgba(245,242,250,0.10),rgba(168,85,247,0.16)_16%,rgba(139,61,255,0.18)_36%,rgba(25,18,46,0.58)_68%,rgba(5,5,10,0.14)_100%)] dark:shadow-[inset_0_0_70px_rgba(255,255,255,0.055),0_0_105px_rgba(139,61,255,0.22)]" />
      <div className="absolute inset-[5%] rounded-full border border-purple-500/14 dark:border-purple-200/10" />
      <div className="absolute inset-[13%] rounded-full border border-[#14111B]/[0.07] dark:border-white/[0.055]" />
      <div className="absolute inset-0 rounded-full opacity-[0.18] [background-image:repeating-radial-gradient(circle_at_center,rgba(124,58,237,0.12)_0_1px,transparent_1px_24px)] dark:opacity-[0.2] dark:[background-image:repeating-radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0_1px,transparent_1px_24px)]" />
      <svg className="absolute inset-0 h-full w-full rounded-full" viewBox="0 0 700 700" fill="none">
        <clipPath id="impact-sphere-clip">
          <circle cx="350" cy="350" r="348" />
        </clipPath>
        <g clipPath="url(#impact-sphere-clip)" data-impact-wireframe>
          {Array.from({ length: 9 }).map((_, index) => (
            <ellipse
              key={`lat-${index}`}
              cx="350"
              cy="350"
              rx={310}
              ry={42 + index * 30}
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 9 }).map((_, index) => (
            <ellipse
              key={`lon-${index}`}
              cx="350"
              cy="350"
              rx={42 + index * 30}
              ry={310}
              stroke="rgba(216,180,254,0.055)"
              strokeWidth="1"
            />
          ))}
          <path
            d="M120 454 C246 350 420 296 598 232"
            stroke="rgba(168,85,247,0.14)"
            strokeWidth="1.5"
          />
          <path
            d="M86 290 C218 348 398 398 626 390"
            stroke="rgba(34,211,238,0.085)"
            strokeWidth="1"
          />
        </g>
      </svg>
      <div className="absolute inset-[35%] rounded-full bg-purple-300/12 blur-xl" />
    </div>
  );
}
