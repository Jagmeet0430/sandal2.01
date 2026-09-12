import { PageHero } from "@/components/layout/PageHero";
import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { DeliveryProcessSection } from "@/components/sections/DeliveryProcessSection";

export default function ProcessPage() {
  return (
    <main id="main-content" className="bg-[var(--background)] text-[var(--foreground)]">
      <FloatingHeader />
      <PageHero
        eyebrow="Our process"
        title={
          <>
            From initial idea to{" "}
            <span className="text-purple-300">
              long-term growth
            </span>
          </>
        }
        description="A focused process for discovery, UI/UX, architecture, development, testing, security review, deployment, and long-term improvement."
      />
      <DeliveryProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
