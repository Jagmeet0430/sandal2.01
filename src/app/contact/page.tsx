import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-[var(--background)] text-[var(--foreground)]">
      <FloatingHeader />
      <ContactSection />
      <Footer />
    </main>
  );
}
