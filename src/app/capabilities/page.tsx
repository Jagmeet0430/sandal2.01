import { CinematicServiceDetails } from "@/components/home/CinematicServiceDetails";
import { PageHero } from "@/components/layout/PageHero";

export default function CapabilitiesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Technology created for{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              complex business needs
            </span>
          </>
        }
        description="Explore our capabilities across artificial intelligence, automation, cloud platforms, and experience design."
      />

      <CinematicServiceDetails />
    </main>
  );
}
