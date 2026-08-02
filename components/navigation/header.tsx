"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { primaryNavigation } from "@/lib/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
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

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/80 bg-white/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="ApexMind home">
          <span className="grid size-10 place-items-center rounded-brand bg-brand-primary text-sm font-bold text-white shadow-button">
            AM
          </span>
          <span className="text-lg font-semibold tracking-normal text-brand-navy">ApexMind</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-muted transition hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/#contact" variant="secondary" size="sm">
            Contact
          </Button>
          <Button href="/#demo" size="sm" icon={ArrowRight}>
            Get started
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-brand border border-brand-border bg-white text-brand-navy shadow-sm transition hover:border-brand-primary/40 hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary lg:hidden"
          aria-controls={menuId}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id={menuId}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            className="fixed inset-x-0 top-20 z-40 h-[calc(100vh-5rem)] overflow-y-auto bg-white lg:hidden"
          >
            <Container className="flex min-h-full flex-col py-8">
              <nav className="flex flex-col gap-2" aria-label="Mobile primary navigation">
                {primaryNavigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.22, delay: shouldReduceMotion ? 0 : index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-brand border border-transparent px-1 py-4 text-2xl font-semibold text-brand-navy transition hover:border-brand-border hover:bg-brand-sky/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                    >
                      {item.label}
                      <ArrowRight aria-hidden="true" className="size-5 text-brand-primary" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto grid gap-3 border-t border-brand-border pt-8 sm:grid-cols-2">
                <Button href="/#contact" variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>
                  Contact
                </Button>
                <Button href="/#demo" icon={ArrowRight} className="w-full" onClick={() => setIsOpen(false)}>
                  Get started
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
