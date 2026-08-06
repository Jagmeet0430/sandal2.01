import { CinematicAbout } from "@/components/home/CinematicAbout";
import { CinematicHero } from "@/components/home/CinematicHero";
import { CinematicServiceDetails } from "@/components/home/CinematicServiceDetails";
import { CinematicServices } from "@/components/home/CinematicServices";
import { Process } from "@/components/home/Process";
import { TechnologyOrbit } from "@/components/home/TechnologyOrbit";

export default function Home() {
  return (
    <main id="main-content">
      <CinematicHero />
      <CinematicServices />
      <CinematicAbout />
      <CinematicServiceDetails />
      <Process />
      <TechnologyOrbit />
    </main>
  );
}
