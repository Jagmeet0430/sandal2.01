import type { HTMLAttributes, ReactNode } from "react";

type LabelChipProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: "default" | "inverse";
};

export function LabelChip({ children, variant = "default", className = "", ...props }: LabelChipProps) {
  const variantClassName =
    variant === "inverse"
      ? "border-theme cinematic-surface text-theme-primary"
      : "border-violet-500/20 bg-violet-400/10 text-violet-700 dark:border-violet-300/20 dark:text-violet-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-extrabold uppercase leading-none tracking-[0.16em] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl ${variantClassName} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
