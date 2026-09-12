import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DeliveryProcessSection } from "@/components/sections/DeliveryProcessSection";
import { Footer } from "@/components/layout/Footer";
import { HeroStory } from "@/components/sections/HeroStory";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TechnologyOverviewSection } from "@/components/sections/TechnologyOverviewSection";
import { TrustProofSection } from "@/components/sections/TrustProofSection";
import { getDraftHomeContent, getPublishedHomeContent } from "@/lib/cms/store";

type HomeProps = {
  searchParams?: Promise<{
    preview?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const homeContent =
    params?.preview === "home-draft"
      ? await getDraftHomeContent()
      : await getPublishedHomeContent();

  return (
    <main id="main-content" className="bg-[var(--background)] text-[var(--foreground)]">
      <FloatingHeader />
      <div id="home" data-scroll-anchor>
        <HeroStory content={homeContent} />
      </div>
      <TrustProofSection />
      <ServicesOverview />
      <SelectedWork />
      <DeliveryProcessSection />
      <TechnologyOverviewSection />
      <BusinessImpactSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
