import Link from "next/link";

type ContactCTAProps = {
  href?: string;
  children: string;
  className?: string;
};

export function ContactCTA({ href = "mailto:hello@alyvora.ai", children, className = "" }: ContactCTAProps) {
  return (
    <Link
      data-contact-cta
      href={href}
      className={[
        "inline-flex min-h-12 items-center justify-center rounded-[14px] border border-purple-300/25",
        "bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] px-7 text-sm font-bold text-white",
        "shadow-button transition hover:-translate-y-0.5",
        "hover:from-[var(--ds-primary-hover)] hover:to-[var(--ds-primary)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
