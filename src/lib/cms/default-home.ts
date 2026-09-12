import type { HomePageContent, HomeCmsState } from "@/lib/cms/types";

export const defaultHomeContent: HomePageContent = {
  hero: {
    eyebrow: "ALYVORA AI TECHNOLOGIES",
    heading: "Intelligent Technology.",
    highlightedHeading: "Real Business Impact.",
    paragraph:
      "Alyvora AI Technologies Private Limited builds AI solutions, custom software, automation systems, web and mobile applications, cloud platforms, and digital transformation programs for businesses ready to scale.",
    ctaLabel: "Start Your Project",
    ctaLink: "/contact",
  },
  whatWeCreate: {
    eyebrow: "SERVICES",
    heading: "Secure, scalable technology for",
    highlightedHeading: "real business workflows",
    cards: [
      {
        id: "ai-products",
        number: "01",
        category: "AI & AUTOMATION",
        title: "AI assistants, RAG systems, agents, and workflow automation",
        description: "Custom AI solutions and automations designed around operational needs.",
        ctaLabel: "Explore",
        ctaUrl: "/capabilities",
        order: 1,
      },
      {
        id: "automation",
        number: "02",
        category: "CUSTOM SOFTWARE",
        title: "CRM, ERP, POS, SaaS, dashboards, portals, and APIs",
        description: "Business software built for reliability, security, and long-term growth.",
        ctaLabel: "Explore",
        ctaUrl: "/contact",
        order: 2,
      },
      {
        id: "digital-platforms",
        number: "03",
        category: "WEB & MOBILE",
        title: "Corporate websites, custom apps, e-commerce, PWAs, and mobile apps",
        description: "Responsive product experiences for customers, students, teams, and partners.",
        ctaLabel: "Explore",
        ctaUrl: "/technology",
        order: 3,
      },
    ],
  },
  about: {
    eyebrow: "ABOUT ALYVORA",
    heading: "We transform ideas and operations through intelligent, reliable technology.",
    paragraph:
      "Alyvora helps startups, SMEs, educational institutions, healthcare providers, retailers, professional service companies, and international teams build secure, scalable, user-friendly digital systems.",
    pillars: [
      {
        id: "strategy",
        number: "01",
        title: "Mission",
        description: "Help businesses turn ideas and operations into dependable intelligent systems.",
        order: 1,
      },
      {
        id: "engineering",
        number: "02",
        title: "Engineering",
        description: "Build secure, scalable software with clean architecture and practical delivery discipline.",
        order: 2,
      },
      {
        id: "intelligence",
        number: "03",
        title: "Vision",
        description: "Become a globally trusted AI and software technology company solving meaningful business problems.",
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
