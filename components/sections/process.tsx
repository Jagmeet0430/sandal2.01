import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

type ProcessStep = {
  title: string;
  description: string;
};

const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description: "Map business goals, user needs, existing systems, and the constraints that shape a useful solution.",
  },
  {
    title: "Strategy",
    description: "Define the product direction, technical architecture, delivery plan, and measurable success criteria.",
  },
  {
    title: "Design and Development",
    description: "Move from clear experience design into secure, scalable implementation with regular review cycles.",
  },
  {
    title: "Launch and Optimization",
    description: "Release with confidence, monitor real-world performance, and improve the system as new signals emerge.",
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="Process"
          title="A clear path from first signal to production momentum."
          description="Our process keeps strategy, design, engineering, and optimization connected so teams can move quickly without losing control of the details."
        />

        <ol className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-0">
          {processSteps.map((step, index) => (
            <li key={step.title} className="relative lg:px-3">
              {index < processSteps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="absolute left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] top-10 hidden h-px bg-gradient-to-r from-brand-border via-brand-primary/30 to-brand-border lg:block"
                />
              ) : null}

              <article className="group relative flex h-full gap-5 rounded-2xl border border-brand-border bg-brand-elevated p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-primary/35 hover:bg-white hover:shadow-soft lg:flex-col">
                <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-brand-primary/20 bg-white text-lg font-semibold text-brand-primary shadow-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-xl font-semibold leading-7 text-brand-navy">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{step.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
