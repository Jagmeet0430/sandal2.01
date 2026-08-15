import Link from "next/link";
import type { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function PrimaryButton({ children, href, className = "" }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex min-h-12 items-center justify-center rounded-[14px] border border-purple-300/25",
        "bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] px-7 text-sm font-bold text-white",
        "origin-center shadow-button transition-[transform,box-shadow,background-color] duration-200 ease-out hover:scale-[1.03] hover:shadow-card-glow",
        "hover:from-[var(--ds-primary-hover)] hover:to-[var(--ds-primary)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
