import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={`${isCentered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-3xl font-semibold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className={`${isCentered ? "mx-auto" : ""} mt-5 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
