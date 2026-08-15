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
  heading: "Technology chosen for real-world reliability",
  description:
    "We select tools, platforms, and infrastructure according to the actual needs of the product, including performance, security, integration, maintainability, and future scale.",
  cta: "Explore our technology approach",
  points: [
    "Product-focused architecture",
    "Secure cloud infrastructure",
    "AI and data systems",
    "Reliable integration layers",
  ],
  detail: "AI / APPLICATIONS / CLOUD",
};

export const technologyLabels: TechnologyLabel[] = [
  { name: "OpenAI", group: "model" },
  { name: "Python", group: "model" },
  { name: "React", group: "api" },
  { name: "Next.js", group: "api" },
  { name: "PostgreSQL", group: "data" },
  { name: "AWS", group: "cloud" },
  { name: "Node.js", group: "api" },
  { name: "Cloud Infrastructure", group: "cloud" },
  { name: "Vector Search", group: "data" },
  { name: "APIs", group: "security" },
];

export const technologyCategories: TechnologyCategory[] = [
  {
    title: "Artificial Intelligence",
    description: "Generative AI, retrieval systems, intelligent agents, and machine learning.",
  },
  {
    title: "Modern Applications",
    description: "Scalable applications built with current web and backend technologies.",
  },
  {
    title: "Cloud Infrastructure",
    description: "Secure deployment, monitoring, storage, integration, and platform reliability.",
  },
];
