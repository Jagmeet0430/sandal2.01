import { PageHero } from "@/components/layout/PageHero";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";

export default function CapabilitiesPage() {
  return (
    <main id="main-content" className="bg-[var(--background)] text-[var(--foreground)]">
      <FloatingHeader />
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Technology created for{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              real business needs
            </span>
          </>
        }
        description="Explore Alyvora capabilities across AI assistants, RAG systems, AI agents, custom software, web and mobile applications, automation, cloud, and consulting."
      />
      <ServicesOverview />
      <ContactSection />
      <Footer />
    </main>
  );
}
