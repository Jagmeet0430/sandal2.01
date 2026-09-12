export function TechnologyNode() {
  return (
    <div
      data-technology-core
      className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[32px] border border-purple-200/24 bg-[#090811]/78 text-center shadow-[0_0_70px_rgba(139,61,255,0.28)] backdrop-blur-md sm:h-44 sm:w-44"
    >
      <div className="relative mb-4 h-10 w-10 rounded-2xl border border-purple-200/28 bg-purple-500/14 shadow-[0_0_28px_rgba(168,85,247,0.34)]">
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200" />
        <span className="absolute left-[10px] top-[10px] h-2 w-2 rounded-full border border-white/32" />
        <span className="absolute bottom-[10px] right-[10px] h-2 w-2 rounded-full border border-white/32" />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-100">
        Alyvora
      </span>
      <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/36">
        System Layer
      </span>
    </div>
  );
}
