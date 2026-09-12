import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "AI Solutions", href: "/capabilities" },
      { label: "Custom Software", href: "/capabilities" },
      { label: "Automation", href: "/capabilities" },
      { label: "Web & Mobile", href: "/capabilities" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Process", href: "/process" },
      { label: "Technology", href: "/technology" },
      { label: "Privacy", href: "/contact" },
      { label: "Terms", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--background)] px-5 text-[var(--foreground)]">
      <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[-220px] h-[320px] rounded-[50%] bg-purple-700/[0.08] blur-[110px] dark:bg-purple-700/18 dark:blur-[120px]" />
      <div aria-hidden="true" className="absolute -right-28 top-16 h-72 w-72 rounded-full border border-purple-200/8" />
      <div aria-hidden="true" className="absolute -right-12 top-28 h-44 w-44 rounded-full border border-purple-200/8" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-[1240px] py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div data-footer-reveal>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Alyvora home">
              <Image src="/logos/apexmind-mark.svg" alt="" width={36} height={36} />
              <div>
                <p className="text-2xl font-extrabold text-[var(--text)] dark:text-white">Alyvora</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-200/62">
                  AI Technologies
                </p>
              </div>
            </Link>

            <p className="mt-7 max-w-[520px] text-sm leading-7 text-[var(--text-secondary)] dark:text-white/56">
              Alyvora AI Technologies Private Limited builds AI solutions, custom software,
              automation systems, web and mobile applications, cloud platforms, and digital
              transformation programs for modern businesses.
            </p>

            <a
              href="mailto:hello@alyvora.ai"
              className="mt-7 inline-flex text-sm font-semibold text-[var(--text)] transition hover:text-[var(--purple)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 dark:text-white/72 dark:hover:text-purple-200"
            >
              hello@alyvora.ai
            </a>
          </div>

          <nav
            data-footer-reveal
            aria-label="Footer navigation"
            className="grid gap-10 sm:grid-cols-3"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200/68">
                  {column.title}
                </h2>
                <ul className="mt-5 grid gap-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--purple)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 dark:text-white/50 dark:hover:text-purple-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          data-footer-reveal
          className="mt-14 flex flex-col gap-4 border-t border-[var(--border-color)] pt-7 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-white/38"
        >
          <p>&copy; {new Date().getFullYear()} Alyvora AI Technologies Private Limited. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact" className="transition hover:text-purple-200">
              Privacy
            </Link>
            <Link href="/contact" className="transition hover:text-purple-200">
              Terms
            </Link>
            <span>Intelligent Technology. Real Business Impact.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
