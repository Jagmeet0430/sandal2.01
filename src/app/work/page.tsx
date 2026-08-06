import { CinematicWork } from "@/components/home/CinematicWork";
import { PageHero } from "@/components/layout/PageHero";

export default function WorkPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Systems designed for{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              measurable impact
            </span>
          </>
        }
        description="Explore platform, automation, and AI assistant concepts shaped for clear operational outcomes."
      />

      <CinematicWork />
    </main>
  );
}
