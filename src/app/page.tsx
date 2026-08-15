import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { CapabilitiesStory } from "@/components/sections/CapabilitiesStory";
import { AutomationSection } from "@/components/sections/AutomationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { HeroStory } from "@/components/sections/HeroStory";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { TechnologySection } from "@/components/sections/TechnologySection";
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
    <main id="main-content">
      <FloatingHeader />
      <div id="home">
        <HeroStory content={homeContent} />
      </div>
      <CapabilitiesStory />
      <SelectedWork />
      <ProcessStory />
      <AutomationSection />
      <TechnologySection />
      <ImpactSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
