import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The ApexMind page you requested could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="cinematic-section">
      <section aria-labelledby="not-found-title" className="py-20 sm:py-24 lg:py-[120px]">
        <Container className="flex min-h-[52vh] flex-col items-start justify-center">
          <p className="text-sm font-bold uppercase text-brand-primary">404</p>
          <h1 id="not-found-title" className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-theme-primary sm:text-5xl">
            This page is not available.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-theme-secondary">
            The page may have moved, or the link may no longer point to an active ApexMind resource.
          </p>
          <Button href="/" icon={ArrowRight} size="lg" className="mt-8">
            Return home
          </Button>
        </Container>
      </section>
    </main>
  );
}
