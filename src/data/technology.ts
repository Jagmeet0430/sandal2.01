export type TechnologyLabel = {
  name: string;
  group: "model" | "data" | "cloud" | "api" | "security";
};

export type TechnologyCategory = {
  title: string;
  description: string;
};

export const technologyContent = {
  eyebrow: "TECHNOLOGY",
  heading: "Modern stack chosen for reliability, security, and scale",
  description:
    "Alyvora selects practical technologies for each product, including Next.js, React, TypeScript, PostgreSQL, Prisma, Node.js, FastAPI, OpenAI, Anthropic, vector databases, AWS, Docker, and Vercel.",
  cta: "Explore our technology approach",
  points: [
    "Next.js, React, TypeScript, and Tailwind CSS",
    "PostgreSQL, Prisma, APIs, and backend services",
    "OpenAI, Anthropic, RAG, vector search, and AI agents",
    "Vercel, AWS, Docker, CI/CD, CDN, and security monitoring",
  ],
  detail: "AI / SOFTWARE / CLOUD",
};

export const technologyLabels: TechnologyLabel[] = [
  { name: "OpenAI", group: "model" },
  { name: "Anthropic", group: "model" },
  { name: "Python", group: "model" },
  { name: "React", group: "api" },
  { name: "Next.js", group: "api" },
  { name: "PostgreSQL", group: "data" },
  { name: "Prisma", group: "data" },
  { name: "AWS", group: "cloud" },
  { name: "Vercel", group: "cloud" },
  { name: "Node.js", group: "api" },
  { name: "FastAPI", group: "api" },
  { name: "Vector Search", group: "data" },
  { name: "APIs", group: "security" },
];

export const technologyCategories: TechnologyCategory[] = [
  {
    title: "Artificial Intelligence",
    description: "OpenAI, Anthropic, RAG, vector databases, intelligent agents, analytics, and secure AI integrations.",
  },
  {
    title: "Modern Applications",
    description: "Next.js, React, TypeScript, Tailwind CSS, Node.js, FastAPI, APIs, dashboards, portals, and mobile-ready experiences.",
  },
  {
    title: "Cloud Infrastructure",
    description: "Vercel, AWS, Docker, GitHub Actions, PostgreSQL, file storage, CDN, monitoring, and platform reliability.",
  },
];
