import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  size?: "default" | "compact";
  className?: string;
  eyebrowClassName?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
  className = "",
  eyebrowClassName = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const titleClassName =
    size === "compact"
      ? "text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl lg:text-4xl lg:leading-[46px]"
      : "text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl lg:text-[44px] lg:leading-[54px]";

  return (
    <div className={`${isCentered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className={`mb-4 text-sm font-bold uppercase tracking-normal text-brand-primary ${eyebrowClassName}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={titleClassName}>
        {title}
      </h2>
      {description ? (
        <p className={`${isCentered ? "mx-auto" : ""} mt-4 max-w-2xl text-base leading-[26px] text-brand-muted`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
