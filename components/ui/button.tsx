import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
};

type NativeButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

type AnchorButtonProps = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    href: string;
  };

export type ButtonProps = NativeButtonProps | AnchorButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand-primary text-white shadow-button hover:bg-brand-primaryDark focus-visible:outline-brand-primary",
  secondary:
    "border-brand-border bg-white text-brand-navy shadow-sm hover:border-brand-primary/40 hover:text-brand-primary focus-visible:outline-brand-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 text-sm",
  md: "h-12 gap-2.5 px-5 text-sm",
  lg: "h-14 gap-3 px-6 text-base",
};

function getButtonClassName({
  variant,
  size,
  className,
}: Pick<SharedButtonProps, "variant" | "size" | "className">) {
  return [
    "inline-flex items-center justify-center rounded-brand border font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant ?? "primary"],
    sizeClasses[size ?? "md"],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function ButtonContent({
  children,
  icon: Icon,
  iconPosition = "right",
}: Pick<SharedButtonProps, "children" | "icon" | "iconPosition">) {
  if (!Icon) {
    return <>{children}</>;
  }

  return (
    <>
      {iconPosition === "left" ? <Icon aria-hidden="true" className="size-4 shrink-0" /> : null}
      <span>{children}</span>
      {iconPosition === "right" ? <Icon aria-hidden="true" className="size-4 shrink-0" /> : null}
    </>
  );
}

function isAnchorButtonProps(props: ButtonProps): props is AnchorButtonProps {
  return typeof (props as AnchorButtonProps).href === "string";
}

function getAnchorProps(props: AnchorButtonProps) {
  const anchorProps: Partial<AnchorButtonProps> = { ...props };

  delete anchorProps.children;
  delete anchorProps.variant;
  delete anchorProps.size;
  delete anchorProps.icon;
  delete anchorProps.iconPosition;
  delete anchorProps.className;
  delete anchorProps.href;

  return anchorProps as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href">;
}

function getNativeButtonProps(props: NativeButtonProps) {
  const buttonProps: Partial<NativeButtonProps> = { ...props };

  delete buttonProps.children;
  delete buttonProps.variant;
  delete buttonProps.size;
  delete buttonProps.icon;
  delete buttonProps.iconPosition;
  delete buttonProps.className;

  return buttonProps as Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", icon, iconPosition, className } = props;

  const buttonClassName = getButtonClassName({ variant, size, className });

  if (isAnchorButtonProps(props)) {
    return (
      <Link href={props.href} className={buttonClassName} {...getAnchorProps(props)}>
        <ButtonContent icon={icon} iconPosition={iconPosition}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...getNativeButtonProps(props)}>
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </button>
  );
}
