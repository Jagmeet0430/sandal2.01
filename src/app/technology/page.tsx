import { PageHero } from "@/components/layout/PageHero";

export default function TechnologyPage() {
  return (
    <main id="main-content">
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
        description="A focused technology ecosystem selected for performance, security, integrations, and long-term scalability."
      />
    </main>
  );
}
