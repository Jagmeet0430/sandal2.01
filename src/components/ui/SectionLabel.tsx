import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={[
        "ds-small text-[var(--section-label-color)]",
        className,
      ].join(" ")}
    >
      {children}
    </p>
  );
}
