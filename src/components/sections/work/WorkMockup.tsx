const workflowSteps = ["Trigger", "Retrieve", "Recommend", "Route"];

const activity = [
  "Knowledge request resolved",
  "Workflow exception routed",
  "Forecast report generated",
];

export function WorkMockup() {
  return (
    <div
      data-work-mockup
      className="relative order-last min-h-[680px] overflow-visible sm:min-h-[620px] lg:min-h-[660px]"
      aria-hidden="true"
    >
      <div data-work-glow className="absolute left-[48%] top-[50%] h-[250px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#8B3DFF]/9 blur-[70px]" />
      <div className="absolute right-[13%] top-[14%] h-28 w-36 rounded-[50%] bg-[#8B3DFF]/5 blur-[50px]" />

      <div
        data-work-layer="main"
        className="relative z-10 mx-auto w-full max-w-[700px] rounded-[26px] border border-white/10 bg-[#0D0B13] p-5 shadow-[0_34px_110px_rgba(0,0,0,0.46),inset_0_0_42px_rgba(139,61,255,0.055)] sm:absolute sm:left-1/2 sm:top-[52%] sm:-translate-x-1/2 sm:-translate-y-1/2 lg:left-[44%]"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">OPERATIONS INTELLIGENCE</p>
            <p className="mt-1 text-sm text-[#A8A0B2]">Live decision surface</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
              Live
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#A8A0B2]">
              14:32 UTC
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-[22px] border border-white/10 bg-[#121019] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">WORKFLOW</p>
              <span className="text-[11px] font-semibold text-[#777080]">Queue 18</span>
            </div>

            <div className="relative mt-5 grid gap-3">
              <span className="absolute bottom-6 left-[15px] top-6 w-px bg-white/10" />
              {workflowSteps.map((step, index) => {
                const active = index === 2;

                return (
                  <div
                    key={step}
                    data-work-inner
                    className={[
                      "relative z-10 flex items-center gap-3 rounded-2xl border px-3 py-3",
                      active
                        ? "border-[#A855F7]/32 bg-[#8B3DFF]/12"
                        : "border-white/10 bg-black/16",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid size-8 shrink-0 place-items-center rounded-full border text-[10px] font-bold",
                        active
                          ? "border-[#A855F7]/40 bg-[#8B3DFF]/24 text-[#F7F4FB]"
                          : "border-white/10 bg-[#15111D] text-[#A8A0B2]",
                      ].join(" ")}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#F7F4FB]">{step}</p>
                      <p className="mt-0.5 text-xs text-[#777080]">
                        {active ? "Recommendation ready" : "System checkpoint"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid gap-4">
            <section className="rounded-[22px] border border-white/10 bg-[#121019] p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">RESOLUTION</p>
                <span className="text-[11px] font-semibold text-[#777080]">Confidence</span>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-semibold tracking-0 text-[#F7F4FB]">92%</p>
                  <p className="mt-2 max-w-[170px] text-xs leading-5 text-[#A8A0B2]">Assisted routing confidence</p>
                </div>
                <div className="relative size-16 rounded-full border border-white/10 bg-[#15111D]">
                  <div className="absolute inset-2 rounded-full border-[5px] border-[#A855F7]/70 border-l-white/10 border-t-white/10" />
                  <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-[#C4A7FF]">AI</span>
                </div>
              </div>
            </section>

            <section className="rounded-[22px] border border-white/10 bg-[#121019] p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">RISK</p>
                <span className="text-[11px] font-semibold text-[#777080]">Low variance</span>
              </div>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full w-[38%] rounded-full bg-[#C4A7FF]" />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#777080]">
                <span>Review load</span>
                <span>38%</span>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#777080]">
            Retrieval / Analytics / Automation
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8A0B2]">
            <span className="size-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.75)]" />
            System status normal
          </span>
        </div>
      </div>

      <div
        data-work-layer="insight"
        className="relative z-20 mt-5 w-full rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,#15111D,rgba(18,16,25,0.95))] p-5 shadow-[0_24px_72px_rgba(0,0,0,0.38)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#A855F7]/32 sm:absolute sm:right-[2%] sm:top-[9%] sm:mt-0 sm:w-[290px] sm:rotate-[2deg]"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">AI INSIGHT</p>
        <p className="mt-4 text-sm leading-7 text-[#D8D0E4]">
          Escalation volume is rising in the payments queue. Recommend assigning two specialists for the next cycle.
        </p>
      </div>

      <div
        data-work-layer="activity"
        className="relative z-[18] mt-5 w-full rounded-[20px] border border-white/10 bg-[#121019]/96 p-5 shadow-[0_24px_72px_rgba(0,0,0,0.38)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#A855F7]/32 sm:absolute sm:bottom-[8%] sm:right-[5%] sm:mt-0 sm:w-[330px] sm:rotate-[-1deg]"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">ACTIVITY</p>
        <div className="mt-4 grid gap-3">
          {activity.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-[#D8D0E4]">
              <span className="size-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(103,232,249,0.75)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
