import { CinematicContact } from "@/components/home/CinematicContact";
import { PageHero } from "@/components/layout/PageHero";

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Your next intelligent product{" "}
            <span className="bg-gradient-to-r from-purple-200 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              starts here
            </span>
          </>
        }
        description="Tell us what you want to build, improve, or automate. We will help you understand the best next step."
      />

      <CinematicContact />
    </main>
  );
}
