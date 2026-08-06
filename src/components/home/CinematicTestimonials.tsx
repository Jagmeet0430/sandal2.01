"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "ApexMind helped us turn a complex product idea into a clear, scalable platform. Their team understood both the business and technical requirements from the beginning.",
    name: "Product leader",
    detail: "Digital platform engagement",
  },
  {
    quote:
      "The new platform reduced manual work across our operations and gave our team far better visibility.",
    name: "Operations team",
    detail: "Automation engagement",
  },
  {
    quote:
      "Their design and engineering process was structured, transparent, and focused on real outcomes.",
    name: "Founder",
    detail: "Product development engagement",
  },
];

export function CinematicTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="cinematic-section cinematic-section-secondary px-5 py-28 md:py-36">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-x-[18%] top-1/2 h-[360px] -translate-y-1/2 rounded-[50%] bg-purple-700/18 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1040px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-theme-accent">Client perspective</p>

        <div className="relative mt-12 min-h-[320px]" aria-live="polite">
          <span className="pointer-events-none absolute left-1/2 top-[-40px] -translate-x-1/2 text-[140px] font-serif leading-none text-[rgba(113,53,220,0.08)] dark:text-white/[0.035]">
            &quot;
          </span>

          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.quote}
              className={[
                "absolute inset-0 flex flex-col items-center justify-center transition duration-500",
                index === activeIndex ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-sm",
              ].join(" ")}
            >
              <blockquote className="text-3xl font-medium leading-tight tracking-[-0.04em] text-theme-primary sm:text-5xl">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              <figcaption className="mt-10">
                <div className="flex justify-center gap-1 text-purple-200" aria-label="Five star rating">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm font-semibold text-theme-primary">{testimonial.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-theme-muted">{testimonial.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous testimonial"
            className="grid size-11 place-items-center rounded-full border border-theme cinematic-surface text-theme-secondary transition hover:border-purple-300/40 hover:text-theme-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex gap-2" aria-label="Testimonial progress">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.quote}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                className={[
                  "h-1.5 rounded-full transition-all",
                  index === activeIndex ? "w-8 bg-purple-400" : "w-3 bg-[color:var(--border-strong)] hover:bg-purple-300/50",
                ].join(" ")}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Show next testimonial"
            className="grid size-11 place-items-center rounded-full border border-theme cinematic-surface text-theme-secondary transition hover:border-purple-300/40 hover:text-theme-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
