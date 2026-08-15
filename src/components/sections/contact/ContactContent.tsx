import { ContactDetail } from "@/components/sections/contact/ContactDetail";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactContent() {
  return (
    <div className="relative z-10 max-w-[600px]">
      <div data-contact-content="eyebrow">
        <SectionLabel>LET&apos;S TALK</SectionLabel>
      </div>
      <h2
        data-contact-content="heading"
        className="ds-display mt-6"
      >
        Let&apos;s build something intelligent together
      </h2>
      <p
        data-contact-content="copy"
        className="ds-body mt-7 max-w-[560px]"
      >
        Tell us what you are building, the challenge you are solving, and where you need support.
        We&apos;ll help you define the right next step.
      </p>

      <div data-contact-content="email" className="mt-9">
        <a
          href="mailto:hello@apexmind.ai"
          className="inline-flex text-lg font-semibold text-[var(--text)] underline decoration-purple-400/0 underline-offset-8 transition hover:text-[var(--purple)] hover:decoration-purple-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        >
          hello@apexmind.ai
        </a>
      </div>

      <div className="mt-12 grid gap-6 border-t border-[var(--border)] pt-7 sm:grid-cols-2">
        <ContactDetail label="WHAT WE CAN HELP WITH">
          Strategy, product, AI, automation, cloud systems, and digital platforms.
        </ContactDetail>
        <ContactDetail label="WHAT HAPPENS NEXT">
          A focused conversation about scope, timing, risk, priorities, and the system you need.
        </ContactDetail>
      </div>
    </div>
  );
}
