import { ContactDetail } from "@/components/sections/contact/ContactDetail";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CalendarCheck2, Clock3, Mail, ShieldCheck } from "lucide-react";

const highlights = [
  {
    label: "Response",
    value: "Within 1 business day",
    icon: Clock3,
  },
  {
    label: "Consultation",
    value: "Free project discovery",
    icon: CalendarCheck2,
  },
  {
    label: "Approach",
    value: "Secure scope planning",
    icon: ShieldCheck,
  },
];

export function ContactContent() {
  return (
    <div className="relative z-10 max-w-[560px] lg:sticky lg:top-32">
      <div data-contact-content="eyebrow">
        <SectionLabel>START YOUR PROJECT</SectionLabel>
      </div>
      <h2
        data-contact-content="heading"
        className="mt-5 max-w-[540px] text-[clamp(2.4rem,4vw,4.55rem)] font-semibold leading-[1.04] tracking-normal text-[var(--text)]"
      >
        Build the right system, not just another screen
      </h2>
      <p
        data-contact-content="copy"
        className="mt-5 max-w-[540px] text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
      >
        Tell us what you want to build, improve, or automate. Alyvora will help you define scope,
        timing, architecture, budget fit, and the right delivery path.
      </p>

      <div data-contact-content="email" className="mt-7">
        <a
          href="mailto:hello@alyvora.ai"
          className="inline-flex min-h-12 items-center gap-3 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-bold text-[var(--text)] shadow-[0_16px_44px_var(--shadow-color)] transition hover:border-purple-300/35 hover:text-[var(--purple)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        >
          <Mail aria-hidden="true" className="size-4 text-[var(--purple)]" />
          hello@alyvora.ai
        </a>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} data-contact-detail className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_16px_44px_var(--shadow-color)]">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-[12px] border border-purple-300/20 bg-purple-500/10 text-[var(--purple)]">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <p className="min-w-0 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{item.label}</p>
              </div>
              <p className="mt-1 text-sm font-semibold leading-5 text-[var(--text)]">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 border-t border-[var(--border)] pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <ContactDetail label="WHAT WE CAN HELP WITH">
          AI, automation, custom software, web and mobile apps, cloud systems, MVPs, and consulting.
        </ContactDetail>
        <ContactDetail label="WHAT HAPPENS NEXT">
          A focused consultation about requirements, budget, timeline, risk, and the system you need.
        </ContactDetail>
      </div>
    </div>
  );
}
