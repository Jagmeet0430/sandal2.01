import Link from "next/link";
import { Container } from "@/components/layout/container";
import { footerColumns, socialLinks } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="ApexMind home">
              <span className="grid size-10 place-items-center rounded-brand bg-brand-primary text-sm font-bold text-white shadow-button">
                AM
              </span>
              <span className="text-lg font-semibold">ApexMind</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Enterprise technology systems designed with clarity, resilience, and measurable business value.
            </p>
            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-brand border border-white/10 text-white/75 transition hover:border-brand-primary hover:bg-brand-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <nav className="grid gap-10 sm:grid-cols-3" aria-label="Footer navigation">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} ApexMind. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/#privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/#terms" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
