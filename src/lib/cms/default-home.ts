import type { HomePageContent, HomeCmsState } from "@/lib/cms/types";

export const defaultHomeContent: HomePageContent = {
  hero: {
    eyebrow: "AI-POWERED DIGITAL INTELLIGENCE",
    heading: "Intelligence built for",
    highlightedHeading: "what comes next",
    paragraph:
      "ApexMind creates intelligent applications, automation systems, and digital platforms for businesses ready to move beyond ordinary software.",
    ctaLabel: "Scroll to explore",
    ctaLink: "#capabilities",
  },
  whatWeCreate: {
    eyebrow: "WHAT WE CREATE",
    heading: "Intelligent technology for",
    highlightedHeading: "complex business challenges",
    cards: [
      {
        id: "ai-products",
        number: "01",
        category: "AI PRODUCTS",
        title: "Intelligent applications built around real workflows",
        description: "AI products designed around operational needs.",
        ctaLabel: "Explore",
        ctaUrl: "/capabilities",
        order: 1,
      },
      {
        id: "automation",
        number: "02",
        category: "AUTOMATION",
        title: "Connected systems that remove repetitive work",
        description: "Workflow automation for teams and tools.",
        ctaLabel: "Explore",
        ctaUrl: "/contact",
        order: 2,
      },
      {
        id: "digital-platforms",
        number: "03",
        category: "DIGITAL PLATFORMS",
        title: "Scalable cloud products designed for long-term growth",
        description: "Cloud platforms with product-grade foundations.",
        ctaLabel: "Explore",
        ctaUrl: "/technology",
        order: 3,
      },
    ],
  },
  about: {
    eyebrow: "ABOUT APEXMIND",
    heading: "We turn emerging technology into practical systems.",
    paragraph:
      "ApexMind combines strategy, engineering, and artificial intelligence to build products that solve operational problems, improve customer experiences, and support long-term growth.",
    pillars: [
      {
        id: "strategy",
        number: "01",
        title: "Strategy",
        description: "We identify the right product direction before writing code.",
        order: 1,
      },
      {
        id: "engineering",
        number: "02",
        title: "Engineering",
        description: "We build secure, scalable systems designed for real operations.",
        order: 2,
      },
      {
        id: "intelligence",
        number: "03",
        title: "Intelligence",
        description: "We add AI where it creates measurable business value.",
        order: 3,
      },
    ],
  },
};

export function createDefaultHomeCmsState(): HomeCmsState {
  const now = new Date().toISOString();

  return {
    page: "home",
    draft: defaultHomeContent,
    published: defaultHomeContent,
    lastSavedAt: now,
    lastPublishedAt: now,
    versions: [
      {
        id: `home-v1-${Date.now()}`,
        version: 1,
        page: "home",
        editor: "System",
        status: "published",
        createdAt: now,
        content: defaultHomeContent,
      },
    ],
    auditLog: [
      {
        id: `audit-${Date.now()}`,
        user: "System",
        action: "cms.page_published",
        resource: "home",
        timestamp: now,
        metadata: { version: 1 },
      },
    ],
  };
}
