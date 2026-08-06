import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type IconButtonVariant = "light" | "dark" | "ghost";

type SharedIconButtonProps = {
  icon: LucideIcon;
  label: string;
  variant?: IconButtonVariant;
  className?: string;
};

type NativeIconButtonProps = SharedIconButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

type AnchorIconButtonProps = SharedIconButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type IconButtonProps = NativeIconButtonProps | AnchorIconButtonProps;

const variantClasses: Record<IconButtonVariant, string> = {
  light: "border-theme cinematic-surface text-theme-primary shadow-sm hover:border-brand-primary/60 hover:text-brand-primary",
  dark: "border-theme cinematic-surface text-theme-secondary hover:bg-brand-primary hover:text-white",
  ghost: "border-transparent bg-transparent text-theme-secondary hover:bg-[color:var(--accent-soft)] hover:text-brand-primary",
};

function isAnchorIconButtonProps(props: IconButtonProps): props is AnchorIconButtonProps {
  return typeof (props as AnchorIconButtonProps).href === "string";
}

function getAnchorProps(props: AnchorIconButtonProps) {
  const anchorProps: Partial<AnchorIconButtonProps> = { ...props };

  delete anchorProps.icon;
  delete anchorProps.label;
  delete anchorProps.variant;
  delete anchorProps.className;
  delete anchorProps.href;

  return anchorProps as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;
}

function getNativeButtonProps(props: NativeIconButtonProps) {
  const buttonProps: Partial<NativeIconButtonProps> = { ...props };

  delete buttonProps.icon;
  delete buttonProps.label;
  delete buttonProps.variant;
  delete buttonProps.className;

  return buttonProps as Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
}

export function IconButton(props: IconButtonProps) {
  const { icon: Icon, label, variant = "light", className = "" } = props;
  const iconButtonClassName = [
    "inline-flex size-10 items-center justify-center rounded-pill border transition duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isAnchorIconButtonProps(props)) {
    return (
      <Link href={props.href} aria-label={label} className={iconButtonClassName} {...getAnchorProps(props)}>
        <Icon aria-hidden="true" className="size-4" />
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={iconButtonClassName} {...getNativeButtonProps(props)}>
      <Icon aria-hidden="true" className="size-4" />
    </button>
  );
}
