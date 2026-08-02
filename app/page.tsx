import { Hero } from "@/components/sections/hero";
import { Contact } from "@/components/sections/contact";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main id="main-content" className="bg-brand-background" aria-label="Main content">
      <Hero />
      <Services />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
