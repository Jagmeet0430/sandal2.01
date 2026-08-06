import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Process", href: "/process" },
  { label: "Technology", href: "/technology" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/contact" },
  { label: "Terms", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="cinematic-section relative overflow-hidden border-t border-theme">
      <div className="cinematic-noise" />
      <div className="pointer-events-none absolute inset-x-[12%] bottom-[-180px] h-[320px] rounded-[50%] bg-purple-700/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full border border-purple-300/10" />
      <div className="pointer-events-none absolute -right-12 top-20 h-52 w-52 rounded-full border border-purple-300/10" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 py-14 md:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="ApexMind home">
              <Image src="/logos/apexmind-mark.svg" alt="" width={34} height={34} />
              <div>
                <p className="text-xl font-semibold tracking-[-0.03em]">ApexMind</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-theme-muted">
                  Digital Intelligence
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-[520px] text-sm leading-7 text-theme-secondary">
              Intelligent applications, automation systems, cloud platforms, and digital products for modern businesses.
            </p>

            <a
              href="mailto:hello@apexmind.ai"
              className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-theme-secondary transition hover:text-purple-700 dark:hover:text-purple-200"
            >
              <span className="grid size-10 place-items-center rounded-full border border-theme cinematic-surface">
                <Mail className="size-4 text-purple-700 dark:text-purple-200" />
              </span>
              hello@apexmind.ai
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px] lg:grid-cols-3">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-1 py-2 text-sm font-semibold text-theme-secondary transition hover:text-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 dark:hover:text-purple-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-theme pt-8 text-sm text-theme-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} ApexMind. All rights reserved.</p>

          <a
            href="#main-content"
            aria-label="Scroll to the top"
            className="inline-flex size-11 items-center justify-center rounded-full border border-theme cinematic-surface text-theme-primary shadow-[0_12px_34px_rgba(124,44,255,0.2)] transition hover:-translate-y-1 hover:border-purple-300/40 hover:bg-purple-600"
          >
            <ArrowUp className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
