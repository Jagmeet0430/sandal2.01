"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { IconButton } from "@/components/common/IconButton";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { primaryNavigation } from "@/data/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", isOpen);
    document.documentElement.classList.toggle("mobile-nav-open", isOpen);

    return () => {
      document.body.classList.remove("mobile-nav-open");
      document.documentElement.classList.remove("mobile-nav-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        setIsOpen(false);
      }
    };

    closeOnDesktop();
    document.addEventListener("keydown", closeOnEscape);
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  useEffect(() => {
    const updateHeaderShadow = () => {
      setHasScrolled(window.scrollY > 8);
    };

    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderShadow);
    };
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-[15px] z-50 transition-shadow duration-300",
      ].join(" ")}
    >
      <Container
        className={[
          "header-theme flex h-16 items-center justify-between rounded-full border border-black/10 bg-white/70 text-[#12101a] shadow-[0_18px_70px_rgba(91,22,201,0.16)] backdrop-blur-2xl transition-shadow duration-300 dark:border-white/10 dark:bg-black/45 dark:text-white",
          hasScrolled ? "shadow-[0_22px_90px_rgba(91,22,201,0.18)] backdrop-blur-2xl" : "",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="ApexMind home">
          <Image src="/logos/apexmind-mark.svg" alt="" width={32} height={32} />
          <span className="text-theme-primary text-[22px] font-extrabold tracking-normal">ApexMind</span>
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative rounded-full px-[17px] py-[9px] text-[13px] font-semibold leading-none transition",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300",
                  isActive
                    ? "border border-purple-500/30 bg-purple-500/10 text-[#12101a] shadow-[0_0_22px_rgba(169,112,255,0.18)] dark:border-purple-200/70 dark:bg-white/[0.06] dark:text-white"
                    : "text-slate-600 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white",
                ].join(" ")}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute inset-x-4 -bottom-1 h-px rounded-full bg-violet-300 shadow-[0_0_16px_rgba(169,112,255,0.9)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />

          <div className="hidden text-right xl:block">
            <p className="text-theme-muted text-[11px] leading-4">Talk to our experts</p>
            <a
              href="mailto:hello@apexmind.ai"
              className="text-theme-secondary text-[13px] font-bold leading-5 transition hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 dark:hover:text-violet-200"
            >
              hello@apexmind.ai
            </a>
          </div>
          <Button href="/contact" size="sm" className="h-10 rounded-full border border-purple-400/30 bg-purple-600/90 px-5 text-[12px] shadow-[0_0_30px_rgba(124,44,255,0.25)]">
            Start a Conversation
          </Button>
        </div>

        <IconButton
          icon={isOpen ? X : Menu}
          label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden"
          aria-controls={menuId}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        />
      </Container>

      <MobileMenu
        id={menuId}
        isOpen={isOpen}
        shouldReduceMotion={Boolean(shouldReduceMotion)}
        onNavigate={() => setIsOpen(false)}
      />
    </header>
  );
}
