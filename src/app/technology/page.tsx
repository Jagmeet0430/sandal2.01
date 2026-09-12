import { PageHero } from "@/components/layout/PageHero";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { TechnologyOverviewSection } from "@/components/sections/TechnologyOverviewSection";

export default function TechnologyPage() {
  return (
    <main id="main-content" className="bg-[var(--background)] text-[var(--foreground)]">
      <FloatingHeader />
      <PageHero
        eyebrow="Technology"
        title={
          <>
            Systems built on{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              reliable foundations
            </span>
          </>
        }
        description="A practical technology ecosystem spanning Next.js, React, TypeScript, PostgreSQL, Prisma, Node.js, FastAPI, OpenAI, Anthropic, RAG, vector databases, Vercel, AWS, Docker, and CI/CD."
      />
      <TechnologyOverviewSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
