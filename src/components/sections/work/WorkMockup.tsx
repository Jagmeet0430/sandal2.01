import { Bot, CheckCircle2, Database, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

const workflowSteps = [
  { label: "Capture", detail: "Lead request", icon: Sparkles },
  { label: "Qualify", detail: "Budget + timeline", icon: Database },
  { label: "Assist", detail: "AI handoff", icon: Bot },
  { label: "Route", detail: "Owner assigned", icon: GitBranch },
];

const signals = ["AI assistant", "Portfolio CMS", "Lead CRM"];

export function WorkMockup() {
  return (
    <div
      data-work-mockup
      className="relative mx-auto w-full max-w-[560px] overflow-visible md:min-h-[390px] lg:min-h-[430px]"
      aria-hidden="true"
    >
      <div className="relative z-10 rounded-[22px] border border-white/10 bg-[#0D0B13]/96 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.36),inset_0_0_32px_rgba(139,61,255,0.055)] md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">Alyvora Platform</p>
            <p className="mt-1 text-sm text-[#A8A0B2]">Case study operating layer</p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200">
            92% ready
          </span>
        </div>
        <p className="mt-5 text-xl font-semibold leading-snug text-[#F7F4FB]">
          Captures project enquiries, qualifies intent, and routes the right next step.
        </p>
        <p className="mt-3 text-sm leading-6 text-[#A8A0B2]">
          AI support, portfolio CMS, and lead workflow in one practical operating layer.
        </p>
      </div>

      <div
        data-work-glow
        className="absolute left-1/2 top-1/2 hidden h-[230px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#7C3AED]/14 blur-[70px] md:block"
      />

      <div
        data-work-layer="main"
        className="relative z-10 mx-auto hidden rounded-[24px] border border-white/10 bg-[#0D0B13]/96 p-4 shadow-[0_28px_86px_rgba(0,0,0,0.42),inset_0_0_36px_rgba(139,61,255,0.055)] backdrop-blur-2xl md:block sm:p-5 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[520px] lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">ALYVORA PLATFORM</p>
            <p className="mt-1 text-sm text-[#A8A0B2]">Case study operating layer</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200">
            <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
            Live
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const active = index === 2;

            return (
              <div
                key={step.label}
                data-work-inner
                className={[
                  "flex items-center justify-between gap-3 rounded-[16px] border px-3 py-2.5",
                  active
                    ? "border-[#A855F7]/36 bg-[#8B3DFF]/14 shadow-[0_0_24px_rgba(139,61,255,0.14)]"
                    : "border-white/10 bg-black/16",
                ].join(" ")}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={[
                      "grid size-8 shrink-0 place-items-center rounded-full border",
                      active
                        ? "border-[#A855F7]/40 bg-[#8B3DFF]/24 text-[#F7F4FB]"
                        : "border-white/10 bg-[#15111D] text-[#A8A0B2]",
                    ].join(" ")}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#F7F4FB]">{step.label}</p>
                    <p className="text-xs leading-5 text-[#8F879A]">{step.detail}</p>
                  </div>
                </div>
                <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-cyan-200" />
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {signals.map((item) => (
            <span key={item} className="rounded-[12px] border border-white/10 bg-white/[0.035] px-2 py-2 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[#D8D0E4]">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        data-work-layer="insight"
        className="relative z-20 mt-4 hidden rounded-[18px] border border-white/10 bg-[linear-gradient(135deg,#15111D,rgba(18,16,25,0.95))] p-4 shadow-[0_18px_56px_rgba(0,0,0,0.34)] backdrop-blur-xl md:block sm:absolute sm:right-0 sm:top-2 sm:mt-0 sm:w-[218px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">AI INSIGHT</p>
        <p className="mt-3 text-xs leading-6 text-[#D8D0E4]">
          Qualified request ready for consultation.
        </p>
      </div>

      <div
        data-work-layer="activity"
        className="relative z-[18] mt-4 hidden rounded-[18px] border border-white/10 bg-[#121019]/96 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.34)] backdrop-blur-xl md:block sm:absolute sm:bottom-2 sm:left-2 sm:mt-0 sm:w-[230px]"
      >
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200">
            <ShieldCheck aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C4A7FF]">READINESS</p>
            <p className="mt-1 text-2xl font-semibold tracking-normal text-[#F7F4FB]">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
