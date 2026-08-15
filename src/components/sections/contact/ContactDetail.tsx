import type { ReactNode } from "react";

type ContactDetailProps = {
  label: string;
  children: ReactNode;
};

export function ContactDetail({ label, children }: ContactDetailProps) {
  return (
    <div data-contact-detail>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--purple)]">
        {label}
      </p>
      <div className="mt-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px]">{children}</div>
    </div>
  );
}
