import type { ReactNode } from "react";

type GradientHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function GradientHeading({ children, className = "" }: GradientHeadingProps) {
  return (
    <span
      className={[
        "bg-[linear-gradient(90deg,var(--gradient-heading-start),var(--gradient-heading-mid),var(--gradient-heading-end))] bg-clip-text text-transparent",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
