"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { primaryNavigation } from "@/data/navigation";

type MobileMenuProps = {
  id: string;
  isOpen: boolean;
  shouldReduceMotion: boolean;
  onNavigate: () => void;
};

export function MobileMenu({ id, isOpen, shouldReduceMotion, onNavigate }: MobileMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id={id}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          className="cinematic-glass fixed inset-x-4 top-24 z-40 h-[calc(100vh-7rem)] overflow-y-auto rounded-[30px] shadow-[0_30px_120px_var(--shadow-color),0_0_70px_rgba(138,43,255,0.14)] lg:hidden"
        >
          <Container className="flex min-h-full flex-col py-8">
            <nav className="flex flex-col gap-2" aria-label="Mobile primary navigation">
              {primaryNavigation.map((item, index) => {
                const isExpanded = openGroup === item.label;
                const hasChildren = Boolean(item.children?.length);

                return (
                  <motion.div
                    key={item.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.22, delay: shouldReduceMotion ? 0 : index * 0.04 }}
                  >
                    <div className="rounded-2xl border border-transparent transition hover:border-theme hover:bg-[color:var(--accent-soft)]">
                      <div className="flex items-center">
                        <Link href={item.href} onClick={onNavigate} className="text-theme-primary flex min-w-0 flex-1 items-center justify-between px-3 py-4 text-2xl font-extrabold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300">
                          {item.label}
                          {!hasChildren ? <ArrowRight aria-hidden="true" className="size-5 text-brand-primary" /> : null}
                        </Link>

                        {hasChildren ? (
                          <button type="button" aria-label={`Toggle ${item.label} menu`} aria-expanded={isExpanded} onClick={() => setOpenGroup(isExpanded ? null : item.label)} className="mr-2 grid size-11 place-items-center rounded-xl text-violet-500 transition hover:bg-[color:var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 dark:text-violet-200">
                            <ChevronDown className={["size-5 transition", isExpanded ? "rotate-180" : ""].join(" ")} />
                          </button>
                        ) : null}
                      </div>

                      {hasChildren && isExpanded ? (
                        <div className="grid gap-1 px-3 pb-3">
                          {item.children?.map((child) => (
                            <Link key={child.label} href={child.href} onClick={onNavigate} className="cinematic-surface rounded-xl px-4 py-3 text-sm font-bold text-theme-secondary transition hover:text-violet-700 dark:hover:text-violet-200">
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
              <span className="text-sm font-semibold text-slate-700 dark:text-white/70">Appearance</span>
              <ThemeToggle />
            </div>

            <div className="mt-auto grid gap-5 border-t border-theme pt-8">
              <div className="grid gap-2 text-sm">
                <a href="mailto:hello@apexmind.ai" className="text-theme-secondary font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">hello@apexmind.ai</a>
                <Link href="/contact" className="font-semibold text-violet-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 dark:text-violet-200" onClick={onNavigate}>
                  Free consultation
                </Link>
              </div>
              <Button href="/contact" icon={ArrowRight} className="w-full" onClick={onNavigate}>Start a Conversation</Button>
            </div>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
