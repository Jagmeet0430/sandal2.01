"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { primaryNavigation } from "@/data/navigation";

const homeHref = "/";
const routeActiveMap: Record<string, string> = {
  "/": homeHref,
  "/capabilities": "/capabilities",
  "/process": "/process",
  "/technology": "/technology",
  "/work": "/work",
  "/contact": "/contact",
};

const sectionNavigation = [
  { href: homeHref, id: "home" },
  { href: "/capabilities", id: "capabilities" },
  { href: "/process", id: "process" },
  { href: "/technology", id: "technology" },
  { href: "/work", id: "work" },
  { href: "/contact", id: "contact" },
];

export function FloatingHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const headerShellRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(primaryNavigation[0]?.href ?? homeHref);
  const [frostProgress, setFrostProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const header = headerRef.current;
    const headerShell = headerShellRef.current;

    if (!header || !headerShell) {
      return undefined;
    }

    let frame = 0;

    const measureHeader = () => {
      frame = 0;
      const headerBottom = header.getBoundingClientRect().bottom;

      root.style.setProperty("--header-height", `${Math.ceil(headerBottom)}px`);
      root.style.setProperty("--site-header-height", `${Math.ceil(headerBottom)}px`);
      root.style.setProperty("--site-header-scroll-offset", `${Math.ceil(headerBottom)}px`);
    };

    const requestMeasure = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(measureHeader);
    };

    const resizeObserver = new ResizeObserver(requestMeasure);

    resizeObserver.observe(header);
    resizeObserver.observe(headerShell);
    requestMeasure();
    window.addEventListener("resize", requestMeasure);
    window.addEventListener("orientationchange", requestMeasure);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      resizeObserver.disconnect();
      window.removeEventListener("resize", requestMeasure);
      window.removeEventListener("orientationchange", requestMeasure);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateFrost = () => {
      frame = 0;
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / 80));
      setFrostProgress((current) => (Math.abs(current - nextProgress) < 0.01 ? current : nextProgress));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateFrost);
    };

    updateFrost();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", isOpen);
    document.documentElement.classList.toggle("mobile-nav-open", isOpen);

    return () => {
      document.body.classList.remove("mobile-nav-open");
      document.documentElement.classList.remove("mobile-nav-open");
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveHref(routeActiveMap[pathname] ?? primaryNavigation[0]?.href ?? homeHref);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return undefined;
    }

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const measuredHeaderOffset = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue("--site-header-scroll-offset"),
      ) || 0;
      const anchorY = measuredHeaderOffset + window.innerHeight * 0.34;
      let nextActive = homeHref;

      sectionNavigation.forEach((item) => {
        const section = document.getElementById(item.id);

        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();

        if (rect.top <= anchorY && rect.bottom >= anchorY) {
          nextActive = item.href;
        }
      });

      setActiveHref((current) => (current === nextActive ? current : nextActive));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
    let isMounted = true;

    document.fonts?.ready.then(() => {
      if (isMounted) {
        requestUpdate();
      }
    });

    return () => {
      isMounted = false;

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, [pathname]);

  const headerStyle = {
    "--header-frost-progress": frostProgress.toFixed(3),
  } as CSSProperties;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-[18px] z-[80] px-4">
      <div
        ref={headerShellRef}
        style={headerStyle}
        className="floating-header-shell mx-auto flex h-[64px] w-full max-w-[min(1320px,calc(100vw-2rem))] items-center justify-between rounded-full border px-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out sm:px-7 lg:px-8"
      >
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-2.5"
          aria-label="Alyvora home"
          onClick={() => setIsOpen(false)}
        >
          <Image src="/logos/apexmind-mark.svg" alt="" width={31} height={31} priority />
          <span className="text-[21px] font-extrabold tracking-normal text-[var(--text-primary)]">
            Alyvora
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setIsOpen(false)}
                className={[
                  "group relative overflow-hidden rounded-full border px-[19px] py-[10px] text-[13px] font-semibold leading-none",
                  "border-transparent transition-[background-color,border-color,color,box-shadow] duration-200 ease-out",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300",
                  isActive
                    ? "border border-purple-300/45 bg-purple-500/10 text-[var(--text-primary)] shadow-[0_0_24px_rgba(169,112,255,0.18)]"
                    : "text-[var(--text-secondary)] hover:border-purple-300/24 hover:bg-purple-500/8 hover:text-[var(--text-primary)]",
                ].join(" ")}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className={[
                    "pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center rounded-full bg-[var(--ds-primary)]",
                    "transition-[opacity,transform] duration-200 ease-out",
                    isActive ? "scale-x-100 opacity-80" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-55",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />

          <div className="text-right">
            <p className="text-[11px] leading-4 text-[var(--text-muted)]">Talk to our experts</p>
            <a
              href="mailto:hello@alyvora.ai"
              className="text-[13px] font-bold leading-5 text-[var(--text-secondary)] transition hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
            >
              hello@alyvora.ai
            </a>
          </div>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-10 origin-center items-center justify-center rounded-[14px] border border-purple-300/25 bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] px-5 text-[12px] font-bold text-white shadow-button transition-[transform,box-shadow,background-color] duration-200 ease-out hover:scale-[1.03] hover:shadow-card-glow hover:from-[var(--ds-primary-hover)] hover:to-[var(--ds-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            Start Your Project
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-primary)] transition-[background-color,border-color,color] duration-200 ease-out lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        style={headerStyle}
        className={[
          "floating-header-shell mx-auto mt-3 w-full max-w-[1240px] overflow-hidden rounded-[28px] border",
          "transition-[opacity,transform,max-height,padding,background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out lg:hidden",
          isOpen ? "max-h-[560px] translate-y-0 p-4 opacity-100" : "pointer-events-none max-h-0 -translate-y-2 p-0 opacity-0",
        ].join(" ")}
      >
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "location" : undefined}
                onClick={() => setIsOpen(false)}
                className={[
                  "group relative overflow-hidden rounded-2xl border px-4 py-3 text-lg font-bold",
                  "transition-[background-color,border-color,color] duration-200 ease-out",
                  activeHref === item.href
                    ? "border-purple-300/32 bg-purple-500/10 text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-primary)] hover:border-purple-300/20 hover:bg-purple-500/8",
                ].join(" ")}
              >
                <span>{item.label}</span>
                <span
                  className={[
                    "absolute bottom-2 left-4 h-px w-10 origin-left rounded-full bg-[var(--ds-primary)] transition-[opacity,transform] duration-200 ease-out",
                    activeHref === item.href ? "scale-x-100 opacity-75" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-55",
                  ].join(" ")}
                />
              </Link>
            ))}
          </nav>

          <div className="mt-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Theme</span>
              <ThemeToggle />
            </div>
            <p className="text-xs text-[var(--text-muted)]">Talk to our experts</p>
            <a href="mailto:hello@alyvora.ai" className="mt-1 flex min-h-11 items-center text-sm font-bold text-[var(--text-primary)]">
              hello@alyvora.ai
            </a>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex h-11 w-full origin-center items-center justify-center rounded-[14px] bg-gradient-to-b from-[var(--ds-primary)] to-[#5b16c9] text-sm font-bold text-white shadow-button transition-[transform,box-shadow,background-color] duration-200 ease-out hover:scale-[1.03] hover:shadow-card-glow hover:from-[var(--ds-primary-hover)] hover:to-[var(--ds-primary)]"
            >
              Start Your Project
            </Link>
          </div>
      </div>
    </header>
  );
}
