export function WebGLFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="absolute right-[15%] top-[24%] h-[360px] w-[360px] rounded-full border border-purple-300/10" />
      <div className="absolute right-[18%] top-[27%] h-[280px] w-[280px] rounded-full border border-purple-300/10" />
      <div className="absolute bottom-[8%] left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-[50%] bg-purple-700/18 blur-[120px]" />
      <div className="absolute right-[22%] top-[42%] h-[320px] w-[320px] rounded-full bg-purple-700/10 blur-[90px]" />
    </div>
  );
}
