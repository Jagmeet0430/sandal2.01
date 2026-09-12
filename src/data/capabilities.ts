export type CapabilityId = "ai-products" | "custom-software" | "automation" | "web-mobile";

export type Capability = {
  id: CapabilityId;
  number: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  ctaHref: string;
};

export const capabilities: Capability[] = [
  {
    id: "ai-products",
    number: "01",
    label: "AI Solutions",
    title: "AI & Automation Solutions",
    description: "AI assistants, RAG systems, agents, analytics, and generative AI integrations designed around real workflows.",
    bullets: [
      "AI assistants and chatbots",
      "RAG-based knowledge systems",
      "AI agents and analytics",
    ],
    cta: "Explore AI solutions",
    ctaHref: "/capabilities",
  },
  {
    id: "custom-software",
    number: "02",
    label: "Custom Software",
    title: "Custom Software Development",
    description: "Reliable business systems, dashboards, portals, backend APIs, and SaaS platforms built for growth.",
    bullets: [
      "CRM, ERP, and POS systems",
      "Admin dashboards and SaaS platforms",
      "API and backend development",
    ],
    cta: "Explore software services",
    ctaHref: "/contact",
  },
  {
    id: "automation",
    number: "03",
    label: "Automation",
    title: "Automation",
    description: "Connected workflows that reduce repetitive work, improve operational speed, and keep teams aligned.",
    bullets: [
      "Workflow automation",
      "System integrations",
      "Rules and event-based actions",
    ],
    cta: "Explore automation",
    ctaHref: "/contact",
  },
  {
    id: "web-mobile",
    number: "04",
    label: "Web & Mobile",
    title: "Web & Mobile Application Development",
    description: "Corporate websites, custom web apps, e-commerce, PWAs, mobile apps, and portals with responsive UI/UX.",
    bullets: [
      "Responsive web applications",
      "E-commerce and client portals",
      "Mobile and progressive web apps",
    ],
    cta: "Start your project",
    ctaHref: "/contact",
  },
];
