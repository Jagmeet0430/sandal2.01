export type CapabilityId = "ai-products" | "cloud-platforms" | "automation" | "digital-intelligence";

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
    label: "AI Products",
    title: "AI Products",
    description: "Intelligent applications designed around real business workflows.",
    bullets: [
      "AI assistants and copilots",
      "Retrieval and knowledge systems",
      "Intelligent decision support",
    ],
    cta: "Explore AI products",
    ctaHref: "/capabilities#ai-products",
  },
  {
    id: "cloud-platforms",
    number: "02",
    label: "Cloud Platforms",
    title: "Cloud Platforms",
    description: "Reliable digital platforms built for scale, integration, and long-term growth.",
    bullets: [
      "Cloud-native architecture",
      "Secure APIs and integrations",
      "Monitoring and deployment automation",
    ],
    cta: "Explore cloud platforms",
    ctaHref: "/technology",
  },
  {
    id: "automation",
    number: "03",
    label: "Automation",
    title: "Automation",
    description: "Connected systems that reduce repetitive work and improve operational speed.",
    bullets: [
      "Workflow automation",
      "System integrations",
      "Rules and event-based actions",
    ],
    cta: "Explore automation",
    ctaHref: "/contact",
  },
  {
    id: "digital-intelligence",
    number: "04",
    label: "Digital Intelligence",
    title: "Digital Intelligence",
    description: "Data products that turn operational information into useful decisions.",
    bullets: [
      "Analytics dashboards",
      "Predictive insights",
      "Reporting and business intelligence",
    ],
    cta: "Explore digital intelligence",
    ctaHref: "/technology",
  },
];
