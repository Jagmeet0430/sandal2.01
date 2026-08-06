import { PageHero } from "@/components/layout/PageHero";
import { ProcessTabs } from "@/components/home/ProcessTabs";

export default function ProcessPage() {
  return (
    <main id="main-content">
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
        description="A focused process for understanding, designing, building, testing, and scaling intelligent digital products."
      />

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-[1280px]">
          <ProcessTabs />
        </div>
      </section>
    </main>
  );
}
