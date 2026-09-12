import { ContactCard } from "@/components/sections/contact/ContactCard";
import { ContactContent } from "@/components/sections/contact/ContactContent";

export function ContactSection() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--background)] px-5 py-16 pt-28 text-[var(--foreground)] sm:py-20 sm:pt-32 lg:min-h-screen lg:py-24 lg:pt-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(124,58,237,0.075),transparent_27%),radial-gradient(circle_at_12%_82%,rgba(37,99,235,0.045),transparent_24%)] dark:bg-[radial-gradient(circle_at_78%_18%,rgba(139,61,255,0.16),transparent_30%),radial-gradient(circle_at_12%_82%,rgba(37,99,235,0.08),transparent_28%)]" />
      <div className="hero-stage-grid absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200/18 to-transparent" />

      <div id="contact" data-scroll-anchor className="relative mx-auto grid max-w-[1240px] items-start gap-10 lg:grid-cols-[0.43fr_0.57fr] lg:gap-12 xl:gap-16">
        <ContactContent />
        <ContactCard />
      </div>
    </section>
  );
}
