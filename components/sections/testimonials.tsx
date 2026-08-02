import { Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Maya Chen",
    role: "Chief Operations Officer",
    company: "Northstar Systems",
    initials: "MC",
    quote:
      "The team translated a messy operational challenge into a platform our leaders actually trust. The work felt thoughtful, measured, and built for long-term use.",
  },
  {
    name: "Daniel Reyes",
    role: "VP of Technology",
    company: "Cobalt Ridge",
    initials: "DR",
    quote:
      "They brought structure to every decision, from architecture to rollout. We moved faster without sacrificing the security standards our customers expect.",
  },
  {
    name: "Priya Nair",
    role: "Head of Product",
    company: "AtlasWorks",
    initials: "PN",
    quote:
      "What stood out was the clarity. Strategy, design, and engineering stayed connected, and the final product gave our teams room to grow.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-brand-background py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title="Trusted by leaders modernizing critical technology."
          description="A few words from teams who needed clear thinking, dependable execution, and enterprise-grade product craft."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-soft"
            >
              <Quote aria-hidden="true" className="size-8 text-brand-primary/70" />
              <blockquote className="mt-6 grow">
                <p className="text-base leading-8 text-brand-navy">&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-brand-border pt-5">
                <div
                  aria-hidden="true"
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-primary text-sm font-semibold text-white shadow-button"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-brand-navy">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-brand-muted">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
