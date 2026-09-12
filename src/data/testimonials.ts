export type Testimonial = {
  name: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Maya Chen",
    role: "Chief Operations Officer",
    company: "Northstar Systems",
    initials: "MC",
    image: "/images/apexmind-testimonial-maya.svg",
    quote:
      "Alyvora gave our leadership team the operating clarity we needed. The platform connected decisions, workflows, and reporting without creating another layer of busywork.",
  },
  {
    name: "Julian Brooks",
    role: "VP of Product",
    company: "Cobalt Ridge",
    initials: "JB",
    image: "/images/apexmind-testimonial-julian.svg",
    quote:
      "The Alyvora team moved from strategy to production with unusual discipline. Every sprint had a clear purpose, and the final system was easy for our internal teams to own.",
  },
  {
    name: "Priya Nair",
    role: "Director of Engineering",
    company: "AtlasWorks",
    initials: "PN",
    image: "/images/apexmind-testimonial-priya.svg",
    quote:
      "They understood the constraints of enterprise delivery and still found a practical path to modern AI workflows. The result felt secure, useful, and built to last.",
  },
];
