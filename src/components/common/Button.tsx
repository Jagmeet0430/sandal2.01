import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
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
    "border-purple-300/25 bg-gradient-to-b from-[#8a2bff] to-[#5b16c9] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_48px_rgba(138,43,255,0.38)] hover:-translate-y-0.5 hover:from-[#9b4cff] hover:to-[#6d22df] focus-visible:outline-violet-300",
  secondary:
    "border-theme cinematic-surface text-theme-primary shadow-sm backdrop-blur-xl hover:border-violet-400/40 hover:text-violet-700 focus-visible:outline-violet-300 dark:hover:text-violet-200",
  outline:
    "border-violet-500/30 cinematic-surface text-violet-700 backdrop-blur-xl hover:border-violet-500/70 hover:bg-violet-400/10 hover:text-violet-950 focus-visible:outline-violet-300 dark:border-violet-300/30 dark:text-violet-100 dark:hover:border-violet-200/70 dark:hover:text-white",
  ghost:
    "border-transparent bg-transparent text-theme-secondary hover:bg-[color:var(--accent-soft)] hover:text-theme-primary focus-visible:outline-violet-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-5 text-sm",
  md: "h-11 gap-2.5 px-7 text-[15px]",
  lg: "h-[54px] gap-3 px-8 text-base",
};

function getButtonClassName({
  variant,
  size,
  className,
}: Pick<SharedButtonProps, "variant" | "size" | "className">) {
  return [
    "inline-flex items-center justify-center rounded-full border font-extrabold transition duration-300 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50",
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
